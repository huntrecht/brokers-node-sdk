'use strict';

class Credit {

    constructor(obj) {
        //Object.assign(this, obj);
        this.apiKeys = obj.apiKeys
        this.client = obj.client
        this.version = obj.version
    }
}
