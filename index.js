export const C = {
  // Applied working tints
  whitepaper: "#FFFFFB", // --sm-whitepaper · pages and modal backgrounds (Vandelay, Moodboard)
  washi:  "#F4F5F2",   // --sm-washi  · page backgrounds (websites); box/list/table bg (Vandelay)
  sumi:   "#16201A",   // --sm-sumi   · default body text, dark surfaces
  slate:  "#48514A",   // --sm-slate  · muted labels
  ash:    "#8B948C",   // --sm-ash    · text on dark backgrounds
  // Monochrome base
  stone:  "#DDE0DB",   // --sm-stone  · dividers, hover states
  // Accent
  midori: "#2F4B3A",   // --sm-midori · single accent, use sparingly
  // Surfaces
  white:   "#FFFFFF",  // --sm-white · pure white · video-bleed section bg, text on video/dark
  imgPlaceholder: "#f0efed", // --sm-imgplaceholder · skeleton bg behind loading imagery
  hairline:"rgba(22,32,26,.12)", // --sm-hairline · sumi at 12% — control/hairline borders
}

// Translucent overlays. Kept as literals here (the single source) so every
// hover state, scrim, and on-video text value propagates from one place.
export const OVERLAY = {
  hoverDark:    "rgba(0,0,0,0.05)",     // transparent button on a light surface, hover
  hoverLight:   "rgba(255,255,255,0.1)",// transparent button on video/dark, hover
  solidHover:   "rgba(72,81,74,0.85)",  // filled (primary) button background, hover — slate at 85%
  textOnVideo:  "rgba(255,255,255,0.82)",// caption/body text over video or imagery (--c-on-video)
  borderOnDark: "rgba(255,255,255,0.1)",// hairline divider on dark surfaces (footer)
  scrimHero:    "linear-gradient(to top,rgba(0,0,0,.6) 0%,rgba(0,0,0,.05) 60%,transparent 100%)", // hero video scrim
}

// Status colours — the only hues outside the monochrome + midori palette above.
// A single-accent palette cannot make six states tellable apart at a glance, which
// is what Vandelay's status dots and pills have to do, so these exist as a separate
// axis rather than being forced onto C.
//
// Named by the role a state plays, never by the status that currently wears it: the
// same colour serves more than one status in more than one map (idle is both
// Playmaker "not sent" and an alteration "pending"), and the mapping itself belongs
// to the consumer — STATUS_DOT, PLAYMAKER_STATUSES and ALTERATION_STATUSES in
// Vandelay's lib/utils.js. That file sits below ds.js in the import graph and so
// cannot reach ds.js's semantic colours; it reads this package directly instead.
//
// Not mirrored as --sm-* custom properties: every consumer is a JS inline style,
// same as OVERLAY above.
export const STATUS = {
  empty:       "#CCCCCC", // no state recorded yet
  idle:        "#AAAAAA", // awaiting an action that has not started
  provisional: "#C8A96E", // early, not yet committed to
  attention:   "#7B5EA7", // active and needing someone to act
  resolved:    "#3D463F", // handed off — sumi's cooler sibling
  archived:    "#C8C4BC", // closed out, deliberately low-contrast
}

// Functional colours — meaning-bearing, and deliberately not part of the brand
// palette: a suit brand's palette should not have to own "this went wrong". They
// live here rather than in a consumer for the same reason STATUS does — Vandelay's
// lib/utils.js needs them and cannot import its own ds.js, which is where all three
// used to live and where they are still re-exported under their existing names.
//
// `muted` doubles as a status colour (Vandelay's STATUS_DOT "In Studio") but is not
// in STATUS above, because it also marks non-status things — the manual-trigger dots
// in Settings' audit log — and would be the only entry there serving both.
export const FUNCTIONAL = {
  danger:  "#c0392b",  // error, overdue, destructive
  warning: "#B07D3A",  // caution, in-progress, genuine warnings only
  muted:   "#9C9890",  // muted neutral
}

// Font weights — single source for the numeric weights mirrored by the --fw-* CSS
// custom properties below. JS consumers (inline styles) read FW.*; CSS reads var(--fw-*).
export const FW = {
  light:    300,
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
}

export const F = {
  serif: "'Marcellus', serif",
  sans:  "'Marcellus', serif",
  body:  "'Be Vietnam Pro', sans-serif",
  mono:  "'Be Vietnam Pro', sans-serif",
}

