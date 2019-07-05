'use strict';

const pkg = require('../package.json');
//const Account = require('lib/account');
const Kyc = require('lib/kyc')
const Fund = require('lib/fund')
const Fx = require('lib/fx')
const Credit = require('lib/credit')
//const Trade = require('lib/trade')
//const Payment = require('lib/payment')
const Transfer = require('lib/transfer')

/**
 * @usage
 * ```
 * brokers = new Brokers({apiKeys: {})
 * brokers.fund.issue()
 * brokers.credit.create()
 * ```
 */ 
class Brokers {

    constructor(obj) {
        const params = {apiKeys: obj.apiKeys, client: new Client(), version: this.getVersion()}
        // connect to the client
        this.fund = new Fund(params)
        this.fx = new Fx(params)
        this.kyc = new Kyc(params)
        //this.credit = new Credit(params)
        this.transfer = new Transfer(params)
    }

    getVersion() {
        return ['v', pkg.version.substring(0, 1)].join('')
    }


    //setApiKeys() {}
    //build() {}
    //connect() {}
    //newFund() { return new Fund() }
    //newCredit() {}
    //newKyc() {}
}

module.exports = Brokers;

