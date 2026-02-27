import os

# Define file paths
base_path = "/Users/ajmalifthikar/smartmotorlatest/Next-Steps/Documentations/"
files = [
    "SmartMotor Market Intelligence — Perplexity Deep R.md",
    "smartmotor-seo-audit.md",
    "seo-implementation.md",
    "smartmotor-seo-legal-playbook.md",
    "font-guidelines.md",
]

output_path = "/Users/ajmalifthikar/smartmotorlatest/Next-Steps/master-researched-document-high-level-contextual-completeness.md"


def read_file(filename):
    try:
        with open(os.path.join(base_path, filename), "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return f"Error reading {filename}: {str(e)}"


# Merge content
merged_content = "# MASTER STRATEGIC DOCUMENT: SMART MOTOR AUTO REPAIR\n\n"
merged_content += "> **Context:** This document is a consolidated master file merging Market Intelligence, SEO Audit, Implementation Guidelines, Local SEO Playbook, and Brand Guidelines.\n\n"
merged_content += "---\n\n"

for filename in files:
    content = read_file(filename)
    section_title = filename.replace(".md", "").upper()
    merged_content += f"# PART: {section_title}\n\n"
    merged_content += content
    merged_content += "\n\n---\n\n"

# Write to output file
with open(output_path, "w", encoding="utf-8") as f:
    f.write(merged_content)

print(f"Successfully created: {output_path}")