// Google Fonts URL, built from the Be Vietnam Pro weights a given medium needs.
// Marcellus ships a single weight, so it never takes a wght axis.
const gfHref = (bodyWeights) =>
  `https://fonts.googleapis.com/css2?family=Marcellus&family=Be+Vietnam+Pro:wght@${bodyWeights.join(";")}&display=swap`

// The web needs only 300 — every role in TY is weight 300 or uses Marcellus.
// Email needs 600 as well: template bodies support **bold**, which renders <strong>.
// Inside 300-weight copy CSS resolves <strong> to weight 400, and with only 300
// available the browser picks that same face, so the emphasis is invisible (measured:
// identical advance width). Emails therefore load 600 AND set it explicitly via
// EMAIL_FW_BOLD — relying on <strong>'s default `bolder` is not enough.
export const EMAIL_FONTS_HREF = gfHref([300, 600])
export const EMAIL_FW_BOLD = "600"

// ── Raw type scale ────────────────────────────────────────────────────────────
// THE single numeric source for typography. Everything downstream is generated
// from these numbers: the --fs-*/--ls-*/--lh-* custom properties below, the
// email scale (EMAIL_TY) and the print scale (PDF_TY).
//
// Never hand-write a size, letter-spacing or line-height anywhere else — a
// consumer that can't read CSS custom properties (email clients, react-pdf)
// must import EMAIL_TY/PDF_TY rather than copying literals, which is how the
// scales silently drifted apart before.
//
// fs values are px, one per breakpoint: [desktop, <=1440px, <=768px].
export const SCALE = {
  fs: {
    display:   [58, 48, 40],
    headingl:  [48, 42, 38],
    headingm:  [30, 30, 30],
    headings:  [22, 22, 22],
    headingxs: [18, 18, 18],
    bodyl:     [22, 20, 20],
    body:      [19, 17, 17],
    bodys:     [15, 14, 14],
    bodyxs:    [13, 12, 12],
    link:      [15, 14, 14],
    caps:      [12, 11, 11],
    button:    [11, 10, 10],
    navbar:    [16, 14, 14],
    navlabel:  [14, 14, 14],
    quote:     [20, 18, 16],
  },
  ls: {
    heading:    "-0.02em",
    caps:       "0.16em",
    story:      "0.12em",
    display:    "0.01em",
    subheading: "-0.005em",
  },
  lh: {
    story: 1.05, heading: 1.08, "heading-s": 1.25, "body-l": 1.4, body: 1.8,
    flat: 1, display: 1.04, tight: 1.2, snug: 1.3, normal: 1.5,
    relaxed: 1.6, loose: 1.7, airy: 1.9,
  },
}

// Breakpoint index used by the non-CSS scales. Email and print render at one
// fixed size, and the <=1440px step is the closest match to how mail clients
// lay out an 800px card.
const FIXED_BP = 1

const fsVars = (i) => Object.entries(SCALE.fs).map(([k, v]) => `--fs-${k}:${v[i]}px`).join(";")
const lsVars = Object.entries(SCALE.ls).map(([k, v]) => `--ls-${k}:${v}`).join(";")
const lhVars = Object.entries(SCALE.lh).map(([k, v]) => `--lh-${k}:${v}`).join(";")

// Type roles reference the --ls-*/--lh-* custom properties (defined in typographyCSS)
// rather than raw literals, so the type scale has a single source. ty() is consumed
// only in DOM inline styles, where var() resolves; PDFs/emails don't use it.
export const TY = {
  display:   { font: F.serif, size: "var(--fs-display)",  weight: "400", ls: "var(--ls-display)",    lh: "var(--lh-display)"  },
  headingL:  { font: F.sans,  size: "var(--fs-headingl)", weight: "400", ls: "var(--ls-heading)",    lh: "var(--lh-snug)"     },
  headingM:  { font: F.sans,  size: "var(--fs-headingm)", weight: "400", ls: "var(--ls-subheading)", lh: "var(--lh-snug)"     },
  quote:     { font: F.sans,  size: "var(--fs-quote)",    weight: "400", ls: "var(--ls-subheading)", lh: "var(--lh-body)"     },
  headingS:  { font: F.sans,  size: "var(--fs-headings)", weight: "400", ls: "var(--ls-subheading)", lh: "var(--lh-snug)"     },
  headingXS: { font: F.sans,  size: "var(--fs-headingxs)", weight: "400", ls: "var(--ls-subheading)", lh: "var(--lh-snug)"     },
  caps:      { font: F.mono,  size: "var(--fs-caps)",     weight: "300", ls: "var(--ls-caps)",       lh: "var(--lh-body)",    up: true },
  navLabel:  { font: F.body,  size: "var(--fs-navlabel)", weight: "300", ls: "0",                     lh: "var(--lh-body)",    up: true },
  button:    { font: F.mono,  size: "var(--fs-button)",   weight: "300", ls: "var(--ls-caps)",       lh: "var(--lh-body)",    up: true },
  navbar:    { font: F.body,  size: "var(--fs-navbar)",   weight: "300", ls: "0",                     lh: "var(--lh-body)"     },
  bodyL:     { font: F.body,  size: "var(--fs-bodyl)",    weight: "300", ls: "0",                     lh: "var(--lh-normal)",  color: "var(--c-body)" },
  body:      { font: F.body,  size: "var(--fs-body)",     weight: "300", ls: "0",                     lh: "var(--lh-normal)",  color: "var(--c-body)" },
  bodyS:     { font: F.body,  size: "var(--fs-bodys)",    weight: "300", ls: "0",                     lh: "var(--lh-normal)",  color: "var(--c-body)" },
  bodyXS:    { font: F.body,  size: "var(--fs-bodyxs)",   weight: "300", ls: "0",                     lh: "var(--lh-normal)",  color: "var(--c-body)" },
  link:      { font: F.body,  size: "var(--fs-link)",     weight: "300", ls: "0",                     lh: "var(--lh-normal)",  color: "var(--c-body)" },
}

