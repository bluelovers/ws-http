"use strict";
/**
 * Created by user on 2019/6/6.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_parse_1 = __importDefault(require("url-parse"));
exports.SYM_URL = Symbol('url');
exports.SYM_HIDDEN = Symbol('hidden');
var ENUM_FAKE;
(function (ENUM_FAKE) {
    ENUM_FAKE["protocol"] = "fake+http:";
    ENUM_FAKE["hostname"] = "url-fake-hostname";
})(ENUM_FAKE || (ENUM_FAKE = {}));
const SymbolContext = findSymbolContext();
class LazyURL extends URL {
    constructor(url, base) {
        let u = _core(url, base);
        super(u.url.href);
        //this[SYM_URL] = _url;
        this[exports.SYM_HIDDEN] = u.hidden;
        //_numerable(this)
    }
    /*
    [SymbolInspect]()
    {
        return `LazyURL {
  href: '${this.href}',
  href: '${this.toRealString()}',
  origin: '${this.origin}',
  protocol: '${this.protocol}',
  username: '${this.username}',
  password: '${this.password}',
  host: '${this.host}',
  hostname: '${this.hostname}',
  port: '${this.port}',
  pathname: '${this.pathname}',
  search: '${this.search}',
  searchParams: ${util.inspect(this.searchParams)},
  hash: '${this.hash}'
}`;
    }
     */
    /*
    [SymbolInspect]()
    {
        return `LazyURL(${this.href})`;
    }

     */
    get paths() {
        if (SymbolContext != null && this[SymbolContext] && Array.isArray(this[SymbolContext].path)) {
            return this[SymbolContext].path.slice();
        }
        return this.pathname
            .split('/')
            .filter(v => v != '');
    }
    fakeExists() {
        return this.fakeKeys().length;
    }
    fakeKeys() {
        return Object.keys(this[exports.SYM_HIDDEN]);
    }
    fakeEntries() {
        return Object.entries(this[exports.SYM_HIDDEN]);
    }
    /**
     * get the real url (remove fake value)
     * throw error if not a valid url
     *
     * @returns {string}
     */
    toRealString() {
        let ks = this.fakeEntries();
        if (ks.length) {
            let u = url_parse_1.default(this.href);
            ks
                .forEach(([name, value]) => {
                if (u[name] === value) {
                    u.set(name, '');
                }
            });
            if (u.host === '') {
                if (u.username !== '' || u.password !== '' || u.port !== '' || u.protocol !== '') {
                    throw new TypeError(`Invalid URL ${u}`);
                }
            }
            let s = u.toString();
            if (u.protocol === '' && u.host === '') {
                s = s.replace(/^\/\//, '');
            }
            return s;
        }
        return this.href;
    }
    toString() {
        return this.href;
    }
    /*
    toJSON()
    {
        return this[SYM_URL].toJSON();
    }
     */
    /*
    get hash()
    {
        return this[SYM_URL].hash
    }

    set hash(value)
    {
        this[SYM_URL].hash = value
    }

    get host()
    {
        return this[SYM_URL].host
    }

    set host(value)
    {
        delete this[SYM_HIDDEN].hostname;

        this[SYM_URL].host = value
    }
     */
    get hostname() {
        return super.hostname;
    }
    set hostname(value) {
        delete this[exports.SYM_HIDDEN].hostname;
        super.hostname = value;
    }
    /*
    get href()
    {
        return this[SYM_URL].href
    }

    set href(value)
    {
        this[SYM_URL].href = value
    }

    get origin()
    {
        return this[SYM_URL].origin
    }

    get password()
    {
        return this[SYM_URL].password
    }

    set password(value)
    {
        this[SYM_URL].password = value
    }

    get pathname()
    {
        return this[SYM_URL].pathname
    }

    set pathname(value)
    {
        this[SYM_URL].pathname = value
    }

    get port()
    {
        return this[SYM_URL].port
    }

    set port(value)
    {
        this[SYM_URL].port = value
    }
     */
    get protocol() {
        return super.protocol;
    }
    set protocol(value) {
        delete this[exports.SYM_HIDDEN].protocol;
        super.protocol = value;
    }
    /*
    get search()
    {
        return this[SYM_URL].search
    }

    set search(value)
    {
        this[SYM_URL].search = value
    }

    get searchParams()
    {
        return this[SYM_URL].searchParams
    }

    get username()
    {
        return this[SYM_URL].username
    }

    set username(value)
    {
        this[SYM_URL].username = value
    }

     */
    /**
     * @alias protocol
     */
    get scheme() {
        return this.protocol;
    }
    /**
     * @alias protocol
     */
    set scheme(value) {
        this.protocol = value;
    }
    /**
     * @alias hash
     */
    get fragment() {
        return this.hash;
    }
    /**
     * @alias hash
     */
    set fragment(value) {
        this.hash = value;
    }
    /**
     * @alias search
     */
    get query() {
        return this.search;
    }
    /**
     * @alias search
     */
    set query(value) {
        this.search = value;
    }
    /**
     * clone into a object
     *
     * @returns {IURLObject}
     */
    toObject(url) {
        return LazyURL.toObject(url);
    }
    static toObject(url) {
        return LazyURL.keys().reduce((a, b) => {
            if (b === 'searchParams') {
                a[b] = new URLSearchParams(url.searchParams.entries());
            }
            else {
                a[b] = this[b];
            }
            return a;
        }, {});
    }
    keys() {
        return LazyURL.keys();
    }
    values() {
        return LazyURL.values(this);
    }
    entries() {
        return LazyURL.entries(this);
    }
    static keys() {
        return [
            'href',
            'protocol',
            'username',
            'password',
            'host',
            'hostname',
            'port',
            'pathname',
            'search',
            'searchParams',
            'hash',
        ];
    }
    static values(url) {
        return LazyURL.keys().map(name => url[name]);
    }
    static entries(url) {
        return LazyURL.keys().map(name => [name, url[name]]);
    }
    createURLSearchParams(init) {
        if (init instanceof URL) {
            init = init.searchParams;
        }
        return new URLSearchParams(init);
    }
}
exports.LazyURL = LazyURL;
function _numerable(lib) {
    let ds = Object.getOwnPropertyDescriptors(lib);
    [
        'href',
        'protocol',
        'username',
        'password',
        'host',
        'hostname',
        'port',
        'pathname',
        'search',
        'searchParams',
        'hash',
    ]
        .forEach((name) => {
        if (name in ds) {
            ds[name].enumerable = true;
            Object.defineProperty(lib, name, ds[name]);
        }
    });
}
class URLSearchParamsLazy extends URLSearchParams {
    clone() {
        console.dir(this.entries());
        // @ts-ignore
        return new URLSearchParamsLazy(this.entries());
    }
}
exports.URLSearchParamsLazy = URLSearchParamsLazy;
function findSymbolContext() {
    let u = new URL(`https://localhost`);
    const SymbolContext = Object.getOwnPropertySymbols(u)
        .filter(sym => u[sym].host == 'localhost')[0];
    return SymbolContext;
}
exports.findSymbolContext = findSymbolContext;
function _core(url, base) {
    if (Array.isArray(url)) {
        if (base == null) {
            [url, base] = url;
        }
    }
    if (url && url instanceof URL) {
        url = url.href;
    }
    else if (typeof url !== 'string') {
        throw new TypeError(`Argument '${url}' is not assignable to url like.`);
    }
    let _url;
    const _hidden_ = {};
    if (base === '') {
        base = void 0;
    }
    try {
        _url = new URL(url, base);
    }
    catch (e) {
        let ok;
        if (/Invalid URL/.test(e.message)) {
            if (typeof base === 'string') {
                let old = base;
                let u = url_parse_1.default(base) /* as URL & {
                        set(name: keyof URL, value: string): void
                    }*/;
                if ((u.host === ''
                    || u.protocol === '')) {
                    if (!old.includes('/') && [
                        u.protocol + u.host,
                        u.protocol + u.pathname,
                    ].includes(old.toLowerCase())) {
                        u = url_parse_1.default('');
                        u.set('host', old);
                        u.set('protocol', "fake+http:" /* protocol */);
                        u.set('pathname', '');
                        _hidden_.protocol = "fake+http:" /* protocol */;
                    }
                    if (u.host === '') {
                        if (u.pathname != '' && !u.pathname.includes('/')) {
                            u.set('host', u.pathname);
                            u.set('pathname', '');
                        }
                        else {
                            u.set('host', "url-fake-hostname" /* hostname */);
                            _hidden_.hostname = u.hostname;
                        }
                    }
                    if (u.protocol === '') {
                        u.set('protocol', "fake+http:" /* protocol */);
                        _hidden_.protocol = u.protocol;
                    }
                    // @ts-ignore
                    if (u.pathname !== '' && !u.pathname.startsWith('/')) {
                        // @ts-ignore
                        u.set('pathname', '/' + u.pathname);
                    }
                    _url = new URL(url, u.toString());
                    ok = true;
                }
            }
            else if (base == null) {
                base = `${"fake+http:" /* protocol */}//${"url-fake-hostname" /* hostname */}`;
                _url = new URL(url, base);
                _hidden_.protocol = "fake+http:" /* protocol */;
                _hidden_.hostname = "url-fake-hostname" /* hostname */;
                ok = true;
            }
        }
        if (!ok) {
            throw e;
        }
    }
    return {
        url: _url,
        hidden: _hidden_,
    };
}
exports._core = _core;
exports.default = LazyURL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsMERBQWlDO0FBS3BCLFFBQUEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixRQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFM0MsSUFBVyxTQUlWO0FBSkQsV0FBVyxTQUFTO0lBRW5CLG9DQUF1QixDQUFBO0lBQ3ZCLDJDQUE4QixDQUFBO0FBQy9CLENBQUMsRUFKVSxTQUFTLEtBQVQsU0FBUyxRQUluQjtBQUVELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFMUMsTUFBYSxPQUFRLFNBQVEsR0FBRztJQUsvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFNUIsa0JBQWtCO0lBQ25CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUVIOzs7Ozs7T0FNRztJQUVILElBQUksS0FBSztRQUVSLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQzNGO1lBQ0MsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUTthQUNsQixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1Ys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QUUsR0FBRyxJQUFJLENBQUM7aUJBQ1Y7YUFDRDtpQkFDSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQ3JCO2dCQUNDLElBQUksR0FBRyxHQUFHLDJCQUFrQixLQUFLLGtDQUFrQixFQUFFLENBQUM7Z0JBRXRELElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTFCLFFBQVEsQ0FBQyxRQUFRLDhCQUFxQixDQUFDO2dCQUN2QyxRQUFRLENBQUMsUUFBUSxxQ0FBcUIsQ0FBQztnQkFFdkMsRUFBRSxHQUFHLElBQUksQ0FBQzthQUNWO1NBQ0Q7UUFFRCxJQUFJLENBQUMsRUFBRSxFQUNQO1lBQ0MsTUFBTSxDQUFDLENBQUE7U0FDUDtLQUNEO0lBRUQsT0FBTztRQUNOLEdBQUcsRUFBRSxJQUFJO1FBQ1QsTUFBTSxFQUFFLFFBQVE7S0FDaEIsQ0FBQTtBQUNGLENBQUM7QUF2SEQsc0JBdUhDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS82LzYuXG4gKi9cblxuaW1wb3J0IHVybFBhcnNlIGZyb20gJ3VybC1wYXJzZSc7XG5pbXBvcnQgU3ltYm9sSW5zcGVjdCBmcm9tICdzeW1ib2wuaW5zcGVjdCc7XG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJztcblxuZXhwb3J0IHR5cGUgSVVSTExpa2UgPSBzdHJpbmcgfCBVUkw7XG5leHBvcnQgY29uc3QgU1lNX1VSTCA9IFN5bWJvbCgndXJsJyk7XG5leHBvcnQgY29uc3QgU1lNX0hJRERFTiA9IFN5bWJvbCgnaGlkZGVuJyk7XG5cbmNvbnN0IGVudW0gRU5VTV9GQUtFXG57XG5cdHByb3RvY29sID0gJ2Zha2UraHR0cDonLFxuXHRob3N0bmFtZSA9ICd1cmwtZmFrZS1ob3N0bmFtZScsXG59XG5cbmNvbnN0IFN5bWJvbENvbnRleHQgPSBmaW5kU3ltYm9sQ29udGV4dCgpO1xuXG5leHBvcnQgY2xhc3MgTGF6eVVSTCBleHRlbmRzIFVSTCBpbXBsZW1lbnRzIFVSTFxue1xuXHRwcm90ZWN0ZWQgW1NZTV9VUkxdPzogVVJMO1xuXHRwcm90ZWN0ZWQgW1NZTV9ISURERU5dOiBQYXJ0aWFsPFVSTD47XG5cblx0Y29uc3RydWN0b3IodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxuXHR7XG5cdFx0bGV0IHUgPSBfY29yZSh1cmwsIGJhc2UpXG5cblx0XHRzdXBlcih1LnVybC5ocmVmKTtcblxuXHRcdC8vdGhpc1tTWU1fVVJMXSA9IF91cmw7XG5cdFx0dGhpc1tTWU1fSElEREVOXSA9IHUuaGlkZGVuO1xuXG5cdFx0Ly9fbnVtZXJhYmxlKHRoaXMpXG5cdH1cblxuXHQvKlxuXHRbU3ltYm9sSW5zcGVjdF0oKVxuXHR7XG5cdFx0cmV0dXJuIGBMYXp5VVJMIHtcbiAgaHJlZjogJyR7dGhpcy5ocmVmfScsXG4gIGhyZWY6ICcke3RoaXMudG9SZWFsU3RyaW5nKCl9JyxcbiAgb3JpZ2luOiAnJHt0aGlzLm9yaWdpbn0nLFxuICBwcm90b2NvbDogJyR7dGhpcy5wcm90b2NvbH0nLFxuICB1c2VybmFtZTogJyR7dGhpcy51c2VybmFtZX0nLFxuICBwYXNzd29yZDogJyR7dGhpcy5wYXNzd29yZH0nLFxuICBob3N0OiAnJHt0aGlzLmhvc3R9JyxcbiAgaG9zdG5hbWU6ICcke3RoaXMuaG9zdG5hbWV9JyxcbiAgcG9ydDogJyR7dGhpcy5wb3J0fScsXG4gIHBhdGhuYW1lOiAnJHt0aGlzLnBhdGhuYW1lfScsXG4gIHNlYXJjaDogJyR7dGhpcy5zZWFyY2h9JyxcbiAgc2VhcmNoUGFyYW1zOiAke3V0aWwuaW5zcGVjdCh0aGlzLnNlYXJjaFBhcmFtcyl9LFxuICBoYXNoOiAnJHt0aGlzLmhhc2h9J1xufWA7XG5cdH1cblx0ICovXG5cblx0Lypcblx0W1N5bWJvbEluc3BlY3RdKClcblx0e1xuXHRcdHJldHVybiBgTGF6eVVSTCgke3RoaXMuaHJlZn0pYDtcblx0fVxuXG5cdCAqL1xuXG5cdGdldCBwYXRocygpXG5cdHtcblx0XHRpZiAoU3ltYm9sQ29udGV4dCAhPSBudWxsICYmIHRoaXNbU3ltYm9sQ29udGV4dF0gJiYgQXJyYXkuaXNBcnJheSh0aGlzW1N5bWJvbENvbnRleHRdLnBhdGgpKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzW1N5bWJvbENvbnRleHRdLnBhdGguc2xpY2UoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wYXRobmFtZVxuXHRcdFx0LnNwbGl0KCcvJylcblx0XHRcdC5maWx0ZXIodiA9PiB2ICE9ICcnKVxuXHR9XG5cblx0ZmFrZUV4aXN0cygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5mYWtlS2V5cygpLmxlbmd0aFxuXHR9XG5cblx0ZmFrZUtleXMoKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbU1lNX0hJRERFTl0pXG5cdH1cblxuXHRmYWtlRW50cmllcygpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmVudHJpZXModGhpc1tTWU1fSElEREVOXSlcblx0fVxuXG5cdC8qKlxuXHQgKiBnZXQgdGhlIHJlYWwgdXJsIChyZW1vdmUgZmFrZSB2YWx1ZSlcblx0ICogdGhyb3cgZXJyb3IgaWYgbm90IGEgdmFsaWQgdXJsXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHR0b1JlYWxTdHJpbmcoKVxuXHR7XG5cdFx0bGV0IGtzID0gdGhpcy5mYWtlRW50cmllcygpO1xuXG5cdFx0aWYgKGtzLmxlbmd0aClcblx0XHR7XG5cdFx0XHRsZXQgdSA9IHVybFBhcnNlKHRoaXMuaHJlZik7XG5cblx0XHRcdGtzXG5cdFx0XHRcdC5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKHVbbmFtZV0gPT09IHZhbHVlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUuc2V0KG5hbWUgYXMgYW55LCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0O1xuXG5cdFx0XHRpZiAodS5ob3N0ID09PSAnJylcblx0XHRcdHtcblx0XHRcdFx0aWYgKHUudXNlcm5hbWUgIT09ICcnIHx8IHUucGFzc3dvcmQgIT09ICcnIHx8IHUucG9ydCAhPT0gJycgfHwgdS5wcm90b2NvbCAhPT0gJycpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFVSTCAke3V9YClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgcyA9IHUudG9TdHJpbmcoKTtcblxuXHRcdFx0aWYgKHUucHJvdG9jb2wgPT09ICcnICYmIHUuaG9zdCA9PT0gJycpXG5cdFx0XHR7XG5cdFx0XHRcdHMgPSBzLnJlcGxhY2UoL15cXC9cXC8vLCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuaHJlZjtcblx0fVxuXG5cdHRvU3RyaW5nKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cblxuXHQvKlxuXHR0b0pTT04oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0udG9KU09OKCk7XG5cdH1cblx0ICovXG5cblx0Lypcblx0Z2V0IGhhc2goKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaGFzaFxuXHR9XG5cblx0c2V0IGhhc2godmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLmhhc2ggPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IGhvc3QoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaG9zdFxuXHR9XG5cblx0c2V0IGhvc3QodmFsdWUpXG5cdHtcblx0XHRkZWxldGUgdGhpc1tTWU1fSElEREVOXS5ob3N0bmFtZTtcblxuXHRcdHRoaXNbU1lNX1VSTF0uaG9zdCA9IHZhbHVlXG5cdH1cblx0ICovXG5cblx0Z2V0IGhvc3RuYW1lKClcblx0e1xuXHRcdHJldHVybiBzdXBlci5ob3N0bmFtZVxuXHR9XG5cblx0c2V0IGhvc3RuYW1lKHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0uaG9zdG5hbWU7XG5cblx0XHRzdXBlci5ob3N0bmFtZSA9IHZhbHVlXG5cdH1cblxuXHQvKlxuXHRnZXQgaHJlZigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5ocmVmXG5cdH1cblxuXHRzZXQgaHJlZih2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0uaHJlZiA9IHZhbHVlXG5cdH1cblxuXHRnZXQgb3JpZ2luKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLm9yaWdpblxuXHR9XG5cblx0Z2V0IHBhc3N3b3JkKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnBhc3N3b3JkXG5cdH1cblxuXHRzZXQgcGFzc3dvcmQodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBhc3N3b3JkID0gdmFsdWVcblx0fVxuXG5cdGdldCBwYXRobmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wYXRobmFtZVxuXHR9XG5cblx0c2V0IHBhdGhuYW1lKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wYXRobmFtZSA9IHZhbHVlXG5cdH1cblxuXHRnZXQgcG9ydCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wb3J0XG5cdH1cblxuXHRzZXQgcG9ydCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucG9ydCA9IHZhbHVlXG5cdH1cblx0ICovXG5cblx0Z2V0IHByb3RvY29sKClcblx0e1xuXHRcdHJldHVybiBzdXBlci5wcm90b2NvbFxuXHR9XG5cblx0c2V0IHByb3RvY29sKHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0ucHJvdG9jb2w7XG5cblx0XHRzdXBlci5wcm90b2NvbCA9IHZhbHVlXG5cdH1cblxuXHQvKlxuXHRnZXQgc2VhcmNoKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnNlYXJjaFxuXHR9XG5cblx0c2V0IHNlYXJjaCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0uc2VhcmNoID0gdmFsdWVcblx0fVxuXG5cdGdldCBzZWFyY2hQYXJhbXMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uc2VhcmNoUGFyYW1zXG5cdH1cblxuXHRnZXQgdXNlcm5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0udXNlcm5hbWVcblx0fVxuXG5cdHNldCB1c2VybmFtZSh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0udXNlcm5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0ICovXG5cblx0LyoqXG5cdCAqIEBhbGlhcyBwcm90b2NvbFxuXHQgKi9cblx0Z2V0IHNjaGVtZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5wcm90b2NvbFxuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBwcm90b2NvbFxuXHQgKi9cblx0c2V0IHNjaGVtZSh2YWx1ZTogc3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5wcm90b2NvbCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBoYXNoXG5cdCAqL1xuXHRnZXQgZnJhZ21lbnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaGFzaFxuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBoYXNoXG5cdCAqL1xuXHRzZXQgZnJhZ21lbnQodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMuaGFzaCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBzZWFyY2hcblx0ICovXG5cdGdldCBxdWVyeSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5zZWFyY2hcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgc2VhcmNoXG5cdCAqL1xuXHRzZXQgcXVlcnkodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMuc2VhcmNoID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogY2xvbmUgaW50byBhIG9iamVjdFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7SVVSTE9iamVjdH1cblx0ICovXG5cdHRvT2JqZWN0KHVybDogVVJMKTogSVVSTE9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwudG9PYmplY3QodXJsKVxuXHR9XG5cblx0c3RhdGljIHRvT2JqZWN0KHVybDogVVJMKTogSVVSTE9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLnJlZHVjZSgoYSwgYikgPT5cblx0XHR7XG5cdFx0XHRpZiAoYiA9PT0gJ3NlYXJjaFBhcmFtcycpXG5cdFx0XHR7XG5cdFx0XHRcdGFbYl0gPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zZWFyY2hQYXJhbXMuZW50cmllcygpIGFzIGFueSBhcyBbc3RyaW5nLCBzdHJpbmddW10pXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGFbYl0gPSB0aGlzW2JdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYVxuXHRcdH0sIHt9IGFzIElVUkxPYmplY3QpXG5cdH1cblxuXHRrZXlzKCk6IElVcmxLZXlzW11cblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKVxuXHR9XG5cblx0dmFsdWVzKClcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLnZhbHVlcyh0aGlzKVxuXHR9XG5cblx0ZW50cmllcygpOiBJRW50cmllc1xuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwuZW50cmllcyh0aGlzKVxuXHR9XG5cblx0c3RhdGljIGtleXMoKTogSVVybEtleXNbXVxuXHR7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCdocmVmJyxcblx0XHRcdCdwcm90b2NvbCcsXG5cdFx0XHQndXNlcm5hbWUnLFxuXHRcdFx0J3Bhc3N3b3JkJyxcblx0XHRcdCdob3N0Jyxcblx0XHRcdCdob3N0bmFtZScsXG5cdFx0XHQncG9ydCcsXG5cdFx0XHQncGF0aG5hbWUnLFxuXHRcdFx0J3NlYXJjaCcsXG5cdFx0XHQnc2VhcmNoUGFyYW1zJyxcblx0XHRcdCdoYXNoJyxcblx0XHRdXG5cdH1cblxuXHRzdGF0aWMgdmFsdWVzKHVybDogVVJMKVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLm1hcChuYW1lID0+IHVybFtuYW1lXSlcblx0fVxuXG5cdHN0YXRpYyBlbnRyaWVzKHVybDogVVJMKTogSUVudHJpZXNcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKS5tYXAobmFtZSA9PiBbbmFtZSwgdXJsW25hbWVdXSkgYXMgSUVudHJpZXNcblx0fVxuXG5cdGNyZWF0ZVVSTFNlYXJjaFBhcmFtcyhpbml0Pzogc3RyaW5nW11bXSB8IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gfCBzdHJpbmcgfCBVUkxTZWFyY2hQYXJhbXMgfCBVUkwpXG5cdHtcblx0XHRpZiAoaW5pdCBpbnN0YW5jZW9mIFVSTClcblx0XHR7XG5cdFx0XHRpbml0ID0gaW5pdC5zZWFyY2hQYXJhbXM7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMoaW5pdClcblx0fVxuXG59XG5cbmV4cG9ydCB0eXBlIElFbnRyaWVzID0gKFtcImhhc2hcIiB8IFwiaG9zdFwiIHwgXCJob3N0bmFtZVwiIHwgXCJocmVmXCIgfCBcInBhc3N3b3JkXCIgfCBcInBhdGhuYW1lXCIgfCBcInBvcnRcIiB8IFwicHJvdG9jb2xcIiB8IFwic2VhcmNoXCIgfCBcInVzZXJuYW1lXCIsIHN0cmluZ10gfCBbXCJzZWFyY2hQYXJhbXNcIiwgVVJMU2VhcmNoUGFyYW1zXSlbXVxuXG5leHBvcnQgdHlwZSBJRW50cmllc1JvdzxUIGV4dGVuZHMgSVVybEtleXM+ID0gW1QsIFVSTFtUXV1cblxuZnVuY3Rpb24gX251bWVyYWJsZShsaWIpXG57XG5cdGxldCBkcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGxpYik7XG5cblx0KFtcblx0XHQnaHJlZicsXG5cdFx0J3Byb3RvY29sJyxcblx0XHQndXNlcm5hbWUnLFxuXHRcdCdwYXNzd29yZCcsXG5cdFx0J2hvc3QnLFxuXHRcdCdob3N0bmFtZScsXG5cdFx0J3BvcnQnLFxuXHRcdCdwYXRobmFtZScsXG5cdFx0J3NlYXJjaCcsXG5cdFx0J3NlYXJjaFBhcmFtcycsXG5cdFx0J2hhc2gnLFxuXHRdIGFzIGNvbnN0KVxuXHRcdC5mb3JFYWNoKChuYW1lKSA9PlxuXHRcdHtcblx0XHRcdGlmIChuYW1lIGluIGRzKVxuXHRcdFx0e1xuXHRcdFx0XHRkc1tuYW1lXS5lbnVtZXJhYmxlID0gdHJ1ZTtcblxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobGliLCBuYW1lLCBkc1tuYW1lXSlcblx0XHRcdH1cblx0XHR9KVxuXHQ7XG59XG5cbmV4cG9ydCB0eXBlIElVcmxLZXlzID1cblx0fCAnaHJlZidcblx0fCAndXNlcm5hbWUnXG5cdHwgJ3Bhc3N3b3JkJ1xuXHR8ICdob3N0J1xuXHR8ICdob3N0bmFtZSdcblx0fCAncG9ydCdcblx0fCAncGF0aG5hbWUnXG5cdHwgJ3NlYXJjaCdcblx0fCAnc2VhcmNoUGFyYW1zJ1xuXHR8ICdwcm90b2NvbCdcblx0fCAnaGFzaCdcblx0O1xuXG5leHBvcnQgY2xhc3MgVVJMU2VhcmNoUGFyYW1zTGF6eSBleHRlbmRzIFVSTFNlYXJjaFBhcmFtcyBpbXBsZW1lbnRzIFVSTFNlYXJjaFBhcmFtc1xue1xuXHRjbG9uZSgpOiBVUkxTZWFyY2hQYXJhbXNMYXp5XG5cdHtcblx0XHRjb25zb2xlLmRpcih0aGlzLmVudHJpZXMoKSk7XG5cdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zTGF6eSh0aGlzLmVudHJpZXMoKSlcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFN5bWJvbENvbnRleHQoKTogc3ltYm9sXG57XG5cdGxldCB1ID0gbmV3IFVSTChgaHR0cHM6Ly9sb2NhbGhvc3RgKTtcblxuXHRjb25zdCBTeW1ib2xDb250ZXh0ID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh1KVxuXHRcdC5maWx0ZXIoc3ltID0+IHVbc3ltXS5ob3N0ID09ICdsb2NhbGhvc3QnKVswXVxuXHQ7XG5cblx0cmV0dXJuIFN5bWJvbENvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVSTE9iamVjdFxue1xuXHRocmVmOiBzdHJpbmc7XG5cdHByb3RvY29sOiBzdHJpbmc7XG5cdHVzZXJuYW1lOiBzdHJpbmc7XG5cdHBhc3N3b3JkOiBzdHJpbmc7XG5cdGhvc3Q6IHN0cmluZztcblx0aG9zdG5hbWU6IHN0cmluZztcblx0cG9ydDogc3RyaW5nO1xuXHRwYXRobmFtZTogc3RyaW5nO1xuXHRzZWFyY2g6IHN0cmluZztcblx0c2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXM7XG5cdGhhc2g6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcbntcblx0aWYgKEFycmF5LmlzQXJyYXkodXJsKSlcblx0e1xuXHRcdGlmIChiYXNlID09IG51bGwpXG5cdFx0e1xuXHRcdFx0W3VybCwgYmFzZV0gPSB1cmw7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBVUkwpXG5cdHtcblx0XHR1cmwgPSB1cmwuaHJlZjtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJylcblx0e1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEFyZ3VtZW50ICcke3VybH0nIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHVybCBsaWtlLmApXG5cdH1cblxuXHRsZXQgX3VybDogVVJMO1xuXHRjb25zdCBfaGlkZGVuXzogUGFydGlhbDxVUkw+ID0ge307XG5cblx0aWYgKGJhc2UgPT09ICcnKVxuXHR7XG5cdFx0YmFzZSA9IHZvaWQgMDtcblx0fVxuXG5cdHRyeVxuXHR7XG5cdFx0X3VybCA9IG5ldyBVUkwodXJsLCBiYXNlKVxuXHR9XG5cdGNhdGNoIChlKVxuXHR7XG5cdFx0bGV0IG9rOiBib29sZWFuO1xuXG5cdFx0aWYgKC9JbnZhbGlkIFVSTC8udGVzdChlLm1lc3NhZ2UpKVxuXHRcdHtcblx0XHRcdGlmICh0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBvbGQgPSBiYXNlO1xuXHRcdFx0XHRsZXQgdSA9IHVybFBhcnNlKGJhc2UpLyogYXMgVVJMICYge1xuXHRcdFx0XHRcdFx0c2V0KG5hbWU6IGtleW9mIFVSTCwgdmFsdWU6IHN0cmluZyk6IHZvaWRcblx0XHRcdFx0XHR9Ki87XG5cblx0XHRcdFx0aWYgKChcblx0XHRcdFx0XHR1Lmhvc3QgPT09ICcnXG5cdFx0XHRcdFx0fHwgdS5wcm90b2NvbCA9PT0gJydcblx0XHRcdFx0KSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICghb2xkLmluY2x1ZGVzKCcvJykgJiYgW1xuXHRcdFx0XHRcdFx0dS5wcm90b2NvbCArIHUuaG9zdCxcblx0XHRcdFx0XHRcdHUucHJvdG9jb2wgKyB1LnBhdGhuYW1lLFxuXHRcdFx0XHRcdF0uaW5jbHVkZXMob2xkLnRvTG93ZXJDYXNlKCkpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUgPSB1cmxQYXJzZSgnJyk7XG5cblx0XHRcdFx0XHRcdHUuc2V0KCdob3N0Jywgb2xkKTtcblx0XHRcdFx0XHRcdHUuc2V0KCdwcm90b2NvbCcsIEVOVU1fRkFLRS5wcm90b2NvbCk7XG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnJyk7XG5cblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gRU5VTV9GQUtFLnByb3RvY29sO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh1Lmhvc3QgPT09ICcnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICh1LnBhdGhuYW1lICE9ICcnICYmICF1LnBhdGhuYW1lLmluY2x1ZGVzKCcvJykpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdob3N0JywgdS5wYXRobmFtZSk7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCBFTlVNX0ZBS0UuaG9zdG5hbWUpO1xuXG5cdFx0XHRcdFx0XHRcdF9oaWRkZW5fLmhvc3RuYW1lID0gdS5ob3N0bmFtZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodS5wcm90b2NvbCA9PT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3Byb3RvY29sJywgRU5VTV9GQUtFLnByb3RvY29sKTtcblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gdS5wcm90b2NvbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0aWYgKHUucGF0aG5hbWUgIT09ICcnICYmICF1LnBhdGhuYW1lLnN0YXJ0c1dpdGgoJy8nKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnLycgKyB1LnBhdGhuYW1lKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIHUudG9TdHJpbmcoKSk7XG5cblx0XHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGJhc2UgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0YmFzZSA9IGAke0VOVU1fRkFLRS5wcm90b2NvbH0vLyR7RU5VTV9GQUtFLmhvc3RuYW1lfWA7XG5cblx0XHRcdFx0X3VybCA9IG5ldyBVUkwodXJsLCBiYXNlKTtcblxuXHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IEVOVU1fRkFLRS5wcm90b2NvbDtcblx0XHRcdFx0X2hpZGRlbl8uaG9zdG5hbWUgPSBFTlVNX0ZBS0UuaG9zdG5hbWU7XG5cblx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghb2spXG5cdFx0e1xuXHRcdFx0dGhyb3cgZVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dXJsOiBfdXJsLFxuXHRcdGhpZGRlbjogX2hpZGRlbl8sXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eVVSTFxuIl19