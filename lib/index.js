"use strict";
/**
 * Created by user on 2019/6/6.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const url_parse_1 = require("url-parse");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgseUNBQWlDO0FBS3BCLFFBQUEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixRQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFM0MsSUFBVyxTQUlWO0FBSkQsV0FBVyxTQUFTO0lBRW5CLG9DQUF1QixDQUFBO0lBQ3ZCLDJDQUE4QixDQUFBO0FBQy9CLENBQUMsRUFKVSxTQUFTLEtBQVQsU0FBUyxRQUluQjtBQUVELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFMUMsTUFBYSxPQUFRLFNBQVEsR0FBRztJQVUvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFNUIsa0JBQWtCO0lBQ25CLENBQUM7SUFmRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQXFDLEVBQUUsSUFBZTtRQUVuRSxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBY0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFFSDs7Ozs7O09BTUc7SUFFSCxJQUFJLEtBQUs7UUFFUixJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUMzRjtZQUNDLE9BQU8sSUFBSSxDQUFDLGFB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dXNlciBvbiAyMDE5LzYvNi5cbiAqL1xuXG5pbXBvcnQgdXJsUGFyc2UgZnJvbSAndXJsLXBhcnNlJztcbmltcG9ydCBTeW1ib2xJbnNwZWN0IGZyb20gJ3N5bWJvbC5pbnNwZWN0JztcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5leHBvcnQgdHlwZSBJVVJMTGlrZSA9IHN0cmluZyB8IFVSTCB8IElVUkxPYmplY3RMaWtlO1xuZXhwb3J0IGNvbnN0IFNZTV9VUkwgPSBTeW1ib2woJ3VybCcpO1xuZXhwb3J0IGNvbnN0IFNZTV9ISURERU4gPSBTeW1ib2woJ2hpZGRlbicpO1xuXG5jb25zdCBlbnVtIEVOVU1fRkFLRVxue1xuXHRwcm90b2NvbCA9ICdmYWtlK2h0dHA6Jyxcblx0aG9zdG5hbWUgPSAndXJsLWZha2UtaG9zdG5hbWUnLFxufVxuXG5jb25zdCBTeW1ib2xDb250ZXh0ID0gZmluZFN5bWJvbENvbnRleHQoKTtcblxuZXhwb3J0IGNsYXNzIExhenlVUkwgZXh0ZW5kcyBVUkwgaW1wbGVtZW50cyBVUkxcbntcblx0cHJvdGVjdGVkIFtTWU1fVVJMXT86IFVSTDtcblx0cHJvdGVjdGVkIFtTWU1fSElEREVOXTogUGFydGlhbDxVUkw+O1xuXG5cdHN0YXRpYyBjcmVhdGUodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKHVybCwgYmFzZSlcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcblx0e1xuXHRcdGxldCB1ID0gX2NvcmUodXJsLCBiYXNlKVxuXG5cdFx0c3VwZXIodS51cmwuaHJlZik7XG5cblx0XHQvL3RoaXNbU1lNX1VSTF0gPSBfdXJsO1xuXHRcdHRoaXNbU1lNX0hJRERFTl0gPSB1LmhpZGRlbjtcblxuXHRcdC8vX251bWVyYWJsZSh0aGlzKVxuXHR9XG5cblx0Lypcblx0W1N5bWJvbEluc3BlY3RdKClcblx0e1xuXHRcdHJldHVybiBgTGF6eVVSTCB7XG4gIGhyZWY6ICcke3RoaXMuaHJlZn0nLFxuICBocmVmOiAnJHt0aGlzLnRvUmVhbFN0cmluZygpfScsXG4gIG9yaWdpbjogJyR7dGhpcy5vcmlnaW59JyxcbiAgcHJvdG9jb2w6ICcke3RoaXMucHJvdG9jb2x9JyxcbiAgdXNlcm5hbWU6ICcke3RoaXMudXNlcm5hbWV9JyxcbiAgcGFzc3dvcmQ6ICcke3RoaXMucGFzc3dvcmR9JyxcbiAgaG9zdDogJyR7dGhpcy5ob3N0fScsXG4gIGhvc3RuYW1lOiAnJHt0aGlzLmhvc3RuYW1lfScsXG4gIHBvcnQ6ICcke3RoaXMucG9ydH0nLFxuICBwYXRobmFtZTogJyR7dGhpcy5wYXRobmFtZX0nLFxuICBzZWFyY2g6ICcke3RoaXMuc2VhcmNofScsXG4gIHNlYXJjaFBhcmFtczogJHt1dGlsLmluc3BlY3QodGhpcy5zZWFyY2hQYXJhbXMpfSxcbiAgaGFzaDogJyR7dGhpcy5oYXNofSdcbn1gO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdFtTeW1ib2xJbnNwZWN0XSgpXG5cdHtcblx0XHRyZXR1cm4gYExhenlVUkwoJHt0aGlzLmhyZWZ9KWA7XG5cdH1cblxuXHQgKi9cblxuXHRnZXQgcGF0aHMoKVxuXHR7XG5cdFx0aWYgKFN5bWJvbENvbnRleHQgIT0gbnVsbCAmJiB0aGlzW1N5bWJvbENvbnRleHRdICYmIEFycmF5LmlzQXJyYXkodGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoLnNsaWNlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucGF0aG5hbWVcblx0XHRcdC5zcGxpdCgnLycpXG5cdFx0XHQuZmlsdGVyKHYgPT4gdiAhPSAnJylcblx0fVxuXG5cdGZha2VFeGlzdHMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmFrZUtleXMoKS5sZW5ndGhcblx0fVxuXG5cdGZha2VLZXlzKClcblx0e1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzW1NZTV9ISURERU5dKVxuXHR9XG5cblx0ZmFrZUVudHJpZXMoKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXNbU1lNX0hJRERFTl0pXG5cdH1cblxuXHQvKipcblx0ICogZ2V0IHRoZSByZWFsIHVybCAocmVtb3ZlIGZha2UgdmFsdWUpXG5cdCAqIHRocm93IGVycm9yIGlmIG5vdCBhIHZhbGlkIHVybFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0dG9SZWFsU3RyaW5nKClcblx0e1xuXHRcdGxldCBrcyA9IHRoaXMuZmFrZUVudHJpZXMoKTtcblxuXHRcdGlmIChrcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0bGV0IHUgPSB1cmxQYXJzZSh0aGlzLmhyZWYpO1xuXG5cdFx0XHRrc1xuXHRcdFx0XHQuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICh1W25hbWVdID09PSB2YWx1ZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1LnNldChuYW1lIGFzIGFueSwgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdDtcblxuXHRcdFx0aWYgKHUuaG9zdCA9PT0gJycpXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh1LnVzZXJuYW1lICE9PSAnJyB8fCB1LnBhc3N3b3JkICE9PSAnJyB8fCB1LnBvcnQgIT09ICcnIHx8IHUucHJvdG9jb2wgIT09ICcnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBVUkwgJHt1fWApXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IHMgPSB1LnRvU3RyaW5nKCk7XG5cblx0XHRcdGlmICh1LnByb3RvY29sID09PSAnJyAmJiB1Lmhvc3QgPT09ICcnKVxuXHRcdFx0e1xuXHRcdFx0XHRzID0gcy5yZXBsYWNlKC9eXFwvXFwvLywgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cblxuXHR0b1N0cmluZygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5ocmVmO1xuXHR9XG5cblx0Lypcblx0dG9KU09OKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnRvSlNPTigpO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdGdldCBoYXNoKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhhc2hcblx0fVxuXG5cdHNldCBoYXNoKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5oYXNoID0gdmFsdWVcblx0fVxuXG5cdGdldCBob3N0KClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhvc3Rcblx0fVxuXG5cdHNldCBob3N0KHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0uaG9zdG5hbWU7XG5cblx0XHR0aGlzW1NZTV9VUkxdLmhvc3QgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBob3N0bmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIuaG9zdG5hbWVcblx0fVxuXG5cdHNldCBob3N0bmFtZSh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLmhvc3RuYW1lO1xuXG5cdFx0c3VwZXIuaG9zdG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IGhyZWYoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaHJlZlxuXHR9XG5cblx0c2V0IGhyZWYodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLmhyZWYgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IG9yaWdpbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5vcmlnaW5cblx0fVxuXG5cdGdldCBwYXNzd29yZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wYXNzd29yZFxuXHR9XG5cblx0c2V0IHBhc3N3b3JkKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wYXNzd29yZCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgcGF0aG5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucGF0aG5hbWVcblx0fVxuXG5cdHNldCBwYXRobmFtZSh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucGF0aG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IHBvcnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucG9ydFxuXHR9XG5cblx0c2V0IHBvcnQodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBvcnQgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBwcm90b2NvbCgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIucHJvdG9jb2xcblx0fVxuXG5cdHNldCBwcm90b2NvbCh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLnByb3RvY29sO1xuXG5cdFx0c3VwZXIucHJvdG9jb2wgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IHNlYXJjaCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5zZWFyY2hcblx0fVxuXG5cdHNldCBzZWFyY2godmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnNlYXJjaCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgc2VhcmNoUGFyYW1zKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnNlYXJjaFBhcmFtc1xuXHR9XG5cblx0Z2V0IHVzZXJuYW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnVzZXJuYW1lXG5cdH1cblxuXHRzZXQgdXNlcm5hbWUodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnVzZXJuYW1lID0gdmFsdWVcblx0fVxuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdGdldCBzY2hlbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucHJvdG9jb2xcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdHNldCBzY2hlbWUodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMucHJvdG9jb2wgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0Z2V0IGZyYWdtZW50KClcblx0e1xuXHRcdHJldHVybiB0aGlzLmhhc2hcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0c2V0IGZyYWdtZW50KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLmhhc2ggPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgc2VhcmNoXG5cdCAqL1xuXHRnZXQgcXVlcnkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoXG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIHNlYXJjaFxuXHQgKi9cblx0c2V0IHF1ZXJ5KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLnNlYXJjaCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIGNsb25lIGludG8gYSBvYmplY3Rcblx0ICpcblx0ICogQHJldHVybnMge0lVUkxPYmplY3R9XG5cdCAqL1xuXHR0b09iamVjdCh1cmw6IFVSTCk6IElVUkxPYmplY3Rcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLnRvT2JqZWN0KHVybClcblx0fVxuXG5cdHN0YXRpYyB0b09iamVjdCh1cmw6IFVSTCk6IElVUkxPYmplY3Rcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKS5yZWR1Y2UoKGEsIGIpID0+XG5cdFx0e1xuXHRcdFx0aWYgKGIgPT09ICdzZWFyY2hQYXJhbXMnKVxuXHRcdFx0e1xuXHRcdFx0XHRhW2JdID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmwuc2VhcmNoUGFyYW1zLmVudHJpZXMoKSBhcyBhbnkgYXMgW3N0cmluZywgc3RyaW5nXVtdKVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRhW2JdID0gdGhpc1tiXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFcblx0XHR9LCB7fSBhcyBJVVJMT2JqZWN0KVxuXHR9XG5cblx0a2V5cygpOiBJVXJsS2V5c1tdXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKClcblx0fVxuXG5cdHZhbHVlcygpXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC52YWx1ZXModGhpcylcblx0fVxuXG5cdGVudHJpZXMoKTogSUVudHJpZXNcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmVudHJpZXModGhpcylcblx0fVxuXG5cdHN0YXRpYyBrZXlzKCk6IElVcmxLZXlzW11cblx0e1xuXHRcdHJldHVybiBbXG5cdFx0XHQnaHJlZicsXG5cdFx0XHQncHJvdG9jb2wnLFxuXHRcdFx0J3VzZXJuYW1lJyxcblx0XHRcdCdwYXNzd29yZCcsXG5cdFx0XHQnaG9zdCcsXG5cdFx0XHQnaG9zdG5hbWUnLFxuXHRcdFx0J3BvcnQnLFxuXHRcdFx0J3BhdGhuYW1lJyxcblx0XHRcdCdzZWFyY2gnLFxuXHRcdFx0J3NlYXJjaFBhcmFtcycsXG5cdFx0XHQnaGFzaCcsXG5cdFx0XVxuXHR9XG5cblx0c3RhdGljIHZhbHVlcyh1cmw6IFVSTClcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKS5tYXAobmFtZSA9PiB1cmxbbmFtZV0pXG5cdH1cblxuXHRzdGF0aWMgZW50cmllcyh1cmw6IFVSTCk6IElFbnRyaWVzXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkubWFwKG5hbWUgPT4gW25hbWUsIHVybFtuYW1lXV0pIGFzIElFbnRyaWVzXG5cdH1cblxuXHRjcmVhdGVVUkxTZWFyY2hQYXJhbXMoaW5pdD86IHN0cmluZ1tdW10gfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgc3RyaW5nIHwgVVJMU2VhcmNoUGFyYW1zIHwgVVJMKVxuXHR7XG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBVUkwpXG5cdFx0e1xuXHRcdFx0aW5pdCA9IGluaXQuc2VhcmNoUGFyYW1zO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKGluaXQpXG5cdH1cblxufVxuXG5leHBvcnQgdHlwZSBJRW50cmllcyA9IChbXCJoYXNoXCIgfCBcImhvc3RcIiB8IFwiaG9zdG5hbWVcIiB8IFwiaHJlZlwiIHwgXCJwYXNzd29yZFwiIHwgXCJwYXRobmFtZVwiIHwgXCJwb3J0XCIgfCBcInByb3RvY29sXCIgfCBcInNlYXJjaFwiIHwgXCJ1c2VybmFtZVwiLCBzdHJpbmddIHwgW1wic2VhcmNoUGFyYW1zXCIsIFVSTFNlYXJjaFBhcmFtc10pW11cblxuZXhwb3J0IHR5cGUgSUVudHJpZXNSb3c8VCBleHRlbmRzIElVcmxLZXlzPiA9IFtULCBVUkxbVF1dXG5cbmZ1bmN0aW9uIF9udW1lcmFibGUobGliKVxue1xuXHRsZXQgZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhsaWIpO1xuXG5cdChbXG5cdFx0J2hyZWYnLFxuXHRcdCdwcm90b2NvbCcsXG5cdFx0J3VzZXJuYW1lJyxcblx0XHQncGFzc3dvcmQnLFxuXHRcdCdob3N0Jyxcblx0XHQnaG9zdG5hbWUnLFxuXHRcdCdwb3J0Jyxcblx0XHQncGF0aG5hbWUnLFxuXHRcdCdzZWFyY2gnLFxuXHRcdCdzZWFyY2hQYXJhbXMnLFxuXHRcdCdoYXNoJyxcblx0XSBhcyBjb25zdClcblx0XHQuZm9yRWFjaCgobmFtZSkgPT5cblx0XHR7XG5cdFx0XHRpZiAobmFtZSBpbiBkcylcblx0XHRcdHtcblx0XHRcdFx0ZHNbbmFtZV0uZW51bWVyYWJsZSA9IHRydWU7XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGxpYiwgbmFtZSwgZHNbbmFtZV0pXG5cdFx0XHR9XG5cdFx0fSlcblx0O1xufVxuXG5leHBvcnQgdHlwZSBJVXJsS2V5cyA9XG5cdHwgJ2hyZWYnXG5cdHwgJ3VzZXJuYW1lJ1xuXHR8ICdwYXNzd29yZCdcblx0fCAnaG9zdCdcblx0fCAnaG9zdG5hbWUnXG5cdHwgJ3BvcnQnXG5cdHwgJ3BhdGhuYW1lJ1xuXHR8ICdzZWFyY2gnXG5cdHwgJ3NlYXJjaFBhcmFtcydcblx0fCAncHJvdG9jb2wnXG5cdHwgJ2hhc2gnXG5cdDtcblxuZXhwb3J0IGNsYXNzIFVSTFNlYXJjaFBhcmFtc0xhenkgZXh0ZW5kcyBVUkxTZWFyY2hQYXJhbXMgaW1wbGVtZW50cyBVUkxTZWFyY2hQYXJhbXNcbntcblx0Y2xvbmUoKTogVVJMU2VhcmNoUGFyYW1zTGF6eVxuXHR7XG5cdFx0Y29uc29sZS5kaXIodGhpcy5lbnRyaWVzKCkpO1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0xhenkodGhpcy5lbnRyaWVzKCkpXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRTeW1ib2xDb250ZXh0KCk6IHN5bWJvbFxue1xuXHRsZXQgdSA9IG5ldyBVUkwoYGh0dHBzOi8vbG9jYWxob3N0YCk7XG5cblx0Y29uc3QgU3ltYm9sQ29udGV4dCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModSlcblx0XHQuZmlsdGVyKHN5bSA9PiB1W3N5bV0uaG9zdCA9PSAnbG9jYWxob3N0JylbMF1cblx0O1xuXG5cdHJldHVybiBTeW1ib2xDb250ZXh0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVUkxPYmplY3RMaWtlXG57XG5cdGhyZWY6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVVJMT2JqZWN0XG57XG5cdGhyZWY6IHN0cmluZztcblx0cHJvdG9jb2w6IHN0cmluZztcblx0dXNlcm5hbWU6IHN0cmluZztcblx0cGFzc3dvcmQ6IHN0cmluZztcblx0aG9zdDogc3RyaW5nO1xuXHRob3N0bmFtZTogc3RyaW5nO1xuXHRwb3J0OiBzdHJpbmc7XG5cdHBhdGhuYW1lOiBzdHJpbmc7XG5cdHNlYXJjaDogc3RyaW5nO1xuXHRzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcztcblx0aGFzaDogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NvcmUodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxue1xuXHRpZiAoQXJyYXkuaXNBcnJheSh1cmwpKVxuXHR7XG5cdFx0aWYgKGJhc2UgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRbdXJsLCBiYXNlXSA9IHVybDtcblx0XHR9XG5cdH1cblxuXHRpZiAodXJsICYmIHVybCBpbnN0YW5jZW9mIExhenlVUkwpXG5cdHtcblx0XHR1cmwgPSB1cmwudG9SZWFsU3RyaW5nKCk7XG5cdH1cblx0ZWxzZSBpZiAodXJsICYmIHVybCBpbnN0YW5jZW9mIFVSTClcblx0e1xuXHRcdHVybCA9IHVybC5ocmVmO1xuXHR9XG5cdGVsc2UgaWYgKHVybCAhPSBudWxsICYmIHR5cGVvZiAodXJsIGFzIElVUkxPYmplY3RMaWtlKS5ocmVmID09PSAnc3RyaW5nJylcblx0e1xuXHRcdHVybCA9ICh1cmwgYXMgSVVSTE9iamVjdExpa2UpLmhyZWY7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBBcmd1bWVudCAnJHt1cmx9JyBpcyBub3QgYXNzaWduYWJsZSB0byB1cmwgbGlrZS5gKVxuXHR9XG5cblx0bGV0IF91cmw6IFVSTDtcblx0Y29uc3QgX2hpZGRlbl86IFBhcnRpYWw8VVJMPiA9IHt9O1xuXG5cdGlmICh0eXBlb2YgYmFzZSAhPT0gJ3N0cmluZycgJiYgYmFzZSAhPSBudWxsICYmIHR5cGVvZiBiYXNlLmhyZWYgPT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0YmFzZSA9IGJhc2UuaHJlZjtcblx0fVxuXG5cdGlmIChiYXNlID09PSAnJylcblx0e1xuXHRcdGJhc2UgPSB2b2lkIDA7XG5cdH1cblxuXHR0cnlcblx0e1xuXHRcdF91cmwgPSBuZXcgVVJMKHVybCwgYmFzZSBhcyBzdHJpbmcpXG5cdH1cblx0Y2F0Y2ggKGUpXG5cdHtcblx0XHRsZXQgb2s6IGJvb2xlYW47XG5cblx0XHRpZiAoL0ludmFsaWQgVVJMLy50ZXN0KGUubWVzc2FnZSkpXG5cdFx0e1xuXHRcdFx0aWYgKHR5cGVvZiBiYXNlID09PSAnc3RyaW5nJylcblx0XHRcdHtcblx0XHRcdFx0bGV0IG9sZCA9IGJhc2U7XG5cdFx0XHRcdGxldCB1ID0gdXJsUGFyc2UoYmFzZSkvKiBhcyBVUkwgJiB7XG5cdFx0XHRcdFx0XHRzZXQobmFtZToga2V5b2YgVVJMLCB2YWx1ZTogc3RyaW5nKTogdm9pZFxuXHRcdFx0XHRcdH0qLztcblxuXHRcdFx0XHRpZiAoKFxuXHRcdFx0XHRcdHUuaG9zdCA9PT0gJydcblx0XHRcdFx0XHR8fCB1LnByb3RvY29sID09PSAnJ1xuXHRcdFx0XHQpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKCFvbGQuaW5jbHVkZXMoJy8nKSAmJiBbXG5cdFx0XHRcdFx0XHR1LnByb3RvY29sICsgdS5ob3N0LFxuXHRcdFx0XHRcdFx0dS5wcm90b2NvbCArIHUucGF0aG5hbWUsXG5cdFx0XHRcdFx0XS5pbmNsdWRlcyhvbGQudG9Mb3dlckNhc2UoKSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dSA9IHVybFBhcnNlKCcnKTtcblxuXHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCBvbGQpO1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3Byb3RvY29sJywgRU5VTV9GQUtFLnByb3RvY29sKTtcblx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcnKTtcblxuXHRcdFx0XHRcdFx0X2hpZGRlbl8ucHJvdG9jb2wgPSBFTlVNX0ZBS0UucHJvdG9jb2w7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHUuaG9zdCA9PT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKHUucGF0aG5hbWUgIT0gJycgJiYgIXUucGF0aG5hbWUuaW5jbHVkZXMoJy8nKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCB1LnBhdGhuYW1lKTtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ3BhdGhuYW1lJywgJycpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR1LnNldCgnaG9zdCcsIEVOVU1fRkFLRS5ob3N0bmFtZSk7XG5cblx0XHRcdFx0XHRcdFx0X2hpZGRlbl8uaG9zdG5hbWUgPSB1Lmhvc3RuYW1lO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh1LnByb3RvY29sID09PSAnJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1LnNldCgncHJvdG9jb2wnLCBFTlVNX0ZBS0UucHJvdG9jb2wpO1xuXHRcdFx0XHRcdFx0X2hpZGRlbl8ucHJvdG9jb2wgPSB1LnByb3RvY29sO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRpZiAodS5wYXRobmFtZSAhPT0gJycgJiYgIXUucGF0aG5hbWUuc3RhcnRzV2l0aCgnLycpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcvJyArIHUucGF0aG5hbWUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdF91cmwgPSBuZXcgVVJMKHVybCwgdS50b1N0cmluZygpKTtcblxuXHRcdFx0XHRcdG9rID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoYmFzZSA9PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHRiYXNlID0gYCR7RU5VTV9GQUtFLnByb3RvY29sfS8vJHtFTlVNX0ZBS0UuaG9zdG5hbWV9YDtcblxuXHRcdFx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIGJhc2UpO1xuXG5cdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gRU5VTV9GQUtFLnByb3RvY29sO1xuXHRcdFx0XHRfaGlkZGVuXy5ob3N0bmFtZSA9IEVOVU1fRkFLRS5ob3N0bmFtZTtcblxuXHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFvaylcblx0XHR7XG5cdFx0XHR0aHJvdyBlXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHR1cmw6IF91cmwsXG5cdFx0aGlkZGVuOiBfaGlkZGVuXyxcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXp5VVJMXG4iXX0=