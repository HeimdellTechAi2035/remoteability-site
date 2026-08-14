// UNLEASHED — central data source
// Edit THIS FILE to change UNLEASHED brand config, seasonal campaigns, events,
// the fundraising tracker, or the FAQ shown on the site and in the help chat.
// Nothing here should be duplicated by hand elsewhere — unleashed.js reads
// from window.UNLEASHED to render the homepage section, the /unleashed hub
// page and the booking page.
//
// Shape reference (documentation only, this file is plain JS, no build step):
//
// UnleashedCampaign = {
//   id: string, slug: string, name: string, emoji: string, season: string,
//   months: string[], tagline: string, shortDescription: string,
//   fullDescription: string, image: string|null,
//   status: "seasonal" | "coming-soon" | "live" | "finished",
//   featured: boolean, relatedTo: string|null
// }
//
// UnleashedEvent = {
//   id: string, slug: string, name: string, campaign: string|null,
//   startDate: string, endDate: string|null, venue: string, town: string|null,
//   region: string|null, postcode: string|null, description: string,
//   image: string|null,
//   status: "coming-soon" | "confirmed" | "tickets" | "walk-up" | "sold-out" | "finished" | "cancelled",
//   priceText: string|null, bookingUrl: string|null, externalUrl: string|null,
//   accessibilityText: string|null, ageText: string|null, featured: boolean
// }

