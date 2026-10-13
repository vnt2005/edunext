---
name: EduNext
description: Cửa hàng khóa học và không gian học tập dành cho người học.
colors:
  forest-ink: "#123C38"
  forest: "#134E4A"
  teal-primary: "#0F766E"
  orange-action: "#C2410C"
  orange-action-hover: "#9A3412"
  warm-paper: "#FBFAF5"
  paper-green: "#F0F5EF"
  mint-soft: "#CCFBF1"
  border-soft: "#D7E2D8"
typography:
  display:
    fontFamily: "Space Grotesk, Be Vietnam Pro, sans-serif"
    fontSize: "clamp(2.6rem, 4.5vw, 4.1rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Be Vietnam Pro, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  control: "8px"
  media: "12px"
spacing:
  section: "76px"
  grouped: "16px"
  inline: "8px"
components:
  button-primary:
    backgroundColor: "{colors.orange-action}"
    textColor: "#FFFFFF"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  button-secondary:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.forest}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

## Overview

EduNext is a Vietnamese course marketplace. The public website helps visitors discover course outlines, understand which programs are ready, and reach the course, cart, and learner journeys. The visual direction is a learning field guide: editorial, calm, practical, and focused on the material being learned.

## Colors

Keep the existing forest green, teal, mint, and orange identity. Use forest ink for headings, teal for navigational emphasis, orange for the primary action, warm paper for broad reading surfaces, and white for course and form areas. Preserve contrast; colored surfaces use text tinted for that surface rather than default gray.

## Typography

Use Space Grotesk for display headings and Be Vietnam Pro for Vietnamese body text and controls. Headlines are confident and compact; body copy is readable with a comfortable measure. Remove repetitive eyebrow labels and avoid using accent color as a substitute for hierarchy.

## Layout

The public header stays compact and single-row on desktop; mobile navigation collapses with a real menu control. The homepage uses a split editorial hero, a topic rail, one featured course plus a line-based course index, unboxed domain links, a concise learning sequence, a lead article with a reading list, and a plain FAQ. Other pages use stable left-aligned headings, clear main content, and responsive filters.

## Elevation & Depth

Use borders and tonal surfaces first. Reserve subtle offset shadows for elevated items that truly overlap content. Do not add glass effects, decorative blur, or stacked box shadows.

## Shapes

Prefer restrained corner radii: 8px for controls, 10–12px for media and relevant product cards. Use line separators and proximity for hierarchy instead of wrapping every section in a rounded card.

## Components

Primary buttons are orange with white text. Secondary actions are white with forest text and a green border. Search remains in the global header only. Course cards/rows show real catalog fields and honest readiness state; no fabricated ratings, learner counts, or testimonials. All navigation, course, cart, and learner paths must retain working routes and keyboard focus.

## Do's and Don'ts

- Do use real course/catalog content and actual route destinations.
- Do keep the public storefront and learner experience distinct from WordPress administration.
- Do use one primary action at a time and keep the heading hierarchy visible without eyebrow labels.
- Don't add a teacher/admin area to public navigation.
- Don't repeat the search control in the hero.
- Don't make every homepage section a grid of identical cards.
- Don't use emoji, Unicode arrows as primary icons, fake metrics, or decorative gradients.
