'use strict';

const util = require('util')

// should implements  
class Fund {

    constructor(obj) {
        this.apiKeys = obj.apiKeys
        this.client = obj.client
        this.version = obj.version
    }

    async issue(params) {
        const request = {
            method: 'POST',
            url: [this.version, 'fund/issue'].join('/'),
            body,
        };
        return await this.client.request(request);
    }

    async transfer(params) {
        const request = {
            method: 'POST',
            url: [this.version, 'fund/transfer'].join('/'),
            body,
        };
    
        return await this.client.request(request);
    }

    async redeem(params) {
        const request = {
            method: 'POST',
            url: [this.version, 'fund/redeem'].join('/'),
            body,
        };
        return await this.client.request(request);
    }

    async list(params) {
        const request = {
            method: 'GET',
            url: [this.version, 'fund/list'].join('/'),
            body,
        };
        return await this.client.request(request);
    }

    async get(params) {
        const request = {
            method: 'GET',
            url: [this.version, 'fund/'+params.id].join('/'),
            body,
        };
        return await this.client.request(request);
    }
}
