# Typography Guidelines & Font Usage

This document outlines how typography should be implemented across different development environments (Web, Flutter, etc.) for Smart Motor, ensuring brand consistency.

## 1. Core Brand Fonts
Our typography stack relies on clean, modern, and highly legible fonts that support both English (LTR) and Arabic (RTL) natively.

### Primary English Font Stack
- **Inter** (Primary Sans-Serif)
- **Segoe UI** (Windows Native Fallback)
- **Roboto** (Android Native Fallback)
- **San Francisco / -apple-system** (Apple Native Fallback)

### Primary Arabic Font Stack
- **Noto Sans Arabic** (Modern, readable for UI)
- **Tajawal** (Elegant, used for headings & marketing)
- **Noto Kufi Arabic** (Structured, geometric alternative)

---

## 2. Web Development (React / Next.js / HTML)

### Connecting via Google Fonts (CDN)
For standard web projects, place this in the `<head>` of your HTML or `_document.tsx` / `layout.tsx`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&family=Noto+Kufi+Arabic:wght@100..900&family=Noto+Sans+Arabic:wght@100..900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet">
```

### CSS Implementation
```css
/* English Primary */
.font-inter {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Arabic Modern UI */
.noto-sans-arabic {
  font-family: "Noto Sans Arabic", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

/* Arabic Headings */
.tajawal-bold {
  font-family: "Tajawal", sans-serif;
  font-weight: 700;
  font-style: normal;
}
```

### Next.js Native Optimization (Recommended for Performance)
In Next.js, use `next/font/google` instead of the CDN for zero layout shift:
```tsx
import { Inter, Noto_Sans_Arabic, Tajawal } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const notoSansArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-noto-arabic' })
const tajawal = Tajawal({ weight: ['400', '700', '900'], subsets: ['arabic'], variable: '--font-tajawal' })
```

---

## 3. Mobile Development (Flutter)

Apps built with Flutter can directly access almost all fonts from Google Fonts through the `google_fonts` package.

**1. Add Dependency (`pubspec.yaml`):**
```yaml
dependencies:
  google_fonts: ^6.1.0
```

**2. Import the Package:**
```dart
import 'package:google_fonts/google_fonts.dart';
```

**3. Global Theme Application:**
```dart
ThemeData(
  // For Arabic UI
  textTheme: GoogleFonts.notoSansArabicTextTheme(),
)
// OR
ThemeData(
  // For English UI
  textTheme: GoogleFonts.interTextTheme(),
)
```

**4. Single Widget Application:**
```dart
Text(
  'مرحبا بكم في سمارت موتور',
  style: GoogleFonts.tajawal(
    fontWeight: FontWeight.w700,
    fontSize: 24,
  ),
),
```

### Advanced: Flutter Variable Fonts (Local Assets)
If you download the fonts locally to your `/assets/fonts/` directory, you can configure variable weights precisely:

```dart
TextStyle(
  fontFamily: 'Noto Sans Arabic',
  fontSize: 18,
  fontVariations: [
    FontVariation('ital', 0),
    FontVariation('wdth', 100),
    FontVariation('wght', 700) // 100 to 900
  ],
)
```

---

## 4. Offline / Edge Generation (e.g. Open Graph Images)
When generating graphics on edge servers (like our `api/og` route), you cannot use a CDN. You must:
1. Store the `.ttf` files locally in your repository (e.g., `/public/fonts/`).
2. Read the file into an ArrayBuffer.
3. Pass the raw font data into the rendering engine.

*Refer to `src/app/api/og/route.tsx` for the live implementation of this utilizing the Inter font.*
