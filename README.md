# Cyprain Henry Portfolio - Vanilla JavaScript Version

This is a vanilla JavaScript version of the Cyprain Henry portfolio website, converted from the original TypeScript/React implementation.

## Features

✨ **Modern Design**: Clean, minimalist portfolio design with smooth animations
🎨 **Tailwind CSS**: Beautiful utility-first CSS framework via CDN
🎭 **Smooth Animations**: Fade-in-up, staggered animations on scroll
📱 **Fully Responsive**: Mobile-first design that looks great on all devices
⚡ **Vanilla JavaScript**: No framework dependencies, lightweight and fast
🔗 **Smooth Scrolling**: Smooth scroll behavior for navigation
🎯 **Intersection Observer**: Efficient scroll-based animations
📊 **Portfolio Showcase**: 4 featured project cards with tags
🔌 **Social Links**: Direct links to GitHub, LinkedIn, Twitter, Instagram, and Email

## Structure

```
app-js/
├── index.html       # Main HTML file with Tailwind CSS and Lucide Icons CDN
├── styles.css       # Custom CSS styles and animations
├── script.js        # Main application logic and rendering
└── README.md        # This file
```

## Files Explanation

### index.html
- Entry point for the application
- Links to external CDNs:
  - **Tailwind CSS** - For utility-first styling
  - **Lucide Icons** - For beautiful icons
- Creates a root div where the app renders

### styles.css
- CSS custom properties for theming (light and dark modes)
- Custom animations (fadeInUp, slideIn, float, bounce)
- Component styles (badges, buttons, cards, social links)
- Glass morphism effects
- Hover lift effects
- Custom scrollbar styling

### script.js
- Portfolio and social links data
- App initialization and rendering
- Event listeners for navigation
- Scroll detection for navbar effects
- Intersection Observer for scroll animations
- Icon rendering using Lucide

## How to Use

### Local Development

1. Navigate to the `app-js` folder:
   ```bash
   cd app-js
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js with http-server
   npx http-server
   
   # Using VS Code Live Server extension
   # Right-click on index.html and select "Open with Live Server"
   ```

3. Open http://localhost:8000 (or the provided URL) in your browser

### Production Deployment

The vanilla JavaScript version requires minimal setup for deployment:

1. **No build step needed** - It's pure JavaScript, HTML, and CSS
2. **Copy all files** to your hosting server:
   - index.html
   - styles.css
   - script.js

3. **Dependencies** are served from CDNs:
   - Tailwind CSS from CDN
   - Lucide Icons from CDN

### Customization

**Change Content:**
- Edit the data in `script.js`:
  - `portfolioItems` - Portfolio projects
  - `socialLinks` - Social media links
  - Update the footer year automatically updates

**Modify Styling:**
- Edit `styles.css` for custom styles
- Modify Tailwind classes in the HTML template in `script.js`
- Update CSS custom properties (variables) in `:root` for theming

**Update Colors & Theme:**
Edit the CSS custom properties in `styles.css`:
```css
:root {
  --primary: 0 0% 9%;           /* Dark color */
  --background: 0 0% 98%;       /* Light background */
  /* ... more colors ... */
}
```

**Dark Mode:**
The styles already support dark mode (CSS custom properties). To enable it:
- Add `dark` class to the body element
- Update CSS in `:root .dark` section

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6 support
- CSS Grid and Flexbox support

## Performance

- **No build process** - Instant rendering
- **Lightweight** - Only 3 files (~30KB total)
- **CDN dependencies** - Cached by browsers
- **Intersection Observer** - Efficient scroll animations
- **Passive event listeners** - Optimized scroll performance

## Comparison with React Version

### React Version (src/)
- TypeScript with type safety
- Component-based architecture
- Build process required
- Larger bundle size
- Hot module replacement

### Vanilla JS Version (app-js/)
- Pure JavaScript
- Single-file logic in script.js
- No build process
- Smaller bundle size
- Simple and straightforward

## Differences from React Version

1. **No React dependencies** - Uses vanilla JavaScript with Intersection Observer API
2. **Dynamic rendering** - Content rendered as HTML strings in JavaScript
3. **Icon rendering** - Uses Lucide's JavaScript API for icons
4. **State management** - Simple JavaScript variables instead of React state
5. **Event handling** - Native DOM event listeners instead of React event handlers

## Future Enhancements

- Add dark mode toggle button
- Smooth scroll polyfill for older browsers
- Preload images for portfolio items
- Add form validation for contact section
- Add pagination or filtering for portfolio
- Service Worker for offline support
- Analytics integration

## License

This project is part of the Cyprain Henry portfolio. All rights reserved.

## Support

For issues or questions, please refer to the main React version documentation or contact the developer.
