// const http = require('@tauri-apps/api/http');
import { http } from '@tauri-apps/api';

export function callEndpoint(
    server,
    endpoint,
    responseType,
    method = 'GET',
    data = ''
) {
    const url = server + '/game/' + endpoint;
    var type;
    switch (responseType) {
        case 'json':
            type = http.ResponseType.JSON;
            break;
        case 'text':
            type = http.ResponseType.Text;
            break;
    }
    if (method === 'GET') {
        return http
            .fetch(url, {
                method: 'GET',
                responseType: type,
            })
            .then((resp) => {
                return resp.data;
            });
    } else {
        return http
            .fetch(url, {
                method: method,
                body: http.Body.json(data),
                responseType: type,
            })
            .then((resp) => {
                return resp.data;
            });
    }
}
