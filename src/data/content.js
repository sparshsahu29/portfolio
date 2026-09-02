/**
 * Single source of truth for every piece of copy + media on the site.
 * This object is intentionally shaped like the Sanity documents we will create,
 * so swapping `content` for a Sanity query later is a drop-in change.
 */

export const profile = {
  firstName: 'Palak',
  lastName: 'Agarwal',
  fullName: 'Palak Agarwal',
  headline: 'Content with intent',
  tagline: 'Positioning before posting. Always.',
  roles: [
    'MBA',
    'Brand Marketer',
    'Product Marketer',
    'Creative Strategist',
  ],
  oneLiner: 'Turning customer insights into marketing strategies.',
  legacyRoles: ['Content writer', 'Social media manager', 'Brand manager'],
  location: 'Ghaziabad, Uttar Pradesh',
  email: 'palakagarwal512@gmail.com',
  yearsExperience: '4+',
  portraitRed: '/assets/portrait/cover-red.png',
  portraitDress: '/assets/portrait/dress-red.png',
  portraitPhoto: '/assets/portrait/palms.png',
  portraitHire: '/assets/portrait/hire-me.png',
}

/** Global navigation. */
export const nav = {
  links: [
    { label: 'Home', to: '/', hash: '' },
    { label: 'Work', to: '/', hash: '#work' },
    { label: 'Services', to: '/', hash: '#services' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/', hash: '#contact' },
  ],
}

/** Primary CTA everywhere on the site: a direct email, not a booking widget. */
export const cta = {
  label: 'Email Me',
  heroLabel: 'Work With Me',
  closingLabel: 'Send me an email',
  subject: 'Project enquiry from your website',
  body: 'Hi Palak,\n\nI came across your portfolio and would like to talk about:\n\n',
}

/** Section 1 — the hook. */
export const hero = {
  eyebrow: 'portfolio',
  headline: 'Content with intent',
  tagline: 'Positioning before posting. Always.',
  subheadline:
    '4+ years building relevance for brands in a world with a 3-second attention span.',
  primaryCta: { label: 'See the Results', href: '#results' },
  secondaryCta: { label: 'Work With Me' },
}

export const about = {
  greeting: 'Hey!',
  intro: "I'm Palak",
  paragraphs: [
    'I spend an unhealthy amount of time thinking about brands. Why do people trust some? Why do they ignore most? Why one line works and another… doesn’t.',
    'Half of me lives in dashboards, audience insights, and content calendars. The other nerdy part of me loves audience psychology and performance metrics.',
    'It’s been 4+ years of me trying to build relevance in a world with a 3-second attention span.',
    'I care about hooks, but I care more about positioning. I care about trends, but I care more about timing. I care about engagement, but I care most about long-term brand equity.',
  ],
  kicker: 'I zoom out to see the brand & zoom in to fix the comma.',
  // words the PDF highlights in a different colour
  emphasis: [
    'audience psychology',
    'performance metrics',
    '4+ years',
    'positioning',
    'timing',
    'long-term brand equity',
  ],
}

/** Section 2 — framing for the “Who I am?” page of the deck. The copy itself
 *  lives in `about`, exactly as written in the PDF. */
export const philosophy = {
  eyebrow: 'Who I am',
  title: 'Who I am?',
  polaroidCaption: 'zooming out, as usual',
}

export const randomThings = {
  title: 'Random things about me.',
  items: [
    'I get suspicious when a “premium” brand screams SALE.',
    'I will ask who this is actually for. Repeatedly.',
    'I think clarity is hotter than virality.',
    'I ask “but why?” until the room goes quiet.',
    'I check if the promise matches the product.',
    'I care about alignment across the funnel.',
    'I care about what happens after the click.',
    'I get suspicious when “limited edition” happens every month.',
  ],
}

export const whatYoullSee = {
  title: 'What You’ll See Next',
  subtitle: '(AKA: Things I professionally overthought)',
  note: 'Note: All images you see are clickable',
  items: [
    { label: 'Social Media Copy', href: '#social' },
    { label: 'Blogs', href: '#blogs' },
    { label: 'Emails', href: '#emails' },
    { label: 'Marketing Content', href: '#marketing' },
    { label: 'Website Copy', href: '#website-copy' },
    { label: 'Video Scripts', href: '#creation' },
  ],
}

export const caseStudy = {
  client: 'WHOLELEAF',
  eyebrow: 'At WHOLELEAF, we were nowhere',
  before: 'Barely 1 crore a year',
  after: '5.6 crore',
  afterSuffix: 'in less than a year.',
  milestone: 'Raised funding on Shark Tank India Season 5',
  proofImage: '/assets/work/wholeleaf-proof.png',
  breakdown: [
    {
      lead: 'Strategized & wrote',
      highlight: '2500+ ads',
      rest: '(Videos + Statics)',
    },
    {
      lead: 'Ran',
      highlight: 'A/B tests',
      rest: 'on hooks, headlines, and CTAs.',
    },
    {
      lead: 'Analysed metrics',
      highlight: '',
      rest: 'like CPM, CTR, CPC, CAC & ROAS to grow online sales from nothing to 9 crore ARR.',
    },
    {
      lead: 'Grew social media following from',
      highlight: '350 to 15K+',
      rest: 'in one year through audience research & persona mapping.',
    },
    {
      lead: 'Aligned teams across marketing channels to ensure a',
      highlight: 'unified brand voice',
      rest: 'at every touchpoint.',
    },
  ],
}

export const metrics = {
  title: 'Key Performance Metrics of Top-Performing Ads',
  boards: [
    { label: 'Ads Manager — Campaign A · ₹10.25L spend · 2.76 ROAS', image: '/assets/metrics/campaign-a.png' },
    { label: 'Ads Manager — Campaign B · ₹2.48L spend · 3.18 ROAS', image: '/assets/metrics/campaign-b.png' },
  ],
  /** The four numbers that go directly under the WHOLELEAF case study. */
  cards: [
    { value: '3.18', label: 'ROAS', sub: 'Campaign B — efficiency play' },
    { value: '2.76', label: 'ROAS', sub: 'Campaign A — scale play' },
    { value: '17.2M', label: 'Views in 30 days', sub: '97.6% driven by ads' },
    { value: '8.9M', label: 'Impressions', sub: 'Single campaign, paid social' },
  ],
  // pulled straight off the dashboards in the deck
  headline: [
    { value: '17.2M', label: 'Views in 30 days', sub: '97.6% from ads' },
    { value: '6.9M', label: 'Accounts reached', sub: 'Instagram, 30 days' },
    { value: '3.18', label: 'Peak ROAS', sub: 'Campaign B' },
    { value: '₹12.7L', label: 'Ad spend managed', sub: 'Across both campaigns' },
    { value: '2500+', label: 'Ads written', sub: 'Video + static' },
    { value: '15K+', label: 'Followers grown', sub: 'From 350, in a year' },
  ],
  detail: [
    {
      name: 'Campaign A — scale play',
      rows: [
        ['Spend', '₹10,25,650.75'],
        ['Impressions', '8,945,620'],
        ['ROAS', '2.76'],
        ['AOV', '₹1,128.45'],
        ['CPM', '₹114.55'],
        ['Link clicks', '48,365'],
        ['CTR (link)', '1.12%'],
        ['CPC (link)', '₹21.20'],
        ['Engagement rate', '13.92%'],
        ['Click quality', '93.64%'],
        ['Click to purchase', '8.74%'],
      ],
    },
    {
      name: 'Campaign B — efficiency play',
      rows: [
        ['Spend', '₹2,48,732.60'],
        ['Impressions', '682,430'],
        ['ROAS', '3.18'],
        ['AOV', '₹1,672.35'],
        ['CPM', '₹362.21'],
        ['Link clicks', '6,842'],
        ['CTR (link)', '1.89%'],
        ['CPC (link)', '₹36.32'],
        ['Engagement rate', '32.18%'],
        ['Click quality', '98.76%'],
        ['Click to purchase', '12.45%'],
      ],
    },
  ],
}

export const socialMedia = {
  title: 'Social Media',
  blurb:
    'Copy, calendars and creative direction for feeds that had to sell — not just look nice.',
  insights: [
    '/assets/social/insights-1.png',
    '/assets/social/insights-2.png',
    '/assets/social/insights-3.png',
    '/assets/social/insights-4.png',
    '/assets/social/insights-5.png',
  ],
  grids: [
    '/assets/social/grid-1.png',
    '/assets/social/grid-2.png',
    '/assets/social/grid-3.png',
  ],
}

export const blogs = {
  title: 'Blogs',
  niches: [
    'Skincare',
    'Travel',
    'Mind Body Wellness',
    'WordPress',
    'Finance',
    'Healthcare',
    'AI',
    'Softwares',
    'EdTech',
    'MSMEs',
    'Insurance',
  ],
  groups: [
    {
      title: 'Skincare & Travel',
      tags: ['Skincare', 'Travel'],
      images: [
        '/assets/blogs/skincare-travel-1.png',
        '/assets/blogs/skincare-travel-2.png',
        '/assets/blogs/skincare-travel-3.png',
        '/assets/blogs/skincare-travel-4.png',
        '/assets/blogs/skincare-travel-5.png',
        '/assets/blogs/skincare-travel-6.png',
      ],
    },
    {
      title: 'Wellness, WordPress & Finance',
      tags: ['Mind Body Wellness', 'WordPress', 'Finance'],
      images: [
        '/assets/blogs/wellness-finance-1.png',
        '/assets/blogs/wellness-finance-2.png',
        '/assets/blogs/wellness-finance-3.png',
        '/assets/blogs/wellness-finance-4.png',
        '/assets/blogs/wellness-finance-5.png',
        '/assets/blogs/wellness-finance-6.png',
        '/assets/blogs/wellness-finance-7.png',
        '/assets/blogs/wellness-finance-8.png',
        '/assets/blogs/wellness-finance-9.png',
      ],
    },
    {
      title: 'Healthcare, AI, Software, EdTech, MSMEs & Insurance',
      tags: ['Healthcare', 'AI', 'Softwares', 'EdTech', 'MSMEs', 'Insurance'],
      images: [
        '/assets/blogs/tech-b2b-1.png',
        '/assets/blogs/tech-b2b-2.png',
        '/assets/blogs/tech-b2b-3.png',
        '/assets/blogs/tech-b2b-4.png',
        '/assets/blogs/tech-b2b-5.png',
        '/assets/blogs/tech-b2b-6.png',
      ],
    },
  ],
}

export const emails = {
  title: 'Emails',
  blurb: 'Lifecycle, launch and win-back flows that people actually open.',
  images: [
    '/assets/emails/email-1.png',
    '/assets/emails/email-2.png',
    '/assets/emails/email-3.png',
  ],
}

export const marketing = {
  title: 'Marketing Content',
  sections: [
    {
      id: 'influencer',
      title: 'Influencer Collabs',
      items: [
        { image: '/assets/influencer/collab-1.png', links: ['Ad Link', 'Creator Profile'] },
        { image: '/assets/influencer/collab-2.png', links: ['Ad Link', 'Creator Profile'] },
        { image: '/assets/influencer/collab-3.png', links: ['Ad Link', 'Creator Profile'] },
        { image: '/assets/influencer/collab-4.png', links: ['Ad Link', 'Creator Profile'] },
      ],
    },
    {
      id: 'static-ads',
      title: 'Static Ads',
      items: [
        { image: '/assets/static-ads/static-1.png', links: ['Ad Link'] },
        { image: '/assets/static-ads/static-2.png', links: ['Ad Link'] },
        { image: '/assets/static-ads/static-3.png', links: ['Ad Link'] },
        { image: '/assets/static-ads/static-4.png', links: ['Ad Link'] },
      ],
    },
    {
      id: 'video-ads',
      title: 'Video Ads',
      items: [
        { image: '/assets/video-ads/video-1.png', links: ['Video Link'] },
        { image: '/assets/video-ads/video-2.png', links: ['Video Link'] },
        { image: '/assets/video-ads/video-3.png', links: ['Video Link'] },
        { image: '/assets/video-ads/video-4.png', links: ['Video Link'] },
      ],
    },
    {
      id: 'creation',
      title: 'Content Creation',
      items: [
        { image: '/assets/creation/reel-1.png', links: ['Video Link'] },
        { image: '/assets/creation/reel-2.png', links: ['Video Link'] },
        { image: '/assets/creation/reel-3.png', links: ['Video Link'] },
      ],
    },
  ],
}

/* ---------------------------------------------- section 4: the arsenal */

/**
 * Services / deliverables, grouped so a prospect can see exactly what they can
 * buy. Every item is either a `video` (mp4 + poster, plays inline) or an
 * `image` (opens in the lightbox). Add, reorder or remove freely — the grid
 * adapts. Videos live in /public/assets/video, transcoded to 720x1280 H.264.
 */
const video = (slug, fields) => ({
  type: 'video',
  src: `/assets/video/${slug}.mp4`,
  poster: `/assets/video/${slug}.jpg`,
  ...fields,
})
const still = (path, fields) => ({ type: 'image', image: path, ...fields })

export const services = {
  eyebrow: 'The Arsenal',
  title: 'What you can actually hire me for',
  subtitle: 'Strategy on the inside. Assets you can ship on the outside.',
  grids: [
    {
      id: 'performance-marketing',
      title: 'Performance Marketing',
      blurb:
        'Static and video ads built to be tested — hooks, headlines and CTAs written against a hypothesis, not a mood board.',
      deliverables: ['Static ad creative', 'Video ad scripts', 'Hook & CTA testing', 'Ads copy at scale'],
      items: [
        video('dr-aier', {
          title: 'Dr. Arenna Aier',
          meta: 'WHOLELEAF · Doctor-led video ad',
          note: 'MBBS MD FIPM, Nagaland Pain Management Centre — authority explainer',
        }),
        video('dr-dureja', {
          title: 'Dr. G. P. Dureja',
          meta: 'WHOLELEAF · Doctor-led video ad',
          note: 'Delhi Pain Management Centre — clinical credibility for joint pain',
        }),
        video('joint-pain-story', {
          title: '“I got hysterectomy done”',
          meta: 'WHOLELEAF · Customer story',
          note: 'Real-user testimonial cut for paid social',
        }),
        video('migraine-vo', {
          title: 'MigroHeal',
          meta: 'WHOLELEAF · Voiceover ad',
          note: 'Migraine triggers → relief, scripted for VO',
        }),
        video('senthera-shower-gel', {
          title: 'Senthera Shower Gel',
          meta: 'SENTHERA · UGC-style ad',
          note: 'Selfie-shot, hook-first personal care creative',
        }),
        video('manduva', {
          title: 'Manduva Avakaya Pickle',
          meta: 'MANDUVA · UGC-style ad',
          note: 'Reaction-led food creative for a regional brand',
        }),
        still('/assets/static-ads/static-1.png', {
          title: 'Relief Tincture',
          meta: 'WHOLELEAF · Static ad',
          note: 'Clinically proven plant-based oil for neuropathic pain relief',
        }),
        still('/assets/static-ads/static-3.png', {
          title: 'MigroHeal',
          meta: 'WHOLELEAF · Static ad',
          note: '3 migraine triggers → how MigroHeal provides relief',
        }),
        still('/assets/static-ads/static-2.png', {
          title: 'Orthodexil Joint Pain Oil',
          meta: 'WHOLELEAF · Static ad',
          note: '“Don’t believe in magic pills. Believe in science.”',
        }),
        still('/assets/static-ads/static-4.png', {
          title: 'Muscle & Joint Rub Oil',
          meta: 'WHOLELEAF · Static ad',
          note: '“Don’t just numb joint pain. Treat the root cause.”',
        }),
      ],
    },
    {
      id: 'influencer-collabs',
      title: 'Influencer Collabs',
      blurb:
        'Creator briefs, hooks and captions that keep the brand voice intact while still sounding like the creator.',
      deliverables: ['Creator briefs', 'Hook writing', 'Usage rights copy', 'Whitelisting angles'],
      items: [
        video('roshni-devi', {
          title: 'Roshni Devi',
          meta: 'Fitness creator · Collab',
          note: '103 KG trap bar deadlift — strength-at-any-age angle',
        }),
        video('neha-ranglani', {
          title: 'Neha Ranglani',
          meta: 'Health coach · Collab',
          note: '“In today’s age.” — category-education hook for a colder audience',
        }),
        video('tridha-chaudhary', {
          title: 'Tridha Chaudhary',
          meta: 'Actor · Collab',
          note: 'Celebrity-led trust transfer into the product reveal',
        }),
        video('deepak-mishra', {
          title: 'Deepak Mishra',
          meta: 'Creator · Collab',
          note: 'Hinglish, pain-point-first script',
        }),
      ],
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      blurb:
        'On-camera scripting and delivery — when the brand needs a face and a point of view, not another stock cut.',
      deliverables: ['Reel scripts', 'On-camera delivery', 'Series formats', 'Caption writing'],
      items: [
        video('palak-self-medication', {
          title: 'Self Medication',
          meta: 'On camera · Reel',
          note: 'Written, shot and delivered by Palak',
        }),
        video('palak-sleep-apnea', {
          title: 'Sleep Apnea',
          meta: 'On camera · Reel',
          note: 'Category education in under a minute',
        }),
        video('palak-ugc', {
          title: 'UGC',
          meta: 'On camera · UGC',
          note: 'Creator-style product content, brand voice intact',
        }),
      ],
    },
  ],
}

/* --------------------------------------- section 5: copywriting portfolio */

export const clientWork = {
  eyebrow: 'Client work',
  title: 'The copywriting portfolio',
  subtitle:
    'Long-form, lifecycle and on-site copy written for other people’s brands, in other people’s voices.',
  tabs: [
    {
      id: 'social',
      label: 'Social',
      note: 'Feeds, calendars and captions built to sell, not just to look nice.',
      images: [
        '/assets/social/grid-1.png',
        '/assets/social/grid-2.png',
        '/assets/social/grid-3.png',
        '/assets/social/insights-1.png',
        '/assets/social/insights-2.png',
        '/assets/social/insights-3.png',
        '/assets/social/insights-4.png',
        '/assets/social/insights-5.png',
      ],
    },
    {
      id: 'blogs',
      label: 'Blogs',
      note: 'Skincare, Travel, Wellness, WordPress, Finance, Healthcare, AI, Software, EdTech, MSMEs and Insurance.',
      images: [
        '/assets/blogs/skincare-travel-1.png',
        '/assets/blogs/skincare-travel-2.png',
        '/assets/blogs/skincare-travel-3.png',
        '/assets/blogs/skincare-travel-4.png',
        '/assets/blogs/skincare-travel-5.png',
        '/assets/blogs/skincare-travel-6.png',
        '/assets/blogs/wellness-finance-1.png',
        '/assets/blogs/wellness-finance-2.png',
        '/assets/blogs/wellness-finance-3.png',
        '/assets/blogs/wellness-finance-4.png',
        '/assets/blogs/wellness-finance-5.png',
        '/assets/blogs/wellness-finance-6.png',
        '/assets/blogs/wellness-finance-7.png',
        '/assets/blogs/wellness-finance-8.png',
        '/assets/blogs/wellness-finance-9.png',
        '/assets/blogs/tech-b2b-1.png',
        '/assets/blogs/tech-b2b-2.png',
        '/assets/blogs/tech-b2b-3.png',
        '/assets/blogs/tech-b2b-4.png',
        '/assets/blogs/tech-b2b-5.png',
        '/assets/blogs/tech-b2b-6.png',
      ],
    },
    {
      id: 'emails',
      label: 'Emails',
      note: 'Newsletters and lifecycle flows — including the Inner Child Healing newsletter.',
      images: [
        '/assets/emails/email-1.png',
        '/assets/emails/email-2.png',
        '/assets/emails/email-3.png',
      ],
    },
    {
      id: 'website-copy',
      label: 'Website Copy',
      note: 'Home, landing and product pages that carry one voice end to end.',
      images: ['/assets/website-copy/copy-1.png', '/assets/website-copy/copy-2.png'],
    },
  ],
}

export const websiteCopy = {
  title: 'Website Copy',
  blurb: 'Home pages, landing pages and product pages that carry the brand voice end to end.',
  images: ['/assets/website-copy/copy-1.png', '/assets/website-copy/copy-2.png'],
}

export const hireMe = {
  title: 'Why Should A Brand Hire Me?',
  subtitle: 'Core Strategic Skills',
  skills: [
    'Consumer Insight & Research',
    'Market & Competitor Analysis',
    'Messaging & Storytelling',
    'Tone & Voice Development',
    'Content Strategy',
    'Funnel Understanding',
    'Attention to Detail',
  ],
  teamNote: 'And… I LOVE working with teams!',
  promise: 'TCH…TCH… I’ll protect your brand voice like it’s mine.',
}

export const testimonials = {
  title: 'Testimonials',
  subtitle: 'Straight from LinkedIn. Nothing edited.',
  images: [
    '/assets/testimonials/testimonial-a-1.png',
    '/assets/testimonials/testimonial-a-2.png',
    '/assets/testimonials/testimonial-b-1.png',
    '/assets/testimonials/testimonial-b-2.png',
  ],
  items: [
    {
      name: 'Anamika Jha',
      role: 'Trauma Healing & Emotional Wellness Coach · Featured twice on NY Times Square',
      relationship: 'Anamika managed Palak directly',
      date: 'August 31, 2024',
      quote:
        'Palak is a highly skilled writer & marketer. I have worked directly with her & her ability to learn & grasp things is pretty quick. Whatever your project requirements are, you just give her a brief idea of it & rest assured you see she’ll bring in her A game in that. As she is a quick learner & highly versatile you can just give brief instructions & relax because you know it’s in good hands. If you are looking for a skillful content writer & good content marketer Palak is your go to person. Go ahead & hire her — you will thank me later.',
      screenshot: '/assets/testimonials/testimonial-a-1.png',
    },
    {
      name: 'Bharti Khatri',
      role: 'Ghostwriter · SEO & Conversion Copywriter',
      relationship: 'Bharti worked with Palak on the same team',
      date: 'August 28, 2024',
      quote:
        'I highly recommend Palak for her fantastic work as a content writer and LinkedIn Growth Manager. Palak is great at planning and always finishes tasks on time. She’s been a great team player and has been helping everyone with her smart strategies and hard work. Palak’s positive attitude and reliability make her a top choice for any team. Working with Palak has been awesome!',
      screenshot: '/assets/testimonials/testimonial-a-2.png',
    },
    {
      name: 'Dr. Mohd Aslam',
      role: 'Founder & CEO, Bakka Bags · Author, “30 Business Hacks”',
      relationship: 'Dr. Mohd was Palak’s client',
      date: 'July 12, 2024',
      quote:
        'I highly recommend Palak for her exceptional content writing and LinkedIn management services. She consistently delivered high-quality, engaging content that resonated with my audience and significantly boosted my online presence. Palak is reliable, creative, and highly skilled in optimizing LinkedIn profiles to enhance visibility and connections. Her dedication and expertise make her a valuable asset for anyone seeking professional content and social media management.',
      screenshot: '/assets/testimonials/testimonial-b-1.png',
    },
    {
      name: 'Sarvam Fating',
      role: 'LinkedIn Ghostwriter for 6-Figure Business Owners & Coaches',
      relationship: 'Sarvam worked with Palak on the same team',
      date: 'June 2, 2024',
      quote:
        'Palak and I work in the same agency. And I’ve seen many writers give up the first time they get unexpected feedback on their write-up. Palak isn’t one of them. Not even close — I’ve seen the passion in her to grow, adapt, and promptly help out with her skills whenever I needed it. I highly recommend Palak if you’re looking for a writer who respects your time and money while excelling with her writing skills.',
      screenshot: '/assets/testimonials/testimonial-b-2.png',
    },
  ],
}

export const contact = {
  kicker: 'We’ll get there ;)',
  line1: 'You are a smart person & understand how much consistent brand voice matters.',
  line2: 'That’s why you are here…',
  name: 'Palak Agarwal',
  location: 'Ghaziabad, Uttar Pradesh',
  email: 'palakagarwal512@gmail.com',
  linkedin: 'https://linkedin.com/in/palakkagarwal',
  linkedinHandle: 'linkedin.com/in/palakkagarwal',
  card: '/assets/doodle/contact-card.png',
  signOff: '/assets/doodle/sign-off.png',
}

/** Section 6 + the dedicated /blog route. */
export const blogPage = {
  teaserEyebrow: 'The Strategist’s Diary',
  teaserTitle: 'Thinking out loud, on the record.',
  teaserSubtitle:
    'Notes on positioning, audience psychology and the small copy decisions that quietly move numbers.',
  teaserCta: 'Read My Blog',
  headline: 'Positioning, Psychology, and Performance.',
  headlineAside: '(And a little bit of overthinking.)',
  intro:
    'Long-form thinking from someone who lives in dashboards and content calendars — and still cares about the comma.',
}

/* ---------------------------------------------------------------- posts */

let keySeed = 0
const key = () => `k${(keySeed += 1)}`

/** Build a Portable Text block so fallback posts render with the same component as Sanity. */
const block = (text, style = 'normal') => ({
  _type: 'block',
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks: [] }],
})

