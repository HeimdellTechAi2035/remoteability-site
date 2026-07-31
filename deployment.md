# DEPLOYMENT INSTRUCTIONS

## Quick Rename Guide

Before deploying your website, you need to rename the main HTML file:

### Windows PowerShell:
```powershell
Rename-Item "remote_ability_cic_full_website_v_1.html" "index.html"
```

### Or manually:
1. Right-click on `remote_ability_cic_full_website_v_1.html`
2. Select "Rename"
3. Change the name to `index.html`
4. Press Enter

## Files Checklist

Your website folder should contain:
- ✅ `index.html` (renamed from remote_ability_cic_full_website_v_1.html)
- ✅ `styles.css` - External stylesheet
- ✅ `script.js` - JavaScript file
- ✅ `form-handler.php` - Form processing (if using PHP)
- ✅ `thank-you.html` - Form success page
- ✅ `404.html` - Error page
- ✅ `robots.txt` - SEO file
- ✅ `sitemap.xml` - SEO sitemap
- ✅ `.htaccess` - For Apache servers
- ✅ `web.config` - For IIS/Windows servers
- ✅ Logo image file
- ✅ `RemoteAbility policies/` folder with all policy documents
- ✅ `RemoteAbility CIC BP.pdf` - Business plan

## Next Steps

1. **Rename the HTML file** (see above)
2. **Update the HTML to use external files**:
   - The current HTML still has inline styles
   - You can either:
     a) Use the current version (works fine, just larger file)
     b) Or manually replace the `<style>` section with `<link rel="stylesheet" href="styles.css" />`
     c) And replace the `<script>` section at the bottom with `<script src="script.js"></script>`

3. **Configure form handling**:
   - Edit `form-handler.php` and update email addresses
   - OR use Netlify (form already configured)
   - OR use a service like Formspree

4. **Update placeholder content**:
   - All URLs reference `remoteability.org` - update with your actual domain
   - Email addresses are set to `@remoteability.org` - update when ready

5. **Deploy** to your chosen platform

See README.md for full deployment instructions!
