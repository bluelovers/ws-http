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
    static create(url, base) {
        return new this(url, base);
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
    if (url && url instanceof LazyURL) {
        url = url.toRealString();
    }
    else if (url && url instanceof URL) {
        url = url.href;
    }
    else if (url != null && typeof url.href === 'string') {
        url = url.href;
    }
    else if (typeof url !== 'string') {
        throw new TypeError(`Argument '${url}' is not assignable to url like.`);
    }
    let _url;
    const _hidden_ = {};
    if (typeof base !== 'string' && base != null && typeof base.href === 'string') {
        base = base.href;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsMERBQWlDO0FBS3BCLFFBQUEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixRQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFM0MsSUFBVyxTQUlWO0FBSkQsV0FBVyxTQUFTO0lBRW5CLG9DQUF1QixDQUFBO0lBQ3ZCLDJDQUE4QixDQUFBO0FBQy9CLENBQUMsRUFKVSxTQUFTLEtBQVQsU0FBUyxRQUluQjtBQUVELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFMUMsTUFBYSxPQUFRLFNBQVEsR0FBRztJQVUvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFNUIsa0JBQWtCO0lBQ25CLENBQUM7SUFmRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQXFDLEVBQUUsSUFBZTtRQUVuRSxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBY0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFFSDs7Ozs7O09BTUc7SUFFSCxJQUFJLEtBQUs7UUFFUixJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUMzRjtZQUNDLE9BQU8sSUFBSSxDQUFD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QUMsUUFBUSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUNwRDt3QkFDQyxhQUFhO3dCQUNiLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3BDO29CQUVELElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7b0JBRWxDLEVBQUUsR0FBRyxJQUFJLENBQUM7aUJBQ1Y7YUFDRDtpQkFDSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQ3JCO2dCQUNDLElBQUksR0FBRyxHQUFHLDJCQUFrQixLQUFLLGtDQUFrQixFQUFFLENBQUM7Z0JBRXRELElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTFCLFFBQVEsQ0FBQyxRQUFRLDhCQUFxQixDQUFDO2dCQUN2QyxRQUFRLENBQUMsUUFBUSxxQ0FBcUIsQ0FBQztnQkFFdkMsRUFBRSxHQUFHLElBQUksQ0FBQzthQUNWO1NBQ0Q7UUFFRCxJQUFJLENBQUMsRUFBRSxFQUNQO1lBQ0MsTUFBTSxDQUFDLENBQUE7U0FDUDtLQUNEO0lBRUQsT0FBTztRQUNOLEdBQUcsRUFBRSxJQUFJO1FBQ1QsTUFBTSxFQUFFLFFBQVE7S0FDaEIsQ0FBQTtBQUNGLENBQUM7QUFwSUQsc0JBb0lDO0FBRUQsa0JBQWUsT0FBTyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjAxOS82LzYuXG4gKi9cblxuaW1wb3J0IHVybFBhcnNlIGZyb20gJ3VybC1wYXJzZSc7XG5pbXBvcnQgU3ltYm9sSW5zcGVjdCBmcm9tICdzeW1ib2wuaW5zcGVjdCc7XG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJztcblxuZXhwb3J0IHR5cGUgSVVSTExpa2UgPSBzdHJpbmcgfCBVUkwgfCBJVVJMT2JqZWN0TGlrZTtcbmV4cG9ydCBjb25zdCBTWU1fVVJMID0gU3ltYm9sKCd1cmwnKTtcbmV4cG9ydCBjb25zdCBTWU1fSElEREVOID0gU3ltYm9sKCdoaWRkZW4nKTtcblxuY29uc3QgZW51bSBFTlVNX0ZBS0Vcbntcblx0cHJvdG9jb2wgPSAnZmFrZStodHRwOicsXG5cdGhvc3RuYW1lID0gJ3VybC1mYWtlLWhvc3RuYW1lJyxcbn1cblxuY29uc3QgU3ltYm9sQ29udGV4dCA9IGZpbmRTeW1ib2xDb250ZXh0KCk7XG5cbmV4cG9ydCBjbGFzcyBMYXp5VVJMIGV4dGVuZHMgVVJMIGltcGxlbWVudHMgVVJMXG57XG5cdHByb3RlY3RlZCBbU1lNX1VSTF0/OiBVUkw7XG5cdHByb3RlY3RlZCBbU1lNX0hJRERFTl06IFBhcnRpYWw8VVJMPjtcblxuXHRzdGF0aWMgY3JlYXRlKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcblx0e1xuXHRcdHJldHVybiBuZXcgdGhpcyh1cmwsIGJhc2UpXG5cdH1cblxuXHRjb25zdHJ1Y3Rvcih1cmw6IElVUkxMaWtlIHwgW0lVUkxMaWtlLCBJVVJMTGlrZT9dLCBiYXNlPzogSVVSTExpa2UpXG5cdHtcblx0XHRsZXQgdSA9IF9jb3JlKHVybCwgYmFzZSlcblxuXHRcdHN1cGVyKHUudXJsLmhyZWYpO1xuXG5cdFx0Ly90aGlzW1NZTV9VUkxdID0gX3VybDtcblx0XHR0aGlzW1NZTV9ISURERU5dID0gdS5oaWRkZW47XG5cblx0XHQvL19udW1lcmFibGUodGhpcylcblx0fVxuXG5cdC8qXG5cdFtTeW1ib2xJbnNwZWN0XSgpXG5cdHtcblx0XHRyZXR1cm4gYExhenlVUkwge1xuICBocmVmOiAnJHt0aGlzLmhyZWZ9JyxcbiAgaHJlZjogJyR7dGhpcy50b1JlYWxTdHJpbmcoKX0nLFxuICBvcmlnaW46ICcke3RoaXMub3JpZ2lufScsXG4gIHByb3RvY29sOiAnJHt0aGlzLnByb3RvY29sfScsXG4gIHVzZXJuYW1lOiAnJHt0aGlzLnVzZXJuYW1lfScsXG4gIHBhc3N3b3JkOiAnJHt0aGlzLnBhc3N3b3JkfScsXG4gIGhvc3Q6ICcke3RoaXMuaG9zdH0nLFxuICBob3N0bmFtZTogJyR7dGhpcy5ob3N0bmFtZX0nLFxuICBwb3J0OiAnJHt0aGlzLnBvcnR9JyxcbiAgcGF0aG5hbWU6ICcke3RoaXMucGF0aG5hbWV9JyxcbiAgc2VhcmNoOiAnJHt0aGlzLnNlYXJjaH0nLFxuICBzZWFyY2hQYXJhbXM6ICR7dXRpbC5pbnNwZWN0KHRoaXMuc2VhcmNoUGFyYW1zKX0sXG4gIGhhc2g6ICcke3RoaXMuaGFzaH0nXG59YDtcblx0fVxuXHQgKi9cblxuXHQvKlxuXHRbU3ltYm9sSW5zcGVjdF0oKVxuXHR7XG5cdFx0cmV0dXJuIGBMYXp5VVJMKCR7dGhpcy5ocmVmfSlgO1xuXHR9XG5cblx0ICovXG5cblx0Z2V0IHBhdGhzKClcblx0e1xuXHRcdGlmIChTeW1ib2xDb250ZXh0ICE9IG51bGwgJiYgdGhpc1tTeW1ib2xDb250ZXh0XSAmJiBBcnJheS5pc0FycmF5KHRoaXNbU3ltYm9sQ29udGV4dF0ucGF0aCkpXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXNbU3ltYm9sQ29udGV4dF0ucGF0aC5zbGljZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLnBhdGhuYW1lXG5cdFx0XHQuc3BsaXQoJy8nKVxuXHRcdFx0LmZpbHRlcih2ID0+IHYgIT0gJycpXG5cdH1cblxuXHRmYWtlRXhpc3RzKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmZha2VLZXlzKCkubGVuZ3RoXG5cdH1cblxuXHRmYWtlS2V5cygpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpc1tTWU1fSElEREVOXSlcblx0fVxuXG5cdGZha2VFbnRyaWVzKClcblx0e1xuXHRcdHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzW1NZTV9ISURERU5dKVxuXHR9XG5cblx0LyoqXG5cdCAqIGdldCB0aGUgcmVhbCB1cmwgKHJlbW92ZSBmYWtlIHZhbHVlKVxuXHQgKiB0aHJvdyBlcnJvciBpZiBub3QgYSB2YWxpZCB1cmxcblx0ICpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHRvUmVhbFN0cmluZygpXG5cdHtcblx0XHRsZXQga3MgPSB0aGlzLmZha2VFbnRyaWVzKCk7XG5cblx0XHRpZiAoa3MubGVuZ3RoKVxuXHRcdHtcblx0XHRcdGxldCB1ID0gdXJsUGFyc2UodGhpcy5ocmVmKTtcblxuXHRcdFx0a3Ncblx0XHRcdFx0LmZvckVhY2goKFtuYW1lLCB2YWx1ZV0pID0+XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAodVtuYW1lXSA9PT0gdmFsdWUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dS5zZXQobmFtZSBhcyBhbnksICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHQ7XG5cblx0XHRcdGlmICh1Lmhvc3QgPT09ICcnKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAodS51c2VybmFtZSAhPT0gJycgfHwgdS5wYXNzd29yZCAhPT0gJycgfHwgdS5wb3J0ICE9PSAnJyB8fCB1LnByb3RvY29sICE9PSAnJylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEludmFsaWQgVVJMICR7dX1gKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGxldCBzID0gdS50b1N0cmluZygpO1xuXG5cdFx0XHRpZiAodS5wcm90b2NvbCA9PT0gJycgJiYgdS5ob3N0ID09PSAnJylcblx0XHRcdHtcblx0XHRcdFx0cyA9IHMucmVwbGFjZSgvXlxcL1xcLy8sICcnKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5ocmVmO1xuXHR9XG5cblx0dG9TdHJpbmcoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaHJlZjtcblx0fVxuXG5cdC8qXG5cdHRvSlNPTigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS50b0pTT04oKTtcblx0fVxuXHQgKi9cblxuXHQvKlxuXHRnZXQgaGFzaCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5oYXNoXG5cdH1cblxuXHRzZXQgaGFzaCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0uaGFzaCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgaG9zdCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5ob3N0XG5cdH1cblxuXHRzZXQgaG9zdCh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLmhvc3RuYW1lO1xuXG5cdFx0dGhpc1tTWU1fVVJMXS5ob3N0ID0gdmFsdWVcblx0fVxuXHQgKi9cblxuXHRnZXQgaG9zdG5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHN1cGVyLmhvc3RuYW1lXG5cdH1cblxuXHRzZXQgaG9zdG5hbWUodmFsdWUpXG5cdHtcblx0XHRkZWxldGUgdGhpc1tTWU1fSElEREVOXS5ob3N0bmFtZTtcblxuXHRcdHN1cGVyLmhvc3RuYW1lID0gdmFsdWVcblx0fVxuXG5cdC8qXG5cdGdldCBocmVmKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhyZWZcblx0fVxuXG5cdHNldCBocmVmKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5ocmVmID0gdmFsdWVcblx0fVxuXG5cdGdldCBvcmlnaW4oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ub3JpZ2luXG5cdH1cblxuXHRnZXQgcGFzc3dvcmQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucGFzc3dvcmRcblx0fVxuXG5cdHNldCBwYXNzd29yZCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucGFzc3dvcmQgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IHBhdGhuYW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnBhdGhuYW1lXG5cdH1cblxuXHRzZXQgcGF0aG5hbWUodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBhdGhuYW1lID0gdmFsdWVcblx0fVxuXG5cdGdldCBwb3J0KClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnBvcnRcblx0fVxuXG5cdHNldCBwb3J0KHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wb3J0ID0gdmFsdWVcblx0fVxuXHQgKi9cblxuXHRnZXQgcHJvdG9jb2woKVxuXHR7XG5cdFx0cmV0dXJuIHN1cGVyLnByb3RvY29sXG5cdH1cblxuXHRzZXQgcHJvdG9jb2wodmFsdWUpXG5cdHtcblx0XHRkZWxldGUgdGhpc1tTWU1fSElEREVOXS5wcm90b2NvbDtcblxuXHRcdHN1cGVyLnByb3RvY29sID0gdmFsdWVcblx0fVxuXG5cdC8qXG5cdGdldCBzZWFyY2goKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uc2VhcmNoXG5cdH1cblxuXHRzZXQgc2VhcmNoKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5zZWFyY2ggPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IHNlYXJjaFBhcmFtcygpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5zZWFyY2hQYXJhbXNcblx0fVxuXG5cdGdldCB1c2VybmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS51c2VybmFtZVxuXHR9XG5cblx0c2V0IHVzZXJuYW1lKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS51c2VybmFtZSA9IHZhbHVlXG5cdH1cblxuXHQgKi9cblxuXHQvKipcblx0ICogQGFsaWFzIHByb3RvY29sXG5cdCAqL1xuXHRnZXQgc2NoZW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnByb3RvY29sXG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIHByb3RvY29sXG5cdCAqL1xuXHRzZXQgc2NoZW1lKHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLnByb3RvY29sID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIGhhc2hcblx0ICovXG5cdGdldCBmcmFnbWVudCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5oYXNoXG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIGhhc2hcblx0ICovXG5cdHNldCBmcmFnbWVudCh2YWx1ZTogc3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5oYXNoID0gdmFsdWU7XG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIHNlYXJjaFxuXHQgKi9cblx0Z2V0IHF1ZXJ5KClcblx0e1xuXHRcdHJldHVybiB0aGlzLnNlYXJjaFxuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBzZWFyY2hcblx0ICovXG5cdHNldCBxdWVyeSh2YWx1ZTogc3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5zZWFyY2ggPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBjbG9uZSBpbnRvIGEgb2JqZWN0XG5cdCAqXG5cdCAqIEByZXR1cm5zIHtJVVJMT2JqZWN0fVxuXHQgKi9cblx0dG9PYmplY3QodXJsOiBVUkwpOiBJVVJMT2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC50b09iamVjdCh1cmwpXG5cdH1cblxuXHRzdGF0aWMgdG9PYmplY3QodXJsOiBVUkwpOiBJVVJMT2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkucmVkdWNlKChhLCBiKSA9PlxuXHRcdHtcblx0XHRcdGlmIChiID09PSAnc2VhcmNoUGFyYW1zJylcblx0XHRcdHtcblx0XHRcdFx0YVtiXSA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLnNlYXJjaFBhcmFtcy5lbnRyaWVzKCkgYXMgYW55IGFzIFtzdHJpbmcsIHN0cmluZ11bXSlcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YVtiXSA9IHRoaXNbYl07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhXG5cdFx0fSwge30gYXMgSVVSTE9iamVjdClcblx0fVxuXG5cdGtleXMoKTogSVVybEtleXNbXVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpXG5cdH1cblxuXHR2YWx1ZXMoKVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwudmFsdWVzKHRoaXMpXG5cdH1cblxuXHRlbnRyaWVzKCk6IElFbnRyaWVzXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5lbnRyaWVzKHRoaXMpXG5cdH1cblxuXHRzdGF0aWMga2V5cygpOiBJVXJsS2V5c1tdXG5cdHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0J2hyZWYnLFxuXHRcdFx0J3Byb3RvY29sJyxcblx0XHRcdCd1c2VybmFtZScsXG5cdFx0XHQncGFzc3dvcmQnLFxuXHRcdFx0J2hvc3QnLFxuXHRcdFx0J2hvc3RuYW1lJyxcblx0XHRcdCdwb3J0Jyxcblx0XHRcdCdwYXRobmFtZScsXG5cdFx0XHQnc2VhcmNoJyxcblx0XHRcdCdzZWFyY2hQYXJhbXMnLFxuXHRcdFx0J2hhc2gnLFxuXHRcdF1cblx0fVxuXG5cdHN0YXRpYyB2YWx1ZXModXJsOiBVUkwpXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkubWFwKG5hbWUgPT4gdXJsW25hbWVdKVxuXHR9XG5cblx0c3RhdGljIGVudHJpZXModXJsOiBVUkwpOiBJRW50cmllc1xuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLm1hcChuYW1lID0+IFtuYW1lLCB1cmxbbmFtZV1dKSBhcyBJRW50cmllc1xuXHR9XG5cblx0Y3JlYXRlVVJMU2VhcmNoUGFyYW1zKGluaXQ/OiBzdHJpbmdbXVtdIHwgUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IHN0cmluZyB8IFVSTFNlYXJjaFBhcmFtcyB8IFVSTClcblx0e1xuXHRcdGlmIChpbml0IGluc3RhbmNlb2YgVVJMKVxuXHRcdHtcblx0XHRcdGluaXQgPSBpbml0LnNlYXJjaFBhcmFtcztcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyhpbml0KVxuXHR9XG5cbn1cblxuZXhwb3J0IHR5cGUgSUVudHJpZXMgPSAoW1wiaGFzaFwiIHwgXCJob3N0XCIgfCBcImhvc3RuYW1lXCIgfCBcImhyZWZcIiB8IFwicGFzc3dvcmRcIiB8IFwicGF0aG5hbWVcIiB8IFwicG9ydFwiIHwgXCJwcm90b2NvbFwiIHwgXCJzZWFyY2hcIiB8IFwidXNlcm5hbWVcIiwgc3RyaW5nXSB8IFtcInNlYXJjaFBhcmFtc1wiLCBVUkxTZWFyY2hQYXJhbXNdKVtdXG5cbmV4cG9ydCB0eXBlIElFbnRyaWVzUm93PFQgZXh0ZW5kcyBJVXJsS2V5cz4gPSBbVCwgVVJMW1RdXVxuXG5mdW5jdGlvbiBfbnVtZXJhYmxlKGxpYilcbntcblx0bGV0IGRzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobGliKTtcblxuXHQoW1xuXHRcdCdocmVmJyxcblx0XHQncHJvdG9jb2wnLFxuXHRcdCd1c2VybmFtZScsXG5cdFx0J3Bhc3N3b3JkJyxcblx0XHQnaG9zdCcsXG5cdFx0J2hvc3RuYW1lJyxcblx0XHQncG9ydCcsXG5cdFx0J3BhdGhuYW1lJyxcblx0XHQnc2VhcmNoJyxcblx0XHQnc2VhcmNoUGFyYW1zJyxcblx0XHQnaGFzaCcsXG5cdF0gYXMgY29uc3QpXG5cdFx0LmZvckVhY2goKG5hbWUpID0+XG5cdFx0e1xuXHRcdFx0aWYgKG5hbWUgaW4gZHMpXG5cdFx0XHR7XG5cdFx0XHRcdGRzW25hbWVdLmVudW1lcmFibGUgPSB0cnVlO1xuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsaWIsIG5hbWUsIGRzW25hbWVdKVxuXHRcdFx0fVxuXHRcdH0pXG5cdDtcbn1cblxuZXhwb3J0IHR5cGUgSVVybEtleXMgPVxuXHR8ICdocmVmJ1xuXHR8ICd1c2VybmFtZSdcblx0fCAncGFzc3dvcmQnXG5cdHwgJ2hvc3QnXG5cdHwgJ2hvc3RuYW1lJ1xuXHR8ICdwb3J0J1xuXHR8ICdwYXRobmFtZSdcblx0fCAnc2VhcmNoJ1xuXHR8ICdzZWFyY2hQYXJhbXMnXG5cdHwgJ3Byb3RvY29sJ1xuXHR8ICdoYXNoJ1xuXHQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kU3ltYm9sQ29udGV4dCgpOiBzeW1ib2xcbntcblx0bGV0IHUgPSBuZXcgVVJMKGBodHRwczovL2xvY2FsaG9zdGApO1xuXG5cdGNvbnN0IFN5bWJvbENvbnRleHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHUpXG5cdFx0LmZpbHRlcihzeW0gPT4gdVtzeW1dLmhvc3QgPT0gJ2xvY2FsaG9zdCcpWzBdXG5cdDtcblxuXHRyZXR1cm4gU3ltYm9sQ29udGV4dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVVJMT2JqZWN0TGlrZVxue1xuXHRocmVmOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVSTE9iamVjdFxue1xuXHRocmVmOiBzdHJpbmc7XG5cdHByb3RvY29sOiBzdHJpbmc7XG5cdHVzZXJuYW1lOiBzdHJpbmc7XG5cdHBhc3N3b3JkOiBzdHJpbmc7XG5cdGhvc3Q6IHN0cmluZztcblx0aG9zdG5hbWU6IHN0cmluZztcblx0cG9ydDogc3RyaW5nO1xuXHRwYXRobmFtZTogc3RyaW5nO1xuXHRzZWFyY2g6IHN0cmluZztcblx0c2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXM7XG5cdGhhc2g6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcbntcblx0aWYgKEFycmF5LmlzQXJyYXkodXJsKSlcblx0e1xuXHRcdGlmIChiYXNlID09IG51bGwpXG5cdFx0e1xuXHRcdFx0W3VybCwgYmFzZV0gPSB1cmw7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBMYXp5VVJMKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRvUmVhbFN0cmluZygpO1xuXHR9XG5cdGVsc2UgaWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBVUkwpXG5cdHtcblx0XHR1cmwgPSB1cmwuaHJlZjtcblx0fVxuXHRlbHNlIGlmICh1cmwgIT0gbnVsbCAmJiB0eXBlb2YgKHVybCBhcyBJVVJMT2JqZWN0TGlrZSkuaHJlZiA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHR1cmwgPSAodXJsIGFzIElVUkxPYmplY3RMaWtlKS5ocmVmO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgQXJndW1lbnQgJyR7dXJsfScgaXMgbm90IGFzc2lnbmFibGUgdG8gdXJsIGxpa2UuYClcblx0fVxuXG5cdGxldCBfdXJsOiBVUkw7XG5cdGNvbnN0IF9oaWRkZW5fOiBQYXJ0aWFsPFVSTD4gPSB7fTtcblxuXHRpZiAodHlwZW9mIGJhc2UgIT09ICdzdHJpbmcnICYmIGJhc2UgIT0gbnVsbCAmJiB0eXBlb2YgYmFzZS5ocmVmID09PSAnc3RyaW5nJylcblx0e1xuXHRcdGJhc2UgPSBiYXNlLmhyZWY7XG5cdH1cblxuXHRpZiAoYmFzZSA9PT0gJycpXG5cdHtcblx0XHRiYXNlID0gdm9pZCAwO1xuXHR9XG5cblx0dHJ5XG5cdHtcblx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIGJhc2UgYXMgc3RyaW5nKVxuXHR9XG5cdGNhdGNoIChlKVxuXHR7XG5cdFx0bGV0IG9rOiBib29sZWFuO1xuXG5cdFx0aWYgKC9JbnZhbGlkIFVSTC8udGVzdChlLm1lc3NhZ2UpKVxuXHRcdHtcblx0XHRcdGlmICh0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBvbGQgPSBiYXNlO1xuXHRcdFx0XHRsZXQgdSA9IHVybFBhcnNlKGJhc2UpLyogYXMgVVJMICYge1xuXHRcdFx0XHRcdFx0c2V0KG5hbWU6IGtleW9mIFVSTCwgdmFsdWU6IHN0cmluZyk6IHZvaWRcblx0XHRcdFx0XHR9Ki87XG5cblx0XHRcdFx0aWYgKChcblx0XHRcdFx0XHR1Lmhvc3QgPT09ICcnXG5cdFx0XHRcdFx0fHwgdS5wcm90b2NvbCA9PT0gJydcblx0XHRcdFx0KSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICghb2xkLmluY2x1ZGVzKCcvJykgJiYgW1xuXHRcdFx0XHRcdFx0dS5wcm90b2NvbCArIHUuaG9zdCxcblx0XHRcdFx0XHRcdHUucHJvdG9jb2wgKyB1LnBhdGhuYW1lLFxuXHRcdFx0XHRcdF0uaW5jbHVkZXMob2xkLnRvTG93ZXJDYXNlKCkpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUgPSB1cmxQYXJzZSgnJyk7XG5cblx0XHRcdFx0XHRcdHUuc2V0KCdob3N0Jywgb2xkKTtcblx0XHRcdFx0XHRcdHUuc2V0KCdwcm90b2NvbCcsIEVOVU1fRkFLRS5wcm90b2NvbCk7XG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnJyk7XG5cblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gRU5VTV9GQUtFLnByb3RvY29sO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh1Lmhvc3QgPT09ICcnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICh1LnBhdGhuYW1lICE9ICcnICYmICF1LnBhdGhuYW1lLmluY2x1ZGVzKCcvJykpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdob3N0JywgdS5wYXRobmFtZSk7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCBFTlVNX0ZBS0UuaG9zdG5hbWUpO1xuXG5cdFx0XHRcdFx0XHRcdF9oaWRkZW5fLmhvc3RuYW1lID0gdS5ob3N0bmFtZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodS5wcm90b2NvbCA9PT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3Byb3RvY29sJywgRU5VTV9GQUtFLnByb3RvY29sKTtcblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gdS5wcm90b2NvbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0aWYgKHUucGF0aG5hbWUgIT09ICcnICYmICF1LnBhdGhuYW1lLnN0YXJ0c1dpdGgoJy8nKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnLycgKyB1LnBhdGhuYW1lKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIHUudG9TdHJpbmcoKSk7XG5cblx0XHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGJhc2UgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0YmFzZSA9IGAke0VOVU1fRkFLRS5wcm90b2NvbH0vLyR7RU5VTV9GQUtFLmhvc3RuYW1lfWA7XG5cblx0XHRcdFx0X3VybCA9IG5ldyBVUkwodXJsLCBiYXNlKTtcblxuXHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IEVOVU1fRkFLRS5wcm90b2NvbDtcblx0XHRcdFx0X2hpZGRlbl8uaG9zdG5hbWUgPSBFTlVNX0ZBS0UuaG9zdG5hbWU7XG5cblx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghb2spXG5cdFx0e1xuXHRcdFx0dGhyb3cgZVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dXJsOiBfdXJsLFxuXHRcdGhpZGRlbjogX2hpZGRlbl8sXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eVVSTFxuIl19