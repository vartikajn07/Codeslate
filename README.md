# Codeslate

A modern web app to generate, customize, and share aesthetic code snippet images.
[codeslate-bice.vercel.app](https://codeslate-bice.vercel.app/)

## 🚀 Overview

Codeslate is a beautiful code snapshot generator built with the latest Next.js stack. It allows users to:

- Paste or write code in any popular languages.
- Customize syntax highlighting, themes, font, padding, and backgrounds (including Unsplash image support)
- Export high-quality PNGs or copy shareable links
- Create pixel-perfect code visuals for social media, blogs, portfolios, or presentations

## 🛠️ Tech Stack

| Tech             | Purpose                                        |
|------------------|------------------------------------------------|
| **Next.js 14**   | React-based framework with App Router          |
| **TypeScript**   | Type-safe development                          |
| **Tailwind CSS** | Utility-first styling                          |
| **shadcn/ui**    | Beautifully designed UI components             |
| **Zustand**      | Lightweight global state management            |
| **Supabase**     | Asset hosting, storage, and URL generation     |
| **Unsplash API** | Random high-quality background images          |
| **Framer Motion**| Smooth animations and transitions              |

## 📦 Features

- 🌈 **Theme Customization**  
  Choose from multiple themes, syntax highlighting styles, and background settings.

- 🖼️ **Unsplash Integration**  
  Add beautiful backgrounds pulled directly from the Unsplash API.

- 🧠 **State Management with Zustand**  
  Customization state (theme, language, padding, etc.) is globally managed and persistent across sessions.

- 📤 **Image Export & Share**  
  Export snippets as transparent or styled PNGs. Upload to Supabase for generating shareable URLs.

- 📋 **Clipboard Copy**  
  One-click copy of the generated image link to share on socials or blogs.

## 🔐 Environment Variables

Make sure to set the following variables in a .env.local file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
```
Note: Never expose your Supabase service_role or Unsplash secret key on the client side.

## 🧪 Local Development

Clone and run locally:
```bash
git clone https://github.com/vartikajn07/Codeslate.git
cd codeslate
npm install
npm run dev
```
Visit http://localhost:3000

## 📚 Learnings & Challenges

- Managing canvas-to-PNG export with transparent background required careful use of html2canvas
- Zustand offered surprisingly elegant control over state without boilerplate
- Supabase’s public bucket URL generation was simple yet powerful
- Styling consistency across shadcn/ui and Tailwind required some overrides

## 🧠 Future Improvements

- Add support for more export formats (SVG, PDF)
- Enable user login to save previous snippets
