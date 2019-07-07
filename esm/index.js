/**
 * Created by user on 2019/6/6.
 */
import urlParse from 'url-parse';
export const SYM_URL = Symbol('url');
export const SYM_HIDDEN = Symbol('hidden');
var ENUM_FAKE;
(function (ENUM_FAKE) {
    ENUM_FAKE["protocol"] = "fake+http:";
    ENUM_FAKE["hostname"] = "url-fake-hostname";
})(ENUM_FAKE || (ENUM_FAKE = {}));
const SymbolContext = findSymbolContext();
export class LazyURL extends URL {
    constructor(url, base) {
        let u = _core(url, base);
        super(u.url.href);
        //this[SYM_URL] = _url;
        this[SYM_HIDDEN] = u.hidden;
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
        return Object.keys(this[SYM_HIDDEN]);
    }
    fakeEntries() {
        return Object.entries(this[SYM_HIDDEN]);
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
            let u = urlParse(this.href);
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
        delete this[SYM_HIDDEN].hostname;
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
        delete this[SYM_HIDDEN].protocol;
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
export function findSymbolContext() {
    let u = new URL(`https://localhost`);
    const SymbolContext = Object.getOwnPropertySymbols(u)
        .filter(sym => u[sym].host == 'localhost')[0];
    return SymbolContext;
}
export function _core(url, base) {
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
                let u = urlParse(base) /* as URL & {
                        set(name: keyof URL, value: string): void
                    }*/;
                if ((u.host === ''
                    || u.protocol === '')) {
                    if (!old.includes('/') && [
                        u.protocol + u.host,
                        u.protocol + u.pathname,
                    ].includes(old.toLowerCase())) {
                        u = urlParse('');
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
export default LazyURL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFLakMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTNDLElBQVcsU0FJVjtBQUpELFdBQVcsU0FBUztJQUVuQixvQ0FBdUIsQ0FBQTtJQUN2QiwyQ0FBOEIsQ0FBQTtBQUMvQixDQUFDLEVBSlUsU0FBUyxLQUFULFNBQVMsUUFJbkI7QUFFRCxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0FBRTFDLE1BQU0sT0FBTyxPQUFRLFNBQVEsR0FBRztJQVUvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUU1QixrQkFBa0I7SUFDbkIsQ0FBQztJQWZELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBcUMsRUFBRSxJQUFlO1FBRW5FLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFjRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUVIOzs7Ozs7T0FNRztJQUVILElBQUksS0FBSztRQUVSLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxD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QUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFDcEQ7d0JBQ0MsYUFBYTt3QkFDYixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNwQztvQkFFRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUVsQyxFQUFFLEdBQUcsSUFBSSxDQUFDO2lCQUNWO2FBQ0Q7aUJBQ0ksSUFBSSxJQUFJLElBQUksSUFBSSxFQUNyQjtnQkFDQyxJQUFJLEdBQUcsR0FBRywyQkFBa0IsS0FBSyxrQ0FBa0IsRUFBRSxDQUFDO2dCQUV0RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUxQixRQUFRLENBQUMsUUFBUSw4QkFBcUIsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLFFBQVEscUNBQXFCLENBQUM7Z0JBRXZDLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDVjtTQUNEO1FBRUQsSUFBSSxDQUFDLEVBQUUsRUFDUDtZQUNDLE1BQU0sQ0FBQyxDQUFBO1NBQ1A7S0FDRDtJQUVELE9BQU87UUFDTixHQUFHLEVBQUUsSUFBSTtRQUNULE1BQU0sRUFBRSxRQUFRO0tBQ2hCLENBQUE7QUFDRixDQUFDO0FBRUQsZUFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzYvNi5cbiAqL1xuXG5pbXBvcnQgdXJsUGFyc2UgZnJvbSAndXJsLXBhcnNlJztcbmltcG9ydCBTeW1ib2xJbnNwZWN0IGZyb20gJ3N5bWJvbC5pbnNwZWN0JztcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5leHBvcnQgdHlwZSBJVVJMTGlrZSA9IHN0cmluZyB8IFVSTCB8IElVUkxPYmplY3RMaWtlO1xuZXhwb3J0IGNvbnN0IFNZTV9VUkwgPSBTeW1ib2woJ3VybCcpO1xuZXhwb3J0IGNvbnN0IFNZTV9ISURERU4gPSBTeW1ib2woJ2hpZGRlbicpO1xuXG5jb25zdCBlbnVtIEVOVU1fRkFLRVxue1xuXHRwcm90b2NvbCA9ICdmYWtlK2h0dHA6Jyxcblx0aG9zdG5hbWUgPSAndXJsLWZha2UtaG9zdG5hbWUnLFxufVxuXG5jb25zdCBTeW1ib2xDb250ZXh0ID0gZmluZFN5bWJvbENvbnRleHQoKTtcblxuZXhwb3J0IGNsYXNzIExhenlVUkwgZXh0ZW5kcyBVUkwgaW1wbGVtZW50cyBVUkxcbntcblx0cHJvdGVjdGVkIFtTWU1fVVJMXT86IFVSTDtcblx0cHJvdGVjdGVkIFtTWU1fSElEREVOXTogUGFydGlhbDxVUkw+O1xuXG5cdHN0YXRpYyBjcmVhdGUodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKHVybCwgYmFzZSlcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcblx0e1xuXHRcdGxldCB1ID0gX2NvcmUodXJsLCBiYXNlKVxuXG5cdFx0c3VwZXIodS51cmwuaHJlZik7XG5cblx0XHQvL3RoaXNbU1lNX1VSTF0gPSBfdXJsO1xuXHRcdHRoaXNbU1lNX0hJRERFTl0gPSB1LmhpZGRlbjtcblxuXHRcdC8vX251bWVyYWJsZSh0aGlzKVxuXHR9XG5cblx0Lypcblx0W1N5bWJvbEluc3BlY3RdKClcblx0e1xuXHRcdHJldHVybiBgTGF6eVVSTCB7XG4gIGhyZWY6ICcke3RoaXMuaHJlZn0nLFxuICBocmVmOiAnJHt0aGlzLnRvUmVhbFN0cmluZygpfScsXG4gIG9yaWdpbjogJyR7dGhpcy5vcmlnaW59JyxcbiAgcHJvdG9jb2w6ICcke3RoaXMucHJvdG9jb2x9JyxcbiAgdXNlcm5hbWU6ICcke3RoaXMudXNlcm5hbWV9JyxcbiAgcGFzc3dvcmQ6ICcke3RoaXMucGFzc3dvcmR9JyxcbiAgaG9zdDogJyR7dGhpcy5ob3N0fScsXG4gIGhvc3RuYW1lOiAnJHt0aGlzLmhvc3RuYW1lfScsXG4gIHBvcnQ6ICcke3RoaXMucG9ydH0nLFxuICBwYXRobmFtZTogJyR7dGhpcy5wYXRobmFtZX0nLFxuICBzZWFyY2g6ICcke3RoaXMuc2VhcmNofScsXG4gIHNlYXJjaFBhcmFtczogJHt1dGlsLmluc3BlY3QodGhpcy5zZWFyY2hQYXJhbXMpfSxcbiAgaGFzaDogJyR7dGhpcy5oYXNofSdcbn1gO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdFtTeW1ib2xJbnNwZWN0XSgpXG5cdHtcblx0XHRyZXR1cm4gYExhenlVUkwoJHt0aGlzLmhyZWZ9KWA7XG5cdH1cblxuXHQgKi9cblxuXHRnZXQgcGF0aHMoKVxuXHR7XG5cdFx0aWYgKFN5bWJvbENvbnRleHQgIT0gbnVsbCAmJiB0aGlzW1N5bWJvbENvbnRleHRdICYmIEFycmF5LmlzQXJyYXkodGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoLnNsaWNlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucGF0aG5hbWVcblx0XHRcdC5zcGxpdCgnLycpXG5cdFx0XHQuZmlsdGVyKHYgPT4gdiAhPSAnJylcblx0fVxuXG5cdGZha2VFeGlzdHMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmFrZUtleXMoKS5sZW5ndGhcblx0fVxuXG5cdGZha2VLZXlzKClcblx0e1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzW1NZTV9ISURERU5dKVxuXHR9XG5cblx0ZmFrZUVudHJpZXMoKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXNbU1lNX0hJRERFTl0pXG5cdH1cblxuXHQvKipcblx0ICogZ2V0IHRoZSByZWFsIHVybCAocmVtb3ZlIGZha2UgdmFsdWUpXG5cdCAqIHRocm93IGVycm9yIGlmIG5vdCBhIHZhbGlkIHVybFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0dG9SZWFsU3RyaW5nKClcblx0e1xuXHRcdGxldCBrcyA9IHRoaXMuZmFrZUVudHJpZXMoKTtcblxuXHRcdGlmIChrcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0bGV0IHUgPSB1cmxQYXJzZSh0aGlzLmhyZWYpO1xuXG5cdFx0XHRrc1xuXHRcdFx0XHQuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICh1W25hbWVdID09PSB2YWx1ZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1LnNldChuYW1lIGFzIGFueSwgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdDtcblxuXHRcdFx0aWYgKHUuaG9zdCA9PT0gJycpXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh1LnVzZXJuYW1lICE9PSAnJyB8fCB1LnBhc3N3b3JkICE9PSAnJyB8fCB1LnBvcnQgIT09ICcnIHx8IHUucHJvdG9jb2wgIT09ICcnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBVUkwgJHt1fWApXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IHMgPSB1LnRvU3RyaW5nKCk7XG5cblx0XHRcdGlmICh1LnByb3RvY29sID09PSAnJyAmJiB1Lmhvc3QgPT09ICcnKVxuXHRcdFx0e1xuXHRcdFx0XHRzID0gcy5yZXBsYWNlKC9eXFwvXFwvLywgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cblxuXHR0b1N0cmluZygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5ocmVmO1xuXHR9XG5cblx0Lypcblx0dG9KU09OKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnRvSlNPTigpO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdGdldCBoYXNoKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhhc2hcblx0fVxuXG5cdHNldCBoYXNoKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5oYXNoID0gdmFsdWVcblx0fVxuXG5cdGdldCBob3N0KClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhvc3Rcblx0fVxuXG5cdHNldCBob3N0KHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0uaG9zdG5hbWU7XG5cblx0XHR0aGlzW1NZTV9VUkxdLmhvc3QgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBob3N0bmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIuaG9zdG5hbWVcblx0fVxuXG5cdHNldCBob3N0bmFtZSh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLmhvc3RuYW1lO1xuXG5cdFx0c3VwZXIuaG9zdG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IGhyZWYoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaHJlZlxuXHR9XG5cblx0c2V0IGhyZWYodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLmhyZWYgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IG9yaWdpbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5vcmlnaW5cblx0fVxuXG5cdGdldCBwYXNzd29yZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wYXNzd29yZFxuXHR9XG5cblx0c2V0IHBhc3N3b3JkKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wYXNzd29yZCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgcGF0aG5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucGF0aG5hbWVcblx0fVxuXG5cdHNldCBwYXRobmFtZSh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucGF0aG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IHBvcnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucG9ydFxuXHR9XG5cblx0c2V0IHBvcnQodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBvcnQgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBwcm90b2NvbCgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIucHJvdG9jb2xcblx0fVxuXG5cdHNldCBwcm90b2NvbCh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLnByb3RvY29sO1xuXG5cdFx0c3VwZXIucHJvdG9jb2wgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IHNlYXJjaCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5zZWFyY2hcblx0fVxuXG5cdHNldCBzZWFyY2godmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnNlYXJjaCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgc2VhcmNoUGFyYW1zKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnNlYXJjaFBhcmFtc1xuXHR9XG5cblx0Z2V0IHVzZXJuYW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnVzZXJuYW1lXG5cdH1cblxuXHRzZXQgdXNlcm5hbWUodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnVzZXJuYW1lID0gdmFsdWVcblx0fVxuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdGdldCBzY2hlbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucHJvdG9jb2xcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdHNldCBzY2hlbWUodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMucHJvdG9jb2wgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0Z2V0IGZyYWdtZW50KClcblx0e1xuXHRcdHJldHVybiB0aGlzLmhhc2hcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0c2V0IGZyYWdtZW50KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLmhhc2ggPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgc2VhcmNoXG5cdCAqL1xuXHRnZXQgcXVlcnkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoXG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIHNlYXJjaFxuXHQgKi9cblx0c2V0IHF1ZXJ5KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLnNlYXJjaCA9IHZhbHVlO1xuXHR9XG5cblx0dG9PYmplY3QoKTogSVVSTE9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwudG9PYmplY3QodGhpcylcblx0fVxuXG5cdC8qKlxuXHQgKiBjbG9uZSBpbnRvIGEgb2JqZWN0XG5cdCAqXG5cdCAqIEByZXR1cm5zIHtJVVJMT2JqZWN0fVxuXHQgKi9cblx0c3RhdGljIHRvT2JqZWN0KHVybDogVVJMKTogSVVSTE9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLnJlZHVjZSgoYSwgYikgPT5cblx0XHR7XG5cdFx0XHRpZiAoYiA9PT0gJ3NlYXJjaFBhcmFtcycpXG5cdFx0XHR7XG5cdFx0XHRcdGFbYl0gPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zZWFyY2hQYXJhbXMuZW50cmllcygpIGFzIGFueSBhcyBbc3RyaW5nLCBzdHJpbmddW10pXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGFbYl0gPSB1cmxbYl07XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBhXG5cdFx0fSwge30gYXMgSVVSTE9iamVjdClcblx0fVxuXG5cdGtleXMoKTogSVVybEtleXNbXVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpXG5cdH1cblxuXHR2YWx1ZXMoKVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwudmFsdWVzKHRoaXMpXG5cdH1cblxuXHRlbnRyaWVzKCk6IElFbnRyaWVzXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5lbnRyaWVzKHRoaXMpXG5cdH1cblxuXHRzdGF0aWMga2V5cygpOiBJVXJsS2V5c1tdXG5cdHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0J2hyZWYnLFxuXHRcdFx0J3Byb3RvY29sJyxcblx0XHRcdCd1c2VybmFtZScsXG5cdFx0XHQncGFzc3dvcmQnLFxuXHRcdFx0J2hvc3QnLFxuXHRcdFx0J2hvc3RuYW1lJyxcblx0XHRcdCdwb3J0Jyxcblx0XHRcdCdwYXRobmFtZScsXG5cdFx0XHQnc2VhcmNoJyxcblx0XHRcdCdzZWFyY2hQYXJhbXMnLFxuXHRcdFx0J2hhc2gnLFxuXHRcdF1cblx0fVxuXG5cdHN0YXRpYyB2YWx1ZXModXJsOiBVUkwpXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkubWFwKG5hbWUgPT4gdXJsW25hbWVdKVxuXHR9XG5cblx0c3RhdGljIGVudHJpZXModXJsOiBVUkwpOiBJRW50cmllc1xuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLm1hcChuYW1lID0+IFtuYW1lLCB1cmxbbmFtZV1dKSBhcyBJRW50cmllc1xuXHR9XG5cblx0Y3JlYXRlVVJMU2VhcmNoUGFyYW1zKGluaXQ/OiBzdHJpbmdbXVtdIHwgUmVjb3JkPHN0cmluZywgc3RyaW5nPiB8IHN0cmluZyB8IFVSTFNlYXJjaFBhcmFtcyB8IFVSTClcblx0e1xuXHRcdGlmIChpbml0IGluc3RhbmNlb2YgVVJMKVxuXHRcdHtcblx0XHRcdGluaXQgPSBpbml0LnNlYXJjaFBhcmFtcztcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyhpbml0KVxuXHR9XG5cbn1cblxuZXhwb3J0IHR5cGUgSUVudHJpZXMgPSAoW1wiaGFzaFwiIHwgXCJob3N0XCIgfCBcImhvc3RuYW1lXCIgfCBcImhyZWZcIiB8IFwicGFzc3dvcmRcIiB8IFwicGF0aG5hbWVcIiB8IFwicG9ydFwiIHwgXCJwcm90b2NvbFwiIHwgXCJzZWFyY2hcIiB8IFwidXNlcm5hbWVcIiwgc3RyaW5nXSB8IFtcInNlYXJjaFBhcmFtc1wiLCBVUkxTZWFyY2hQYXJhbXNdKVtdXG5cbmV4cG9ydCB0eXBlIElFbnRyaWVzUm93PFQgZXh0ZW5kcyBJVXJsS2V5cz4gPSBbVCwgVVJMW1RdXVxuXG5mdW5jdGlvbiBfbnVtZXJhYmxlKGxpYilcbntcblx0bGV0IGRzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMobGliKTtcblxuXHQoW1xuXHRcdCdocmVmJyxcblx0XHQncHJvdG9jb2wnLFxuXHRcdCd1c2VybmFtZScsXG5cdFx0J3Bhc3N3b3JkJyxcblx0XHQnaG9zdCcsXG5cdFx0J2hvc3RuYW1lJyxcblx0XHQncG9ydCcsXG5cdFx0J3BhdGhuYW1lJyxcblx0XHQnc2VhcmNoJyxcblx0XHQnc2VhcmNoUGFyYW1zJyxcblx0XHQnaGFzaCcsXG5cdF0gYXMgY29uc3QpXG5cdFx0LmZvckVhY2goKG5hbWUpID0+XG5cdFx0e1xuXHRcdFx0aWYgKG5hbWUgaW4gZHMpXG5cdFx0XHR7XG5cdFx0XHRcdGRzW25hbWVdLmVudW1lcmFibGUgPSB0cnVlO1xuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShsaWIsIG5hbWUsIGRzW25hbWVdKVxuXHRcdFx0fVxuXHRcdH0pXG5cdDtcbn1cblxuZXhwb3J0IHR5cGUgSVVybEtleXMgPVxuXHR8ICdocmVmJ1xuXHR8ICd1c2VybmFtZSdcblx0fCAncGFzc3dvcmQnXG5cdHwgJ2hvc3QnXG5cdHwgJ2hvc3RuYW1lJ1xuXHR8ICdwb3J0J1xuXHR8ICdwYXRobmFtZSdcblx0fCAnc2VhcmNoJ1xuXHR8ICdzZWFyY2hQYXJhbXMnXG5cdHwgJ3Byb3RvY29sJ1xuXHR8ICdoYXNoJ1xuXHQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kU3ltYm9sQ29udGV4dCgpOiBzeW1ib2xcbntcblx0bGV0IHUgPSBuZXcgVVJMKGBodHRwczovL2xvY2FsaG9zdGApO1xuXG5cdGNvbnN0IFN5bWJvbENvbnRleHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHUpXG5cdFx0LmZpbHRlcihzeW0gPT4gdVtzeW1dLmhvc3QgPT0gJ2xvY2FsaG9zdCcpWzBdXG5cdDtcblxuXHRyZXR1cm4gU3ltYm9sQ29udGV4dDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVVJMT2JqZWN0TGlrZVxue1xuXHRocmVmOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVSTE9iamVjdFxue1xuXHRocmVmOiBzdHJpbmc7XG5cdHByb3RvY29sOiBzdHJpbmc7XG5cdHVzZXJuYW1lOiBzdHJpbmc7XG5cdHBhc3N3b3JkOiBzdHJpbmc7XG5cdGhvc3Q6IHN0cmluZztcblx0aG9zdG5hbWU6IHN0cmluZztcblx0cG9ydDogc3RyaW5nO1xuXHRwYXRobmFtZTogc3RyaW5nO1xuXHRzZWFyY2g6IHN0cmluZztcblx0c2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXM7XG5cdGhhc2g6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9jb3JlKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcbntcblx0aWYgKEFycmF5LmlzQXJyYXkodXJsKSlcblx0e1xuXHRcdGlmIChiYXNlID09IG51bGwpXG5cdFx0e1xuXHRcdFx0W3VybCwgYmFzZV0gPSB1cmw7XG5cdFx0fVxuXHR9XG5cblx0aWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBMYXp5VVJMKVxuXHR7XG5cdFx0dXJsID0gdXJsLnRvUmVhbFN0cmluZygpO1xuXHR9XG5cdGVsc2UgaWYgKHVybCAmJiB1cmwgaW5zdGFuY2VvZiBVUkwpXG5cdHtcblx0XHR1cmwgPSB1cmwuaHJlZjtcblx0fVxuXHRlbHNlIGlmICh1cmwgIT0gbnVsbCAmJiB0eXBlb2YgKHVybCBhcyBJVVJMT2JqZWN0TGlrZSkuaHJlZiA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHR1cmwgPSAodXJsIGFzIElVUkxPYmplY3RMaWtlKS5ocmVmO1xuXHR9XG5cdGVsc2UgaWYgKHR5cGVvZiB1cmwgIT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgQXJndW1lbnQgJyR7dXJsfScgaXMgbm90IGFzc2lnbmFibGUgdG8gdXJsIGxpa2UuYClcblx0fVxuXG5cdGxldCBfdXJsOiBVUkw7XG5cdGNvbnN0IF9oaWRkZW5fOiBQYXJ0aWFsPFVSTD4gPSB7fTtcblxuXHRpZiAodHlwZW9mIGJhc2UgIT09ICdzdHJpbmcnICYmIGJhc2UgIT0gbnVsbCAmJiB0eXBlb2YgYmFzZS5ocmVmID09PSAnc3RyaW5nJylcblx0e1xuXHRcdGJhc2UgPSBiYXNlLmhyZWY7XG5cdH1cblxuXHRpZiAoYmFzZSA9PT0gJycpXG5cdHtcblx0XHRiYXNlID0gdm9pZCAwO1xuXHR9XG5cblx0dHJ5XG5cdHtcblx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIGJhc2UgYXMgc3RyaW5nKVxuXHR9XG5cdGNhdGNoIChlKVxuXHR7XG5cdFx0bGV0IG9rOiBib29sZWFuO1xuXG5cdFx0aWYgKC9JbnZhbGlkIFVSTC8udGVzdChlLm1lc3NhZ2UpKVxuXHRcdHtcblx0XHRcdGlmICh0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycpXG5cdFx0XHR7XG5cdFx0XHRcdGxldCBvbGQgPSBiYXNlO1xuXHRcdFx0XHRsZXQgdSA9IHVybFBhcnNlKGJhc2UpLyogYXMgVVJMICYge1xuXHRcdFx0XHRcdFx0c2V0KG5hbWU6IGtleW9mIFVSTCwgdmFsdWU6IHN0cmluZyk6IHZvaWRcblx0XHRcdFx0XHR9Ki87XG5cblx0XHRcdFx0aWYgKChcblx0XHRcdFx0XHR1Lmhvc3QgPT09ICcnXG5cdFx0XHRcdFx0fHwgdS5wcm90b2NvbCA9PT0gJydcblx0XHRcdFx0KSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICghb2xkLmluY2x1ZGVzKCcvJykgJiYgW1xuXHRcdFx0XHRcdFx0dS5wcm90b2NvbCArIHUuaG9zdCxcblx0XHRcdFx0XHRcdHUucHJvdG9jb2wgKyB1LnBhdGhuYW1lLFxuXHRcdFx0XHRcdF0uaW5jbHVkZXMob2xkLnRvTG93ZXJDYXNlKCkpKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUgPSB1cmxQYXJzZSgnJyk7XG5cblx0XHRcdFx0XHRcdHUuc2V0KCdob3N0Jywgb2xkKTtcblx0XHRcdFx0XHRcdHUuc2V0KCdwcm90b2NvbCcsIEVOVU1fRkFLRS5wcm90b2NvbCk7XG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnJyk7XG5cblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gRU5VTV9GQUtFLnByb3RvY29sO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh1Lmhvc3QgPT09ICcnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICh1LnBhdGhuYW1lICE9ICcnICYmICF1LnBhdGhuYW1lLmluY2x1ZGVzKCcvJykpXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdob3N0JywgdS5wYXRobmFtZSk7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdwYXRobmFtZScsICcnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0dS5zZXQoJ2hvc3QnLCBFTlVNX0ZBS0UuaG9zdG5hbWUpO1xuXG5cdFx0XHRcdFx0XHRcdF9oaWRkZW5fLmhvc3RuYW1lID0gdS5ob3N0bmFtZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodS5wcm90b2NvbCA9PT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3Byb3RvY29sJywgRU5VTV9GQUtFLnByb3RvY29sKTtcblx0XHRcdFx0XHRcdF9oaWRkZW5fLnByb3RvY29sID0gdS5wcm90b2NvbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0aWYgKHUucGF0aG5hbWUgIT09ICcnICYmICF1LnBhdGhuYW1lLnN0YXJ0c1dpdGgoJy8nKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnLycgKyB1LnBhdGhuYW1lKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRfdXJsID0gbmV3IFVSTCh1cmwsIHUudG9TdHJpbmcoKSk7XG5cblx0XHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGJhc2UgPT0gbnVsbClcblx0XHRcdHtcblx0XHRcdFx0YmFzZSA9IGAke0VOVU1fRkFLRS5wcm90b2NvbH0vLyR7RU5VTV9GQUtFLmhvc3RuYW1lfWA7XG5cblx0XHRcdFx0X3VybCA9IG5ldyBVUkwodXJsLCBiYXNlKTtcblxuXHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IEVOVU1fRkFLRS5wcm90b2NvbDtcblx0XHRcdFx0X2hpZGRlbl8uaG9zdG5hbWUgPSBFTlVNX0ZBS0UuaG9zdG5hbWU7XG5cblx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmICghb2spXG5cdFx0e1xuXHRcdFx0dGhyb3cgZVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dXJsOiBfdXJsLFxuXHRcdGhpZGRlbjogX2hpZGRlbl8sXG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF6eVVSTFxuIl19