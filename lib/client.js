'use strict';

/**
 * Dependencies
 */
const http = require('request');
const pkg = require('../package.json');
const mergeData = require('./merge-data');
const ResponseError = require('./response-error');

/**
 * Adapter to Brokers Services
 */
class Client {

  /**
   * Constructor
   */
  constructor() {

    //API key
    this.apiKey = '';

    //Default headers
    this.defaultHeaders = {
      'Accept': 'application/json',
      'User-agent': 'likid/' + pkg.version + ';nodejs',
    };

    //Empty default request
    this.defaultRequest = {
      json: true,
      baseUrl: 'https://api.huntrecht.com/',
      url: '',
      method: 'GET',
      headers: {},
    };
  }

  /**
   * Set API key
   */
  setApiKey(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * Set default header
   */
  setDefaultHeader(key, value) {
    this.defaultHeaders[key] = value;
    return this;
  }

  /**
   * Set default request
   */
  setDefaultRequest(key, value) {
    this.defaultRequest[key] = value;
    return this;
  }

  /**
   * Create headers for request
   */
  createHeaders(data) {

    //Merge data with default headers
    const headers = mergeData(this.defaultHeaders, data);

    //Add API key, but don't overwrite if header already set
    if (typeof headers.Authorization === 'undefined' && this.apiKey) {
      headers.Authorization = 'Bearer ' + this.apiKey;
    }

    //Return
    return headers;
  }

  /**
   * Create request
   */
  createRequest(data) {

    //Keep URL parameter consistent
    if (data.uri) {
      data.url = data.uri;
      delete data.uri;
    }

    //Merge data with empty request
    const request = mergeData(this.defaultRequest, data);

    //Add headers
    request.headers = this.createHeaders(request.headers);
    return request;
  }

  /**
   * Do a request
   */
  request(data, cb) {

    //Create request
    const request = this.createRequest(data);

    //Perform request
    const promise = new Promise((resolve, reject) => {
      http(request, (error, response, body) => {

        //Request error
        if (error) {
          return reject(error);
        }

        //Response error
        if (response.statusCode >= 400) {
          return reject(new ResponseError(response));
        }

        //Successful response
        resolve([response, body]);
      });
    });

    // Throw and error incase function not passed
    if (cb && typeof cb !== 'function') {
      throw new Error('Callback passed is not a function.');
    }

    //Execute callback if provided
    if (cb) {
      promise
        .then(result => cb(null, result))
        .catch(error => cb(error, null));
    }

    //Return promise
    return promise;
  }
}

//Export class
module.exports = Client;

