export class HatStoreApi {
    constructor(request) {
        this.request = request;
    }

    async get(endpoint) {
        return await this.request.get(`${endpoint}`);
    }

    async post(endpoint, data, options = {}) {
        return await this.request.post(`${endpoint}`, {
            data, ...options
        });
    }
}