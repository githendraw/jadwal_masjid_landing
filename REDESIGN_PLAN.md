# Jadwal Masjid Landing Page — Redesign Plan

> **Status:** Planning Phase (not yet implemented)
> **Tech Stack:** Next.js 15 + Tailwind CSS v4 + shadcn/ui + Framer Motion + Lucide Icons
> **Font:** DM Sans (primary) + JetBrains Mono (code/data)
> **Current Domain:** https://jadwalmasjid.com/

---

## Executive Summary

Redesign jadwalmasjid.com to be more visually premium, conversion-optimized, and emotionally resonant — positioning it as the go-to digital prayer schedule solution for mosques across Indonesia. The current page is functional but lacks visual wow-factor, clear trust signals, and compelling storytelling.

---

## 1. Customer Analysis (Jobs to Be Done + StoryBrand)

### Target User: DKM (Dewan Kemakamanan Masjid)
- **Role:** Person in charge of mosque operations (2-3 people, not tech-savvy)
- **Age:** 30-60 years old
- **Pain:** Manual schedule management, outdated display, unprofessional look

### The Job Statement
> "When the mosque needs a professional prayer schedule display, I want an automated system that works without daily setup, so I can focus on community service instead of technical maintenance."

### The StoryGap
- **Current state:** Manual schedule, inconsistent prayer times, basic LCD display
- **Desired state:** Automatic, accurate, beautiful TV display managed from one smartphone
- **Internal problem:** Feeling overwhelmed, embarrassed by outdated display, worried about accuracy
- **Villain:** "Complexity and manual effort"

### The One-Liner
> "We help mosque committees who struggle with manual prayer schedule management get an automatic, beautiful TV display managed from their smartphone so they can focus on serving the community."

---

## 2. Current Page Audit (Refactoring UI Lens)

### What Works ✅
- Dark theme with teal accent (good spiritual feel)
- Clear feature list
- Testimonials present
- WhatsApp CTA (local behavior)

### What Needs Improvement ❌
- **Hero section:** Weak headline hierarchy, no visual wow, missing compelling imagery
- **Visual hierarchy:** Everything competes for attention — no clear primary/secondary distinction
- **Spacing:** Too dense, sections feel cramped
- **Color:** Teal + red combo feels inconsistent; red CTA clashes with spiritual theme
- **Typography:** No modular scale, headings could be bolder
- **Social proof:** Testimonials are small and buried, not prominent enough
- **Trust signals:** Missing numbers, logos, certifications
- **CTA:** Only WhatsApp — no clear "free trial" or "get started" path
- **Animations:** Minimal motion design, page feels static
- **Imagery:** Generic TV mockup, no mosque context, no real-world usage photos

---

## 3. Redesign Goals

### Primary: Conversion
- Increase WhatsApp clicks by 40%
- Clearer value proposition above the fold
- Multiple CTA touchpoints throughout the page

### Secondary: Trust & Credibility
- Prominent social proof (numbers, testimonials)
- Professional visual identity
- Clear differentiation from "other prayer apps"

### Tertiary: Emotional Connection
- Spiritual warmth without being preachy
- Indonesian Muslim cultural context
- Professional yet approachable tone

---

## 4. New Page Structure (StoryBrand Wireframe)

