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
    toObject() {
        return LazyURL.toObject(this);
    }
    /**
     * clone into a object
     *
     * @returns {IURLObject}
     */
    static toObject(url) {
        return LazyURL.keys().reduce((a, b) => {
            if (b === 'searchParams') {
                a[b] = new URLSearchParams(url.searchParams.entries());
            }
            else {
                a[b] = url[b];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsMERBQWlDO0FBS3BCLFFBQUEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixRQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFM0MsSUFBVyxTQUlWO0FBSkQsV0FBVyxTQUFTO0lBRW5CLG9DQUF1QixDQUFBO0lBQ3ZCLDJDQUE4QixDQUFBO0FBQy9CLENBQUMsRUFKVSxTQUFTLEtBQVQsU0FBUyxRQUluQjtBQUVELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFMUMsTUFBYSxPQUFRLFNBQVEsR0FBRztJQVUvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFNUIsa0JBQWtCO0lBQ25CLENBQUM7SUFmRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQXFDLEVBQUUsSUFBZTtRQUVuRSxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBY0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFFSDs7Ozs7O09BTUc7SUFFSCxJQUFJLEtBQUs7UUFFUixJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUMzRjtZQUNDLE9BQU8sSUFBSSxDQUFD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SyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFDcEQ7d0JBQ0MsYUFBYTt3QkFDYixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNwQztvQkFFRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUVsQyxFQUFFLEdBQUcsSUFBSSxDQUFDO2lCQUNWO2FBQ0Q7aUJBQ0ksSUFBSSxJQUFJLElBQUksSUFBSSxFQUNyQjtnQkFDQyxJQUFJLEdBQUcsR0FBRywyQkFBa0IsS0FBSyxrQ0FBa0IsRUFBRSxDQUFDO2dCQUV0RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUxQixRQUFRLENBQUMsUUFBUSw4QkFBcUIsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLFFBQVEscUNBQXFCLENBQUM7Z0JBRXZDLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDVjtTQUNEO1FBRUQsSUFBSSxDQUFDLEVBQUUsRUFDUDtZQUNDLE1BQU0sQ0FBQyxDQUFBO1NBQ1A7S0FDRDtJQUVELE9BQU87UUFDTixHQUFHLEVBQUUsSUFBSTtRQUNULE1BQU0sRUFBRSxRQUFRO0tBQ2hCLENBQUE7QUFDRixDQUFDO0FBcElELHNCQW9JQztBQUVELGtCQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNi82LlxuICovXG5cbmltcG9ydCB1cmxQYXJzZSBmcm9tICd1cmwtcGFyc2UnO1xuaW1wb3J0IFN5bWJvbEluc3BlY3QgZnJvbSAnc3ltYm9sLmluc3BlY3QnO1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XG5cbmV4cG9ydCB0eXBlIElVUkxMaWtlID0gc3RyaW5nIHwgVVJMIHwgSVVSTE9iamVjdExpa2U7XG5leHBvcnQgY29uc3QgU1lNX1VSTCA9IFN5bWJvbCgndXJsJyk7XG5leHBvcnQgY29uc3QgU1lNX0hJRERFTiA9IFN5bWJvbCgnaGlkZGVuJyk7XG5cbmNvbnN0IGVudW0gRU5VTV9GQUtFXG57XG5cdHByb3RvY29sID0gJ2Zha2UraHR0cDonLFxuXHRob3N0bmFtZSA9ICd1cmwtZmFrZS1ob3N0bmFtZScsXG59XG5cbmNvbnN0IFN5bWJvbENvbnRleHQgPSBmaW5kU3ltYm9sQ29udGV4dCgpO1xuXG5leHBvcnQgY2xhc3MgTGF6eVVSTCBleHRlbmRzIFVSTCBpbXBsZW1lbnRzIFVSTFxue1xuXHRwcm90ZWN0ZWQgW1NZTV9VUkxdPzogVVJMO1xuXHRwcm90ZWN0ZWQgW1NZTV9ISURERU5dOiBQYXJ0aWFsPFVSTD47XG5cblx0c3RhdGljIGNyZWF0ZSh1cmw6IElVUkxMaWtlIHwgW0lVUkxMaWtlLCBJVVJMTGlrZT9dLCBiYXNlPzogSVVSTExpa2UpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXModXJsLCBiYXNlKVxuXHR9XG5cblx0Y29uc3RydWN0b3IodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxuXHR7XG5cdFx0bGV0IHUgPSBfY29yZSh1cmwsIGJhc2UpXG5cblx0XHRzdXBlcih1LnVybC5ocmVmKTtcblxuXHRcdC8vdGhpc1tTWU1fVVJMXSA9IF91cmw7XG5cdFx0dGhpc1tTWU1fSElEREVOXSA9IHUuaGlkZGVuO1xuXG5cdFx0Ly9fbnVtZXJhYmxlKHRoaXMpXG5cdH1cblxuXHQvKlxuXHRbU3ltYm9sSW5zcGVjdF0oKVxuXHR7XG5cdFx0cmV0dXJuIGBMYXp5VVJMIHtcbiAgaHJlZjogJyR7dGhpcy5ocmVmfScsXG4gIGhyZWY6ICcke3RoaXMudG9SZWFsU3RyaW5nKCl9JyxcbiAgb3JpZ2luOiAnJHt0aGlzLm9yaWdpbn0nLFxuICBwcm90b2NvbDogJyR7dGhpcy5wcm90b2NvbH0nLFxuICB1c2VybmFtZTogJyR7dGhpcy51c2VybmFtZX0nLFxuICBwYXNzd29yZDogJyR7dGhpcy5wYXNzd29yZH0nLFxuICBob3N0OiAnJHt0aGlzLmhvc3R9JyxcbiAgaG9zdG5hbWU6ICcke3RoaXMuaG9zdG5hbWV9JyxcbiAgcG9ydDogJyR7dGhpcy5wb3J0fScsXG4gIHBhdGhuYW1lOiAnJHt0aGlzLnBhdGhuYW1lfScsXG4gIHNlYXJjaDogJyR7dGhpcy5zZWFyY2h9JyxcbiAgc2VhcmNoUGFyYW1zOiAke3V0aWwuaW5zcGVjdCh0aGlzLnNlYXJjaFBhcmFtcyl9LFxuICBoYXNoOiAnJHt0aGlzLmhhc2h9J1xufWA7XG5cdH1cblx0ICovXG5cblx0Lypcblx0W1N5bWJvbEluc3BlY3RdKClcblx0e1xuXHRcdHJldHVybiBgTGF6eVVSTCgke3RoaXMuaHJlZn0pYDtcblx0fVxuXG5cdCAqL1xuXG5cdGdldCBwYXRocygpXG5cdHtcblx0XHRpZiAoU3ltYm9sQ29udGV4dCAhPSBudWxsICYmIHRoaXNbU3ltYm9sQ29udGV4dF0gJiYgQXJyYXkuaXNBcnJheSh0aGlzW1N5bWJvbENvbnRleHRdLnBhdGgpKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzW1N5bWJvbENvbnRleHRdLnBhdGguc2xpY2UoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wYXRobmFtZVxuXHRcdFx0LnNwbGl0KCcvJylcblx0XHRcdC5maWx0ZXIodiA9PiB2ICE9ICcnKVxuXHR9XG5cblx0ZmFrZUV4aXN0cygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5mYWtlS2V5cygpLmxlbmd0aFxuXHR9XG5cblx0ZmFrZUtleXMoKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbU1lNX0hJRERFTl0pXG5cdH1cblxuXHRmYWtlRW50cmllcygpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmVudHJpZXModGhpc1tTWU1fSElEREVOXSlcblx0fVxuXG5cdC8qKlxuXHQgKiBnZXQgdGhlIHJlYWwgdXJsIChyZW1vdmUgZmFrZSB2YWx1ZSlcblx0ICogdGhyb3cgZXJyb3IgaWYgbm90IGEgdmFsaWQgdXJsXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHR0b1JlYWxTdHJpbmcoKVxuXHR7XG5cdFx0bGV0IGtzID0gdGhpcy5mYWtlRW50cmllcygpO1xuXG5cdFx0aWYgKGtzLmxlbmd0aClcblx0XHR7XG5cdFx0XHRsZXQgdSA9IHVybFBhcnNlKHRoaXMuaHJlZik7XG5cblx0XHRcdGtzXG5cdFx0XHRcdC5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKHVbbmFtZV0gPT09IHZhbHVlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUuc2V0KG5hbWUgYXMgYW55LCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0O1xuXG5cdFx0XHRpZiAodS5ob3N0ID09PSAnJylcblx0XHRcdHtcblx0XHRcdFx0aWYgKHUudXNlcm5hbWUgIT09ICcnIHx8IHUucGFzc3dvcmQgIT09ICcnIHx8IHUucG9ydCAhPT0gJycgfHwgdS5wcm90b2NvbCAhPT0gJycpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFVSTCAke3V9YClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgcyA9IHUudG9TdHJpbmcoKTtcblxuXHRcdFx0aWYgKHUucHJvdG9jb2wgPT09ICcnICYmIHUuaG9zdCA9PT0gJycpXG5cdFx0XHR7XG5cdFx0XHRcdHMgPSBzLnJlcGxhY2UoL15cXC9cXC8vLCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuaHJlZjtcblx0fVxuXG5cdHRvU3RyaW5nKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cblxuXHQvKlxuXHR0b0pTT04oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0udG9KU09OKCk7XG5cdH1cblx0ICovXG5cblx0Lypcblx0Z2V0IGhhc2goKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaGFzaFxuXHR9XG5cblx0c2V0IGhhc2godmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLmhhc2ggPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IGhvc3QoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaG9zdFxuXHR9XG5cblx0c2V0IGhvc3QodmFsdWUpXG5cdHtcblx0XHRkZWxldGUgdGhpc1tTWU1fSElEREVOXS5ob3N0bmFtZTtcblxuXHRcdHRoaXNbU1lNX1VSTF0uaG9zdCA9IHZhbHVlXG5cdH1cblx0ICovXG5cblx0Z2V0IGhvc3RuYW1lKClcblx0e1xuXHRcdHJldHVybiBzdXBlci5ob3N0bmFtZVxuXHR9XG5cblx0c2V0IGhvc3RuYW1lKHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0uaG9zdG5hbWU7XG5cblx0XHRzdXBlci5ob3N0bmFtZSA9IHZhbHVlXG5cdH1cblxuXHQvKlxuXHRnZXQgaHJlZigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5ocmVmXG5cdH1cblxuXHRzZXQgaHJlZih2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0uaHJlZiA9IHZhbHVlXG5cdH1cblxuXHRnZXQgb3JpZ2luKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLm9yaWdpblxuXHR9XG5cblx0Z2V0IHBhc3N3b3JkKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnBhc3N3b3JkXG5cdH1cblxuXHRzZXQgcGFzc3dvcmQodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBhc3N3b3JkID0gdmFsdWVcblx0fVxuXG5cdGdldCBwYXRobmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wYXRobmFtZVxuXHR9XG5cblx0c2V0IHBhdGhuYW1lKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wYXRobmFtZSA9IHZhbHVlXG5cdH1cblxuXHRnZXQgcG9ydCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wb3J0XG5cdH1cblxuXHRzZXQgcG9ydCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucG9ydCA9IHZhbHVlXG5cdH1cblx0ICovXG5cblx0Z2V0IHByb3RvY29sKClcblx0e1xuXHRcdHJldHVybiBzdXBlci5wcm90b2NvbFxuXHR9XG5cblx0c2V0IHByb3RvY29sKHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0ucHJvdG9jb2w7XG5cblx0XHRzdXBlci5wcm90b2NvbCA9IHZhbHVlXG5cdH1cblxuXHQvKlxuXHRnZXQgc2VhcmNoKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnNlYXJjaFxuXHR9XG5cblx0c2V0IHNlYXJjaCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0uc2VhcmNoID0gdmFsdWVcblx0fVxuXG5cdGdldCBzZWFyY2hQYXJhbXMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uc2VhcmNoUGFyYW1zXG5cdH1cblxuXHRnZXQgdXNlcm5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0udXNlcm5hbWVcblx0fVxuXG5cdHNldCB1c2VybmFtZSh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0udXNlcm5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0ICovXG5cblx0LyoqXG5cdCAqIEBhbGlhcyBwcm90b2NvbFxuXHQgKi9cblx0Z2V0IHNjaGVtZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5wcm90b2NvbFxuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBwcm90b2NvbFxuXHQgKi9cblx0c2V0IHNjaGVtZSh2YWx1ZTogc3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5wcm90b2NvbCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBoYXNoXG5cdCAqL1xuXHRnZXQgZnJhZ21lbnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaGFzaFxuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBoYXNoXG5cdCAqL1xuXHRzZXQgZnJhZ21lbnQodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMuaGFzaCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBzZWFyY2hcblx0ICovXG5cdGdldCBxdWVyeSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5zZWFyY2hcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgc2VhcmNoXG5cdCAqL1xuXHRzZXQgcXVlcnkodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMuc2VhcmNoID0gdmFsdWU7XG5cdH1cblxuXHR0b09iamVjdCgpOiBJVVJMT2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC50b09iamVjdCh0aGlzKVxuXHR9XG5cblx0LyoqXG5cdCAqIGNsb25lIGludG8gYSBvYmplY3Rcblx0ICpcblx0ICogQHJldHVybnMge0lVUkxPYmplY3R9XG5cdCAqL1xuXHRzdGF0aWMgdG9PYmplY3QodXJsOiBVUkwpOiBJVVJMT2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkucmVkdWNlKChhLCBiKSA9PlxuXHRcdHtcblx0XHRcdGlmIChiID09PSAnc2VhcmNoUGFyYW1zJylcblx0XHRcdHtcblx0XHRcdFx0YVtiXSA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLnNlYXJjaFBhcmFtcy5lbnRyaWVzKCkgYXMgYW55IGFzIFtzdHJpbmcsIHN0cmluZ11bXSlcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YVtiXSA9IHVybFtiXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFcblx0XHR9LCB7fSBhcyBJVVJMT2JqZWN0KVxuXHR9XG5cblx0a2V5cygpOiBJVXJsS2V5c1tdXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKClcblx0fVxuXG5cdHZhbHVlcygpXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC52YWx1ZXModGhpcylcblx0fVxuXG5cdGVudHJpZXMoKTogSUVudHJpZXNcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmVudHJpZXModGhpcylcblx0fVxuXG5cdHN0YXRpYyBrZXlzKCk6IElVcmxLZXlzW11cblx0e1xuXHRcdHJldHVybiBbXG5cdFx0XHQnaHJlZicsXG5cdFx0XHQncHJvdG9jb2wnLFxuXHRcdFx0J3VzZXJuYW1lJyxcblx0XHRcdCdwYXNzd29yZCcsXG5cdFx0XHQnaG9zdCcsXG5cdFx0XHQnaG9zdG5hbWUnLFxuXHRcdFx0J3BvcnQnLFxuXHRcdFx0J3BhdGhuYW1lJyxcblx0XHRcdCdzZWFyY2gnLFxuXHRcdFx0J3NlYXJjaFBhcmFtcycsXG5cdFx0XHQnaGFzaCcsXG5cdFx0XVxuXHR9XG5cblx0c3RhdGljIHZhbHVlcyh1cmw6IFVSTClcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKS5tYXAobmFtZSA9PiB1cmxbbmFtZV0pXG5cdH1cblxuXHRzdGF0aWMgZW50cmllcyh1cmw6IFVSTCk6IElFbnRyaWVzXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkubWFwKG5hbWUgPT4gW25hbWUsIHVybFtuYW1lXV0pIGFzIElFbnRyaWVzXG5cdH1cblxuXHRjcmVhdGVVUkxTZWFyY2hQYXJhbXMoaW5pdD86IHN0cmluZ1tdW10gfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgc3RyaW5nIHwgVVJMU2VhcmNoUGFyYW1zIHwgVVJMKVxuXHR7XG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBVUkwpXG5cdFx0e1xuXHRcdFx0aW5pdCA9IGluaXQuc2VhcmNoUGFyYW1zO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKGluaXQpXG5cdH1cblxufVxuXG5leHBvcnQgdHlwZSBJRW50cmllcyA9IChbXCJoYXNoXCIgfCBcImhvc3RcIiB8IFwiaG9zdG5hbWVcIiB8IFwiaHJlZlwiIHwgXCJwYXNzd29yZFwiIHwgXCJwYXRobmFtZVwiIHwgXCJwb3J0XCIgfCBcInByb3RvY29sXCIgfCBcInNlYXJjaFwiIHwgXCJ1c2VybmFtZVwiLCBzdHJpbmddIHwgW1wic2VhcmNoUGFyYW1zXCIsIFVSTFNlYXJjaFBhcmFtc10pW11cblxuZXhwb3J0IHR5cGUgSUVudHJpZXNSb3c8VCBleHRlbmRzIElVcmxLZXlzPiA9IFtULCBVUkxbVF1dXG5cbmZ1bmN0aW9uIF9udW1lcmFibGUobGliKVxue1xuXHRsZXQgZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhsaWIpO1xuXG5cdChbXG5cdFx0J2hyZWYnLFxuXHRcdCdwcm90b2NvbCcsXG5cdFx0J3VzZXJuYW1lJyxcblx0XHQncGFzc3dvcmQnLFxuXHRcdCdob3N0Jyxcblx0XHQnaG9zdG5hbWUnLFxuXHRcdCdwb3J0Jyxcblx0XHQncGF0aG5hbWUnLFxuXHRcdCdzZWFyY2gnLFxuXHRcdCdzZWFyY2hQYXJhbXMnLFxuXHRcdCdoYXNoJyxcblx0XSBhcyBjb25zdClcblx0XHQuZm9yRWFjaCgobmFtZSkgPT5cblx0XHR7XG5cdFx0XHRpZiAobmFtZSBpbiBkcylcblx0XHRcdHtcblx0XHRcdFx0ZHNbbmFtZV0uZW51bWVyYWJsZSA9IHRydWU7XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGxpYiwgbmFtZSwgZHNbbmFtZV0pXG5cdFx0XHR9XG5cdFx0fSlcblx0O1xufVxuXG5leHBvcnQgdHlwZSBJVXJsS2V5cyA9XG5cdHwgJ2hyZWYnXG5cdHwgJ3VzZXJuYW1lJ1xuXHR8ICdwYXNzd29yZCdcblx0fCAnaG9zdCdcblx0fCAnaG9zdG5hbWUnXG5cdHwgJ3BvcnQnXG5cdHwgJ3BhdGhuYW1lJ1xuXHR8ICdzZWFyY2gnXG5cdHwgJ3NlYXJjaFBhcmFtcydcblx0fCAncHJvdG9jb2wnXG5cdHwgJ2hhc2gnXG5cdDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRTeW1ib2xDb250ZXh0KCk6IHN5bWJvbFxue1xuXHRsZXQgdSA9IG5ldyBVUkwoYGh0dHBzOi8vbG9jYWxob3N0YCk7XG5cblx0Y29uc3QgU3ltYm9sQ29udGV4dCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModSlcblx0XHQuZmlsdGVyKHN5bSA9PiB1W3N5bV0uaG9zdCA9PSAnbG9jYWxob3N0JylbMF1cblx0O1xuXG5cdHJldHVybiBTeW1ib2xDb250ZXh0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVUkxPYmplY3RMaWtlXG57XG5cdGhyZWY6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVVJMT2JqZWN0XG57XG5cdGhyZWY6IHN0cmluZztcblx0cHJvdG9jb2w6IHN0cmluZztcblx0dXNlcm5hbWU6IHN0cmluZztcblx0cGFzc3dvcmQ6IHN0cmluZztcblx0aG9zdDogc3RyaW5nO1xuXHRob3N0bmFtZTogc3RyaW5nO1xuXHRwb3J0OiBzdHJpbmc7XG5cdHBhdGhuYW1lOiBzdHJpbmc7XG5cdHNlYXJjaDogc3RyaW5nO1xuXHRzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcztcblx0aGFzaDogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX2NvcmUodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxue1xuXHRpZiAoQXJyYXkuaXNBcnJheSh1cmwpKVxuXHR7XG5cdFx0aWYgKGJhc2UgPT0gbnVsbClcblx0XHR7XG5cdFx0XHRbdXJsLCBiYXNlXSA9IHVybDtcblx0XHR9XG5cdH1cblxuXHRpZiAodXJsICYmIHVybCBpbnN0YW5jZW9mIExhenlVUkwpXG5cdHtcblx0XHR1cmwgPSB1cmwudG9SZWFsU3RyaW5nKCk7XG5cdH1cblx0ZWxzZSBpZiAodXJsICYmIHVybCBpbnN0YW5jZW9mIFVSTClcblx0e1xuXHRcdHVybCA9IHVybC5ocmVmO1xuXHR9XG5cdGVsc2UgaWYgKHVybCAhPSBudWxsICYmIHR5cGVvZiAodXJsIGFzIElVUkxPYmplY3RMaWtlKS5ocmVmID09PSAnc3RyaW5nJylcblx0e1xuXHRcdHVybCA9ICh1cmwgYXMgSVVSTE9iamVjdExpa2UpLmhyZWY7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBBcmd1bWVudCAnJHt1cmx9JyBpcyBub3QgYXNzaWduYWJsZSB0byB1cmwgbGlrZS5gKVxuXHR9XG5cblx0bGV0IF91cmw6IFVSTDtcblx0Y29uc3QgX2hpZGRlbl86IFBhcnRpYWw8VVJMPiA9IHt9O1xuXG5cdGlmICh0eXBlb2YgYmFzZSAhPT0gJ3N0cmluZycgJiYgYmFzZSAhPSBudWxsICYmIHR5cGVvZiBiYXNlLmhyZWYgPT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0YmFzZSA9IGJhc2UuaHJlZjtcblx0fVxuXG5cdGlmIChiYXNlID09PSAnJylcblx0e1xuXHRcdGJhc2UgPSB2b2lkIDA7XG5cdH1cblxuXHR0cnlcblx0e1xuXHRcdF91cmwgPSBuZXcgVVJMKHVybCwgYmFzZSBhcyBzdHJpbmcpXG5cdH1cblx0Y2F0Y2ggKGUpXG5cdHtcblx0XHRsZXQgb2s6IGJvb2xlYW47XG5cblx0XHRpZiAoL0ludmFsaWQgVVJMLy50ZXN0KGUubWVzc2FnZSkpXG5cdFx0e1xuXHRcdFx0aWYgKHR5cGVvZiBiYXNlID09PSAnc3RyaW5nJylcblx0XHRcdHtcblx0XHRcdFx0bGV0IG9sZCA9IGJhc2U7XG5cdFx0XHRcdGxldCB1ID0gdXJsUGFyc2UoYmFzZSkvKiBhcyBVUkwgJiB7XG5cdFx0XHRcdFx0XHRzZXQobmFtZToga2V5b2YgVVJMLCB2YWx1ZTogc3RyaW5nKTogdm9pZFxuXHRcdFx0XHRcdH0qLztcblxuXHRcdFx0XHRpZiAoKFxuXHRcdFx0XHRcdHUuaG9zdCA9PT0gJydcblx0XHRcdFx0XHR8fCB1LnByb3RvY29sID09PSAnJ1xuXHRcdFx0XHQpKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKCFvbGQuaW5jbHVkZXMoJy8nKSAmJiBbXG5cdFx0XHRcdFx0XHR1LnByb3RvY29sICsgdS5ob3N0LFxuXHRcdFx0XHRcdFx0dS5wcm90b2NvbCArIHUucGF0aG5hbWUsXG5cdFx0XHRcdFx0XS5pbmNsdWRlcyhvbGQudG9Mb3dlckNhc2UoKSkpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dSA9IHVybFBhcnNlKCcnKTtcblxuXHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCBvbGQpO1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3Byb3RvY29sJywgRU5VTV9GQUtFLnByb3RvY29sKTtcblx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcnKTtcblxuXHRcdFx0XHRcdFx0X2hpZGRlbl8ucHJvdG9jb2wgPSBFTlVNX0ZBS0UucHJvdG9jb2w7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHUuaG9zdCA9PT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKHUucGF0aG5hbWUgIT0gJycgJiYgIXUucGF0aG5hbWUuaW5jbHVkZXMoJy8nKSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCB1LnBhdGhuYW1lKTtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ3BhdGhuYW1lJywgJycpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR1LnNldCgnaG9zdCcsIEVOVU1fRkFLRS5ob3N0bmFtZSk7XG5cblx0XHRcdFx0XHRcdFx0X2hpZGRlbl8uaG9zdG5hbWUgPSB1Lmhvc3RuYW1lO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh1LnByb3RvY29sID09PSAnJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1LnNldCgncHJvdG9jb2wnLCBFTlVNX0ZBS0UucHJvdG9jb2wpO1xuXHRcdFx0XHRcdFx0X2hpZGRlbl8ucHJvdG9jb2wgPSB1LnByb3RvY29sO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRpZiAodS5wYXRobmFtZSAhPT0gJycgJiYgIXUucGF0aG5hbWUuc3RhcnRzV2l0aCgnLycpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcvJyArIHUucGF0aG5hbWUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdF91cmwgPSBuZXcgVVJMKHVybCwgdS50b1N0cmluZygpKTtcblxuXHRcdFx0XHRcdG9rID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoYmFzZSA9PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHRiYXNlID0gYCR7RU5VTV9GQUtFLnByb3RvY29sfS8vJHtFTlVNX0ZBS0UuaG9zdG5hbWV9YDtcblxuXHRcdFx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIGJhc2UpO1xuXG5cdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gRU5VTV9GQUtFLnByb3RvY29sO1xuXHRcdFx0XHRfaGlkZGVuXy5ob3N0bmFtZSA9IEVOVU1fRkFLRS5ob3N0bmFtZTtcblxuXHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFvaylcblx0XHR7XG5cdFx0XHR0aHJvdyBlXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHR1cmw6IF91cmwsXG5cdFx0aGlkZGVuOiBfaGlkZGVuXyxcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXp5VVJMXG4iXX0=