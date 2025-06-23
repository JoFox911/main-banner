GH Pages https://jofox911.github.io/main-banner/

## Main Banner – Vue 3 Animated Landing Component
This project is a modular, scalable Vue 3 component system built around a dynamic animated landing banner with multilingual support, responsive layout, and reusable UI elements. It’s ideal for integrating into modern single-page applications (SPAs) with a focus on clean UX, animation, and i18n readiness.

## ✨ Features
🎞 Lottie-based animations with language and theme variants
🌐 Internationalization (i18n) with English and Ukrainian support
🎛 Language toggle switch bound to vue-i18n locale
💎 Reusable UI components: toggle, button, lottie player
📦 Scoped SCSS styles with variables and mixins
📁 Clean project structure by responsibility and feature domain
🧠 Composable pattern (useLocale()) for centralized language logic

## 🧱 Tech Stack
Vue 3 + TypeScript
SCSS Modules (BEM + responsive mixins)
vue-i18n@9 – Composition API mode
Lottie animations (JSON-based)

## 📁 Project Structure Highlights
src/
├── components/
│   ├── Banner/            → MainBanner, BannerContent, + local animations
│   ├── Language/          → LanguageToggle
│   └── ui/                → UiButton, UiToggle, UiLottie (shared atom components)
├── composables/           → useLocale (i18n logic abstraction)
├── locales/               → en.json, uk.json (translations)
├── assets/styles/         → _mixins.scss, _variables.scss, base.scss, main.scss
├── types/                 → Data.ts (typed enums like ButtonColor)

## 🖱 Interactive Reveal Effect (Hover-Driven)

The main banner implements a layered design using **two visually distinct `MainBannerContent` components**, stacked on top of each other. The top layer (white or transparent) is revealed selectively based on user interaction:

### Desktop (Mouse Interaction):

- On mouse enter, a **circular spotlight effect** expands outward from the cursor.
- The effect is driven by `clip-path: circle(var(--r) at var(--x) var(--y))`, with coordinates and radius updated via `requestAnimationFrame`.
- The radius increases until fully expanded or user moves away.
- Mousemove updates are **throttled via RAF**, and all listeners are removed once the animation completes.

### Mobile (Touch Devices):

- The top layer is automatically revealed after a short delay.
- Coordinates are set to the center (`--x: 0px; --y: 0px`) and radius expands to full width.

🎯 This design creates an intuitive and elegant feel — as if content is being “peeled open” or revealed dynamically — without heavy animation frameworks.

## 🌐 i18n Behavior
The current language is stored in localStorage, with a reactive toggle component (LanguageToggle.vue) bound to vue-i18n. On switching:

EN → shows English animation and UI text

UK → shows Ukrainian animation and translations