```
┌─────────────────────────────────────────────────────┐
│  NAV: Logo + Menu (Fitur, Tampilan, Cara Pakai,    │
│       FAQ) + CTA "Hubungi Kami" (teal filled)       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. HERO — The Promise                             │
│     • Massive headline: "Jadwal Sholat Akurat"     │
│     • Subheadline with 3 trust bullets             │
│     • Hero image: Real mosque TV display           │
│     • CTA + WhatsApp floating                      │
│                                                     │
│  2. TRUST STRIP — Social Proof                     │
│     • "100+ Masjid" | "Sejak 2024" | "100% Gratis" │
│     • Animated counters                            │
│                                                     │
│  3. PROBLEM — The Villain                         │
│     • "Masalah yang Sering Terjadi"                │
│     • 3 pain points with illustrations             │
│     • Relatable, emotional                         │
│                                                     │
│  4. SOLUTION — Features (Bento Grid)              │
│     • Beautiful bento grid layout                  │
│     • Each card: icon + title + description        │
│     • Hover animations                             │
│                                                     │
│  5. SHOWCASE — Live Demo                          │
│     • Interactive prayer clock mockup              │
│     • Tabbed: Beranda TV | Mode Iqomah | Aplikasi │
│     • Animated transitions                         │
│                                                     │
│  6. HOW IT WORKS — 3 Steps                        │
│     • Step 1: Hubungi Kami                         │
│     • Step 2: Atur Pengaturan                      │
│     • Step 3: Scan QR ke TV                        │
│     • Numbered, visual, simple                     │
│                                                     │
│  7. TESTIMONIALS — Social Proof                   │
│     • Large quote cards                            │
│     • Real names, mosque locations                 │
│     • Star ratings                                 │
│     • Carousel or grid layout                      │
│                                                     │
│  8. FAQ — Accordion                               │
│     • Common questions                             │
│     • Smooth expand/collapse                       │
│                                                     │
│  9. CTA — Final Call                              │
│     • "Siap Tingkatkan Masjid Anda?"               │
│     • Large WhatsApp CTA                           │
│     • Urgency + failure stakes                     │
│                                                     │
│  10. FOOTER                                       │
│      • Clean 4-column layout                       │
│      • Brand, Produk, Support, Legal               │
│      • Social icons                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 5. Visual Design System

### Color Palette (Refactoring UI Principles)

**Primary:** Emerald/Teal (spiritual, Islamic feel)
```
emerald-50:  #ecfdf5  (backgrounds)
emerald-100: #d1fae5  (subtle highlights)
emerald-500: #10b981  (primary CTA, accents)
emerald-600: #059669  (hover states)
emerald-900: #064e3b  (dark backgrounds)
```

**Secondary:** Amber/Gold (warmth, Islamic gold)
```
amber-500: #f59e0b  (accents, highlights)
amber-400: #fbbf24  (subtle glows)
```

**Neutrals:** Cool grays (professional)
```
gray-900: #111827  (headings)
gray-700: #374151  (body text)
gray-500: #6b7280  (secondary text)
gray-300: #d1d5db  (borders, dividers)
gray-100: #f3f4f6  (backgrounds)
```

**Background:** Deep navy (current) → refined
```
bg-primary: #0a1a2e  (main background)
bg-secondary: #0f243d  (cards, sections)
bg-elevated: #153052  (elevated elements)
```

**Text:**
```
text-primary: #ffffff  (headings, primary text)
text-secondary: #94a3b8  (body, descriptions)
text-muted: #64748b  (labels, metadata)
```

### Typography Scale (1.25 ratio)

| Size | Use Case | Weight | Line Height |
|------|----------|--------|-------------|
| 48px (3rem) | Hero headline | 700 | 1.1 |
| 36px (2.25rem) | Section title | 700 | 1.2 |
| 24px (1.5rem) | Card title | 600 | 1.25 |
| 20px (1.25rem) | Subtitle | 500 | 1.4 |
| 16px (1rem) | Body text | 400 | 1.75 |
| 14px (0.875rem) | Small text | 400 | 1.5 |
| 12px (0.75rem) | Labels | 500, uppercase | 1.5 |

### Spacing Scale (4px base)

| Token | Value | Use Case |
|-------|-------|----------|
| `2` | 8px | Tight (icon + text) |
| `4` | 16px | Base (padding) |
| `6` | 24px | Section padding |
| `8` | 32px | Component gaps |
| `12` | 48px | Section separation |
| `16` | 64px | Page padding |

### Shadows

```
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
shadow-md: 0 4px 6px rgba(0,0,0,0.1)
shadow-lg: 0 10px 15px rgba(0,0,0,0.1)
shadow-xl: 0 20px 25px rgba(0,0,0,0.15)
```

---

## 6. New Components to Build

### A. Hero Section (Redesign)
- **Bigger headline** with gradient text effect
- **Trust bullets** under subheadline (3 items with check icons)
- **Better hero image** — mosque TV display in context (real mosque setting)
- **Animated entrance** — text fades in, image slides from right
- **Dual CTA** — Primary "Hubungi Kami" (filled teal) + Secondary "Lihat Demo" (ghost button)

### B. Trust Strip (NEW)
- **Animated counters** — "100+ Masjid" | "Sejak 2024" | "100% Gratis"
- **Subtle background** — dark gradient with emerald glow
- **Scroll-triggered animation** — counters animate on scroll

### C. Problem Section (NEW)
- **Title:** "Masalah yang Sering Terjadi"
- **3 pain points** with emoji/illustration:
  - Jadwal selalu salah → "Jadwal sholat tidak akurat"
  - Ribet setting → "Harus setting ulang setiap bulan"
  - Tampilan kaku → "Display TV masjid terlihat usang"
- **Emotional framing** — "Kita paham perasaan DKM yang..."

### D. Bento Grid Features (Redesign)
- **Modern bento layout** — asymmetric grid with varying card sizes
- **Each card:** Icon + title + description + hover effect
- **Gradient borders** on featured cards
- **Framer Motion** hover animations

### E. Interactive Prayer Clock (Enhance)
- **Keep existing** but improve visual design
- **Better mockup** — realistic TV frame with mosque name
- **Smooth tab transitions** between Beranda/Iqomah/HP
- **Real-time clock** animation

### F. Testimonials (Enhance)
- **Large quote cards** with mosque location badge
- **Star rating** (5 stars) on each testimonial
- **Grid layout** — 3 columns on desktop
- **Gradient card backgrounds** for visual interest

### G. CTA Section (Enhance)
- **Full-width section** with emerald gradient background
- **Failure stakes:** "Jangan biarkan jadwal sholat masjid Anda tetap manual..."
- **Large WhatsApp CTA** button with icon
- **Success picture:** "Bayangkan TV masjid menampilkan jadwal sholat yang akurat dan menarik..."

---

## 7. Animation Strategy (Hook Model + Refactoring UI)

### Scroll Animations
- **Fade in** — text sections as user scrolls
- **Slide up** — cards and feature items
- **Counter animation** — trust numbers counting up

### Micro-interactions
- **Hover** — cards lift with shadow increase
- **Click** — buttons scale down slightly
- **Tab transitions** — smooth cross-fade
- **FAQ accordion** — smooth expand/collapse

### Hero Animation Sequence
1. Page loads → headline fades in (0.5s)
2. Subtitle fades in (0.5s delay)
3. Hero image slides from right (0.8s delay)
4. CTA buttons appear (1s delay)

### Performance
- Use `framer-motion` for all animations
- `will-change: transform` for GPU-accelerated elements
- Reduced motion media query for accessibility

---

## 8. Content Strategy (StoryBrand Application)

### Headline Options (A/B Test)
1. "Jadwal Sholat Digital untuk TV Masjid" (current)
2. "Jadwal Sholat Akurat, Tampil di TV Masjid" (new)
3. "Satu HP, Semua TV Masjid Teratur" (new)

### Subheadline
> "Kelola jadwal sholat masjid dari smartphone. Update otomatis setiap hari, tampilan profesional di TV. Gratis untuk semua masjid."

### CTA Copy
- Primary: "Hubungi Kami via WhatsApp"
- Secondary: "Lihat Demo"
- Trust: "Gratis selamanya • Tanpa biaya tersembunyi • Support 24/7"

### StoryBrand Brand Script
```
Kita bantu DKM masjid yang merasa kewalahan dengan jadwal sholat manual 
untuk menampilkan jadwal yang akurat dan menarik di TV masjid 
dengan sistem otomatis yang dikelola dari smartphone, 
agar mereka bisa fokus pada pelayanan jamaah.
```

---

## 9. Implementation Priority

### Phase 1: Foundation (Week 1)
- [ ] Update color tokens in globals.css
- [ ] Update typography scale
- [ ] Build new Hero section
- [ ] Build Trust Strip

### Phase 2: Content (Week 2)
- [ ] Build Problem section
- [ ] Redesign Bento Grid Features
- [ ] Enhance Prayer Clock mockup
- [ ] Update How It Works

### Phase 3: Social Proof (Week 3)
- [ ] Redesign Testimonials
- [ ] Enhance CTA section
- [ ] Update FAQ accordion
- [ ] Build Footer

### Phase 4: Polish (Week 4)
- [ ] Add all scroll animations
- [ ] Add micro-interactions
- [ ] Test on mobile
- [ ] Performance optimization
- [ ] Deploy to production

---

## 10. Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| WhatsApp click rate | TBD | +40% | GA event tracking |
| Scroll depth | TBD | 80% | GA scroll tracking |
| Time on page | TBD | +25% | GA analytics |
| Mobile conversion | TBD | +30% | GA device tracking |

---

## 11. Accessibility Checklist (WCAG 2.1 AA)

- [ ] All text meets 4.5:1 contrast ratio
- [ ] Large text (18px+) meets 3:1 contrast ratio
- [ ] All interactive elements have focus states
- [ ] Reduced motion media query respected
- [ ] Screen reader labels on all icons
- [ ] Semantic HTML structure
- [ ] Alt text on all images

---

## 12. Ethical Considerations

- [ ] No dark patterns or deceptive UI
- [ ] No fear-mongering in failure stakes
- [ ] Honest claims (100% gratis = truly free)
- [ ] Testimonials are real and verifiable
- [ ] User data handled transparently
- [ ] Clear privacy policy

---

## Appendix: Competitive Analysis

### Competitors (Non-Obvious)
1. **Manual LCD display** — cheap but requires manual updates
2. **Generic digital signage** — not mosque-specific, no prayer times
3. **Basic prayer apps** — phone only, no TV display
4. **DIY solution** — custom script + Raspberry Pi

### Our Differentiation
- **Accuracy:** Kemenag + MWL calculation methods
- **Automation:** Auto-update daily schedules
- **Multi-TV:** One phone controls multiple TVs
- **Offline safe:** 30-day cache, works without internet
- **Free:** 100% gratis untuk semua masjid
