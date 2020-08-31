"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractService = void 0;
const http_1 = require("http");
class AbstractService {
    constructor(config, logger) {
        this._requestHeaders = {};
        this._baseUrl = config.controllerUrl;
        this._username = config.username;
        this._password = config.password;
        this._basicAuth = config.basicAuth;
        this._timeout = 4500;
        this._agent = new http_1.Agent({
            /**
             * Socket timeout in milliseconds. This will set the timeout after the socket is connected.
             */
            timeout: this._timeout,
            /**
             * Maximum number of sockets to allow per host. Default for Node 0.10 is 5, default for Node 0.12 is Infinity
             */
            maxSockets: 16,
            /**
             * Maximum number of sockets to leave open in a free state. Only relevant if keepAlive is set to true. Default = 256.
             */
            maxFreeSockets: 8,
            /**
             * Keep sockets around in a pool to be used by other requests in the future. Default = false
             */
            keepAlive: true,
            /**
             * When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. Default = 1000.
             * Only relevant if keepAlive is set to true.
             */
            keepAliveMsecs: this._timeout
        });
        this.log = logger;
    }
    get baseUrl() {
        return this._baseUrl;
    }
    // public get requestHeaders(): object {
    //     // if (this._basicAuth) {
    //     //     this.setHttpHeader("Authorization", `Basic ${this.base64Credentials}`)
    //     // }
    //
    //     return this._requestHeaders;
    // }
    /**
     * @throws TypeError [ERR_INVALID_URL]: Invalid URL
     */
    get url() {
        try {
            return new URL((this.baseUrl.endsWith("/") ? this.baseUrl : `${this.baseUrl}/`) +
                (this._endpoint.startsWith("/") ? this._endpoint.substr(1) : this._endpoint)).href;
        }
        catch (e) {
            console.error(e);
            return this._endpoint;
        }
    }
    // public setHttpHeader(name: string, value: string) {
    //     this._requestHeaders.set(name, value);
    // }
    //
    // private get base64Credentials(): string {
    //     return atob(`${this._username}:${this._password}`);
    // }
    get axiosRequestConfig() {
        const config = {
            httpAgent: this._agent,
            // baseURL: this._baseUrl,
            timeout: this._timeout,
            url: this.url,
            method: this._method,
            headers: this._requestHeaders
        };
        if (this._basicAuth) {
            config.auth = {
                username: this._username,
                password: this._password
            };
        }
        return config;
    }
}
exports.AbstractService = AbstractService;
