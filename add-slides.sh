#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
INPUT_DIR="$SCRIPT_DIR/input"
GALLERY_DIR="$SCRIPT_DIR/assets/images/gallery"
LOGO="$SCRIPT_DIR/assets/images/logo.png"
VENV="/tmp/imgvenv"
# Compute SHA256 hash of a file (cross-platform: macOS + Linux)
sha256_of() {
    if command -v sha256sum &>/dev/null; then
        sha256sum "$1" | cut -d' ' -f1
    else
        shasum -a 256 "$1" | cut -d' ' -f1
    fi
}

mkdir -p "$GALLERY_DIR"

if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: '$INPUT_DIR' folder not found." >&2
    exit 1
fi

# Ensure Pillow is available
if ! "$VENV/bin/python3" -c "from PIL import Image" 2>/dev/null; then
    echo "Setting up Python venv for watermarking..."
    rm -rf "$VENV"
    python3 -m venv "$VENV"
    "$VENV/bin/pip" install --upgrade pillow -q
fi

total=0
all_files=()

# Process each subdirectory in input/ (e.g. input/witteklei/, input/grijzeklei/)
for subdir in "$INPUT_DIR"/*/; do
    [ -d "$subdir" ] || continue
    name="$(basename "$subdir")"
    out="$GALLERY_DIR/$name"
    mkdir -p "$out"
    HASH_FILE="$out/.imported_hashes"
    touch "$HASH_FILE"

    last=$(ls "$out"/slide*.jpg 2>/dev/null | grep -oE '[0-9]+' | sort -n | tail -1)
    next=$((10#${last:-0} + 1))

    count=0
    files=()
    while IFS= read -r -d '' file; do
        hash=$(sha256_of "$file")
        if grep -qF "$hash" "$HASH_FILE" 2>/dev/null; then
            echo "  [$name] $(basename "$file") already imported — skipping"
            continue
        fi
        dest="$out/$(printf 'slide%04d.jpg' $next)"
        mv "$file" "$dest"
        echo "$hash" >> "$HASH_FILE"
        files+=("$dest")
        echo "  [$name] $(basename "$file") → slide$(printf '%04d' $next).jpg"
        next=$((10#$next + 1))
        count=$((count + 1))
    done < <(find "$subdir" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

    if [ $count -gt 0 ]; then
        all_files+=("${files[@]}")
        total=$((total + count))
    else
        echo "  [$name] No image files found."
    fi
done

if [ $total -eq 0 ]; then
    echo "No image files found in any subdirectory of '$INPUT_DIR'."
    exit 0
fi

# Apply watermark to all newly added images
echo "Applying watermark..."
tmp_filelist=$(mktemp /tmp/slides_files.XXXXXX)
tmp_script=$(mktemp /tmp/slides_watermark.XXXXXX.py)
printf '%s\n' "${all_files[@]}" > "$tmp_filelist"

cat > "$tmp_script" << 'PYEOF'
import sys
from PIL import Image

logo_path, filelist_path = sys.argv[1], sys.argv[2]
PADDING = 20
LOGO_WIDTH_RATIO = 0.15

logo_src = Image.open(logo_path).convert("RGBA")

for path in open(filelist_path).read().splitlines():
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

"$VENV/bin/python3" "$tmp_script" "$LOGO" "$tmp_filelist"
rm -f "$tmp_filelist" "$tmp_script"

echo "Done. Added $total image(s)."
