// UNLEASHED — shared rendering logic.
// Reads window.UNLEASHED (see unleashed-data.js, load that file first).
// Renders into any element carrying a matching data-unleashed attribute,
// so the homepage, /unleashed and /unleashed/book pages can all reuse it
// just by including both scripts and adding container elements.

(function () {
  'use strict';

  if (!window.UNLEASHED) return;
  var DATA = window.UNLEASHED;

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = String(str == null ? '' : str);
    return div.innerHTML;
  }

  function el(html) {
    var wrap = document.createElement('div');
    wrap.innerHTML = html.trim();
    return wrap.firstElementChild;
  }

  function injectJsonLd(id, data) {
    if (document.getElementById(id)) return;
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // -----------------------------------------------------------------------
  // Campaign cards
  // -----------------------------------------------------------------------
  function campaignCardHtml(c) {
    return (
      '<article class="unleashed-campaign-card" id="unleashed-' + escapeHtml(c.slug) + '">' +
        '<div class="unleashed-campaign-top">' +
          '<span class="unleashed-campaign-emoji" aria-hidden="true">' + escapeHtml(c.emoji) + '</span>' +
          '<span class="unleashed-status-badge">' + escapeHtml(seasonLabel(c.status)) + '</span>' +
        '</div>' +
        '<div class="unleashed-campaign-season">' + escapeHtml(c.season) + '</div>' +
        '<h3 class="unleashed-campaign-name">' + escapeHtml(c.name) + '</h3>' +
        '<p class="unleashed-campaign-tagline">' + escapeHtml(c.tagline) + '</p>' +
        '<p class="unleashed-campaign-desc">' + escapeHtml(c.shortDescription) + '</p>' +
      '</article>'
    );
  }

  function seasonLabel(status) {
    switch (status) {
      case 'live': return 'Live now';
      case 'coming-soon': return 'Coming soon';
      case 'finished': return 'Finished';
      default: return 'Seasonal format';
    }
  }

  function renderCampaigns(container) {
    var mode = container.getAttribute('data-unleashed-mode') || 'all';
    var list = DATA.campaigns.filter(function (c) { return !c.relatedTo; });
    if (mode === 'featured') {
      list = list.filter(function (c) { return c.featured; });
    }
    var limitAttr = container.getAttribute('data-unleashed-limit');
    if (limitAttr) list = list.slice(0, parseInt(limitAttr, 10));

    container.innerHTML = list.map(campaignCardHtml).join('');
  }

  // -----------------------------------------------------------------------
  // Events
  // -----------------------------------------------------------------------
  function eventCardHtml(e) {
    var dateText = formatEventDate(e.startDate, e.endDate);
    return (
      '<article class="unleashed-event-card">' +
        '<div class="unleashed-event-date">' + escapeHtml(dateText) + '</div>' +
        '<h3 class="unleashed-event-name">' + escapeHtml(e.name) + '</h3>' +
        '<p class="unleashed-event-venue">' + escapeHtml([e.venue, e.town].filter(Boolean).join(', ')) + '</p>' +
        '<p class="unleashed-event-desc">' + escapeHtml(e.description) + '</p>' +
        (e.priceText ? '<p class="unleashed-event-price">' + escapeHtml(e.priceText) + '</p>' : '') +
        (e.accessibilityText ? '<p class="unleashed-event-access">' + escapeHtml(e.accessibilityText) + '</p>' : '') +
        (e.bookingUrl ? '<a class="unleashed-btn unleashed-btn-outline" href="' + escapeHtml(e.bookingUrl) + '">Details →</a>' : '') +
      '</article>'
    );
  }

  function formatEventDate(start, end) {
    if (!start) return '';
    try {
      var opts = { day: 'numeric', month: 'long', year: 'numeric' };
      var s = new Date(start).toLocaleDateString('en-GB', opts);
      if (end && end !== start) {
        var e = new Date(end).toLocaleDateString('en-GB', opts);
        return s + ' – ' + e;
      }
      return s;
    } catch (err) {
      return start;
    }
  }

  function renderEvents(container) {
    var events = DATA.events || [];
    if (!events.length) {
      container.innerHTML =
        '<div class="unleashed-empty-card">' +
          '<h3>NEW DATES COMING SOON</h3>' +
          '<p>We’re currently speaking with event organisers across the North West and beyond.</p>' +
          '<a class="unleashed-btn unleashed-btn-primary" href="' + escapeHtml(DATA.config.booking.pageUrl) + '">WANT UNLEASHED AT YOUR EVENT?</a>' +
        '</div>';
      return;
    }

    container.innerHTML = events.map(eventCardHtml).join('');

    var schemaEvents = events
      .filter(function (e) { return e.status !== 'cancelled'; })
      .map(function (e) {
        return {
          '@type': 'Event',
          name: e.name,
          startDate: e.startDate,
          endDate: e.endDate || undefined,
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: e.status === 'cancelled'
            ? 'https://schema.org/EventCancelled'
            : 'https://schema.org/EventScheduled',
          location: {
            '@type': 'Place',
            name: e.venue,
            address: [e.town, e.region, e.postcode].filter(Boolean).join(', ')
          },
          description: e.description,
          organizer: {
            '@type': 'Organization',
            name: DATA.config.organisation.name,
            url: DATA.config.organisation.url
          }
        };
      });

    if (schemaEvents.length) {
      injectJsonLd('unleashed-events-schema', {
        '@context': 'https://schema.org',
        '@graph': schemaEvents
      });
    }
  }

  // -----------------------------------------------------------------------
  // Fundraising tracker
  // -----------------------------------------------------------------------
  function renderFundraising(container) {
    var f = DATA.fundraising || { enabled: false };
    if (!f.enabled || !f.target || !f.raised) {
      container.innerHTML =
        '<div class="unleashed-fundraising-card unleashed-fundraising-pending">' +
          '<p class="unleashed-fundraising-pending-text">FUNDRAISING CAMPAIGN DETAILS COMING SOON</p>' +
        '</div>';
      return;
    }
    var pct = Math.max(0, Math.min(100, Math.round((f.raised / f.target) * 100)));
    container.innerHTML =
      '<div class="unleashed-fundraising-card">' +
        '<div class="unleashed-fundraising-bar"><div class="unleashed-fundraising-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="unleashed-fundraising-stats">' +
          '<span>£' + escapeHtml(f.raised.toLocaleString()) + ' raised</span>' +
          '<span>Target £' + escapeHtml(f.target.toLocaleString()) + '</span>' +
        '</div>' +
        (f.lastUpdated ? '<p class="unleashed-fundraising-updated">Last updated ' + escapeHtml(f.lastUpdated) + '</p>' : '') +
      '</div>';
  }

  // -----------------------------------------------------------------------
  // FAQ
  // -----------------------------------------------------------------------
  function renderFaq(container) {
    var items = DATA.faq || [];
    container.innerHTML = items.map(function (item) {
      return (
        '<details class="faq-item">' +
          '<summary class="faq-question">' + escapeHtml(item.q) + '</summary>' +
          '<div class="faq-answer"><p>' + item.a + '</p></div>' +
        '</details>'
      );
    }).join('');

    injectJsonLd('unleashed-faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(function (item) {
        return {
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a.replace(/<[^>]+>/g, '') }
        };
      })
    });
  }

  // -----------------------------------------------------------------------
  // Social links — only rendered when a real URL is configured.
  // -----------------------------------------------------------------------
  var SOCIAL_ICONS = { facebook: '📘', instagram: '📷', tiktok: '🎵', linkedin: '💼', youtube: '▶️' };
  var SOCIAL_LABELS = { facebook: 'Facebook', instagram: 'Instagram', tiktok: 'TikTok', linkedin: 'LinkedIn', youtube: 'YouTube' };

  function renderSocial(container) {
    var social = DATA.config.social || {};
    var links = Object.keys(social)
      .filter(function (key) { return !!social[key]; })
      .map(function (key) {
        return '<a class="unleashed-social-link" href="' + escapeHtml(social[key]) + '" target="_blank" rel="noopener" aria-label="RemoteAbility on ' + SOCIAL_LABELS[key] + '">' +
          '<span aria-hidden="true">' + SOCIAL_ICONS[key] + '</span> ' + SOCIAL_LABELS[key] +
        '</a>';
      });
    container.innerHTML = links.join('');
  }

  // -----------------------------------------------------------------------
  // Booking form: event-type checklist + commercial-arrangement options,
  // generated from data so the list only needs updating in one place.
  // -----------------------------------------------------------------------
  var EVENT_TYPES = [
    'Motorcycle rally', 'Motorcycle festival', 'Bike night', 'Car show',
    'Music festival', 'Fair or carnival', 'County show', 'Community event',
    'Christmas market', 'Bonfire Night event', 'Halloween event',
    'University event', 'Corporate event', 'Charity event', 'Other'
  ];

  function renderEventTypeOptions(select) {
    select.innerHTML = '<option value="">Select…</option>' +
      EVENT_TYPES.map(function (t) { return '<option value="' + escapeHtml(t) + '">' + escapeHtml(t) + '</option>'; }).join('');
  }

  // -----------------------------------------------------------------------
  // Pricing banner
  // -----------------------------------------------------------------------
  function renderPricing(container) {
    var p = DATA.config.pricing;
    container.innerHTML = p.options.map(function (o, i) {
      var cls = i === p.options.length - 1 ? 'unleashed-price-pill unleashed-price-pill-top' : 'unleashed-price-pill';
      return '<div class="' + cls + '"><span class="unleashed-price-amount">' + p.currency + o.price + '</span><span class="unleashed-price-label">' + escapeHtml(o.label) + '</span></div>';
    }).join('');
  }

  // -----------------------------------------------------------------------
  // Checklist
  // -----------------------------------------------------------------------
  function renderChecklist(container) {
    container.innerHTML = DATA.config.checklist.map(function (item) {
      return '<li><span class="check-bullet">✓</span><span>' + escapeHtml(item) + '</span></li>';
    }).join('');
  }

  // -----------------------------------------------------------------------
  // How it works
  // -----------------------------------------------------------------------
  function renderHowItWorks(container) {
    container.innerHTML = DATA.config.howItWorks.map(function (step, i) {
      return (
        '<div class="unleashed-step">' +
          '<div class="unleashed-step-num">' + (i + 1) + '</div>' +
          '<div class="unleashed-step-title">' + escapeHtml(step.title) + '</div>' +
          '<p class="unleashed-step-body">' + escapeHtml(step.body) + '</p>' +
        '</div>'
      );
    }).join('');
  }

  // -----------------------------------------------------------------------
  // Key features
  // -----------------------------------------------------------------------
  function renderKeyFeatures(container) {
    container.innerHTML = DATA.config.keyFeatures.map(function (f) {
      return '<li><span class="check-bullet">✓</span><span>' + escapeHtml(f) + '</span></li>';
    }).join('');
  }

  // -----------------------------------------------------------------------
  // Perfect for / Where the money goes — shared icon-card renderer
  // -----------------------------------------------------------------------
  function renderIconCards(container, items) {
    container.innerHTML = items.map(function (item) {
      return (
        '<div class="unleashed-icon-card">' +
          '<div class="unleashed-icon-card-emoji" aria-hidden="true">' + item.emoji + '</div>' +
          '<div class="unleashed-icon-card-label">' + escapeHtml(item.label) + '</div>' +
        '</div>'
      );
    }).join('');
  }

  // -----------------------------------------------------------------------
  // Init
  // -----------------------------------------------------------------------
  function init() {
    document.querySelectorAll('[data-unleashed="campaigns"]').forEach(renderCampaigns);
    document.querySelectorAll('[data-unleashed="events"]').forEach(renderEvents);
    document.querySelectorAll('[data-unleashed="fundraising"]').forEach(renderFundraising);
    document.querySelectorAll('[data-unleashed="faq"]').forEach(renderFaq);
    document.querySelectorAll('[data-unleashed="social"]').forEach(renderSocial);
    document.querySelectorAll('[data-unleashed="event-type-select"]').forEach(renderEventTypeOptions);
    document.querySelectorAll('[data-unleashed="pricing"]').forEach(renderPricing);
    document.querySelectorAll('[data-unleashed="checklist"]').forEach(renderChecklist);
    document.querySelectorAll('[data-unleashed="how-it-works"]').forEach(renderHowItWorks);
    document.querySelectorAll('[data-unleashed="key-features"]').forEach(renderKeyFeatures);
    document.querySelectorAll('[data-unleashed="perfect-for"]').forEach(function (n) { renderIconCards(n, DATA.config.perfectFor); });
    document.querySelectorAll('[data-unleashed="money-goes"]').forEach(function (n) { renderIconCards(n, DATA.config.moneyGoes); });
    document.querySelectorAll('.unleashed-age-info').forEach(function (n) { n.textContent = DATA.config.ageInfo; });

    document.querySelectorAll('.unleashed-hashtag').forEach(function (n) {
      n.textContent = DATA.config.hashtag;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
