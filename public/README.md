# Frontend Structure

This folder contains the frontend for your single page application using Bootstrap.

## Folder Structure

```
public/
├── index.html          # Main HTML file with Bootstrap setup
├── css/
│   └── styles.css      # Custom CSS styles (override Bootstrap or add new styles)
├── js/
│   └── app.js          # Custom JavaScript for your application logic
└── assets/
    └── README.md       # Documentation for static assets
```

## What Goes Where

### `index.html`
- Main entry point for your single page application
- Already includes Bootstrap 5.3.2 CSS and JavaScript
- Contains basic HTML structure with Bootstrap container
- Links to your custom CSS and JavaScript files

### `css/styles.css`
- Add your custom CSS here
- Override Bootstrap default styles
- Create custom component styles
- Add responsive design adjustments

### `js/app.js`
- Your application's JavaScript logic
- API calls to your backend
- DOM manipulation
- Event handlers
- Bootstrap component interactions

### `assets/`
- Static files like images, documents, media
- Organize in subfolders (images/, documents/, media/)
- Reference these in your HTML/CSS as needed

## Getting Started

1. Your backend server now serves static files from this folder
2. Run your server with `npm run dev`
3. Access your frontend at `http://localhost:8080`
4. Start building your application by editing the files above

## Bootstrap Documentation

- [Bootstrap 5.3 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Components](https://getbootstrap.com/docs/5.3/components/alerts/)
- [Bootstrap Utilities](https://getbootstrap.com/docs/5.3/utilities/api/)

## Notes

- The project uses Bootstrap 5.3.2 from CDN (no local installation needed)
- All files are minimal and ready for you to expand
- The backend is configured to serve these static files automatically
