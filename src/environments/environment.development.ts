export const environment = {
    production: false,
    // Because of CORS reasons, we need to proxy the public API for local development. See proxy.conf.json
    apiBaseUrl: '/bike-api'
};