// Body roles read --c-body rather than --c-primary. --c-body defaults to sumi
// and is flipped to slate by any surface painted white or whitepaper, so the
// background decides the colour instead of each call site. See BODY_ON_PAPER.
export function ty(k, extra = {}) {
  const s = TY[k]
  return {
    fontFamily: s.font, fontSize: s.size, fontWeight: s.weight,
    letterSpacing: s.ls, lineHeight: s.lh, color: s.color || "var(--c-primary)",
    textTransform: s.up ? "uppercase" : "none", ...extra,
  }
}

// The inline-style form of the rule below, for consumers that paint a white or
// whitepaper surface with a JS style object rather than a class:
//   style={{ background: C.whitepaper, ...BODY_ON_PAPER }}
// Every body/link descendant then resolves to slate without touching its colour.
export const BODY_ON_PAPER = { "--c-body": C.slate }
export const BODY_ON_TINT  = { "--c-body": C.sumi }

// ── Email scale ───────────────────────────────────────────────────────────────
// Email clients can't resolve CSS custom properties (Outlook's Word engine has
// no support at all), so these are literal values resolved at build time from
// SCALE. Import these instead of hand-writing px in any email builder.
//
// `quote` is the one role genuinely declared here rather than derived. It is a
// display element, not part of the running body scale: the newsletter banner sets it
// larger than FIXED_BP would give and with its own tracking. It previously read
// SCALE.fs.quote[0], which looked derived but silently ignored the breakpoint every
// other role uses — editing quote[1] changed nothing in email, while editing quote[0]
// for the website moved the newsletter banner.
// `heading` is weight 400 on purpose: only Marcellus 400 is ever loaded (see the
// @import in typographyCSS), so any heavier weight is synthesised by the client
// into a faux-bold that doesn't exist in the typeface.
export const EMAIL_TY = {
  heading: { font: F.serif, size: `${SCALE.fs.headings[FIXED_BP]}px`, weight: "400", ls: "0",           lh: `${SCALE.lh.tight}` },
  caps:    { font: F.mono,  size: `${SCALE.fs.caps[FIXED_BP]}px`,     weight: "300", ls: SCALE.ls.caps, lh: `${SCALE.lh.body}`, up: true },
  body:    { font: F.body,  size: `${SCALE.fs.body[FIXED_BP]}px`,     weight: "300", ls: "0",           lh: `${SCALE.lh.body}` },
  bodyS:   { font: F.body,  size: `${SCALE.fs.bodys[FIXED_BP]}px`,    weight: "300", ls: "0",           lh: `${SCALE.lh.body}` },
  bodyXS:  { font: F.body,  size: `${SCALE.fs.bodyxs[FIXED_BP]}px`,   weight: "300", ls: "0",           lh: `${SCALE.lh.normal}` },
  button:  { font: F.mono,  size: `${SCALE.fs.caps[FIXED_BP]}px`,     weight: "300", ls: SCALE.ls.caps, lh: `${SCALE.lh.body}`, up: true },
  quote:   { font: F.serif, size: "20px",                             weight: "400", ls: "-0.04em",     lh: `${SCALE.lh.body}` },
}

