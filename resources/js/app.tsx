import { createInertiaApp } from '@inertiajs/react';
import React from 'react';
import { Provider } from './components/ui/provider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    // resolve: name => {
    //     const pages = import.meta.glob('./pages/**/*.tsx')

    //     return pages[`./pages/${name}.tsx`]()
    // },
    // setup({ el, App, props }) {
    //     createRoot(el).render(
    //         <Provider>
    //             <App {...props} />
    //         </Provider>
    //     )
    // },
    progress: {
        color: '#D69E2E',
    },
    withApp(app) {
        return (
            <React.StrictMode>
                <Provider>{app}</Provider>
            </React.StrictMode>
        );
    },
});
