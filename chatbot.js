// RemoteAbility CIC - Customer Service Bot
// Rule-based FAQ matching built entirely from the site's own content.
// No external API, no data leaves the browser.

(function () {
  'use strict';

  // ---------------------------------------------------------------------
  // Knowledge base
  // ---------------------------------------------------------------------
  var KB = [
    {
      keywords: ['what is remoteability', 'who are you', 'about remoteability', 'what do you do', 'mission', 'what is this'],
      answer: "RemoteAbility CIC is a UK Community Interest Company that helps homeless, disabled and neurodivergent people, and people recovering from addiction, move from crisis to independence. We support people through housing, recovery, employment and self-employment — with active, person-centred help, not just a phone number. <a href=\"about.html\">Read more about us →</a>"
    },
    {
      keywords: ['who is eligible', 'who can join', 'who do you help', 'who do you support', 'can i join', 'am i eligible', 'qualify'],
      answer: "Our support is open to people sleeping rough, people in temporary accommodation, people at risk of homelessness, disabled people, neurodivergent people, people recovering from addiction, and anyone who struggles with conventional employment. You don't need to fit every category — if you're not sure, <a href=\"contact.html\">get in touch</a> and we'll help you figure it out."
    },
    {
      keywords: ['pathway', 'four stage', '4 stage', 'safe stable ready independent', 'how does it work', 'programme model', 'program model', 'stages'],
      answer: "We use a four-stage Pathway to Independence: <strong>Safe</strong> (urgent housing, recovery and crisis support), <strong>Stable</strong> (benefits, health, documentation and routine), <strong>Ready</strong> (confidence, skills and work preparation), and <strong>Independent</strong> (employment, freelancing or business ownership). You can join and get support at any stage — you don't have to start at the beginning. <a href=\"programmes.html\">See the full Pathway →</a>"
    },
    {
      keywords: ['urgent', 'emergency', 'crisis', 'sleeping rough', 'homeless now', 'help now', 'need help now', 'in danger', 'right now'],
      answer: "If you're in immediate danger, please call <a href=\"tel:999\"><strong>999</strong></a>. For support with housing, benefits or a crisis right now (not an emergency), visit our <a href=\"support.html\">I Need Support</a> page — it only takes a few minutes and we aim to respond within 24 hours for urgent safety concerns. You can also see the emergency numbers panel above at any time."
    },
    {
      keywords: ['refer someone', 'refer a', 'referral', 'know someone who needs help', 'i want to refer'],
      answer: "You can refer someone using our <a href=\"refer.html\">Refer Someone</a> page — it's open to professionals (Jobcentre, council, charity, support worker) as well as family and friends. We'll follow up directly within 2 working days, or 24 hours for urgent safety concerns."
    },
    {
      keywords: ['training', 'six week', '6 week', 'course', 'learn', 'skills programme', 'what will i learn'],
      answer: "Our free Six-Week Pathway to Independence Programme is delivered in three two-week stages: <strong>Safe and Stable</strong> (Weeks 1-2, assessment and stabilisation), <strong>Ready and Skilled</strong> (Weeks 3-4, confidence, digital skills and safe AI use), and <strong>Work and Independence</strong> (Weeks 5-6, real job applications, sales skills, and a 90-day plan). <a href=\"training.html\">See the full programme →</a>"
    },
    {
      keywords: ['free', 'cost', 'price', 'how much', 'pay', 'charge'],
      answer: "All of our support and training is completely free to participants. There's no cost to you at any stage of the Pathway to Independence."
    },
    {
      keywords: ['apply', 'sign up', 'join the programme', 'how do i start', 'get started', 'application'],
      answer: "You can apply for the Six-Week Pathway to Independence Programme on our <a href=\"apply.html\">Apply</a> page. If you need urgent help with housing, benefits or a crisis first, visit <a href=\"support.html\">I Need Support</a> instead — training is for when you're stable and ready."
    },
    {
      keywords: ['partner', 'employer', 'hire', 'funder', 'commissioner', 'business', 'work with you', 'sponsor'],
      answer: "We partner with employers, referral organisations (councils, charities, housing providers) and funders/commissioners. Current employment partners include Heimdell Tech AI (Sales roles) and GreenFix Exterior Care (exterior maintenance roles). <a href=\"employers.html\">See Partner With Us →</a>"
    },
    {
      keywords: ['contact', 'email', 'phone number', 'call you', 'get in touch', 'reach you'],
      answer: "General enquiries: <a href=\"mailto:contact@remoteability.org.uk\">contact@remoteability.org.uk</a><br>Safeguarding: <a href=\"mailto:safeguarding@remoteability.org.uk\">safeguarding@remoteability.org.uk</a><br>Partnerships: <a href=\"mailto:outreach@remoteability.org.uk\">outreach@remoteability.org.uk</a><br>Phone: <a href=\"tel:+447418008279\">+44 7418 008279</a><br>We aim to respond within 2 working days (24 hours for urgent safeguarding concerns). <a href=\"contact.html\">Full contact page →</a>"
    },
    {
      keywords: ['safeguarding', 'abuse', 'worried about someone', 'report a concern', 'unsafe'],
      answer: "If you have a safeguarding concern, email <a href=\"mailto:safeguarding@remoteability.org.uk\">safeguarding@remoteability.org.uk</a> — we respond within 24 hours. If someone is in immediate danger, call <a href=\"tel:999\"><strong>999</strong></a>. <a href=\"safeguarding-policy.html\">Read our full Safeguarding Policy →</a>"
    },
    {
      keywords: ['benefits', 'universal credit', 'pip', 'esa', 'will i lose my benefits', 'permitted work'],
      answer: "It depends on your personal situation. We offer guidance on Universal Credit, ESA, PIP and Permitted Work rules to help you stay compliant while training or earning, and we'll support you through the process. <a href=\"contact.html\">Ask us directly →</a>"
    },
    {
      keywords: ['do you provide housing', 'do you provide accommodation', 'do you do rehab', 'clinical rehabilitation', 'give me a house', 'find me a home'],
      answer: "No — RemoteAbility does not provide emergency accommodation or clinical rehabilitation directly. What we do is help you access the right services: we contact the council with you, complete applications, gather evidence, and stay involved until you reach the right support. <a href=\"support.html\">I Need Support →</a>"
    },
    {
      keywords: ['success stories', 'case studies', 'examples', 'has it worked', 'testimonials'],
      answer: "Yes — you can read real outcomes from people who completed the programme on our <a href=\"success-stories.html\">Success Stories</a> page."
    },
    {
      keywords: ['privacy', 'data', 'gdpr', 'my information', 'personal data'],
      answer: "We take data protection seriously and comply with UK GDPR. Full details on what we collect and why are in our <a href=\"privacy-policy.html\">Privacy Policy</a>. For data protection questions, email <a href=\"mailto:admin@remoteability.org.uk\">admin@remoteability.org.uk</a>."
    },
    {
      keywords: ['cookie', 'cookies'],
      answer: "See our <a href=\"cookie-policy.html\">Cookie Policy</a> for details, or click \"Cookie Settings\" in the footer to change your preferences any time."
    },
    {
      keywords: ['where are you', 'location', 'area', 'which areas', 'uk wide', 'nationwide', 'remote'],
      answer: "RemoteAbility CIC is based in Preston, Lancashire, but we support people anywhere in the United Kingdom — everything is delivered remotely."
    },
    {
      keywords: ['experience', 'qualifications', 'do i need experience', 'beginner'],
      answer: "No experience or qualifications are needed. The Six-Week Pathway to Independence Programme is designed for complete beginners, with full support for homeless, disabled and neurodivergent learners."
    },
    {
      keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      answer: "Hello! I'm the RemoteAbility assistant. I can answer questions about our Pathway to Independence, training programme, how to apply, refer someone, or partner with us. What would you like to know?"
    },
    {
      keywords: ['thank', 'thanks', 'cheers', 'appreciate'],
      answer: "You're welcome. If you need anything else, I'm here — or you can always <a href=\"contact.html\">contact the team directly</a>."
    }
  ];

  var FALLBACK = "I'm not sure I've got the right answer for that. You can ask me about the Pathway to Independence, the training programme, applying, referring someone, partnering with us, or contact details — or <a href=\"contact.html\">contact the team directly</a> and a person will help. If this is urgent, use the Emergency Help button above.";

  var QUOTES = [
    "Every step forward counts, no matter how small.",
    "You are not alone in this — support is here.",
    "Asking for help is a sign of strength, not weakness.",
    "Recovery and progress aren't a straight line, and that's okay.",
    "Today is one step closer to a more stable tomorrow.",
    "Your situation right now does not define who you are.",
    "Small progress is still real progress.",
    "You matter, and so does your story.",
    "It's okay to rest. It's okay to start again.",
    "Things can get better — and you don't have to find the way alone."
  ];

  var QUICK_REPLIES = [
    'Who is eligible?',
    'What is the Pathway to Independence?',
    'I need help right now',
    'How do I apply?',
    'Is it free?',
    'How do I refer someone?'
  ];

  var EMERGENCY_HTML =
    '<div class="chatbot-emergency-list">' +
    '<div class="chatbot-emergency-item"><strong>Immediate danger</strong><span><a href="tel:999">999</a></span></div>' +
    '<div class="chatbot-emergency-item"><strong>Samaritans (emotional support, 24/7)</strong><span><a href="tel:116123">116 123</a></span></div>' +
    '<div class="chatbot-emergency-item"><strong>National Domestic Abuse Helpline</strong><span><a href="tel:08082000247">0808 2000 247</a></span></div>' +
    '<div class="chatbot-emergency-item"><strong>Shelter housing helpline</strong><span><a href="tel:08088004444">0808 800 4444</a></span></div>' +
    '<div class="chatbot-emergency-item"><strong>FRANK drugs & alcohol advice</strong><span><a href="tel:03001236600">0300 123 6600</a></span></div>' +
    '<div class="chatbot-emergency-item"><strong>NHS non-emergency</strong><span><a href="tel:111">111</a></span></div>' +
    '<div class="chatbot-emergency-item"><strong>Police non-emergency</strong><span><a href="tel:101">101</a></span></div>' +
    '<div class="chatbot-emergency-item"><strong>RemoteAbility safeguarding</strong><span><a href="mailto:safeguarding@remoteability.org.uk">safeguarding@remoteability.org.uk</a></span></div>' +
    '</div>' +
    '<p class="chatbot-emergency-note">These numbers are free to call from a UK phone. Tap a number to call it directly. If you\'re not sure who to call, <a href="support.html">visit I Need Support</a> and we\'ll help you work it out.</p>';

  // ---------------------------------------------------------------------
  // Matching engine
  // ---------------------------------------------------------------------
  function normalise(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function findAnswer(userText) {
    var input = normalise(userText);
    if (!input) return null;

    var best = null;
    var bestScore = 0;

    for (var i = 0; i < KB.length; i++) {
      var entry = KB[i];
      var score = 0;
      for (var j = 0; j < entry.keywords.length; j++) {
        var kw = entry.keywords[j];
        if (input.indexOf(kw) !== -1) {
          score += kw.split(' ').length; // longer phrase matches score higher
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }

    return best ? best.answer : null;
  }

  // ---------------------------------------------------------------------
  // UI
  // ---------------------------------------------------------------------
  function buildWidget() {
    var root = document.createElement('div');
    root.id = 'ra-chatbot';
    root.innerHTML =
      '<button type="button" id="ra-chatbot-launcher" aria-label="Open help chat" aria-expanded="false">' +
      '<span class="ra-chatbot-launcher-icon">💬</span>' +
      '</button>' +
      '<div id="ra-chatbot-panel" role="dialog" aria-label="RemoteAbility help chat" hidden>' +
      '<div class="chatbot-header">' +
      '<div>' +
      '<strong>RemoteAbility Help</strong>' +
      '<span>Ask a question, or get urgent help</span>' +
      '</div>' +
      '<button type="button" id="ra-chatbot-close" aria-label="Close chat">✕</button>' +
      '</div>' +
      '<div class="chatbot-quote-carousel" id="ra-chatbot-quote" aria-live="polite">' +
      '<button type="button" class="chatbot-quote-nav" id="ra-chatbot-quote-prev" aria-label="Previous thought">‹</button>' +
      '<p class="chatbot-quote-text" id="ra-chatbot-quote-text"></p>' +
      '<button type="button" class="chatbot-quote-nav" id="ra-chatbot-quote-next" aria-label="Next thought">›</button>' +
      '</div>' +
      '<button type="button" id="ra-chatbot-emergency-btn">🆘 Emergency &amp; Urgent Help</button>' +
      '<div class="chatbot-messages" id="ra-chatbot-messages"></div>' +
      '<div class="chatbot-quick-replies" id="ra-chatbot-quick-replies"></div>' +
      '<form class="chatbot-input-row" id="ra-chatbot-form">' +
      '<label class="sr-only" for="ra-chatbot-input">Type your question</label>' +
      '<input type="text" id="ra-chatbot-input" placeholder="Type your question..." autocomplete="off" />' +
      '<button type="submit" aria-label="Send">→</button>' +
      '</form>' +
      '</div>';
    document.body.appendChild(root);
  }

  function addMessage(text, from) {
    var messages = document.getElementById('ra-chatbot-messages');
    var bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble chatbot-bubble-' + from;
    bubble.innerHTML = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  function renderQuickReplies() {
    var wrap = document.getElementById('ra-chatbot-quick-replies');
    wrap.innerHTML = '';
    QUICK_REPLIES.forEach(function (q) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chatbot-chip';
      chip.textContent = q;
      chip.addEventListener('click', function () {
        handleUserMessage(q);
      });
      wrap.appendChild(chip);
    });
  }

  function handleUserMessage(text) {
    if (!text || !text.trim()) return;
    addMessage(escapeHtml(text), 'user');
    var answer = findAnswer(text);
    setTimeout(function () {
      addMessage(answer || FALLBACK, 'bot');
    }, 250);
    var input = document.getElementById('ra-chatbot-input');
    if (input) input.value = '';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function openPanel() {
    var panel = document.getElementById('ra-chatbot-panel');
    var launcher = document.getElementById('ra-chatbot-launcher');
    panel.hidden = false;
    launcher.setAttribute('aria-expanded', 'true');
    if (!panel.dataset.greeted) {
      addMessage("Hi, I'm the RemoteAbility assistant. I can help with questions about our Pathway to Independence, training, applying, referring someone, or partnering with us. If this is urgent, tap \"Emergency & Urgent Help\" above.", 'bot');
      renderQuickReplies();
      panel.dataset.greeted = 'true';
    }
    var input = document.getElementById('ra-chatbot-input');
    if (input) input.focus();
  }

  var quoteIndex = Math.floor(Math.random() * QUOTES.length);
  var quoteTimer = null;

  function renderQuote() {
    var el = document.getElementById('ra-chatbot-quote-text');
    if (el) el.textContent = QUOTES[quoteIndex];
  }

  function nextQuote() {
    quoteIndex = (quoteIndex + 1) % QUOTES.length;
    renderQuote();
  }

  function prevQuote() {
    quoteIndex = (quoteIndex - 1 + QUOTES.length) % QUOTES.length;
    renderQuote();
  }

  function startQuoteCarousel() {
    renderQuote();
    if (quoteTimer) clearInterval(quoteTimer);
    quoteTimer = setInterval(nextQuote, 7000);
  }

  function closePanel() {
    document.getElementById('ra-chatbot-panel').hidden = true;
    document.getElementById('ra-chatbot-launcher').setAttribute('aria-expanded', 'false');
  }

  function init() {
    buildWidget();

    document.getElementById('ra-chatbot-launcher').addEventListener('click', function () {
      var panel = document.getElementById('ra-chatbot-panel');
      if (panel.hidden) { openPanel(); } else { closePanel(); }
    });

    document.getElementById('ra-chatbot-close').addEventListener('click', function () {
      closePanel();
    });

    document.getElementById('ra-chatbot-quote-prev').addEventListener('click', function () {
      prevQuote();
      startQuoteCarousel();
    });

    document.getElementById('ra-chatbot-quote-next').addEventListener('click', function () {
      nextQuote();
      startQuoteCarousel();
    });

    startQuoteCarousel();

    document.getElementById('ra-chatbot-emergency-btn').addEventListener('click', function () {
      addMessage('🆘 Emergency &amp; Urgent Help', 'user');
      addMessage(EMERGENCY_HTML, 'bot');
    });

    document.getElementById('ra-chatbot-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('ra-chatbot-input');
      handleUserMessage(input.value);
    });

    document.addEventListener('keydown', function (e) {
      var panel = document.getElementById('ra-chatbot-panel');
      if (e.key === 'Escape' && panel && !panel.hidden) {
        closePanel();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
