import { h } from 'preact'
import renderToString from 'preact-render-to-string'
import path from 'path'

import pages from './pages/index'
import htmlShell from './templates/default'



// FASTIFY CONFIG
const fastify = require('fastify')
const fastifyStatic = require('@fastify/static')
const app = fastify({ logger: true })
app.register(fastifyStatic, {
    root: path.join(__dirname, '../public')
})


// ROUTES
pages.forEach(page =>
    app.route({
        method: 'GET',
        url: page.route,
        schema: {
            response: {
                200: {
                    type: 'string'
                }
            }
        },
        handler: function (request, response) {
            response.header('Content-Type', 'text/html; charset=utf-8')
            return htmlShell(renderToString(<page.component />))
        }
    })
)

// START SERVER
const start = async () => {
    try {
        await app.listen({ port: 3000 })
    } catch (e) {
        app.log.error(e)
        process.exit(1)
    }
}
start()




// import express from 'express';
// import { h } from 'preact';
// import renderToString from 'preact-render-to-string';
// import path from 'path';
// import pages from './pages/index';
// import htmlShell from './templates/default';

// const app = express();
// const router = express.Router();

// router.use(express.static(path.join(__dirname, '../public')));

// pages.forEach(page => {
//     router.get(page.route, (req, res) => {
//         res.header('Content-Type', 'text/html; charset=utf-8');
//         const html = renderToString(<page.component />);
//         res.send(htmlShell(html));
//     });
// });

// app.use('/', router);

// const server = app.listen(3000, () => {
//     const port = server.address().port;
//     console.log(`Server listen at: http://localhost:${port}`);
// });