// Renders an EMAIL_TY role as an inline CSS declaration string, for splicing
// into a style="" attribute. `color` is passed per call because the same role
// appears in both primary and muted colours depending on context.
export function emailTy(k, color) {
  const s = EMAIL_TY[k]
  if (!s) throw new Error(`emailTy: unknown role "${k}"`)
  return `font-family:${s.font};font-size:${s.size};font-weight:${s.weight};`
    + (s.ls !== "0" ? `letter-spacing:${s.ls};` : "")
    + (s.up ? "text-transform:uppercase;" : "")
    + `line-height:${s.lh};`
    + (color ? `color:${color};` : "")
}

// ── Print scale ───────────────────────────────────────────────────────────────
// react-pdf measures in points, not px, and has no CSS custom properties. The
// web scale would render far too large on paper, so print is its own declared
// scale rather than a derivation. `font` values must match the names passed to
// Font.register() in the consuming app.
export const PDF_FONTS = {
  serif: "Marcellus",
  body:  "BeVietnamPro",
}

// Be Vietnam Pro is registered in two weights for print. The web only ever loads
// 300, but PDFs have no other way to mark emphasis — react-pdf can't synthesise a
// bold, so a real face has to be registered.
export const PDF_FW = { regular: 300, bold: 600 }

// Paper is white, so the body-colour rule applies here too: body copy is slate,
// headings stay sumi. react-pdf has no cascade and no custom properties, so the
// colour is declared on the role rather than inherited from a surface.
export const PDF_TY = {
  h1:    { font: PDF_FONTS.serif, size: 22, ls: 0, color: C.sumi },
  h2:    { font: PDF_FONTS.serif, size: 11, ls: 0, color: C.sumi },
  body:  { font: PDF_FONTS.body,  size: 9,  ls: 0, color: C.slate },
  sub:   { font: PDF_FONTS.body,  size: 9,  ls: 0, color: C.slate },
  label: { font: PDF_FONTS.body,  size: 8,  ls: 1, color: C.slate, up: true },
  small: { font: PDF_FONTS.body,  size: 8,  ls: 0, color: C.slate },
}

// Renders a PDF_TY role as a react-pdf style object.
export function pdfTy(k, extra = {}) {
  const s = PDF_TY[k]
  if (!s) throw new Error(`pdfTy: unknown role "${k}"`)
  return {
    fontFamily: s.font, fontSize: s.size, color: s.color,
    ...(s.ls ? { letterSpacing: s.ls } : {}),
    ...(s.up ? { textTransform: "uppercase" } : {}),
    ...extra,
  }
}

export const SPACE = {
  1: "4px", 2: "8px", 3: "12px", 4: "16px",
  5: "24px", 6: "32px", 7: "48px", 8: "64px",
  9: "80px", 10: "120px", 11: "160px", 12: "240px",
}

export const BP = {
  sm:  "480px",
  md:  "768px",
  lg:  "1024px",
  xl:  "1280px",
  xxl: "1440px",
}

export const RADIUS = {
  none: "0",
  sm:   "2px",
  md:   "4px",
  full: "9999px",
}

export const DIVIDER = {
  color:  C.stone,
  weight: "1px",
  style:  "solid",
}

export const MOTION = {
  fast:    "120ms ease",
  base:    "200ms ease",
  slow:    "400ms ease",
  spring:  "300ms cubic-bezier(0.34, 1.56, 0.64, 1)",
  easeOut: "cubic-bezier(.25,.46,.45,.94)",
}

// ─── Buttons ──────────────────────────────────────────────────────────────────
// Every button in the brand resolves its styling from here: Vandelay's Btn and
// PortalBtn, the marketing site's Btn, and the landing splash. Each app used to
// carry its own copy and they drifted — the website's filled button was sumi
// while Vandelay's was slate, padding differed by 2px, hover ran at .25s against
// Vandelay's 150ms, and the website never grew to the mobile tap target.
//
// The filled variant is `black` by name and slate by value. Sumi is reserved for
// text and dark surfaces; a sumi fill reads as a dark surface rather than as a
// control, which is why Vandelay moved its buttons onto slate.
export const BTN = {
  radius:       RADIUS.sm, // 2px — same as every other control
  height:       36,        // compact (`small`) desktop height, = form-control height
  heightMobile: 44,        // minimum comfortable tap target
  pad: {
    small:   "0 12px",     // paired with `height`, so it sits level beside an input
    regular: "12px 32px",
    large:   "11px 32px",  // marketing hero/video CTAs — bodyS type, not caps
  },
  transition:      "background 150ms ease, transform 150ms ease",
  hoverScale:      "scale(1.02)",
  restScale:       "scale(1)",
  disabledOpacity: 0.5,
}

