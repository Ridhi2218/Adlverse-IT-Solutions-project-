# Adlverse Website

Static marketing website for Adlverse technology consulting and engineering services.

## Files

```text
zotech-homepage/
|-- index.html
|-- about.html
|-- style.css
|-- script.js
|-- images/
`-- README.md
```

## Run Locally

```bash
cd zotech-homepage
python -m http.server 4173
```

Open `http://localhost:4173`.

## Notes

- The site has no build step.
- Shared navigation, footer, page sections, cards, and responsive behavior are handled in `style.css`.
- Interactive behavior is limited to the mobile menu, sticky header state, progress bars, and back-to-top button.
- External dependencies are Google Fonts and Font Awesome via CDN.
