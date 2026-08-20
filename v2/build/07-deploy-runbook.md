# Deploy runbook — staging & production

**Status (2026-08-20):** Set up and verified EXCEPT the final push — Greg is holding
staging until copy + mobile formatting are ready. The `staging` branch exists LOCALLY
with everything committed (`7b748b6`). When ready, it's the two commands in Step 2.

## The one gotcha (diagnosed, don't re-debug)

Two GitHub accounts live in this machine's keyring:
- `greg-toler` — usually ACTIVE, but only READ on the repo → push returns 403
- `gt-quantum` — owns `gt-quantum/gregtoler`, has push

`git push` fails with `Permission denied to greg-toler` unless you switch first.

## Step 1 — commit (already done for the current work)

Work on `staging` (branched from `main`). Stage ONLY intended paths — the worktree is
full of untracked personal files (screenshots, `._*` AppleDouble junk, `Greg Toler/`,
`images/`, `.claude/`) that must not ship:

    git checkout staging
    git add src/components/v2 src/layouts/V2Layout.astro src/pages/v2 \
            src/styles/v2-tokens.css public/fonts v2
    git commit -m "..."

Check nothing stray: `git diff --cached --name-only | grep "^\._\|/\._"` → must be empty.

## Step 2 — push staging (the part Greg paused)

    gh auth switch --user gt-quantum
    git push -u origin staging
    gh auth switch --user greg-toler        # optional: restore default

## Step 3 — Cloudflare preview URL

The site deploys via Cloudflare Pages (`@astrojs/cloudflare` adapter). If the Pages
project is connected to the GitHub repo (it deploys `main` to gregtoler.com today),
every non-production branch push gets an AUTOMATIC preview deployment:

    https://staging.<project-name>.pages.dev

Find the exact URL: Cloudflare dashboard → Workers & Pages → the gregtoler project →
Deployments → the `staging` entry. That URL is the shareable one.

Notes for sharing:
- `/v2` is the preview route; the root `/` on staging is just V1.
- `/v2` carries `noindex,nofollow` (set in `V2Layout.astro`) — keep until cutover.
- If the branch does NOT appear in Deployments after a push, the Pages project isn't
  connected to GitHub (or preview deployments are disabled): dashboard → project →
  Settings → Builds & deployments → check "Preview deployments: All branches".

## Verify before sharing a preview link

1. Open `<preview-url>/v2` in a private window
2. Scroll the full morph; click both axes; click all nav items
3. Check the fonts loaded (Barlow headline — if you see system sans, `public/fonts/v2`
   didn't deploy)

## Production cutover (LATER — separate decision, own checklist)

Not part of staging. When V2 replaces V1: merge to `main` → Pages deploys production.
Before that: remove `noindex`, move V2 to `/`, purge fabricated V1 content (audit),
replace broken favicon.svg, production build must fail on `placeholder: true` case
studies (decisions/002).

## Rollback

Pages keeps every deployment. Dashboard → Deployments → previous build → "Rollback".
Or `git revert` on the branch and push again.
