#!/usr/bin/env bash
# Renders each Earnnest slide in its settled state via headless Chrome and
# binds the pages into the proposal folder (not public/: the deck is password-gated, a static PDF would not be).
# Needs the dev server on :4321 (npm run dev) and Pillow (python3 -m pip install pillow).
# If the deck is locked locally (EARNNEST_* set in .env), export EARNNEST_ADMIN_PASSWORD so the
# renderer can get in: dev accepts ?key=<admin password>.
set -euo pipefail
cd "$(dirname "$0")/.."
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="../../pipeline/proposals/earnnest"; TMP="$(mktemp -d)"
mkdir -p "$OUT"
# the last step of each slide, in order
STEPS=(0 6 11 16 17 18 19)
for i in "${!STEPS[@]}"; do
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=4000 \
    --screenshot="$TMP/$(printf '%02d' "$i").png" "http://localhost:4321/earnnest?embed&step=${STEPS[$i]}${EARNNEST_ADMIN_PASSWORD:+&key=$EARNNEST_ADMIN_PASSWORD}" >/dev/null 2>&1
done
python3 - "$TMP" "$OUT/earnnest-knowledge-brain.pdf" <<'EOF'
import sys, glob
from PIL import Image
pages = [Image.open(f).convert("RGB") for f in sorted(glob.glob(sys.argv[1] + "/*.png"))]
pages[0].save(sys.argv[2], save_all=True, append_images=pages[1:], resolution=144)
print(f"{len(pages)} pages -> {sys.argv[2]}")
EOF
rm -rf "$TMP"
