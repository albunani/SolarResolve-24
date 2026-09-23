
import os

files = {
    'requirement.md': [
        ('Upload an image of an inverter or controller display (Optional)', 'Upload an image of an inverter or controller display (Deferred for MVP)'),
        ('- visibly demonstrate useful image and language AI capabilities;', '- visibly demonstrate useful language AI capabilities (image upload deferred for v2);'),
        ('### FR-05 - Image upload', '### FR-05 - Image upload (Deferred)'),
        ('### FR-06 - Image analysis', '### FR-06 - Image analysis (Deferred)')
    ],
    'PROJECT_CONCEPT.md': [
        ('extract visible information from uploaded images;', 'extract visible information (Deferred to v2);'),
        ('- image and text input;', '- text input (image upload deferred);')
    ]
}

for file, replacements in files.items():
    if not os.path.exists(file): continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