(function () {
  'use strict';

  var UNLEASHED = {

    config: {
      name: 'UNLEASHED',
      byline: 'Mobile Smash Events by RemoteAbility',
      tagline: 'BREAK STUFF. DO GOOD.',
      hashtag: '#UnleashedByRemoteAbility',

      organisation: {
        name: 'RemoteAbility CIC',
        url: 'https://www.remoteability.org.uk/'
      },

      // Reuses RemoteAbility's existing, verified contact details —
      // do not add new addresses here without updating the rest of the site.
      contact: {
        email: 'contact@remoteability.org.uk',
        safeguardingEmail: 'safeguarding@remoteability.org.uk',
        phone: '+44 7418 008279',
        phoneHref: 'tel:+447418008279'
      },

      // Only include a network here once a real, verified URL exists.
      // Leave as null until confirmed — unleashed.js hides anything set to null.
      social: {
        facebook: 'https://www.facebook.com/profile.php?id=61584617494476',
        linkedin: 'https://www.linkedin.com/company/remoteability-cic/',
        instagram: null,
        tiktok: null,
        youtube: null
      },

      booking: {
        pageUrl: 'unleashed-book.html',
        thankYouUrl: 'unleashed-thank-you.html',
        netlifyFormName: 'unleashed-event-enquiry'
      },

      // Real pricing, confirmed by RemoteAbility — edit here to update everywhere.
      pricing: {
        currency: '£',
        options: [
          { label: '3 Throws', price: 5 },
          { label: '7 Throws', price: 10 },
          { label: 'Total Unleashed', price: 20 }
        ]
      },

      // Structure spec — confirmed dimensions from the approved design.
      structure: {
        totalWidth: '9.0m',
        maxHeight: '3.0m',
        depth: '3.0m',
        lanes: 3,
        laneWidth: '3.0m each',
        note: 'Customers throw from outside the barrier line.'
      },

      ageInfo: 'Safe for all ages — under 12s must be supervised by an adult.',

      checklist: [
        '3 Smash Lanes',
        'Safe & Secure',
        'Fun For Everyone',
        'Raising Money',
        'Creating Jobs',
        'Feeding People'
      ],

      howItWorks: [
        { title: 'Choose Your Throws', body: 'Pick 3, 7, or go all in with Total Unleashed.' },
        { title: 'Take Your Place', body: 'Step up behind the throwing line.' },
        { title: 'Throw & Smash', body: 'Throw the ball and smash the target.' },
        { title: 'Rack Up Points', body: 'Score points and have fun doing it.' },
        { title: 'Support A Great Cause', body: 'Every throw helps change lives.' }
      ],

      keyFeatures: [
        '3 Smash Lanes for higher throughput',
        'Extra long throwing distance',
        'Heavy duty netting & impact-resistant walls',
        'Steel target pedestals',
        'Quick reset system',
        'Fully mobile — built to travel & perform',
        'Maximum public safety',
        'Weatherproof & built for outdoor events',
        'Safe for all ages (under 12s with supervision)'
      ],

      perfectFor: [
        { emoji: '🏍️', label: 'Motorbike Events' },
        { emoji: '🎡', label: 'Festivals' },
        { emoji: '🎪', label: 'Fairs & Carnivals' },
        { emoji: '❤️', label: 'Charity Events' },
        { emoji: '💼', label: 'Corporate Events' },
        { emoji: '🏘️', label: 'Community Events' }
      ],

      // Where the money goes — the four things UNLEASHED income funds.
      moneyGoes: [
        { emoji: '🚚', label: 'Mobile Food Project' },
        { emoji: '🤝', label: 'Paid Work Opportunities' },
        { emoji: '🍔', label: 'Hot Evening Meals' },
        { emoji: '🎓', label: 'Training & Support' }
      ]
    },

    // ---------------------------------------------------------------------
    // Seasonal experiences — recurring formats, not confirmed dates.
    // Order = roughly chronological through the year.
    // ---------------------------------------------------------------------
    campaigns: [
      {
        id: 'new-year-unleashed',
        slug: 'new-year-unleashed',
        name: 'New Year Unleashed',
        emoji: '💥',
        season: 'Late December / January',
        months: ['December', 'January'],
        tagline: 'LEAVE IT BEHIND.',
        shortDescription: 'Write down what you want to leave behind from last year, then take your throws.',
        fullDescription: 'New Year Unleashed is UNLEASHED’s New Year format. Participants can write something they want to leave behind from the previous year on an approved disposable target or card, then take their throws. It’s entertainment, not therapy — just a fun, physical way to mark a fresh start.',
        image: null,
        status: 'seasonal',
        featured: true,
        relatedTo: null
      },
      {
        id: 'heartbreakers',
        slug: 'heartbreakers',
        name: 'Heartbreakers',
        emoji: '💔',
        season: 'February',
        months: ['February'],
        tagline: 'LOVE HURTS. UNLEASH IT.',
        shortDescription: 'A Valentine’s-themed format for singles, couples, friends and date nights.',
        fullDescription: 'Heartbreakers is UNLEASHED’s February format, built around Valentine’s Day. It works for singles nights, couples and partner-vs-partner challenges, anti-Valentine’s events, and date nights — kept fun rather than mean-spirited.',
        image: null,
        status: 'seasonal',
        featured: false,
        relatedTo: null
      },
      {
        id: 'easter-smash',
        slug: 'easter-smash',
        name: 'Easter Smash',
        emoji: '🐣',
        season: 'March / April',
        months: ['March', 'April'],
        tagline: 'CRACK INTO EASTER.',
        shortDescription: 'A family-friendly Easter visual theme using approved smashable targets.',
        fullDescription: 'Easter Smash brings a family-friendly, Easter-themed look to UNLEASHED for spring events. It uses the same approved smashable targets as every UNLEASHED format — not real chocolate eggs — dressed with an Easter visual theme.',
        image: null,
        status: 'seasonal',
        featured: false,
        relatedTo: null
      },
      {
        id: 'spring-smash',
        slug: 'spring-smash',
        name: 'Spring Smash',
        emoji: '🌸',
        season: 'April / May',
        months: ['April', 'May'],
        tagline: 'SPRING INTO IT.',
        shortDescription: 'For bank holiday events, community festivals, fairs and family days.',
        fullDescription: 'Spring Smash is UNLEASHED’s general spring format for bank holiday events, community festivals, fairs, spring shows and family events — a lighter, general-purpose seasonal look.',
        image: null,
        status: 'seasonal',
        featured: false,
        relatedTo: null
      },
      {
        id: 'summer-unleashed',
        slug: 'summer-unleashed',
        name: 'Summer Unleashed',
        emoji: '☀️',
        season: 'June – August',
        months: ['June', 'July', 'August'],
        tagline: 'THE MAIN EVENT.',
        shortDescription: 'The core festival and outdoor-event version of UNLEASHED.',
        fullDescription: 'Summer Unleashed is the main festival and outdoor-event version of UNLEASHED, aimed at motorcycle festivals, motorcycle rallies, music festivals, fairs, outdoor shows, car shows, community events and county shows through the peak event season.',
        image: null,
        status: 'seasonal',
        featured: true,
        relatedTo: null
      },
      {
        id: 'rally-wreckage',
        slug: 'rally-wreckage',
        name: 'Rally Wreckage',
        emoji: '🏍️',
        season: 'Motorcycle rallies & bike events (seasonal)',
        months: ['May', 'June', 'July', 'August', 'September'],
        tagline: 'RIDE IN. SMASH OUT.',
        shortDescription: 'A biker/rally-themed version of UNLEASHED for motorcycle events.',
        fullDescription: 'Rally Wreckage is a seasonal, event-specific version of UNLEASHED built for motorcycle rallies, bike festivals, motorcycle shows and biker events. It’s one visual format among several UNLEASHED experiences, not a separate attraction.',
        image: null,
        status: 'seasonal',
        featured: false,
        relatedTo: null
      },
      {
        id: 'smash-the-pumpkins',
        slug: 'smash-the-pumpkins',
        name: 'Smash the Pumpkins',
        emoji: '🎃',
        season: 'October',
        months: ['October'],
        tagline: 'THIS OCTOBER, THE PUMPKINS ARE IN TROUBLE.',
        shortDescription: 'UNLEASHED’s biggest annual campaign — Halloween, fully unleashed.',
        fullDescription: 'Smash the Pumpkins is one of UNLEASHED’s strongest annual campaigns: a full Halloween takeover with orange, black and red branding, pumpkin and Halloween graphics, and dark atmospheric lighting at events through October.',
        image: null,
        status: 'seasonal',
        featured: true,
        relatedTo: null
      },
      {
        id: 'bonfire-bash',
        slug: 'bonfire-bash',
        name: 'Bonfire Bash',
        emoji: '🔥',
        season: 'Early November / Bonfire Night',
        months: ['November'],
        tagline: 'MAKE SOME NOISE THIS NOVEMBER.',
        shortDescription: 'Fire and firework-graphic branding for Bonfire Night season — targets stay the same.',
        fullDescription: 'Bonfire Bash brings fire, ember and firework-style graphics and a dark nighttime look to UNLEASHED around Bonfire Night. This is visual branding only — UNLEASHED never uses real explosives, fireworks or fire inside the attraction, only the same controlled, approved smashable targets used at every event.',
        image: null,
        status: 'seasonal',
        featured: true,
        relatedTo: null
      },
      {
        id: 'winter-wreckage',
        slug: 'winter-wreckage',
        name: 'Winter Wreckage',
        emoji: '❄️',
        season: 'November / December',
        months: ['November', 'December'],
        tagline: 'PUT IT ON THE NAUGHTY LIST. THEN SMASH IT.',
        shortDescription: 'Festive lighting, winter graphics and Christmas-market styling.',
        fullDescription: 'Winter Wreckage is UNLEASHED’s Christmas and winter-fair format, with festive lighting, winter and Christmas graphics, fake-snow styling and wrapped-target visuals for Christmas markets and winter events. Targets are always approved, suitable materials — never glass baubles.',
        image: null,
        status: 'seasonal',
        featured: true,
        relatedTo: null
      },
      {
        id: 'the-naughty-list',
        slug: 'the-naughty-list',
        name: 'The Naughty List',
        emoji: '🎅',
        season: 'Part of Winter Wreckage',
        months: ['November', 'December'],
        tagline: 'GET IT OFF YOUR CHEST.',
        shortDescription: 'Write something lighthearted you want on the Naughty List, then smash it.',
        fullDescription: 'The Naughty List runs as part of Winter Wreckage. Participants can write something humorous they want to put on the Naughty List — Monday mornings, bills, bad habits, the old year — then take their throws. Kept playful; never used to target real, identifiable people.',
        image: null,
        status: 'seasonal',
        featured: false,
        relatedTo: 'winter-wreckage'
      }
    ],

    // ---------------------------------------------------------------------
    // Confirmed events. Empty until real bookings exist — do not add
    // placeholder or example events here. See unleashed.js for the
    // "new dates coming soon" fallback this produces when empty.
    // ---------------------------------------------------------------------
    events: [],

    // ---------------------------------------------------------------------
    // Mobile food project fundraising tracker.
    // Set enabled:true and fill in real numbers once they exist.
    // ---------------------------------------------------------------------
    fundraising: {
      target: null,
      raised: null,
      lastUpdated: null,
      enabled: false
    },

    // ---------------------------------------------------------------------
    // FAQ — used on the /unleashed page (with FAQPage structured data)
    // and as the knowledge source for the UNLEASHED topics in the site's
    // help chat (see chatbot.js).
    // ---------------------------------------------------------------------
    faq: [
      {
        id: 'what-is-unleashed',
        q: 'What is UNLEASHED?',
        a: 'UNLEASHED is RemoteAbility CIC’s travelling mobile smash-event attraction. Visitors stand outside controlled throwing lanes and throw reusable hard rubber balls at approved smashable targets inside a staff-managed target area, at festivals, rallies, fairs and shows across the UK.'
      },
      {
        id: 'rage-room',
        q: 'Is UNLEASHED a rage room?',
        a: 'No. UNLEASHED is a mobile event attraction that travels to events — it isn’t a fixed venue, and it isn’t a rage room.'
      },
      {
        id: 'where-operate',
        q: 'Where does UNLEASHED operate?',
        a: 'UNLEASHED travels to suitable events across the UK — motorcycle festivals and rallies, bike nights, car shows, music and community festivals, fairs, carnivals, county shows, Christmas markets, Bonfire Night and Halloween events, universities, corporate and charity events, and town-centre events.'
      },
      {
        id: 'find-event',
        q: 'Where can I find the next event?',
        a: 'Confirmed dates are listed in the Upcoming Events section of this page as they’re arranged. If nothing is listed right now, we don’t have a confirmed date yet — check back, or ask an organiser you know to book us.'
      },
      {
        id: 'need-to-book',
        q: 'Do I need to book?',
        a: 'It depends on the event. Some appearances are walk-up, others may run through the event organiser’s own ticketing. Check the specific event listing when one is confirmed, or ask on the day.'
      },
      {
        id: 'how-much',
        q: 'How much does it cost?',
        a: '3 Throws for £5, 7 Throws for £10, or go all in with Total Unleashed for £20. Pricing may be adjusted for specific events — check on the day.'
      },
      {
        id: 'how-many-throws',
        q: 'How many throws do I get?',
        a: 'Choose your package: 3 Throws, 7 Throws, or Total Unleashed for the full experience.'
      },
      {
        id: 'what-do-i-throw',
        q: 'What do I throw?',
        a: 'Suitable, reusable hard rubber balls, provided on site by UNLEASHED staff.'
      },
      {
        id: 'what-do-i-smash',
        q: 'What do I smash?',
        a: 'Approved smashable targets set up on target pedestals inside a staff-only, contained target area — never anything you bring yourself.'
      },
      {
        id: 'children',
        q: 'Can children participate?',
        a: 'Yes — UNLEASHED is safe for all ages, but under 12s must be supervised by an adult at all times.'
      },
      {
        id: 'accessible',
        q: 'Is it accessible?',
        a: 'Accessibility arrangements may vary by event and venue. Contact us before attending if you’d like to discuss access requirements or reasonable adjustments.'
      },
      {
        id: 'supervised',
        q: 'Is it supervised?',
        a: 'Yes. UNLEASHED is run by staff who control the throwing line and manage the target/reset area at all times.'
      },
      {
        id: 'money',
        q: 'What happens to the money?',
        a: 'It goes toward four things: the Mobile Food Project, paid work opportunities, hot evening meals for people experiencing financial hardship, and training & support — all part of RemoteAbility CIC’s wider social-enterprise work.'
      },
      {
        id: 'what-is-remoteability',
        q: 'What is RemoteAbility?',
        a: 'RemoteAbility CIC is the UK Community Interest Company behind UNLEASHED. RemoteAbility supports homeless, disabled and neurodivergent people, and people recovering from addiction, through a four-stage Pathway to Independence. UNLEASHED is one of RemoteAbility’s social-enterprise projects.'
      },
      {
        id: 'come-to-my-event',
        q: 'Can UNLEASHED come to my event?',
        a: 'Possibly — tell us about your event using our event organiser enquiry form and we’ll get back to you to discuss whether UNLEASHED is a fit.'
      },
      {
        id: 'how-to-book',
        q: 'How do I book UNLEASHED?',
        a: 'Fill in the Book UNLEASHED enquiry form with your event details. Submitting the form registers your enquiry — it doesn’t confirm a booking. Our team will follow up to discuss availability.'
      },
      {
        id: 'sponsor',
        q: 'Can my business sponsor UNLEASHED?',
        a: 'Yes — sponsorship is one of the ways businesses can get involved. Use the enquiry form and choose “Discuss sponsorship”.'
      },
      {
        id: 'volunteer',
        q: 'Can I volunteer or work with the project?',
        a: 'Yes — get in touch via the RemoteAbility contact page and let us know what you’re interested in.'
      }
    ]
  };

  window.UNLEASHED = UNLEASHED;
})();
