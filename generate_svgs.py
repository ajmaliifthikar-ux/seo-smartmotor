import os

svg1 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 160" width="400" height="160">
  <defs>
    <style>
      .bg { fill: #121212; }
      .accent { fill: #E62329; }
      .label { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; fill: #E62329; }
      .value { font-family: 'Inter', sans-serif; font-size: 56px; font-weight: 900; font-style: italic; letter-spacing: -0.04em; fill: #FFFFFF; }
    </style>
  </defs>
  <g id="Impact-Callout">
    <g transform="translate(20, 0) skewX(-5)">
      <rect x="10" y="20" width="340" height="120" class="bg" />
      <rect x="10" y="20" width="8" height="120" class="accent" />
    </g>
    <g id="Text-Content" transform="translate(60, 60)">
      <text x="0" y="0" class="label">LIMITED TIME OFFER</text>
      <text x="0" y="55" class="value">AED 1,499</text>
    </g>
  </g>
</svg>"""

svg2 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 240" width="500" height="240">
  <defs>
    <style>
      .bg { fill: #121212; }
      .stroke { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 2; }
      .label { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.3em; fill: #E62329; }
      .title { font-family: 'Inter', sans-serif; font-size: 32px; font-weight: 900; text-transform: uppercase; font-style: italic; letter-spacing: -0.02em; fill: #FFFFFF; }
      .subtitle { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 500; fill: #A3A3A3; }
      .qr-bg { fill: #FFFFFF; }
      .qr-color { fill: #121212; }
    </style>
  </defs>
  <g id="QR-Badge">
    <rect x="10" y="10" width="480" height="220" rx="24" class="bg" />
    <rect x="10" y="10" width="480" height="220" rx="24" class="stroke" />
    <g id="Content" transform="translate(40, 50)">
      <text x="0" y="0" class="label">INSTANT BOOKING</text>
      <text x="0" y="40" class="title">SCAN TO</text>
      <text x="0" y="75" class="title">RESERVE</text>
      <text x="0" y="105" class="subtitle">Point your camera to book</text>
      <text x="0" y="125" class="subtitle">your service instantly.</text>
    </g>
    <g id="QR-Code-Area" transform="translate(310, 30)">
      <rect x="0" y="0" width="160" height="180" rx="16" class="qr-bg" />
      <g transform="translate(30, 40) scale(4)">
        <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h2v2h-2zM17 13h4v4h-4zM13 17h4v4h-4zM19 17h2v4h-2zM5 5v4h4V5zM15 5v4h4V5zM5 15v4h4v-4z" class="qr-color"/>
      </g>
    </g>
  </g>
</svg>"""

svg3 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120" width="200" height="120">
  <defs>
    <style>
      .bg { fill: #FAFAF9; }
      .border { fill: none; stroke: #ECECEA; stroke-width: 2; }
      .red-line { fill: #E62329; }
      .label { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; fill: #A3A3A3; }
      .value { font-family: 'Inter', sans-serif; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; fill: #121212; }
    </style>
  </defs>
  <g id="Tech-Spec-Badge">
    <rect x="10" y="10" width="180" height="100" rx="12" class="bg" />
    <rect x="10" y="10" width="180" height="100" rx="12" class="border" />
    <path d="M 10 22 Q 10 10 22 10 L 178 10 Q 190 10 190 22 L 190 14 L 10 14 Z" class="red-line" />
    <g id="Text" transform="translate(30, 50)">
      <text x="0" y="0" class="label">PROTECTION</text>
      <text x="0" y="35" class="value">9H NANO</text>
    </g>
  </g>
</svg>"""

svg4 = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 100" width="800" height="100">
  <defs>
    <style>
      .bg { fill: #121212; }
      .btn-bg { fill: #E62329; }
      .text-white { fill: #FFFFFF; font-family: 'Inter', sans-serif; }
      .brand { font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; }
      .contact { font-size: 18px; font-weight: 700; letter-spacing: 0.05em; }
      .btn-text { font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; }
      .divider { fill: none; stroke: rgba(255,255,255,0.2); stroke-width: 2; }
      .icon { stroke: #FFFFFF; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; fill: none; }
    </style>
  </defs>
  <g id="Footer-Strip">
    <rect x="10" y="15" width="780" height="70" rx="35" class="bg" />
    <g id="Brand" transform="translate(40, 50)">
      <path d="M12 -8 L2 -3 L12 2 L22 -3 Z M2 7 L12 12 L22 7 M2 2 L12 7 L22 2" class="icon" transform="translate(0, -2)"/>
      <text x="35" y="7" class="text-white brand">SMART MOTOR</text>
      <line x1="230" y1="-10" x2="230" y2="15" class="divider" />
    </g>
    <g id="Contact" transform="translate(300, 50)">
      <text x="0" y="6" class="text-white contact">800 76278   |   smartmotor.ae</text>
    </g>
    <g id="CTA-Button" transform="translate(610, 27)">
      <rect x="0" y="0" width="160" height="46" rx="23" class="btn-bg" />
      <text x="80" y="28" class="text-white btn-text" text-anchor="middle">BOOK NOW</text>
    </g>
  </g>
</svg>"""

with open("Next-Steps/assets/social-graphics/impact-callout.svg", "w") as f: f.write(svg1)
with open("Next-Steps/assets/social-graphics/qr-badge.svg", "w") as f: f.write(svg2)
with open("Next-Steps/assets/social-graphics/tech-spec-badge.svg", "w") as f: f.write(svg3)
with open("Next-Steps/assets/social-graphics/footer-strip.svg", "w") as f: f.write(svg4)
print("SVGs created successfully!")
