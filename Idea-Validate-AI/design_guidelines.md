# AI Cofound Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern SaaS productivity tools (Linear, Notion, Stripe Dashboard) that excel at presenting complex information clearly while maintaining visual sophistication. The design balances professional credibility with approachable usability for entrepreneurs.

## Core Design Principles

1. **Clarity First**: Information hierarchy guides users through validation insights
2. **Progressive Disclosure**: Start simple (input form), then reveal comprehensive reports
3. **Data Visualization**: Transform analysis into scannable, actionable formats
4. **Trust Building**: Professional polish signals reliable business insights

---

## Typography System

**Primary Font**: Inter (via Google Fonts CDN)
- Headings: 600-700 weight
- Body: 400-500 weight
- Data/Numbers: 500-600 weight (tabular figures)

**Scale**:
- Page Title: text-4xl (36px)
- Section Headers: text-2xl (24px)
- Card Titles: text-lg (18px)
- Body Text: text-base (16px)
- Captions/Labels: text-sm (14px)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12, 16, 20
- Component padding: p-6 or p-8
- Section spacing: space-y-8 or space-y-12
- Card gaps: gap-6
- Container max-width: max-w-7xl

**Grid Structure**:
- Landing page: Full-width sections with centered max-w-6xl content
- Dashboard: Sidebar (w-64) + main content area
- Report sections: Single column on mobile, 2-column grid (lg:grid-cols-2) for features/competitors

---

## Component Library

### Landing Page Components

**Hero Section** (min-h-[600px]):
- Clean gradient background (no image - keeps focus on value prop)
- Centered layout with compelling headline and subheadline
- Prominent CTA: "Validate Your Idea" with secondary "See Example Report"
- Trust indicator: "Join 1,000+ founders validating their ideas"

**How It Works** (3-column grid on desktop):
- Icon cards showing: 1) Enter Idea → 2) AI Analysis → 3) Get Report
- Each card includes icon (Heroicons), title, brief description
- Use gap-8 between cards

**Example Report Preview**:
- 2-column layout showing sample insights
- Left: Mock competitor cards | Right: Mock lean canvas sections
- Demonstrates value before signup

**Social Proof**:
- 3-column testimonial grid
- Include founder name, startup name, brief quote
- Avatar placeholder circles

**CTA Section**:
- Full-width with gradient background
- Centered content: headline + CTA button + supporting text
- Example: "Ready to validate your startup idea in 60 seconds?"

**Footer**:
- 3-column layout: Product links | Resources | Contact
- Newsletter signup field with inline button
- Social links and copyright

### Dashboard/App Components

**Input Form** (Landing state):
- Card-based layout (max-w-2xl centered)
- Large textarea (h-40) with placeholder: "Describe your startup idea..."
- Example prompts below: "e.g., A mobile app that helps remote teams..."
- Primary button: "Generate Validation Report"
- Loading state: Progress indicator with AI analysis steps

**Report Dashboard**:
- Sticky sidebar navigation (left, w-64) with section jump links
- Main content area with sequential report sections
- Export PDF button (top right, secondary style)

**Target Customers Section**:
- 2-3 customer segment cards in grid
- Each card: Segment name, demographics list, pain points (bullet list)
- Use subtle borders and rounded corners (rounded-lg border)

**Market Overview**:
- Stats bar: 3-column grid showing TAM, Growth Rate, Key Trend
- Each stat: Large number (text-3xl), label below (text-sm)
- Opportunities list with check icons

**Competitor Analysis**:
- Horizontal cards (3-5 competitors)
- Each card: Company name, positioning statement, 2-3 strengths
- Comparison table format for easy scanning

**Lean Canvas**:
- Visual grid layout (2x5 or custom arrangement)
- Each canvas block: Label header + content area
- Distinct visual separation between blocks (borders/spacing)

**MVP Roadmap**:
- Timeline visualization (vertical on mobile, horizontal on desktop)
- Week markers with milestone cards
- Each milestone: Tasks list, deliverables, success metrics
- Use connector lines between weeks

**Navigation**:
- Top nav: Logo left, "New Validation" button right
- Report sidebar: Auto-generated section links, progress indicator

---

## Icons

**Library**: Heroicons (outline style via CDN)
- Navigation: arrow-right, document-text, chart-bar
- Features: lightbulb, users, target, rocket
- Report sections: user-group, globe, building-office, map, calendar

---

## Interactive Elements

**Buttons**:
- Primary: Large (px-8 py-4), rounded-lg, prominent
- Secondary: Outlined style, same size
- Text links: Underline on hover

**Cards**:
- Consistent padding (p-6)
- Subtle shadow (shadow-sm)
- Hover state: Slight shadow increase (hover:shadow-md)
- Rounded corners (rounded-lg)

**Form Inputs**:
- Full width, comfortable height (h-12 for inputs, h-40 for textarea)
- Rounded borders (rounded-md)
- Clear focus states

---

## Responsive Behavior

- Mobile: Single column, stacked sections, compressed spacing (p-4, space-y-6)
- Tablet: 2-column grids, moderate spacing (p-6, space-y-8)
- Desktop: Full layout with sidebars, generous spacing (p-8, space-y-12)

---

## Images

**Hero Section**: No large hero image - uses clean gradient background to maintain focus on the value proposition and CTA.

**Example Report Preview Section**: Optional screenshot mockup of a sample validation report (placed as desktop mockup with shadow) to show users what they'll receive.

**Testimonial Section**: Circular avatar placeholders for founder photos (use div with initials as fallback).

All images should use rounded corners (rounded-lg for cards, rounded-full for avatars) and subtle shadows for depth.