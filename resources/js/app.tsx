import { createInertiaApp } from '@inertiajs/react';
import { StrictMode } from 'react';
import { Provider } from './components/ui/provider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    // pages: {
    //     path: './pages',
    //     lazy: false,
    // },
    progress: {
        color: '#D69E2E',
    },
    withApp(app) {
        return (
            <StrictMode>
                <Provider>{app}</Provider>
            </StrictMode>
        );
    },
});
