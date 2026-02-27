import os
import json
import re

def get_files(directory, extensions):
    paths = []
    if os.path.exists(directory):
        for root, _, files in os.walk(directory):
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    rel_path = os.path.relpath(os.path.join(root, file), start="Next-Steps")
                    paths.append(f"../{rel_path}")
    return sorted(paths)

icon_libs = get_files("Next-Steps/assets/Icon Libraries", ['.png', '.svg', '.webp'])
textures = get_files("Next-Steps/assets/textures", ['.png', '.jpg', '.jpeg', '.webp'])

# Read the existing HTML file
try:
    with open("Next-Steps/Documentations/design-system.html", "r") as f:
        existing_content = f.read()
except FileNotFoundError:
    print("Error: design-system.html not found.")
    exit()

# --- New Content to Inject ---

# 1. New CSS for Interactive Elements
new_css = """
        /* ------------------------------------------- */
        /* INTERACTIVE CARDS & ANIMATED CTAs           */
        /* ------------------------------------------- */
        .interactive-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 32px;
            align-items: center;
        }

        /* 3D Flip Card */
        .flip-card {
            background-color: transparent;
            width: 100%;
            aspect-ratio: 16 / 10;
            perspective: 1000px;
        }
        .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 24px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .flip-card-front {
            background: var(--brand-dark) url('../assets/textures/carbon-leak.png') center/cover;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 32px;
        }
        .flip-card-back {
            background-color: var(--brand-red);
            color: white;
            transform: rotateY(180deg);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 32px;
        }

        /* Spotlight Card */
        .spotlight-card {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 10;
            background: var(--brand-charcoal);
            border-radius: 24px;
            overflow: hidden;
            padding: 32px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            color: white;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .spotlight-card::before {
            content: '';
            position: absolute;
            top: var(--spotlight-y, 50%);
            left: var(--spotlight-x, 50%);
            transform: translate(-50%, -50%);
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%);
            pointer-events: none;
            transition: top 0.1s ease, left 0.1s ease;
        }

        /* Animated CTA Buttons */
        .cta-grid { display: flex; flex-wrap: wrap; gap: 24px; align-items: center; }
        .btn-arrow {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding-right: 24px;
        }
        .btn-arrow .arrow-icon { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-arrow:hover .arrow-icon { transform: translateX(5px); }
        
        .btn-shine {
            position: relative;
            overflow: hidden;
        }
        .btn-shine::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transform: skewX(-25deg);
            transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-shine:hover::before {
            left: 150%;
        }

        /* Stateful Buttons */
        .btn-loading {
            position: relative;
            color: transparent !important;
        }
        .btn-loading .loader {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: translate(-50%, -50%) rotate(360deg); } }
"""

# 2. New HTML Section for Interactive Elements
new_html_section = """
        <!-- INTERACTIVE ELEMENTS & CTA SHOWCASE -->
        <section id="interactive-elements">
            <div class="section-header">
                <h2>9. Interactive Elements & CTAs</h2>
                <p>A collection of animated cards and advanced call-to-action buttons.</p>
            </div>

            <h4 style="font-size: 14px; font-weight: 700; text-transform: uppercase; margin-bottom: 24px; color: var(--text-secondary);">Interactive Cards</h4>
            <div class="interactive-grid">
                
                <!-- 3D Flip Card -->
                <div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <h3 style="font-size: 28px; text-align: left; font-weight: 900; font-style: italic;">Paint Protection Film</h3>
                            <p style="text-align: left; font-size: 14px; color: var(--text-muted);">Self-healing, high-gloss film for ultimate rock chip defense.</p>
                        </div>
                        <div class="flip-card-back">
                            <h4 style="font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7;">LEARN MORE</h4>
                            <p style="font-size: 18px; font-weight: 500; margin-top: 12px;">Discover our PPF packages starting from AED 4,500.</p>
                        </div>
                    </div>
                </div>

                <!-- Spotlight Card -->
                <div class="spotlight-card" onmousemove="updateSpotlight(event)">
                    <h3 style="font-size: 28px; font-weight: 900; font-style: italic;">Engine Tuning</h3>
                    <p style="font-size: 14px; color: var(--text-muted);">Unlock your vehicle's true potential with our custom ECU mapping.</p>
                </div>
            </div>

            <div class="rules-container">
                <div class="rules-column dos"><h4>Do</h4><ul class="rules-list"><li>Use 3D flips for service cards that have a clear "front" (the service name) and "back" (a price or CTA).</li><li>Apply the spotlight effect to premium or featured product cards to draw attention.</li></ul></div>
                <div class="rules-column donts"><h4>Don't</h4><ul class="rules-list"><li>Do not overuse 3D effects; limit them to one or two key areas per page to maintain performance.</li><li>Don't put critical information on the back of a flip card that users must see.</li></ul></div>
            </div>

            <h4 style="font-size: 14px; font-weight: 700; text-transform: uppercase; margin: 60px 0 24px; color: var(--text-secondary);">Advanced CTA Buttons</h4>
            <div class="type-showcase">
                <div class="cta-grid">
                    <button class="button-overlay btn-web-red btn-arrow">
                        <span>Book Now</span>
                        <svg class="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </button>
                    
                    <button class="button-overlay btn-web-dark btn-shine">
                        <span>Claim Offer</span>
                    </button>
                    
                    <button class="button-overlay btn-web-dark btn-loading">
                        <span>Processing...</span>
                        <div class="loader"></div>
                    </button>

                    <button class="button-overlay btn-web-dark" style="opacity: 0.5; cursor: not-allowed;">
                        <span>Sold Out</span>
                    </button>
                </div>
            </div>
        </section>
"""

# 3. JavaScript for Spotlight Card
new_js = """
        // Spotlight card effect
        function updateSpotlight(event) {
            const card = event.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            card.style.setProperty('--spotlight-x', `${x}px`);
            card.style.setProperty('--spotlight-y', `${y}px`);
        }
"""

# --- File Manipulation ---

# Inject New CSS
existing_content = existing_content.replace(
    '</style>',
    new_css + '</style>'
)

# Inject New HTML Section
existing_content = existing_content.replace(
    '<section id="brand-textures">',
    new_html_section + '<section id="brand-textures">'
)

# Inject New Sidebar Link
existing_content = existing_content.replace(
    '<a href="#brand-textures" class="nav-item">7. Brand Textures</a>',
    '<a href="#interactive-elements" class="nav-item">7. Interactive Elements</a>' +
    '<a href="#brand-textures" class="nav-item">8. Brand Textures</a>'
)

# Fix numbering for the last item
existing_content = existing_content.replace(
    '<a href="#icon-library" class="nav-item">8. Universal Icon Library</a>',
    '<a href="#icon-library" class="nav-item">9. Universal Icon Library</a>'
)

# Inject New JS
existing_content = existing_content.replace(
    '</script>',
    new_js + '</script>'
)

with open("Next-Steps/Documentations/design-system.html", "w") as f:
    f.write(existing_content)

print("Injected Interactive Elements & CTA Showcase successfully!")

