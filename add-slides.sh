#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INPUT_DIR="$SCRIPT_DIR/input"
OUTPUT_DIR="$SCRIPT_DIR/assets/images"
LOGO="$SCRIPT_DIR/static/images/logo.png"
VENV="/tmp/imgvenv"

if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: '$INPUT_DIR' folder not found." >&2
    exit 1
fi

# Ensure Pillow is available
if [ ! -x "$VENV/bin/python3" ]; then
    echo "Setting up Python venv for watermarking..."
    python3 -m venv "$VENV"
    "$VENV/bin/pip" install pillow -q
fi

# Find the next available slide number
last=$(ls "$OUTPUT_DIR"/slide*.jpg 2>/dev/null | grep -oE '[0-9]+' | sort -n | tail -1)
next=${last:-0}
next=$((next + 1))

count=0
files=()
while IFS= read -r -d '' file; do
    dest="$OUTPUT_DIR/slide${next}.jpg"
    mv "$file" "$dest"
    files+=("$dest")
    echo "  $(basename "$file") → slide${next}.jpg"
    next=$((next + 1))
    count=$((count + 1))
done < <(find "$INPUT_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

if [ $count -eq 0 ]; then
    echo "No image files found in '$INPUT_DIR'."
    exit 0
fi

# Apply watermark to newly added images
echo "Applying watermark..."
printf '%s\n' "${files[@]}" | "$VENV/bin/python3" - "$LOGO" << 'PYEOF'
import sys
from PIL import Image

logo_path = sys.argv[1]
PADDING = 20
LOGO_WIDTH_RATIO = 0.15

logo_src = Image.open(logo_path).convert("RGBA")

for path in sys.stdin.read().splitlines():
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    logo_w = max(60, int(w * LOGO_WIDTH_RATIO))
    logo_h = int(logo_src.height * (logo_w / logo_src.width))
    logo = logo_src.resize((logo_w, logo_h), Image.LANCZOS)
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    overlay.paste(logo, (w - logo_w - PADDING, h - logo_h - PADDING), logo)
    Image.alpha_composite(img, overlay).convert("RGB").save(path, "JPEG", quality=92)
    print(f"  watermarked {path.split('/')[-1]}")
PYEOF

echo "Done. Added $count image(s)."
