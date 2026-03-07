#!/usr/bin/env bash
set -euo pipefail

INPUT_DIR="input"
OUTPUT_DIR="assets/images"

if [ ! -d "$INPUT_DIR" ]; then
    echo "Error: '$INPUT_DIR' folder not found." >&2
    exit 1
fi

# Find the next available slide number
last=$(ls "$OUTPUT_DIR"/slide*.jpg 2>/dev/null | grep -oE '[0-9]+' | sort -n | tail -1)
next=${last:-0}
next=$((next + 1))

count=0
while IFS= read -r -d '' file; do
    ext="${file##*.}"
    dest="$OUTPUT_DIR/slide${next}.jpg"
    mv "$file" "$dest"
    echo "  $file → $dest"
    next=$((next + 1))
    count=$((count + 1))
done < <(find "$INPUT_DIR" -maxdepth 1 -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

if [ $count -eq 0 ]; then
    echo "No image files found in '$INPUT_DIR'."
else
    echo "Done. Moved $count image(s)."
fi
