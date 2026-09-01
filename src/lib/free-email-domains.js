// Personal / free mailbox providers. The V2 intake asks for a work address so Greg
// knows which company he's talking to; the form blocks these client-side and
// /api/contact re-checks server-side (V2 submissions only — V1's form is unaffected).
// Matched on the registrable label (gmail.com, yahoo.co.uk, outlook.de → gmail/yahoo/outlook).
const FREE_LABELS = new Set([
  "gmail", "googlemail", "yahoo", "ymail", "rocketmail", "hotmail", "outlook", "live",
  "msn", "aol", "icloud", "me", "mac", "protonmail", "proton", "pm", "gmx", "yandex",
  "zoho", "zohomail", "mail", "email", "inbox", "hey", "fastmail", "tutanota", "tuta",
  "duck", "comcast", "verizon", "att", "sbcglobal", "cox", "charter", "earthlink",
  "mailinator", "guerrillamail", "10minutemail", "temp-mail", "yopmail",
]);

export function isFreeEmail(email) {
  const at = String(email || "").trim().toLowerCase().lastIndexOf("@");
  if (at < 0) return false;
  const parts = email.slice(at + 1).toLowerCase().split(".");
  if (parts.length < 2) return false;
  // yahoo.co.uk / outlook.com.au → the label before the public suffix
  const second = parts[parts.length - 2];
  const third = parts.length >= 3 ? parts[parts.length - 3] : null;
  const label = ["co", "com", "org", "net", "ac", "gov"].includes(second) && third ? third : second;
  return FREE_LABELS.has(label);
}
