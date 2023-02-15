const USE_SSL = window.location.protocol === 'https:'
const BASE_URL = 'dev.heavenexchange.io';
// const BASE_URL = 'api.heavenexchange.io';

export const API_URL = USE_SSL ? 'https://' + BASE_URL : 'http://' + BASE_URL;
export const SOCKET_URL = USE_SSL ? 'wss://' + BASE_URL : 'ws://' + BASE_URL;