// Variant colour sets. Consumers read `.hover` themselves to wire mouseenter /
// mouseleave — btnStyle() returns the rest state only, since a hover written into
// the style object would need a re-render to leave.
//
// Functional variants (destructive, and the portal's ghost) are app-local: they
// extend this table rather than living in it, because the danger colour is not
// part of the brand palette.
export const BTN_VARIANT = {
  black:        { bg: C.slate,       hover: OVERLAY.solidHover,  fg: C.white,      border: C.slate      },
  outlineBlack: { bg: "transparent", hover: OVERLAY.hoverDark,   fg: C.sumi,       border: C.sumi       },
  outlineWhite: { bg: "transparent", hover: OVERLAY.hoverLight,  fg: C.whitepaper, border: C.whitepaper },
}

// Rest-state inline styles for a button.
//
//   size:  "small" | "regular" | "large"
//   touch: opt a small button back into the 44px mobile target. Small buttons
//          otherwise hold 36px on mobile so they sit level beside the inputs and
//          selects they accompany (those keep 36px at every width) instead of
//          towering over them. `touch` is for a standalone small action with no
//          control beside it to match, where the shorter height only makes it
//          harder to hit.
//
// Pass `variants` to extend BTN_VARIANT with app-local entries.
export function btnStyle({
  variant = "black", size = "regular", disabled = false, isMobile = false,
  touch = false, variants = BTN_VARIANT,
} = {}) {
  const v = variants[variant] || variants.black || BTN_VARIANT.black
  const compact = size === "small"
  const height = compact
    ? (isMobile && touch ? BTN.heightMobile : BTN.height)
    : (isMobile ? BTN.heightMobile : undefined)
  return {
    ...ty(size === "large" ? "bodyS" : "button", { color: v.fg }),
    background: v.bg,
    border: `1px solid ${v.border}`,
    borderRadius: BTN.radius,
    padding: BTN.pad[size] || BTN.pad.regular,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    height, minHeight: height,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? BTN.disabledOpacity : 1,
    whiteSpace: "nowrap", boxSizing: "border-box", flexShrink: 0,
    textDecoration: "none", // the marketing site renders link buttons as <a>
    transition: BTN.transition,
  }
}

export const typographyCSS = `
  @import url('${gfHref([300])}');
  :root{
    --c-primary:${C.sumi};--c-secondary:${C.slate};--c-body:${C.sumi};--c-placeholder:rgba(22,32,26,.4);--c-footer-legal:rgba(255,255,255,.4);--c-beige:${C.washi};--c-on-video:${OVERLAY.textOnVideo};
    --sm-washi:${C.washi};--sm-stone:${C.stone};--sm-ash:${C.ash};--sm-slate:${C.slate};--sm-sumi:${C.sumi};--sm-midori:${C.midori};--sm-whitepaper:${C.whitepaper};--sm-white:${C.white};--sm-imgplaceholder:${C.imgPlaceholder};--sm-hairline:${C.hairline};
    --ff-serif:${F.serif};--ff-sans:${F.sans};--ff-body:${F.body};--ff-mono:${F.mono};
    --fw-light:${FW.light};--fw-regular:${FW.regular};--fw-medium:${FW.medium};--fw-semibold:${FW.semibold};--fw-bold:${FW.bold};
    ${lsVars};
    ${lhVars};
    ${fsVars(0)}
  }
  @media(max-width:1440px){:root{${fsVars(1)}}}
  @media(max-width:768px){:root{${fsVars(2)}}}

  /* ── Body colour is a property of the surface, not of the call site ──────────
     Rule: body copy (bodyL/body/bodyS/bodyXS/link) is slate on a white or
     whitepaper background, and sumi on every other background (washi, stone,
     midori, imagery, dark). The body roles resolve --c-body, so a surface only
     has to declare which tint it painted; every descendant follows.

     Headings, caps, button and navLabel are NOT part of this — they keep
     --c-primary and stay sumi on every light surface.

     Nesting works: a washi panel inside a whitepaper card re-declares the tint
     and its own body copy goes back to sumi.

     Dark surfaces are outside this rule — sumi on a dark fill is unreadable, so
     they keep passing an explicit colour (TEXT.onDark / C.white / --c-on-video)
     exactly as before. --c-body only arbitrates between the two light tints. */
  .surface-white,.surface-whitepaper{--c-body:${C.slate}}
  .surface-washi,.surface-tinted{--c-body:${C.sumi}}
`
