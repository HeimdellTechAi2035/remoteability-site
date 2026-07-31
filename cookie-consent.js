// UK ICO Compliant Cookie Consent Banner
// RemoteAbility CIC - 2025

(function() {
  'use strict';

  // Configuration
  const COOKIE_NAME = 'remoteability_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Cookie consent state
  let consentState = {
    necessary: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
    timestamp: null
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    checkExistingConsent();
  });

  // Check if user has already given consent
  function checkExistingConsent() {
    const consent = getCookie(COOKIE_NAME);
    
    if (consent) {
      try {
        consentState = JSON.parse(consent);
        applyCookieConsent();
      } catch (e) {
        // Invalid cookie, show banner
        showCookieBanner();
      }
    } else {
      // No consent yet, show banner
      showCookieBanner();
    }
  }

  // Show cookie consent banner
  window.showCookieBanner = function() {
    // Remove existing banner if present
    const existingBanner = document.getElementById('cookie-consent-banner');
    if (existingBanner) {
      existingBanner.remove();
    }

    // Create banner HTML
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-banner-title');
    banner.setAttribute('aria-describedby', 'cookie-banner-description');
    
    banner.innerHTML = `
      <div class="cookie-banner-content">
        <div class="cookie-banner-header">
          <h3 id="cookie-banner-title">🍪 We Value Your Privacy</h3>
          <p id="cookie-banner-description">
            We use cookies to enhance your experience, analyze site traffic, and personalize content. 
            You can choose which cookies to accept. Essential cookies are required for the site to function.
          </p>
        </div>
        
        <div class="cookie-banner-options">
          <div class="cookie-option">
            <label class="cookie-option-label">
              <input type="checkbox" checked disabled />
              <div class="cookie-option-info">
                <strong>Strictly Necessary</strong>
                <span>Required for the website to function. Cannot be disabled.</span>
              </div>
            </label>
          </div>
          
          <div class="cookie-option">
            <label class="cookie-option-label">
              <input type="checkbox" id="cookie-functional" />
              <div class="cookie-option-info">
                <strong>Functional</strong>
                <span>Remember your preferences and settings.</span>
              </div>
            </label>
          </div>
          
          <div class="cookie-option">
            <label class="cookie-option-label">
              <input type="checkbox" id="cookie-analytics" />
              <div class="cookie-option-info">
                <strong>Analytics</strong>
                <span>Help us understand how visitors use our website.</span>
              </div>
            </label>
          </div>
          
          <div class="cookie-option">
            <label class="cookie-option-label">
              <input type="checkbox" id="cookie-marketing" />
              <div class="cookie-option-info">
                <strong>Marketing</strong>
                <span>Used to display relevant advertisements.</span>
              </div>
            </label>
          </div>
        </div>
        
        <div class="cookie-banner-actions">
          <button type="button" class="btn-outline cookie-btn" onclick="rejectAllCookies()">
            Reject All
          </button>
          <button type="button" class="btn-outline cookie-btn" onclick="saveCustomCookiePreferences()">
            Save My Preferences
          </button>
          <button type="button" class="btn-primary cookie-btn" onclick="acceptAllCookies()">
            Accept All
          </button>
        </div>
        
        <div class="cookie-banner-footer">
          <p>
            By clicking "Accept All", you consent to our use of cookies. 
            Read our <a href="cookie-policy.html" target="_blank">Cookie Policy</a> and 
            <a href="privacy-policy.html" target="_blank">Privacy Policy</a> for more information.
          </p>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    // Prevent scrolling when banner is shown
    document.body.style.overflow = 'hidden';
    
    // Set ARIA live region
    banner.setAttribute('aria-live', 'polite');
  };

  // Accept all cookies
  window.acceptAllCookies = function() {
    consentState = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    
    saveConsent();
    hideBanner();
    applyCookieConsent();
  };

  // Reject all non-essential cookies
  window.rejectAllCookies = function() {
    consentState = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    
    saveConsent();
    hideBanner();
    applyCookieConsent();
  };

  // Save custom preferences
  window.saveCustomCookiePreferences = function() {
    consentState = {
      necessary: true,
      functional: document.getElementById('cookie-functional')?.checked || false,
      analytics: document.getElementById('cookie-analytics')?.checked || false,
      marketing: document.getElementById('cookie-marketing')?.checked || false,
      timestamp: new Date().toISOString()
    };
    
    saveConsent();
    hideBanner();
    applyCookieConsent();
  };

  // Save consent to cookie
  function saveConsent() {
    const consentString = JSON.stringify(consentState);
    setCookie(COOKIE_NAME, consentString, COOKIE_EXPIRY_DAYS);
  }

  // Hide banner
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease-out';
      setTimeout(() => {
        banner.remove();
        document.body.style.overflow = '';
      }, 300);
    }
  }

  // Apply cookie consent (load scripts based on consent)
  function applyCookieConsent() {
    // Analytics
    if (consentState.analytics) {
      loadGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }

    // Marketing
    if (consentState.marketing) {
      // Load marketing scripts here
    }

    // Functional
    if (consentState.functional) {
      // Enable functional features
    }
  }

  // Google Analytics integration (example)
  function loadGoogleAnalytics() {
    // Only load if GA_MEASUREMENT_ID is defined
    if (typeof GA_MEASUREMENT_ID !== 'undefined') {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure'
      });
    }
  }

  function disableGoogleAnalytics() {
    if (typeof GA_MEASUREMENT_ID !== 'undefined') {
      window['ga-disable-' + GA_MEASUREMENT_ID] = true;
    }
  }

  // Cookie utility functions
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax;Secure`;
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Expose consent state for debugging
  window.getCookieConsent = function() {
    return consentState;
  };

})();
