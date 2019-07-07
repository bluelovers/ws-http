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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFLakMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTNDLElBQVcsU0FJVjtBQUpELFdBQVcsU0FBUztJQUVuQixvQ0FBdUIsQ0FBQTtJQUN2QiwyQ0FBOEIsQ0FBQTtBQUMvQixDQUFDLEVBSlUsU0FBUyxLQUFULFNBQVMsUUFJbkI7QUFFRCxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0FBRTFDLE1BQU0sT0FBTyxPQUFRLFNBQVEsR0FBRztJQVUvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUU1QixrQkFBa0I7SUFDbkIsQ0FBQztJQWZELE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBcUMsRUFBRSxJQUFlO1FBRW5FLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFjRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW1CRztJQUVIOzs7Ozs7T0FNRztJQUVILElBQUksS0FBSztRQUVSLElBQUksYUFBYSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxD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QUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFDcEQ7d0JBQ0MsYUFBYTt3QkFDYixDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNwQztvQkFFRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO29CQUVsQyxFQUFFLEdBQUcsSUFBSSxDQUFDO2lCQUNWO2FBQ0Q7aUJBQ0ksSUFBSSxJQUFJLElBQUksSUFBSSxFQUNyQjtnQkFDQyxJQUFJLEdBQUcsR0FBRywyQkFBa0IsS0FBSyxrQ0FBa0IsRUFBRSxDQUFDO2dCQUV0RCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUUxQixRQUFRLENBQUMsUUFBUSw4QkFBcUIsQ0FBQztnQkFDdkMsUUFBUSxDQUFDLFFBQVEscUNBQXFCLENBQUM7Z0JBRXZDLEVBQUUsR0FBRyxJQUFJLENBQUM7YUFDVjtTQUNEO1FBRUQsSUFBSSxDQUFDLEVBQUUsRUFDUDtZQUNDLE1BQU0sQ0FBQyxDQUFBO1NBQ1A7S0FDRDtJQUVELE9BQU87UUFDTixHQUFHLEVBQUUsSUFBSTtRQUNULE1BQU0sRUFBRSxRQUFRO0tBQ2hCLENBQUE7QUFDRixDQUFDO0FBRUQsZUFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMDE5LzYvNi5cbiAqL1xuXG5pbXBvcnQgdXJsUGFyc2UgZnJvbSAndXJsLXBhcnNlJztcbmltcG9ydCBTeW1ib2xJbnNwZWN0IGZyb20gJ3N5bWJvbC5pbnNwZWN0JztcbmltcG9ydCB1dGlsIGZyb20gJ3V0aWwnO1xuXG5leHBvcnQgdHlwZSBJVVJMTGlrZSA9IHN0cmluZyB8IFVSTCB8IElVUkxPYmplY3RMaWtlO1xuZXhwb3J0IGNvbnN0IFNZTV9VUkwgPSBTeW1ib2woJ3VybCcpO1xuZXhwb3J0IGNvbnN0IFNZTV9ISURERU4gPSBTeW1ib2woJ2hpZGRlbicpO1xuXG5jb25zdCBlbnVtIEVOVU1fRkFLRVxue1xuXHRwcm90b2NvbCA9ICdmYWtlK2h0dHA6Jyxcblx0aG9zdG5hbWUgPSAndXJsLWZha2UtaG9zdG5hbWUnLFxufVxuXG5jb25zdCBTeW1ib2xDb250ZXh0ID0gZmluZFN5bWJvbENvbnRleHQoKTtcblxuZXhwb3J0IGNsYXNzIExhenlVUkwgZXh0ZW5kcyBVUkwgaW1wbGVtZW50cyBVUkxcbntcblx0cHJvdGVjdGVkIFtTWU1fVVJMXT86IFVSTDtcblx0cHJvdGVjdGVkIFtTWU1fSElEREVOXTogUGFydGlhbDxVUkw+O1xuXG5cdHN0YXRpYyBjcmVhdGUodXJsOiBJVVJMTGlrZSB8IFtJVVJMTGlrZSwgSVVSTExpa2U/XSwgYmFzZT86IElVUkxMaWtlKVxuXHR7XG5cdFx0cmV0dXJuIG5ldyB0aGlzKHVybCwgYmFzZSlcblx0fVxuXG5cdGNvbnN0cnVjdG9yKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcblx0e1xuXHRcdGxldCB1ID0gX2NvcmUodXJsLCBiYXNlKVxuXG5cdFx0c3VwZXIodS51cmwuaHJlZik7XG5cblx0XHQvL3RoaXNbU1lNX1VSTF0gPSBfdXJsO1xuXHRcdHRoaXNbU1lNX0hJRERFTl0gPSB1LmhpZGRlbjtcblxuXHRcdC8vX251bWVyYWJsZSh0aGlzKVxuXHR9XG5cblx0Lypcblx0W1N5bWJvbEluc3BlY3RdKClcblx0e1xuXHRcdHJldHVybiBgTGF6eVVSTCB7XG4gIGhyZWY6ICcke3RoaXMuaHJlZn0nLFxuICBocmVmOiAnJHt0aGlzLnRvUmVhbFN0cmluZygpfScsXG4gIG9yaWdpbjogJyR7dGhpcy5vcmlnaW59JyxcbiAgcHJvdG9jb2w6ICcke3RoaXMucHJvdG9jb2x9JyxcbiAgdXNlcm5hbWU6ICcke3RoaXMudXNlcm5hbWV9JyxcbiAgcGFzc3dvcmQ6ICcke3RoaXMucGFzc3dvcmR9JyxcbiAgaG9zdDogJyR7dGhpcy5ob3N0fScsXG4gIGhvc3RuYW1lOiAnJHt0aGlzLmhvc3RuYW1lfScsXG4gIHBvcnQ6ICcke3RoaXMucG9ydH0nLFxuICBwYXRobmFtZTogJyR7dGhpcy5wYXRobmFtZX0nLFxuICBzZWFyY2g6ICcke3RoaXMuc2VhcmNofScsXG4gIHNlYXJjaFBhcmFtczogJHt1dGlsLmluc3BlY3QodGhpcy5zZWFyY2hQYXJhbXMpfSxcbiAgaGFzaDogJyR7dGhpcy5oYXNofSdcbn1gO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdFtTeW1ib2xJbnNwZWN0XSgpXG5cdHtcblx0XHRyZXR1cm4gYExhenlVUkwoJHt0aGlzLmhyZWZ9KWA7XG5cdH1cblxuXHQgKi9cblxuXHRnZXQgcGF0aHMoKVxuXHR7XG5cdFx0aWYgKFN5bWJvbENvbnRleHQgIT0gbnVsbCAmJiB0aGlzW1N5bWJvbENvbnRleHRdICYmIEFycmF5LmlzQXJyYXkodGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoLnNsaWNlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucGF0aG5hbWVcblx0XHRcdC5zcGxpdCgnLycpXG5cdFx0XHQuZmlsdGVyKHYgPT4gdiAhPSAnJylcblx0fVxuXG5cdGZha2VFeGlzdHMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmFrZUtleXMoKS5sZW5ndGhcblx0fVxuXG5cdGZha2VLZXlzKClcblx0e1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzW1NZTV9ISURERU5dKVxuXHR9XG5cblx0ZmFrZUVudHJpZXMoKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXNbU1lNX0hJRERFTl0pXG5cdH1cblxuXHQvKipcblx0ICogZ2V0IHRoZSByZWFsIHVybCAocmVtb3ZlIGZha2UgdmFsdWUpXG5cdCAqIHRocm93IGVycm9yIGlmIG5vdCBhIHZhbGlkIHVybFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0dG9SZWFsU3RyaW5nKClcblx0e1xuXHRcdGxldCBrcyA9IHRoaXMuZmFrZUVudHJpZXMoKTtcblxuXHRcdGlmIChrcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0bGV0IHUgPSB1cmxQYXJzZSh0aGlzLmhyZWYpO1xuXG5cdFx0XHRrc1xuXHRcdFx0XHQuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICh1W25hbWVdID09PSB2YWx1ZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1LnNldChuYW1lIGFzIGFueSwgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdDtcblxuXHRcdFx0aWYgKHUuaG9zdCA9PT0gJycpXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh1LnVzZXJuYW1lICE9PSAnJyB8fCB1LnBhc3N3b3JkICE9PSAnJyB8fCB1LnBvcnQgIT09ICcnIHx8IHUucHJvdG9jb2wgIT09ICcnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBVUkwgJHt1fWApXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IHMgPSB1LnRvU3RyaW5nKCk7XG5cblx0XHRcdGlmICh1LnByb3RvY29sID09PSAnJyAmJiB1Lmhvc3QgPT09ICcnKVxuXHRcdFx0e1xuXHRcdFx0XHRzID0gcy5yZXBsYWNlKC9eXFwvXFwvLywgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cblxuXHR0b1N0cmluZygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5ocmVmO1xuXHR9XG5cblx0Lypcblx0dG9KU09OKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnRvSlNPTigpO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdGdldCBoYXNoKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhhc2hcblx0fVxuXG5cdHNldCBoYXNoKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5oYXNoID0gdmFsdWVcblx0fVxuXG5cdGdldCBob3N0KClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhvc3Rcblx0fVxuXG5cdHNldCBob3N0KHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0uaG9zdG5hbWU7XG5cblx0XHR0aGlzW1NZTV9VUkxdLmhvc3QgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBob3N0bmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIuaG9zdG5hbWVcblx0fVxuXG5cdHNldCBob3N0bmFtZSh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLmhvc3RuYW1lO1xuXG5cdFx0c3VwZXIuaG9zdG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IGhyZWYoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaHJlZlxuXHR9XG5cblx0c2V0IGhyZWYodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLmhyZWYgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IG9yaWdpbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5vcmlnaW5cblx0fVxuXG5cdGdldCBwYXNzd29yZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wYXNzd29yZFxuXHR9XG5cblx0c2V0IHBhc3N3b3JkKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wYXNzd29yZCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgcGF0aG5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucGF0aG5hbWVcblx0fVxuXG5cdHNldCBwYXRobmFtZSh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucGF0aG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IHBvcnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucG9ydFxuXHR9XG5cblx0c2V0IHBvcnQodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBvcnQgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBwcm90b2NvbCgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIucHJvdG9jb2xcblx0fVxuXG5cdHNldCBwcm90b2NvbCh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLnByb3RvY29sO1xuXG5cdFx0c3VwZXIucHJvdG9jb2wgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IHNlYXJjaCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5zZWFyY2hcblx0fVxuXG5cdHNldCBzZWFyY2godmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnNlYXJjaCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgc2VhcmNoUGFyYW1zKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnNlYXJjaFBhcmFtc1xuXHR9XG5cblx0Z2V0IHVzZXJuYW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnVzZXJuYW1lXG5cdH1cblxuXHRzZXQgdXNlcm5hbWUodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnVzZXJuYW1lID0gdmFsdWVcblx0fVxuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdGdldCBzY2hlbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucHJvdG9jb2xcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdHNldCBzY2hlbWUodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMucHJvdG9jb2wgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0Z2V0IGZyYWdtZW50KClcblx0e1xuXHRcdHJldHVybiB0aGlzLmhhc2hcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0c2V0IGZyYWdtZW50KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLmhhc2ggPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgc2VhcmNoXG5cdCAqL1xuXHRnZXQgcXVlcnkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoXG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIHNlYXJjaFxuXHQgKi9cblx0c2V0IHF1ZXJ5KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLnNlYXJjaCA9IHZhbHVlO1xuXHR9XG5cblx0dG9PYmplY3QoKTogSVVSTE9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwudG9PYmplY3QodGhpcylcblx0fVxuXG5cdC8qKlxuXHQgKiBjbG9uZSBpbnRvIGEgb2JqZWN0XG5cdCAqXG5cdCAqIEByZXR1cm5zIHtJVVJMT2JqZWN0fVxuXHQgKi9cblx0c3RhdGljIHRvT2JqZWN0KHVybDogVVJMKTogSVVSTE9iamVjdFxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLnJlZHVjZSgoYSwgYikgPT5cblx0XHR7XG5cdFx0XHRpZiAoYiA9PT0gJ3NlYXJjaFBhcmFtcycpXG5cdFx0XHR7XG5cdFx0XHRcdGFbYl0gPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHVybC5zZWFyY2hQYXJhbXMuZW50cmllcygpIGFzIGFueSBhcyBbc3RyaW5nLCBzdHJpbmddW10pXG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdGFbYl0gPSB0aGlzW2JdO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYVxuXHRcdH0sIHt9IGFzIElVUkxPYmplY3QpXG5cdH1cblxuXHRrZXlzKCk6IElVcmxLZXlzW11cblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKVxuXHR9XG5cblx0dmFsdWVzKClcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLnZhbHVlcyh0aGlzKVxuXHR9XG5cblx0ZW50cmllcygpOiBJRW50cmllc1xuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwuZW50cmllcyh0aGlzKVxuXHR9XG5cblx0c3RhdGljIGtleXMoKTogSVVybEtleXNbXVxuXHR7XG5cdFx0cmV0dXJuIFtcblx0XHRcdCdocmVmJyxcblx0XHRcdCdwcm90b2NvbCcsXG5cdFx0XHQndXNlcm5hbWUnLFxuXHRcdFx0J3Bhc3N3b3JkJyxcblx0XHRcdCdob3N0Jyxcblx0XHRcdCdob3N0bmFtZScsXG5cdFx0XHQncG9ydCcsXG5cdFx0XHQncGF0aG5hbWUnLFxuXHRcdFx0J3NlYXJjaCcsXG5cdFx0XHQnc2VhcmNoUGFyYW1zJyxcblx0XHRcdCdoYXNoJyxcblx0XHRdXG5cdH1cblxuXHRzdGF0aWMgdmFsdWVzKHVybDogVVJMKVxuXHR7XG5cdFx0cmV0dXJuIExhenlVUkwua2V5cygpLm1hcChuYW1lID0+IHVybFtuYW1lXSlcblx0fVxuXG5cdHN0YXRpYyBlbnRyaWVzKHVybDogVVJMKTogSUVudHJpZXNcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKS5tYXAobmFtZSA9PiBbbmFtZSwgdXJsW25hbWVdXSkgYXMgSUVudHJpZXNcblx0fVxuXG5cdGNyZWF0ZVVSTFNlYXJjaFBhcmFtcyhpbml0Pzogc3RyaW5nW11bXSB8IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gfCBzdHJpbmcgfCBVUkxTZWFyY2hQYXJhbXMgfCBVUkwpXG5cdHtcblx0XHRpZiAoaW5pdCBpbnN0YW5jZW9mIFVSTClcblx0XHR7XG5cdFx0XHRpbml0ID0gaW5pdC5zZWFyY2hQYXJhbXM7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ldyBVUkxTZWFyY2hQYXJhbXMoaW5pdClcblx0fVxuXG59XG5cbmV4cG9ydCB0eXBlIElFbnRyaWVzID0gKFtcImhhc2hcIiB8IFwiaG9zdFwiIHwgXCJob3N0bmFtZVwiIHwgXCJocmVmXCIgfCBcInBhc3N3b3JkXCIgfCBcInBhdGhuYW1lXCIgfCBcInBvcnRcIiB8IFwicHJvdG9jb2xcIiB8IFwic2VhcmNoXCIgfCBcInVzZXJuYW1lXCIsIHN0cmluZ10gfCBbXCJzZWFyY2hQYXJhbXNcIiwgVVJMU2VhcmNoUGFyYW1zXSlbXVxuXG5leHBvcnQgdHlwZSBJRW50cmllc1JvdzxUIGV4dGVuZHMgSVVybEtleXM+ID0gW1QsIFVSTFtUXV1cblxuZnVuY3Rpb24gX251bWVyYWJsZShsaWIpXG57XG5cdGxldCBkcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGxpYik7XG5cblx0KFtcblx0XHQnaHJlZicsXG5cdFx0J3Byb3RvY29sJyxcblx0XHQndXNlcm5hbWUnLFxuXHRcdCdwYXNzd29yZCcsXG5cdFx0J2hvc3QnLFxuXHRcdCdob3N0bmFtZScsXG5cdFx0J3BvcnQnLFxuXHRcdCdwYXRobmFtZScsXG5cdFx0J3NlYXJjaCcsXG5cdFx0J3NlYXJjaFBhcmFtcycsXG5cdFx0J2hhc2gnLFxuXHRdIGFzIGNvbnN0KVxuXHRcdC5mb3JFYWNoKChuYW1lKSA9PlxuXHRcdHtcblx0XHRcdGlmIChuYW1lIGluIGRzKVxuXHRcdFx0e1xuXHRcdFx0XHRkc1tuYW1lXS5lbnVtZXJhYmxlID0gdHJ1ZTtcblxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobGliLCBuYW1lLCBkc1tuYW1lXSlcblx0XHRcdH1cblx0XHR9KVxuXHQ7XG59XG5cbmV4cG9ydCB0eXBlIElVcmxLZXlzID1cblx0fCAnaHJlZidcblx0fCAndXNlcm5hbWUnXG5cdHwgJ3Bhc3N3b3JkJ1xuXHR8ICdob3N0J1xuXHR8ICdob3N0bmFtZSdcblx0fCAncG9ydCdcblx0fCAncGF0aG5hbWUnXG5cdHwgJ3NlYXJjaCdcblx0fCAnc2VhcmNoUGFyYW1zJ1xuXHR8ICdwcm90b2NvbCdcblx0fCAnaGFzaCdcblx0O1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZFN5bWJvbENvbnRleHQoKTogc3ltYm9sXG57XG5cdGxldCB1ID0gbmV3IFVSTChgaHR0cHM6Ly9sb2NhbGhvc3RgKTtcblxuXHRjb25zdCBTeW1ib2xDb250ZXh0ID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh1KVxuXHRcdC5maWx0ZXIoc3ltID0+IHVbc3ltXS5ob3N0ID09ICdsb2NhbGhvc3QnKVswXVxuXHQ7XG5cblx0cmV0dXJuIFN5bWJvbENvbnRleHQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVVSTE9iamVjdExpa2Vcbntcblx0aHJlZjogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVUkxPYmplY3Rcbntcblx0aHJlZjogc3RyaW5nO1xuXHRwcm90b2NvbDogc3RyaW5nO1xuXHR1c2VybmFtZTogc3RyaW5nO1xuXHRwYXNzd29yZDogc3RyaW5nO1xuXHRob3N0OiBzdHJpbmc7XG5cdGhvc3RuYW1lOiBzdHJpbmc7XG5cdHBvcnQ6IHN0cmluZztcblx0cGF0aG5hbWU6IHN0cmluZztcblx0c2VhcmNoOiBzdHJpbmc7XG5cdHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zO1xuXHRoYXNoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29yZSh1cmw6IElVUkxMaWtlIHwgW0lVUkxMaWtlLCBJVVJMTGlrZT9dLCBiYXNlPzogSVVSTExpa2UpXG57XG5cdGlmIChBcnJheS5pc0FycmF5KHVybCkpXG5cdHtcblx0XHRpZiAoYmFzZSA9PSBudWxsKVxuXHRcdHtcblx0XHRcdFt1cmwsIGJhc2VdID0gdXJsO1xuXHRcdH1cblx0fVxuXG5cdGlmICh1cmwgJiYgdXJsIGluc3RhbmNlb2YgTGF6eVVSTClcblx0e1xuXHRcdHVybCA9IHVybC50b1JlYWxTdHJpbmcoKTtcblx0fVxuXHRlbHNlIGlmICh1cmwgJiYgdXJsIGluc3RhbmNlb2YgVVJMKVxuXHR7XG5cdFx0dXJsID0gdXJsLmhyZWY7XG5cdH1cblx0ZWxzZSBpZiAodXJsICE9IG51bGwgJiYgdHlwZW9mICh1cmwgYXMgSVVSTE9iamVjdExpa2UpLmhyZWYgPT09ICdzdHJpbmcnKVxuXHR7XG5cdFx0dXJsID0gKHVybCBhcyBJVVJMT2JqZWN0TGlrZSkuaHJlZjtcblx0fVxuXHRlbHNlIGlmICh0eXBlb2YgdXJsICE9PSAnc3RyaW5nJylcblx0e1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoYEFyZ3VtZW50ICcke3VybH0nIGlzIG5vdCBhc3NpZ25hYmxlIHRvIHVybCBsaWtlLmApXG5cdH1cblxuXHRsZXQgX3VybDogVVJMO1xuXHRjb25zdCBfaGlkZGVuXzogUGFydGlhbDxVUkw+ID0ge307XG5cblx0aWYgKHR5cGVvZiBiYXNlICE9PSAnc3RyaW5nJyAmJiBiYXNlICE9IG51bGwgJiYgdHlwZW9mIGJhc2UuaHJlZiA9PT0gJ3N0cmluZycpXG5cdHtcblx0XHRiYXNlID0gYmFzZS5ocmVmO1xuXHR9XG5cblx0aWYgKGJhc2UgPT09ICcnKVxuXHR7XG5cdFx0YmFzZSA9IHZvaWQgMDtcblx0fVxuXG5cdHRyeVxuXHR7XG5cdFx0X3VybCA9IG5ldyBVUkwodXJsLCBiYXNlIGFzIHN0cmluZylcblx0fVxuXHRjYXRjaCAoZSlcblx0e1xuXHRcdGxldCBvazogYm9vbGVhbjtcblxuXHRcdGlmICgvSW52YWxpZCBVUkwvLnRlc3QoZS5tZXNzYWdlKSlcblx0XHR7XG5cdFx0XHRpZiAodHlwZW9mIGJhc2UgPT09ICdzdHJpbmcnKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgb2xkID0gYmFzZTtcblx0XHRcdFx0bGV0IHUgPSB1cmxQYXJzZShiYXNlKS8qIGFzIFVSTCAmIHtcblx0XHRcdFx0XHRcdHNldChuYW1lOiBrZXlvZiBVUkwsIHZhbHVlOiBzdHJpbmcpOiB2b2lkXG5cdFx0XHRcdFx0fSovO1xuXG5cdFx0XHRcdGlmICgoXG5cdFx0XHRcdFx0dS5ob3N0ID09PSAnJ1xuXHRcdFx0XHRcdHx8IHUucHJvdG9jb2wgPT09ICcnXG5cdFx0XHRcdCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoIW9sZC5pbmNsdWRlcygnLycpICYmIFtcblx0XHRcdFx0XHRcdHUucHJvdG9jb2wgKyB1Lmhvc3QsXG5cdFx0XHRcdFx0XHR1LnByb3RvY29sICsgdS5wYXRobmFtZSxcblx0XHRcdFx0XHRdLmluY2x1ZGVzKG9sZC50b0xvd2VyQ2FzZSgpKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1ID0gdXJsUGFyc2UoJycpO1xuXG5cdFx0XHRcdFx0XHR1LnNldCgnaG9zdCcsIG9sZCk7XG5cdFx0XHRcdFx0XHR1LnNldCgncHJvdG9jb2wnLCBFTlVNX0ZBS0UucHJvdG9jb2wpO1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3BhdGhuYW1lJywgJycpO1xuXG5cdFx0XHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IEVOVU1fRkFLRS5wcm90b2NvbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodS5ob3N0ID09PSAnJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodS5wYXRobmFtZSAhPSAnJyAmJiAhdS5wYXRobmFtZS5pbmNsdWRlcygnLycpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR1LnNldCgnaG9zdCcsIHUucGF0aG5hbWUpO1xuXHRcdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdob3N0JywgRU5VTV9GQUtFLmhvc3RuYW1lKTtcblxuXHRcdFx0XHRcdFx0XHRfaGlkZGVuXy5ob3N0bmFtZSA9IHUuaG9zdG5hbWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHUucHJvdG9jb2wgPT09ICcnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUuc2V0KCdwcm90b2NvbCcsIEVOVU1fRkFLRS5wcm90b2NvbCk7XG5cdFx0XHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IHUucHJvdG9jb2w7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdGlmICh1LnBhdGhuYW1lICE9PSAnJyAmJiAhdS5wYXRobmFtZS5zdGFydHNXaXRoKCcvJykpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdFx0dS5zZXQoJ3BhdGhuYW1lJywgJy8nICsgdS5wYXRobmFtZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X3VybCA9IG5ldyBVUkwodXJsLCB1LnRvU3RyaW5nKCkpO1xuXG5cdFx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChiYXNlID09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdGJhc2UgPSBgJHtFTlVNX0ZBS0UucHJvdG9jb2x9Ly8ke0VOVU1fRkFLRS5ob3N0bmFtZX1gO1xuXG5cdFx0XHRcdF91cmwgPSBuZXcgVVJMKHVybCwgYmFzZSk7XG5cblx0XHRcdFx0X2hpZGRlbl8ucHJvdG9jb2wgPSBFTlVNX0ZBS0UucHJvdG9jb2w7XG5cdFx0XHRcdF9oaWRkZW5fLmhvc3RuYW1lID0gRU5VTV9GQUtFLmhvc3RuYW1lO1xuXG5cdFx0XHRcdG9rID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIW9rKVxuXHRcdHtcblx0XHRcdHRocm93IGVcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHVybDogX3VybCxcblx0XHRoaWRkZW46IF9oaWRkZW5fLFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlVUkxcbiJdfQ==