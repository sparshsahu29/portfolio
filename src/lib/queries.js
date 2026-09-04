/**
 * One round trip fetches the entire site.
 * Every field is optional — anything missing falls back to src/data/content.js.
 */
export const siteQuery = /* groq */ `{
  "nav": *[_type == "siteSettings"][0]{
    brand, brandTagline,
    "links": navLinks[]{ label, to, hash }
  },

  "cta": *[_type == "siteSettings"][0]{
    "label": ctaLabel,
    "heroLabel": ctaHeroLabel,
    "closingLabel": ctaClosingLabel,
    "subject": ctaSubject,
    "body": ctaBody
  },

  "hero": *[_type == "hero"][0]{
    eyebrow, headline, tagline, subheadline,
    primaryCta{ label, href },
    secondaryCta{ label, href }
  },

  "philosophy": *[_type == "philosophy"][0]{ title },

  "services": *[_type == "services"][0]{
    eyebrow, title, subtitle,
    grids[]{
      "id": slug.current, title, blurb, deliverables,
      items[]{
        _key, _type, title, meta, note,
        "type": select(_type == "arsenalVideo" => "video", "image"),
        "image": image.asset->url,
        "src": video.asset->url,
        "poster": poster.asset->url
      }
    }
  },

  "clientWork": *[_type == "clientWork"][0]{
    eyebrow, title, subtitle,
    tabs[]{ "id": slug.current, label, note, "images": images[]{ "src": asset->url, href } }
  },

  "blogPage": *[_type == "blogPage"][0]{
    teaserEyebrow, teaserTitle, teaserSubtitle, teaserCta,
    headline, headlineAside, intro
  },

  "profile": *[_type == "profile"][0]{
    firstName, lastName, fullName, headline, tagline, roles, oneLiner,
    legacyRoles, location, email, yearsExperience,
    "portraitRed": portraitRed.asset->url,
    "portraitDress": portraitDress.asset->url,
    "portraitPhoto": portraitPhoto.asset->url,
    "portraitHire": portraitHire.asset->url,
    socials[]{ label, url }
  },

  "about": *[_type == "about"][0]{ greeting, intro, paragraphs, kicker, emphasis },

  "randomThings": *[_type == "randomThings"][0]{ title, items },

  "whatYoullSee": *[_type == "whatYoullSee"][0]{ title, subtitle, items[]{ label, sub, href } },

  "results": *[_type == "results"][0]{ title, subtitle },

  "caseStudy": *[_type == "caseStudy"][0]{
    client, eyebrow, before, after, afterSuffix, milestone,
    "proofImage": proofImage.asset->url,
    breakdown[]{ lead, highlight, rest }
  },

  "metrics": *[_type == "metrics"][0]{
    title,
    cards[]{ value, label, sub },
    headline[]{ value, label, sub },
    boards[]{ label, "image": image.asset->url },
    detail[]{ name, rows[]{ key, value } }
  },

  "hireMe": *[_type == "hireMe"][0]{ title, subtitle, skills, teamNote, promise },

  "testimonials": *[_type == "testimonials"][0]{
    title, subtitle,
    "images": items[].screenshot.asset->url,
    items[]{ name, role, relationship, date, quote, "screenshot": screenshot.asset->url, url }
  },

  "contact": *[_type == "contact"][0]{
    kicker, line1, line2, name, location, email, linkedin, linkedinHandle,
    "card": card.asset->url,
    "signOff": signOff.asset->url
  },

  "posts": *[_type == "post" && !(_id in path("drafts.**"))] | order(date desc){
    "slug": slug.current, title, excerpt, category, date, readingTime,
    "cover": cover.asset->url
  }
}`

export const postQuery = /* groq */ `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current,
  title, excerpt, category, date, readingTime,
  "cover": cover.asset->url,
  "coverAlt": cover.alt,
  seoTitle, seoDescription,
  body[]{
    ...,
    _type == "image" => { "url": asset->url, alt, caption }
  },
  "related": *[_type == "post" && slug.current != $slug] | order(date desc)[0...3]{
    "slug": slug.current, title, excerpt, category, readingTime,
    "cover": cover.asset->url
  }
}`
