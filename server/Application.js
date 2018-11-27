
import _ from 'lodash';
import express from 'express';
import path from 'path';
import http from 'http';
import logger from 'morgan';
import session from 'express-session';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import raven from 'raven';

import { APP_VERSION } from './app/constants/AppConstants';
import { resources } from './routes/roles';
import { prefix } from './logger';

const owlLogger = prefix('Application:');

class Application {

    constructor(options) {
        this.config = options;
        this.app = express();
        this.app.set('views', path.join(__dirname, 'server', 'views'));
        this.app.set('view engine', 'jade');
        this.app.set('port', options.application.port);

        Application.__routes(options, this.app);
    }

    static __routes(options, app) {
        const ravenClient = Application.__getRavenClient(options);
        const expressRouter = Application.__getRouter(options, app.database, app.redisStore);

        app.use(raven.middleware.express.requestHandler(ravenClient));
        app.use(options.application.prefix || '/', expressRouter);
        app.use(raven.middleware.express.errorHandler(ravenClient));
    }

    static __getRavenClient(options) {
        const client = new raven.Client(options.raven.url, {
            tags: {
                side: 'backend'
            },
            release: APP_VERSION,
            environment: process.env.NODE_ENV
        });
        client.patchGlobal();

        return client;
    }

    static __getRouter(options, database, redisStore) {

        const router = new express.Router();

        router.get(resources.root, indexRoutes.index);
        router.get(resources.healthCheck, healthCheck(
            options,
            redisStore,
            database.mongo,
            database.whale
        ));

        return router;
    }

    start(onStart) {
        const port = this.app.get('port');
        this.server = http.createServer(this.app)
            .listen(port, (error) => {
                if (error) {
                    onStart(error);
                }
            });

        return this.server;
    }

    shutdown(onClose) {

    }
}

// export default Application;
module.exports = Application;
