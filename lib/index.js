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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7O0FBRUgsMERBQWlDO0FBS3BCLFFBQUEsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixRQUFBLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFM0MsSUFBVyxTQUlWO0FBSkQsV0FBVyxTQUFTO0lBRW5CLG9DQUF1QixDQUFBO0lBQ3ZCLDJDQUE4QixDQUFBO0FBQy9CLENBQUMsRUFKVSxTQUFTLEtBQVQsU0FBUyxRQUluQjtBQUVELE1BQU0sYUFBYSxHQUFHLGlCQUFpQixFQUFFLENBQUM7QUFFMUMsTUFBYSxPQUFRLFNBQVEsR0FBRztJQVUvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsa0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFNUIsa0JBQWtCO0lBQ25CLENBQUM7SUFmRCxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQXFDLEVBQUUsSUFBZTtRQUVuRSxPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBY0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFFSDs7Ozs7O09BTUc7SUFFSCxJQUFJLEtBQUs7UUFFUixJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUMzRjtZQUNDLE9BQU8sSUFBSSxDQUFD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SyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFDcEQ7d0JBQ0MsYUFBYTt3QkFDYixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNwQztvQkFFRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUVsQyxFQUFFLEdBQUcsSUFBSSxDQUFDO2lCQUNWO2FBQ0Q7aUJBQ0ksSUFBSSxJQUFJLElBQUksSUFBSSxFQUNyQjtnQkFDQyxJQUFJLEdBQUcsR0FBRywyQkFBa0IsS0FBSyxrQ0FBa0IsRUFBRSxDQUFDO2dCQUV0RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUxQixRQUFRLENBQUMsUUFBUSw4QkFBcUIsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLFFBQVEscUNBQXFCLENBQUM7Z0JBRXZDLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDVjtTQUNEO1FBRUQsSUFBSSxDQUFDLEVBQUUsRUFDUDtZQUNDLE1BQU0sQ0FBQyxDQUFBO1NBQ1A7S0FDRDtJQUVELE9BQU87UUFDTixHQUFHLEVBQUUsSUFBSTtRQUNULE1BQU0sRUFBRSxRQUFRO0tBQ2hCLENBQUE7QUFDRixDQUFDO0FBcElELHNCQW9JQztBQUVELGtCQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNi82LlxuICovXG5cbmltcG9ydCB1cmxQYXJzZSBmcm9tICd1cmwtcGFyc2UnO1xuaW1wb3J0IFN5bWJvbEluc3BlY3QgZnJvbSAnc3ltYm9sLmluc3BlY3QnO1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XG5cbmV4cG9ydCB0eXBlIElVUkxMaWtlID0gc3RyaW5nIHwgVVJMIHwgSVVSTE9iamVjdExpa2U7XG5leHBvcnQgY29uc3QgU1lNX1VSTCA9IFN5bWJvbCgndXJsJyk7XG5leHBvcnQgY29uc3QgU1lNX0hJRERFTiA9IFN5bWJvbCgnaGlkZGVuJyk7XG5cbmNvbnN0IGVudW0gRU5VTV9GQUtFXG57XG5cdHByb3RvY29sID0gJ2Zha2UraHR0cDonLFxuXHRob3N0bmFtZSA9ICd1cmwtZmFrZS1ob3N0bmFtZScsXG59XG5cbmNvbnN0IFN5bWJvbENvbnRleHQgPSBmaW5kU3ltYm9sQ29udGV4dCgpO1xuXG5leHBvcnQgY2xhc3MgTGF6eVVSTCBleHRlbmRzIFVSTCBpbXBsZW1lbnRzIFVSTFxue1xuXHRwcm90ZWN0ZWQgW1NZTV9VUkxdPzogVVJMO1xuXHRwcm90ZWN0ZWQgW1NZTV9ISURERU5dOiBQYXJ0aWFsPFVSTD47XG5cblx0c3RhdGljIGNyZWF0ZSh1cmw6IElVUkxMaWtlIHwgW0lVUkxMaWtlLCBJVVJMTGlrZT9dLCBiYXNlPzogSVVSTExpa2UpXG5cdHtcblx0XHRyZXR1cm4gbmV3IHRoaXModXJsLCBiYXNlKVxuXHR9XG5cblx0Y29uc3RydWN0b3IodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxuXHR7XG5cdFx0bGV0IHUgPSBfY29yZSh1cmwsIGJhc2UpXG5cblx0XHRzdXBlcih1LnVybC5ocmVmKTtcblxuXHRcdC8vdGhpc1tTWU1fVVJMXSA9IF91cmw7XG5cdFx0dGhpc1tTWU1fSElEREVOXSA9IHUuaGlkZGVuO1xuXG5cdFx0Ly9fbnVtZXJhYmxlKHRoaXMpXG5cdH1cblxuXHQvKlxuXHRbU3ltYm9sSW5zcGVjdF0oKVxuXHR7XG5cdFx0cmV0dXJuIGBMYXp5VVJMIHtcbiAgaHJlZjogJyR7dGhpcy5ocmVmfScsXG4gIGhyZWY6ICcke3RoaXMudG9SZWFsU3RyaW5nKCl9JyxcbiAgb3JpZ2luOiAnJHt0aGlzLm9yaWdpbn0nLFxuICBwcm90b2NvbDogJyR7dGhpcy5wcm90b2NvbH0nLFxuICB1c2VybmFtZTogJyR7dGhpcy51c2VybmFtZX0nLFxuICBwYXNzd29yZDogJyR7dGhpcy5wYXNzd29yZH0nLFxuICBob3N0OiAnJHt0aGlzLmhvc3R9JyxcbiAgaG9zdG5hbWU6ICcke3RoaXMuaG9zdG5hbWV9JyxcbiAgcG9ydDogJyR7dGhpcy5wb3J0fScsXG4gIHBhdGhuYW1lOiAnJHt0aGlzLnBhdGhuYW1lfScsXG4gIHNlYXJjaDogJyR7dGhpcy5zZWFyY2h9JyxcbiAgc2VhcmNoUGFyYW1zOiAke3V0aWwuaW5zcGVjdCh0aGlzLnNlYXJjaFBhcmFtcyl9LFxuICBoYXNoOiAnJHt0aGlzLmhhc2h9J1xufWA7XG5cdH1cblx0ICovXG5cblx0Lypcblx0W1N5bWJvbEluc3BlY3RdKClcblx0e1xuXHRcdHJldHVybiBgTGF6eVVSTCgke3RoaXMuaHJlZn0pYDtcblx0fVxuXG5cdCAqL1xuXG5cdGdldCBwYXRocygpXG5cdHtcblx0XHRpZiAoU3ltYm9sQ29udGV4dCAhPSBudWxsICYmIHRoaXNbU3ltYm9sQ29udGV4dF0gJiYgQXJyYXkuaXNBcnJheSh0aGlzW1N5bWJvbENvbnRleHRdLnBhdGgpKVxuXHRcdHtcblx0XHRcdHJldHVybiB0aGlzW1N5bWJvbENvbnRleHRdLnBhdGguc2xpY2UoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5wYXRobmFtZVxuXHRcdFx0LnNwbGl0KCcvJylcblx0XHRcdC5maWx0ZXIodiA9PiB2ICE9ICcnKVxuXHR9XG5cblx0ZmFrZUV4aXN0cygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5mYWtlS2V5cygpLmxlbmd0aFxuXHR9XG5cblx0ZmFrZUtleXMoKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXNbU1lNX0hJRERFTl0pXG5cdH1cblxuXHRmYWtlRW50cmllcygpXG5cdHtcblx0XHRyZXR1cm4gT2JqZWN0LmVudHJpZXModGhpc1tTWU1fSElEREVOXSlcblx0fVxuXG5cdC8qKlxuXHQgKiBnZXQgdGhlIHJlYWwgdXJsIChyZW1vdmUgZmFrZSB2YWx1ZSlcblx0ICogdGhyb3cgZXJyb3IgaWYgbm90IGEgdmFsaWQgdXJsXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHR0b1JlYWxTdHJpbmcoKVxuXHR7XG5cdFx0bGV0IGtzID0gdGhpcy5mYWtlRW50cmllcygpO1xuXG5cdFx0aWYgKGtzLmxlbmd0aClcblx0XHR7XG5cdFx0XHRsZXQgdSA9IHVybFBhcnNlKHRoaXMuaHJlZik7XG5cblx0XHRcdGtzXG5cdFx0XHRcdC5mb3JFYWNoKChbbmFtZSwgdmFsdWVdKSA9PlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKHVbbmFtZV0gPT09IHZhbHVlKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUuc2V0KG5hbWUgYXMgYW55LCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0O1xuXG5cdFx0XHRpZiAodS5ob3N0ID09PSAnJylcblx0XHRcdHtcblx0XHRcdFx0aWYgKHUudXNlcm5hbWUgIT09ICcnIHx8IHUucGFzc3dvcmQgIT09ICcnIHx8IHUucG9ydCAhPT0gJycgfHwgdS5wcm90b2NvbCAhPT0gJycpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBJbnZhbGlkIFVSTCAke3V9YClcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgcyA9IHUudG9TdHJpbmcoKTtcblxuXHRcdFx0aWYgKHUucHJvdG9jb2wgPT09ICcnICYmIHUuaG9zdCA9PT0gJycpXG5cdFx0XHR7XG5cdFx0XHRcdHMgPSBzLnJlcGxhY2UoL15cXC9cXC8vLCAnJyk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuaHJlZjtcblx0fVxuXG5cdHRvU3RyaW5nKClcblx0e1xuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cblxuXHQvKlxuXHR0b0pTT04oKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0udG9KU09OKCk7XG5cdH1cblx0ICovXG5cblx0Lypcblx0Z2V0IGhhc2goKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaGFzaFxuXHR9XG5cblx0c2V0IGhhc2godmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLmhhc2ggPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IGhvc3QoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaG9zdFxuXHR9XG5cblx0c2V0IGhvc3QodmFsdWUpXG5cdHtcblx0XHRkZWxldGUgdGhpc1tTWU1fSElEREVOXS5ob3N0bmFtZTtcblxuXHRcdHRoaXNbU1lNX1VSTF0uaG9zdCA9IHZhbHVlXG5cdH1cblx0ICovXG5cblx0Z2V0IGhvc3RuYW1lKClcblx0e1xuXHRcdHJldHVybiBzdXBlci5ob3N0bmFtZVxuXHR9XG5cblx0c2V0IGhvc3RuYW1lKHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0uaG9zdG5hbWU7XG5cblx0XHRzdXBlci5ob3N0bmFtZSA9IHZhbHVlXG5cdH1cblxuXHQvKlxuXHRnZXQgaHJlZigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5ocmVmXG5cdH1cblxuXHRzZXQgaHJlZih2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0uaHJlZiA9IHZhbHVlXG5cdH1cblxuXHRnZXQgb3JpZ2luKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLm9yaWdpblxuXHR9XG5cblx0Z2V0IHBhc3N3b3JkKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnBhc3N3b3JkXG5cdH1cblxuXHRzZXQgcGFzc3dvcmQodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBhc3N3b3JkID0gdmFsdWVcblx0fVxuXG5cdGdldCBwYXRobmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wYXRobmFtZVxuXHR9XG5cblx0c2V0IHBhdGhuYW1lKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wYXRobmFtZSA9IHZhbHVlXG5cdH1cblxuXHRnZXQgcG9ydCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wb3J0XG5cdH1cblxuXHRzZXQgcG9ydCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucG9ydCA9IHZhbHVlXG5cdH1cblx0ICovXG5cblx0Z2V0IHByb3RvY29sKClcblx0e1xuXHRcdHJldHVybiBzdXBlci5wcm90b2NvbFxuXHR9XG5cblx0c2V0IHByb3RvY29sKHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0ucHJvdG9jb2w7XG5cblx0XHRzdXBlci5wcm90b2NvbCA9IHZhbHVlXG5cdH1cblxuXHQvKlxuXHRnZXQgc2VhcmNoKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnNlYXJjaFxuXHR9XG5cblx0c2V0IHNlYXJjaCh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0uc2VhcmNoID0gdmFsdWVcblx0fVxuXG5cdGdldCBzZWFyY2hQYXJhbXMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uc2VhcmNoUGFyYW1zXG5cdH1cblxuXHRnZXQgdXNlcm5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0udXNlcm5hbWVcblx0fVxuXG5cdHNldCB1c2VybmFtZSh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0udXNlcm5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0ICovXG5cblx0LyoqXG5cdCAqIEBhbGlhcyBwcm90b2NvbFxuXHQgKi9cblx0Z2V0IHNjaGVtZSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5wcm90b2NvbFxuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBwcm90b2NvbFxuXHQgKi9cblx0c2V0IHNjaGVtZSh2YWx1ZTogc3RyaW5nKVxuXHR7XG5cdFx0dGhpcy5wcm90b2NvbCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBoYXNoXG5cdCAqL1xuXHRnZXQgZnJhZ21lbnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuaGFzaFxuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBoYXNoXG5cdCAqL1xuXHRzZXQgZnJhZ21lbnQodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMuaGFzaCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBhbGlhcyBzZWFyY2hcblx0ICovXG5cdGdldCBxdWVyeSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5zZWFyY2hcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgc2VhcmNoXG5cdCAqL1xuXHRzZXQgcXVlcnkodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMuc2VhcmNoID0gdmFsdWU7XG5cdH1cblxuXHR0b09iamVjdCgpOiBJVVJMT2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC50b09iamVjdCh0aGlzKVxuXHR9XG5cblx0LyoqXG5cdCAqIGNsb25lIGludG8gYSBvYmplY3Rcblx0ICpcblx0ICogQHJldHVybnMge0lVUkxPYmplY3R9XG5cdCAqL1xuXHRzdGF0aWMgdG9PYmplY3QodXJsOiBVUkwpOiBJVVJMT2JqZWN0XG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkucmVkdWNlKChhLCBiKSA9PlxuXHRcdHtcblx0XHRcdGlmIChiID09PSAnc2VhcmNoUGFyYW1zJylcblx0XHRcdHtcblx0XHRcdFx0YVtiXSA9IG5ldyBVUkxTZWFyY2hQYXJhbXModXJsLnNlYXJjaFBhcmFtcy5lbnRyaWVzKCkgYXMgYW55IGFzIFtzdHJpbmcsIHN0cmluZ11bXSlcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0YVtiXSA9IHRoaXNbYl07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhXG5cdFx0fSwge30gYXMgSVVSTE9iamVjdClcblx0fVxuXG5cdGtleXMoKTogSVVybEtleXNbXVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpXG5cdH1cblxuXHR2YWx1ZXMoKVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwudmFsdWVzKHRoaXMpXG5cdH1cblxuXHRlbnRyaWVzKCk6IElFbnRyaWVzXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5lbnRyaWVzKHRoaXMpXG5cdH1cblxuXHRzdGF0aWMga2V5cygpOiBJVXJsS2V5c1tdXG5cdHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0J2hyZWYnLFxuXHRcdFx0J3Byb3RvY29sJyxcblx0XHRcdCd1c2VybmFtZScsXG5cdFx0XHQncGFzc3dvcmQnLFxuXHRcdFx0J2hvc3QnLFxuXHRcdFx0J2hvc3RuYW1lJyxcblx0XHRcdCdwb3J0Jyxcblx0XHRcdCdwYXRobmFtZScsXG5cdFx0XHQnc2VhcmNoJyxcblx0XHRcdCdzZWFyY2hQYXJhbXMnLFxuXHRcdFx0J2hhc2gnLFxuXHRcdF1cblx0fVxuXG5cdHN0YXRpYyB2YWx1ZXModXJsOiBVUkwpXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkubWFwKG5hbWUgPT4gdXJsW25hbWVdKVxuXHR9XG5cblx0c3RhdGljIGVudHJpZXModXJsOiBVUkwpOiBJRW50cmllc1xuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLm1hcChuYW1lID0+IFtuYW1lLCB1cmxbbmFtZV1dKSBhcyBJRW50cmllc1xuXHR9XG5cblx0Y3JlYXRlVVJMU2VhcmNoUGFyYW1zKGluaXQ/OiBzdHJpbmdbXVtdIHwgUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IHN0cmluZyB8IFVSTFNlYXJjaFBhcmFtcyB8IFVSTClcblx0e1xuXHRcdGlmIChpbml0IGluc3RhbmNlb2YgVVJMKVxuXHRcdHtcblx0XHRcdGluaXQgPSBpbml0LnNlYXJjaFBhcmFtcztcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyhpbml0KVxuXHR9XG5cbn1cblxuZXhwb3J0IHR5cGUgSUVudHJpZXMgPSAoW1wiaGFzaFwiIHwgXCJob3N0XCIgfCBcImhvc3RuYW1lXCIgfCBcImhyZWZcIiB8IFwicGFzc3dvcmRcIiB8IFwicGF0aG5hbWVcIiB8IFwicG9ydFwiIHwgXCJwcm90b2NvbFwiIHwgXCJzZWFyY2hcIiB8IFwidXNlcm5hbWVcIiwgc3RyaW5nXSB8IFtcInNlYXJjaFBhcmFtc1wiLCBVUkxTZWFyY2hQYXJhbXNdKVtdXG5cbmV4cG9ydCB0eXBlIElFbnRyaWVzUm93PFQgZXh0ZW5kcyBJVXJsS2V5cz4gPSBbVCwgVVJMW1RdXVxuXG5mdW5jdGlvbiBfbnVtZXJhYmxlKGxpYilcbntcblx0bGV0IGRzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobGliKTtcblxuXHQoW1xuXHRcdCdocmVmJyxcblx0XHQncHJvdG9jb2wnLFxuXHRcdCd1c2VybmFtZScsXG5cdFx0J3Bhc3N3b3JkJyxcblx0XHQnaG9zdCcsXG5cdFx0J2hvc3RuYW1lJyxcblx0XHQncG9ydCcsXG5cdFx0J3BhdGhuYW1lJyxcblx0XHQnc2VhcmNoJyxcblx0XHQnc2VhcmNoUGFyYW1zJyxcblx0XHQnaGFzaCcsXG5cdF0gYXMgY29uc3QpXG5cdFx0LmZvckVhY2goKG5hbWUpID0+XG5cdFx0e1xuXHRcdFx0aWYgKG5hbWUgaW4gZHMpXG5cdFx0XHR7XG5cdFx0XHRcdGRzW25hbWVdLmVudW1lcmFibGUgPSB0cnVlO1xuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsaWIsIG5hbWUsIGRzW25hbWVdKVxuXHRcdFx0fVxuXHRcdH0pXG5cdDtcbn1cblxuZXhwb3J0IHR5cGUgSVVybEtleXMgPVxuXHR8ICdocmVmJ1xuXHR8ICd1c2VybmFtZSdcblx0fCAncGFzc3dvcmQnXG5cdHwgJ2hvc3QnXG5cdHwgJ2hvc3RuYW1lJ1xuXHR8ICdwb3J0J1xuXHR8ICdwYXRobmFtZSdcblx0fCAnc2VhcmNoJ1xuXHR8ICdzZWFyY2hQYXJhbXMnXG5cdHwgJ3Byb3RvY29sJ1xuXHR8ICdoYXNoJ1xuXHQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kU3ltYm9sQ29udGV4dCgpOiBzeW1ib2xcbntcblx0bGV0IHUgPSBuZXcgVVJMKGBodHRwczovL2xvY2FsaG9zdGApO1xuXG5cdGNvbnN0IFN5bWJvbENvbnRleHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHUpXG5cdFx0LmZpbHRlcihzeW0gPT4gdVtzeW1dLmhvc3QgPT0gJ2xvY2FsaG9zdCcpWzBdXG5cdDtcblxuXHRyZXR1cm4gU3ltYm9sQ29udGV4dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVVJMT2JqZWN0TGlrZVxue1xuXHRocmVmOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVSTE9iamVjdFxue1xuXHRocmVmOiBzdHJpbmc7XG5cdHByb3RvY29sOiBzdHJpbmc7XG5cdHVzZXJuYW1lOiBzdHJpbmc7XG5cdHBhc3N3b3JkOiBzdHJpbmc7XG5cdGhvc3Q6IHN0cmluZztcblx0aG9zdG5hbWU6IHN0cmluZztcblx0cG9ydDogc3RyaW5nO1xuXHRwYXRobmFtZTogc3RyaW5nO1xuXHRzZWFyY2g6IHN0cmluZztcblx0c2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXM7XG5cdGhhc2g6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcbntcblx0aWYgKEFycmF5LmlzQXJyYXkodXJsKSlcblx0e1xuXHRcdGlmIChiYXNlID09IG51bGwpXG5cdFx0e1xuXHRcdFx0W3VybCwgYmFzZV0gPSB1cmw7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBMYXp5VVJMKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRvUmVhbFN0cmluZygpO1xuXHR9XG5cdGVsc2UgaWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBVUkwpXG5cdHtcblx0XHR1cmwgPSB1cmwuaHJlZjtcblx0fVxuXHRlbHNlIGlmICh1cmwgIT0gbnVsbCAmJiB0eXBlb2YgKHVybCBhcyBJVVJMT2JqZWN0TGlrZSkuaHJlZiA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHR1cmwgPSAodXJsIGFzIElVUkxPYmplY3RMaWtlKS5ocmVmO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgQXJndW1lbnQgJyR7dXJsfScgaXMgbm90IGFzc2lnbmFibGUgdG8gdXJsIGxpa2UuYClcblx0fVxuXG5cdGxldCBfdXJsOiBVUkw7XG5cdGNvbnN0IF9oaWRkZW5fOiBQYXJ0aWFsPFVSTD4gPSB7fTtcblxuXHRpZiAodHlwZW9mIGJhc2UgIT09ICdzdHJpbmcnICYmIGJhc2UgIT0gbnVsbCAmJiB0eXBlb2YgYmFzZS5ocmVmID09PSAnc3RyaW5nJylcblx0e1xuXHRcdGJhc2UgPSBiYXNlLmhyZWY7XG5cdH1cblxuXHRpZiAoYmFzZSA9PT0gJycpXG5cdHtcblx0XHRiYXNlID0gdm9pZCAwO1xuXHR9XG5cblx0dHJ5XG5cdHtcblx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIGJhc2UgYXMgc3RyaW5nKVxuXHR9XG5cdGNhdGNoIChlKVxuXHR7XG5cdFx0bGV0IG9rOiBib29sZWFuO1xuXG5cdFx0aWYgKC9JbnZhbGlkIFVSTC8udGVzdChlLm1lc3NhZ2UpKVxuXHRcdHtcblx0XHRcdGlmICh0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBvbGQgPSBiYXNlO1xuXHRcdFx0XHRsZXQgdSA9IHVybFBhcnNlKGJhc2UpLyogYXMgVVJMICYge1xuXHRcdFx0XHRcdFx0c2V0KG5hbWU6IGtleW9mIFVSTCwgdmFsdWU6IHN0cmluZyk6IHZvaWRcblx0XHRcdFx0XHR9Ki87XG5cblx0XHRcdFx0aWYgKChcblx0XHRcdFx0XHR1Lmhvc3QgPT09ICcnXG5cdFx0XHRcdFx0fHwgdS5wcm90b2NvbCA9PT0gJydcblx0XHRcdFx0KSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICghb2xkLmluY2x1ZGVzKCcvJykgJiYgW1xuXHRcdFx0XHRcdFx0dS5wcm90b2NvbCArIHUuaG9zdCxcblx0XHRcdFx0XHRcdHUucHJvdG9jb2wgKyB1LnBhdGhuYW1lLFxuXHRcdFx0XHRcdF0uaW5jbHVkZXMob2xkLnRvTG93ZXJDYXNlKCkpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUgPSB1cmxQYXJzZSgnJyk7XG5cblx0XHRcdFx0XHRcdHUuc2V0KCdob3N0Jywgb2xkKTtcblx0XHRcdFx0XHRcdHUuc2V0KCdwcm90b2NvbCcsIEVOVU1fRkFLRS5wcm90b2NvbCk7XG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnJyk7XG5cblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gRU5VTV9GQUtFLnByb3RvY29sO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh1Lmhvc3QgPT09ICcnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICh1LnBhdGhuYW1lICE9ICcnICYmICF1LnBhdGhuYW1lLmluY2x1ZGVzKCcvJykpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdob3N0JywgdS5wYXRobmFtZSk7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCBFTlVNX0ZBS0UuaG9zdG5hbWUpO1xuXG5cdFx0XHRcdFx0XHRcdF9oaWRkZW5fLmhvc3RuYW1lID0gdS5ob3N0bmFtZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodS5wcm90b2NvbCA9PT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3Byb3RvY29sJywgRU5VTV9GQUtFLnByb3RvY29sKTtcblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gdS5wcm90b2NvbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0aWYgKHUucGF0aG5hbWUgIT09ICcnICYmICF1LnBhdGhuYW1lLnN0YXJ0c1dpdGgoJy8nKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnLycgKyB1LnBhdGhuYW1lKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIHUudG9TdHJpbmcoKSk7XG5cblx0XHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGJhc2UgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0YmFzZSA9IGAke0VOVU1fRkFLRS5wcm90b2NvbH0vLyR7RU5VTV9GQUtFLmhvc3RuYW1lfWA7XG5cblx0XHRcdFx0X3VybCA9IG5ldyBVUkwodXJsLCBiYXNlKTtcblxuXHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IEVOVU1fRkFLRS5wcm90b2NvbDtcblx0XHRcdFx0X2hpZGRlbl8uaG9zdG5hbWUgPSBFTlVNX0ZBS0UuaG9zdG5hbWU7XG5cblx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghb2spXG5cdFx0e1xuXHRcdFx0dGhyb3cgZVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dXJsOiBfdXJsLFxuXHRcdGhpZGRlbjogX2hpZGRlbl8sXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eVVSTFxuIl19