const bullets = (items) =>
  items.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }))

/**
 * Starter posts so the blog is never empty. Once Sanity is connected these are
 * replaced by real documents — the shape is identical.
 */
export const posts = [
  {
    slug: 'clarity-is-hotter-than-virality',
    title: 'Clarity is hotter than virality',
    excerpt:
      'Every brand wants the viral moment. Almost none of them can tell me who the post is for. Here is the test I run before anything ships.',
    category: 'Positioning',
    date: '2025-06-18',
    readingTime: '5 min read',
    cover: '/assets/blogs/skincare-travel-4.png',
    body: [
      block(
        'Every founder I meet wants the same thing: the post that breaks the internet. Almost none of them can answer the first question I ask — who is this for, specifically?',
      ),
      block('The test', 'h2'),
      block(
        'Before anything ships, I make the whole team answer three questions in one sentence each. If any answer needs a paragraph, the piece is not ready.',
      ),
      ...bullets([
        'Who is the one person this is for, and what did they just Google?',
        'What do they believe right now that this changes?',
        'What is the single next thing we want them to do?',
      ]),
      block(
        'Virality is a distribution outcome. Clarity is a positioning input. You can engineer the second one; the first is a lottery you enter by doing the second one well enough, often enough.',
      ),
      block('Why vague copy feels safe', 'h2'),
      block(
        'Vague copy is popular because nobody can disagree with it. "Premium quality, trusted by thousands" offends no one on the approval chain. It also persuades no one on the other side of the screen.',
      ),
      block(
        'Specificity is a risk you take on behalf of the customer. Take it.',
        'blockquote',
      ),
    ],
  },
  {
    slug: 'what-happens-after-the-click',
    title: 'What happens after the click',
    excerpt:
      'CTR is a vanity metric if the landing page breaks the promise. A walk through the funnel gaps I keep finding in D2C accounts.',
    category: 'Performance',
    date: '2025-05-02',
    readingTime: '7 min read',
    cover: '/assets/blogs/wellness-finance-7.png',
    body: [
      block(
        'A 1.89% CTR looks great in a screenshot. It looks a lot less great when click-to-purchase sits at 3%. The ad did its job. Everything after it did not.',
      ),
      block('The three gaps I keep finding', 'h2'),
      ...bullets([
        'Promise mismatch — the ad sells an outcome, the landing page sells ingredients.',
        'Format whiplash — a fast, personality-led reel drops you onto a stiff corporate page.',
        'Decision debt — the page answers "what is it" but never "why now".',
      ]),
      block(
        'None of those are creative problems. They are alignment problems, and they are cheaper to fix than another round of hooks.',
      ),
      block('What I audit first', 'h2'),
      block(
        'I read the ad and the landing page out loud, back to back. If they sound like two different companies, we have found the leak before opening a single dashboard.',
      ),
    ],
  },
  {
    slug: 'the-premium-brand-that-screams-sale',
    title: 'The “premium” brand that screams SALE',
    excerpt:
      'Discounting is not a strategy, it is a confession. What constant sales actually teach your customer about your pricing.',
    category: 'Brand',
    date: '2025-03-11',
    readingTime: '6 min read',
    cover: '/assets/blogs/tech-b2b-1.png',
    body: [
      block(
        'I get suspicious when a premium brand screams SALE. Not because discounts are wrong, but because a discount every month is not a promotion — it is a price correction you are refusing to make.',
      ),
      block('What the customer actually learns', 'h2'),
      block(
        'Run a sale every month and you teach one lesson very efficiently: never pay full price. You have not created urgency, you have created a waiting game, and you always lose it.',
      ),
      block(
        '“Limited edition” that happens every month is just the catalogue.',
        'blockquote',
      ),
      block('The alternative', 'h2'),
      ...bullets([
        'Change what is in the box instead of what is on the price tag.',
        'Make the reason for the offer specific and true — end of season, a real batch, a genuine milestone.',
        'If margin is the problem, fix the price once and defend it with better positioning.',
      ]),
    ],
  },
  {
    slug: 'writing-2500-ads-taught-me-this',
    title: 'Writing 2,500 ads taught me this',
    excerpt:
      'Hooks get the attention. Positioning keeps it. Lessons from a year of A/B testing at WHOLELEAF.',
    category: 'Copywriting',
    date: '2025-01-27',
    readingTime: '8 min read',
    cover: '/assets/metrics/ad-metrics-1.png',
    body: [
      block(
        'In under a year I strategised and wrote more than 2,500 ads — video and static — and tested them on hooks, headlines and CTAs. Revenue went from barely a crore a year to 5.6 crore. Here is what actually repeated.',
      ),
      block('1. The hook is a filter, not a magnet', 'h2'),
      block(
        'The best-performing hooks did not attract the most people. They attracted the right people and repelled everyone else, which is why the click quality stayed above 93%.',
      ),
      block('2. Winners cluster around an insight, not a format', 'h2'),
      block(
        'When something wins, most teams clone the format. The durable move is to find the belief the ad changed and rewrite that belief in five formats.',
      ),
      block('3. Kill the test, keep the note', 'h2'),
      ...bullets([
        'Every losing ad still teaches you which promise the audience did not believe.',
        'A tested claim is an asset — it belongs in the brand doc, not just the ads account.',
        'Write down why you thought it would work before you launch it, or you will retro-fit the story.',
      ]),
      block(
        'I zoom out to see the brand and zoom in to fix the comma. Both of those paid for themselves here.',
      ),
    ],
  },
]

export const textures = {
  paper: '/assets/texture/paper.png',
  ruled: '/assets/texture/ruled-paper.png',
  grid: '/assets/texture/grid-paper.png',
  kraft: '/assets/texture/kraft-bag.png',
  socialIcons: '/assets/doodle/social-icons.png',
  canvaDisc: '/assets/doodle/canva-disc.png',
}

export default {
  nav,
  cta,
  hero,
  profile,
  about,
  philosophy,
  randomThings,
  whatYoullSee,
  caseStudy,
  metrics,
  services,
  clientWork,
  socialMedia,
  blogs,
  emails,
  marketing,
  websiteCopy,
  hireMe,
  testimonials,
  contact,
  blogPage,
  posts,
  textures,
}
