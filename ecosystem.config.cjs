module.exports = {
    apps: [
        {
            name: 'inertia-ssr',

            script: 'artisan',
            interpreter: 'php',

            args: 'inertia:start-ssr --runtime=bun',

            instances: 2, // mulai dari 2 dulu (jangan max dulu)
            exec_mode: 'fork',

            autorestart: true,
            watch: false,

            env: {
                APP_ENV: 'production',
            },
        },
    ],
};
