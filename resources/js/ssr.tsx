import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { Config, route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Hakim Fidjel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob('./pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            const ziggyConfig = (
                props.initialPage.props as unknown as { ziggy: Config }
            ).ziggy;

            /* @ts-expect-error: injection globale necessaire pour le SSR */
            global.route = (name, params, absolute, config = ziggyConfig) => {
                return route(name, params, absolute, config);
            };

            return <App {...props} />;
        },
    }),
);
