with open('public/style.css', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'A I   C H A T B O T' in line or '\x00' in line:
        break # stop reading when bad characters hit
    new_lines.append(line)

# Also let's just forcefully cut it off at the responsive block
final_lines = []
for i, line in enumerate(lines):
    final_lines.append(line)
    if 'row-flex { flex-direction: column; gap: 0 !important; }' in line:
        final_lines.append('}\n')
        break

with open('public/style.css', 'w', encoding='utf-8') as f:
    f.writelines(final_lines)
