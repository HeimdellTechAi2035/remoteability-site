# RemoteAbility CIC Website

Official website for RemoteAbility CIC - A UK Community Interest Company helping disabled people, those with mental health conditions, neurodivergent individuals, and those with long-term health conditions into meaningful, remote-first employment.

## 📋 Project Overview

This is a single-page, responsive website built with:
- **HTML5** - Semantic markup with accessibility in mind
- **CSS3** - Modern responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript** - Lightweight interactions, no framework dependencies
- **PHP** - Server-side form handling (optional - can use alternatives)

## 🚀 Quick Start

### Option 1: Static Hosting (Netlify, Vercel, GitHub Pages)

1. Upload all files to your hosting platform
2. Set `index.html` as your main file (rename `remote_ability_cic_full_website_v_1.html` to `index.html`)
3. For form handling on Netlify, the form already has `data-netlify="true"`
4. For other platforms, see "Form Setup" below

### Option 2: Traditional Web Hosting (with PHP support)

1. Upload all files to your web server via FTP/SFTP
2. Rename `remote_ability_cic_full_website_v_1.html` to `index.html`
3. Update the form action in `index.html`:
   ```html
   <form name="remoteability-contact" method="POST" action="form-handler.php">
   ```
4. Configure email addresses in `form-handler.php`
5. Ensure your server has PHP 7.0+ with mail() function enabled

### Option 3: Local Development

1. For a simple preview:
   ```powershell
   # Using Python (if installed)
   python -m http.server 8000
   
   # Or using PHP
   php -S localhost:8000
   ```
2. Open browser to `http://localhost:8000`

## 📁 File Structure

```
remoteability cic/
│
├── index.html                          # Main website file (rename from remote_ability_cic_full_website_v_1.html)
├── styles.css                          # All styles (extracted for performance)
├── script.js                           # JavaScript for navigation and interactions
├── form-handler.php                    # PHP form processor
├── thank-you.html                      # Form success page
├── 404.html                            # Error page
├── robots.txt                          # Search engine crawler instructions
├── sitemap.xml                         # Site structure for SEO
├── 853fe3df...jpg                      # Logo image
├── RemoteAbility CIC BP.pdf            # Business plan
│
└── RemoteAbility policies/             # Policy documents
    ├── RemoteAbility_CIC_Accessibility_and_Adjustments_Policy.docx
    ├── RemoteAbility_CIC_Equality_Diversity_Inclusion_Policy.docx
    ├── RemoteAbility_CIC_Privacy_Policy.docx
    └── ... (all other policy documents)
```

## 📧 Form Setup

### Using PHP (Traditional Hosting)

1. Edit `form-handler.php`:
   ```php
   $to_email = "your-actual-email@remoteability.org";
   $from_email = "noreply@remoteability.org";
   ```

2. Update form in HTML:
   ```html
   <form name="remoteability-contact" method="POST" action="form-handler.php">
   ```

### Using Netlify (Recommended for Static Sites)

Form is already configured with `data-netlify="true"`. Just deploy to Netlify and forms will work automatically.

### Using Third-Party Service (Formspree, Basin, etc.)

1. Sign up for a form service
2. Replace form action with their endpoint
3. Remove `data-netlify="true"` attribute

Example with Formspree:
```html
<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
```

## 🎨 Customization

### Update Colors

Edit CSS variables in `styles.css`:
```css
:root {
  --accent: #38bdf8;        /* Primary accent color */
  --accent-2: #a855f7;      /* Secondary accent */
  --text: #e5e7eb;          /* Main text color */
  --muted: #9ca3af;         /* Muted text */
}
```

### Update Logo

Replace `853fe3df-738f-4225-9e86-e8d76c78595d_20251009_092640_0000 (5).jpg` with your logo and update references in:
- `index.html` (favicon and brand mark)
- `404.html` (favicon)
- `thank-you.html` (favicon)

### Update Contact Information

Search for `@remoteability.org` in files and replace with your actual domain/emails.

## 🔍 SEO Configuration

### Update sitemap.xml

Replace `https://www.remoteability.org` with your actual domain throughout the file.

### Update Structured Data

In `index.html`, update the JSON-LD schema:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "RemoteAbility CIC",
  "url": "https://YOUR-ACTUAL-DOMAIN.org",
  ...
}
</script>
```

### Google Search Console

1. Add your domain to Google Search Console
2. Submit your `sitemap.xml`
3. Monitor indexing and performance

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and states
- Keyboard navigation support (Escape to close mobile menu)
- Focus indicators
- Screen reader friendly
- Responsive design for all devices

### Testing Accessibility

Use these tools:
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Lighthouse in Chrome DevTools

## 🌐 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 📱 Responsive Breakpoints

- Desktop: 961px and above
- Tablet: 641px - 960px
- Mobile: 640px and below

## 🔒 Security Considerations

1. **Form Spam Protection**: Add honeypot field or CAPTCHA
2. **HTTPS**: Always use SSL certificate
3. **Email Configuration**: Use proper SPF/DKIM records
4. **File Permissions**: Set appropriate permissions on PHP files (644)
5. **Regular Updates**: Keep server software updated

## 📦 Deployment Checklist

- [ ] Rename `remote_ability_cic_full_website_v_1.html` to `index.html`
- [ ] Update all email addresses from placeholders
- [ ] Update domain URLs in sitemap.xml
- [ ] Update canonical URLs and Open Graph tags
- [ ] Configure form handling (PHP or service)
- [ ] Test contact form submission
- [ ] Add SSL certificate
- [ ] Submit sitemap to Google Search Console
- [ ] Test on multiple devices and browsers
- [ ] Run accessibility audit
- [ ] Optimize images if needed
- [ ] Set up email forwarding/accounts

## 🆘 Troubleshooting

### Form not sending emails

- Check PHP mail() is enabled on server
- Verify email addresses are correct
- Check spam folder
- Review server error logs
- Consider using SMTP instead of mail()

### Styles not loading

- Ensure `styles.css` is in the same directory as HTML
- Check file permissions (644)
- Clear browser cache
- Verify CSS link in HTML is correct

### Mobile menu not working

- Check `script.js` is loaded
- Verify no JavaScript console errors
- Ensure proper file paths

## 📄 License

© RemoteAbility CIC. All rights reserved.

## 📞 Support

For technical issues with this website:
- Email: info@remoteability.org
- Check the Issues section if this is on GitHub

---

**Built with ❤️ for accessibility and inclusion**
