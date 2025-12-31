# Local Development Guide

## Quick Start

### Option 1: Using the start script (Recommended)

```bash
./start.sh
```

This will:
1. Check if Node.js is installed
2. Install dependencies if needed
3. Start the server

### Option 2: Using npm commands

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start
```

### Option 3: Development mode with auto-reload

```bash
# Install dependencies (first time only)
npm install

# Start development server with nodemon
npm run dev
```

## Accessing the Site

Once the server is running, open your browser and navigate to:

- **Local:** http://localhost:3000
- **Network:** http://YOUR_IP_ADDRESS:3000 (check terminal output for exact URL)

## Making Changes

### HTML Changes
- Edit `index.html`
- Refresh your browser to see changes
- If using `npm run dev`, the server will auto-restart

### CSS Changes
- Edit `assets/css/modern.css`
- Refresh your browser to see changes
- Changes should be visible immediately (hard refresh: Cmd+Shift+R on Mac, Ctrl+F5 on Windows)

### JavaScript Changes
- Edit `assets/js/modern.js`
- Refresh your browser to see changes
- Check browser console (F12) for any errors

### Images
- Add images to the `images/` directory
- Reference them in HTML using relative paths: `images/your-image.jpg`

## Server Features

The Express server includes:
- **Compression:** Automatically compresses responses for faster loading
- **Security:** Helmet middleware for basic security headers
- **Static File Serving:** Serves all static files with proper caching headers
- **404 Handling:** Redirects to index.html for undefined routes
- **Error Handling:** Graceful error handling

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running.

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can change it:

```bash
PORT=8080 npm start
```

Or edit `server.js` and change the default PORT value.

### Dependencies Not Installing

Try clearing npm cache and reinstalling:

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Server Not Starting

1. Make sure Node.js is installed: `node --version`
2. Make sure you're in the correct directory
3. Check if dependencies are installed: `ls node_modules`
4. Try reinstalling dependencies: `npm install`

### Changes Not Showing

1. Hard refresh your browser: `Cmd+Shift+R` (Mac) or `Ctrl+F5` (Windows)
2. Clear browser cache
3. Check browser console for errors (F12)
4. Make sure you're editing the correct files

## Project Structure

```
.
├── index.html              # Main HTML file
├── server.js              # Express server configuration
├── package.json           # Dependencies and scripts
├── start.sh              # Quick start script
├── assets/
│   ├── css/
│   │   └── modern.css    # All styles
│   └── js/
│       └── modern.js     # All JavaScript
├── images/               # Images and photos
│   ├── my-pic.png       # Profile picture
│   └── g/               # Gallery photos
└── README.md            # Project documentation
```

## Development Workflow

1. **Start the server**
   ```bash
   npm start
   ```

2. **Make your changes** to HTML, CSS, or JavaScript files

3. **Test in browser**
   - Open http://localhost:3000
   - Refresh to see changes
   - Check console for errors

4. **Test responsive design**
   - Press F12 to open DevTools
   - Click the device toolbar icon
   - Test different screen sizes

5. **Commit your changes** (when ready)
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

## Testing Before Deployment

1. Test on different browsers (Chrome, Firefox, Safari)
2. Test on different screen sizes (mobile, tablet, desktop)
3. Check all links work
4. Verify images load correctly
5. Test all interactive features (navigation, gallery, etc.)

## Deploying to GitHub Pages

When you're ready to deploy:

```bash
# Make sure all changes are committed
git add .
git commit -m "Update website"

# Push to GitHub
git push origin master
```

GitHub Pages will automatically deploy your changes.

**Note:** Don't commit `node_modules/` or `package-lock.json` - they're already in `.gitignore`.

## Environment Variables

You can customize the server with environment variables:

```bash
# Change port
PORT=8080 npm start

# Set Node environment
NODE_ENV=production npm start
```

## Performance Tips

1. **Optimize Images**
   - Compress images before adding them
   - Use appropriate formats (WebP for photos, PNG for graphics)
   - Consider lazy loading for gallery images

2. **Minify Assets** (for production)
   - Minify CSS and JavaScript
   - Remove unused code
   - Combine files where appropriate

3. **Browser Caching**
   - The server already sets cache headers
   - Test with browser DevTools Network tab

## Need Help?

- Check the main [README.md](README.md) for general information
- Review the code comments in `server.js`, `modern.css`, and `modern.js`
- Check browser console for JavaScript errors
- Inspect Network tab in DevTools for loading issues

---

Happy coding! 🚀
