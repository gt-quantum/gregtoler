// Drive headless Chrome over CDP: set a phone viewport, load a URL, optionally scroll /
// click, then measure element rects and take a screenshot.
// usage: node measure.mjs <url> <outPrefix> <width> <height> [scrollY] [clickSelector]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [url, out, wStr, hStr, scrollStr = "0", clickSel = ""] = process.argv.slice(2);
const W = +wStr, H = +hStr, SCROLL = +scrollStr;
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333 + Math.floor(Math.random() * 500);

const chrome = spawn(CH, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  `--remote-debugging-port=${PORT}`, `--window-size=${W},${H}`,
  `--user-data-dir=/tmp/cdp-prof-${PORT}`, "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getWs() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json`);
      const list = await r.json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("chrome did not come up");
}

const ws = new WebSocket(await getWs());
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(3500);
if (SCROLL) { await evaluate(`window.scrollTo(0, ${SCROLL}); 'ok'`); await sleep(1200); }
if (clickSel) { await evaluate(`document.querySelector(${JSON.stringify(clickSel)})?.click(); 'ok'`); await sleep(1500); }

const measure = await evaluate(`(() => {
  const r = (sel, all) => {
    const els = all ? [...document.querySelectorAll(sel)] : [document.querySelector(sel)].filter(Boolean);
    return els.map((el) => { const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      return { sel, text: (el.textContent || '').trim().slice(0, 20), x: +b.left.toFixed(1), y: +b.top.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1),
        cx: +(b.left + b.width / 2).toFixed(1), cy: +(b.top + b.height / 2).toFixed(1), fs: cs.fontSize, pad: cs.padding, op: cs.opacity }; });
  };
  const sels = ${JSON.stringify([
    // V1
    "header", "header img", "aside", "aside .nav-item", "aside .nav-item svg", "aside > div > div[style*='flex-grow']", "aside .social-icon", "main.content-area", "main.content-area h1",
    // V2
    ".v2-head", ".v2-brand", ".v2-gtmark", ".v2-spine", ".v2-spine-item", ".v2-spine-link", ".v2-linkedin", "main", ".v2-hero", ".v2-thesis", ".v2-lede", ".v2-hero-eyebrow", ".v2-pin", ".v2-plane", ".v2-seam", ".v2-axlab", ".v2-panel-y", ".v2-panel-x", ".v2-hint", ".v2-wrap", ".v2-ph h2",
  ])};
  const outp = {};
  for (const s of sels) { const m = r(s, true); if (m.length) outp[s] = m; }
  outp.__viewport = { iw: innerWidth, ih: innerHeight, sw: document.documentElement.scrollWidth, scrollY, docH: document.documentElement.scrollHeight };
  return outp;
})()`);

writeFileSync(`${out}.json`, JSON.stringify(measure, null, 1));
const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(`${out}.png`, Buffer.from(shot.result.data, "base64"));
ws.close(); chrome.kill();
console.log(`wrote ${out}.json / ${out}.png`);
