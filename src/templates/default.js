import packageJson from '../../package.json'

export default (html) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="manifest" href="manifest.json">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${packageJson.name}</title>
        <meta name="description" content="${packageJson.description}">
        <meta name="keywords" content="${packageJson.keywords.join(", ")}">
        <link rel="apple-touch-icon" href="./assets/start152x152.png">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="apple-mobile-web-app-title" content="Event Timeline PWA">
        <meta name="theme-color" content="#2F3BA2" />
        <meta name="color-scheme" content="light dark" />
        <style>
            html, body {
                height: 100%;
                width: 100%;
                margin: 0;
                font-family: helvetica;
            }
        </style>
    </head>
    <body>
        <div id="root">
            ${html}
        </div>
        <script type="module" src="client.js" async></script>
    </body>
    </html>
`