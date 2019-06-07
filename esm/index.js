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
export class URLSearchParamsLazy extends URLSearchParams {
    clone() {
        console.dir(this.entries());
        // @ts-ignore
        return new URLSearchParamsLazy(this.entries());
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9saWIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFFSCxPQUFPLFFBQVEsTUFBTSxXQUFXLENBQUM7QUFLakMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTNDLElBQVcsU0FJVjtBQUpELFdBQVcsU0FBUztJQUVuQixvQ0FBdUIsQ0FBQTtJQUN2QiwyQ0FBOEIsQ0FBQTtBQUMvQixDQUFDLEVBSlUsU0FBUyxLQUFULFNBQVMsUUFJbkI7QUFFRCxNQUFNLGFBQWEsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO0FBRTFDLE1BQU0sT0FBTyxPQUFRLFNBQVEsR0FBRztJQUsvQixZQUFZLEdBQXFDLEVBQUUsSUFBZTtRQUVqRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBRXhCLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUU1QixrQkFBa0I7SUFDbkIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BbUJHO0lBRUg7Ozs7OztPQU1HO0lBRUgsSUFBSSxLQUFLO1FBRVIsSUFBSSxhQUFhLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDM0Y7WUFDQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDeEM7UUFFRCxPQUFPLElB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LENBQUM7b0JBRWxDLEVBQUUsR0FBRyxJQUFJLENBQUM7aUJBQ1Y7YUFDRDtpQkFDSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQ3JCO2dCQUNDLElBQUksR0FBRyxHQUFHLDJCQUFrQixLQUFLLGtDQUFrQixFQUFFLENBQUM7Z0JBRXRELElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRTFCLFFBQVEsQ0FBQyxRQUFRLDhCQUFxQixDQUFDO2dCQUN2QyxRQUFRLENBQUMsUUFBUSxxQ0FBcUIsQ0FBQztnQkFFdkMsRUFBRSxHQUFHLElBQUksQ0FBQzthQUNWO1NBQ0Q7UUFFRCxJQUFJLENBQUMsRUFBRSxFQUNQO1lBQ0MsTUFBTSxDQUFDLENBQUE7U0FDUDtLQUNEO0lBRUQsT0FBTztRQUNOLEdBQUcsRUFBRSxJQUFJO1FBQ1QsTUFBTSxFQUFFLFFBQVE7S0FDaEIsQ0FBQTtBQUNGLENBQUM7QUFFRCxlQUFlLE9BQU8sQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIwMTkvNi82LlxuICovXG5cbmltcG9ydCB1cmxQYXJzZSBmcm9tICd1cmwtcGFyc2UnO1xuaW1wb3J0IFN5bWJvbEluc3BlY3QgZnJvbSAnc3ltYm9sLmluc3BlY3QnO1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XG5cbmV4cG9ydCB0eXBlIElVUkxMaWtlID0gc3RyaW5nIHwgVVJMO1xuZXhwb3J0IGNvbnN0IFNZTV9VUkwgPSBTeW1ib2woJ3VybCcpO1xuZXhwb3J0IGNvbnN0IFNZTV9ISURERU4gPSBTeW1ib2woJ2hpZGRlbicpO1xuXG5jb25zdCBlbnVtIEVOVU1fRkFLRVxue1xuXHRwcm90b2NvbCA9ICdmYWtlK2h0dHA6Jyxcblx0aG9zdG5hbWUgPSAndXJsLWZha2UtaG9zdG5hbWUnLFxufVxuXG5jb25zdCBTeW1ib2xDb250ZXh0ID0gZmluZFN5bWJvbENvbnRleHQoKTtcblxuZXhwb3J0IGNsYXNzIExhenlVUkwgZXh0ZW5kcyBVUkwgaW1wbGVtZW50cyBVUkxcbntcblx0cHJvdGVjdGVkIFtTWU1fVVJMXT86IFVSTDtcblx0cHJvdGVjdGVkIFtTWU1fSElEREVOXTogUGFydGlhbDxVUkw+O1xuXG5cdGNvbnN0cnVjdG9yKHVybDogSVVSTExpa2UgfCBbSVVSTExpa2UsIElVUkxMaWtlP10sIGJhc2U/OiBJVVJMTGlrZSlcblx0e1xuXHRcdGxldCB1ID0gX2NvcmUodXJsLCBiYXNlKVxuXG5cdFx0c3VwZXIodS51cmwuaHJlZik7XG5cblx0XHQvL3RoaXNbU1lNX1VSTF0gPSBfdXJsO1xuXHRcdHRoaXNbU1lNX0hJRERFTl0gPSB1LmhpZGRlbjtcblxuXHRcdC8vX251bWVyYWJsZSh0aGlzKVxuXHR9XG5cblx0Lypcblx0W1N5bWJvbEluc3BlY3RdKClcblx0e1xuXHRcdHJldHVybiBgTGF6eVVSTCB7XG4gIGhyZWY6ICcke3RoaXMuaHJlZn0nLFxuICBocmVmOiAnJHt0aGlzLnRvUmVhbFN0cmluZygpfScsXG4gIG9yaWdpbjogJyR7dGhpcy5vcmlnaW59JyxcbiAgcHJvdG9jb2w6ICcke3RoaXMucHJvdG9jb2x9JyxcbiAgdXNlcm5hbWU6ICcke3RoaXMudXNlcm5hbWV9JyxcbiAgcGFzc3dvcmQ6ICcke3RoaXMucGFzc3dvcmR9JyxcbiAgaG9zdDogJyR7dGhpcy5ob3N0fScsXG4gIGhvc3RuYW1lOiAnJHt0aGlzLmhvc3RuYW1lfScsXG4gIHBvcnQ6ICcke3RoaXMucG9ydH0nLFxuICBwYXRobmFtZTogJyR7dGhpcy5wYXRobmFtZX0nLFxuICBzZWFyY2g6ICcke3RoaXMuc2VhcmNofScsXG4gIHNlYXJjaFBhcmFtczogJHt1dGlsLmluc3BlY3QodGhpcy5zZWFyY2hQYXJhbXMpfSxcbiAgaGFzaDogJyR7dGhpcy5oYXNofSdcbn1gO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdFtTeW1ib2xJbnNwZWN0XSgpXG5cdHtcblx0XHRyZXR1cm4gYExhenlVUkwoJHt0aGlzLmhyZWZ9KWA7XG5cdH1cblxuXHQgKi9cblxuXHRnZXQgcGF0aHMoKVxuXHR7XG5cdFx0aWYgKFN5bWJvbENvbnRleHQgIT0gbnVsbCAmJiB0aGlzW1N5bWJvbENvbnRleHRdICYmIEFycmF5LmlzQXJyYXkodGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gdGhpc1tTeW1ib2xDb250ZXh0XS5wYXRoLnNsaWNlKCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMucGF0aG5hbWVcblx0XHRcdC5zcGxpdCgnLycpXG5cdFx0XHQuZmlsdGVyKHYgPT4gdiAhPSAnJylcblx0fVxuXG5cdGZha2VFeGlzdHMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuZmFrZUtleXMoKS5sZW5ndGhcblx0fVxuXG5cdGZha2VLZXlzKClcblx0e1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzW1NZTV9ISURERU5dKVxuXHR9XG5cblx0ZmFrZUVudHJpZXMoKVxuXHR7XG5cdFx0cmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXNbU1lNX0hJRERFTl0pXG5cdH1cblxuXHQvKipcblx0ICogZ2V0IHRoZSByZWFsIHVybCAocmVtb3ZlIGZha2UgdmFsdWUpXG5cdCAqIHRocm93IGVycm9yIGlmIG5vdCBhIHZhbGlkIHVybFxuXHQgKlxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0dG9SZWFsU3RyaW5nKClcblx0e1xuXHRcdGxldCBrcyA9IHRoaXMuZmFrZUVudHJpZXMoKTtcblxuXHRcdGlmIChrcy5sZW5ndGgpXG5cdFx0e1xuXHRcdFx0bGV0IHUgPSB1cmxQYXJzZSh0aGlzLmhyZWYpO1xuXG5cdFx0XHRrc1xuXHRcdFx0XHQuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT5cblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlmICh1W25hbWVdID09PSB2YWx1ZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1LnNldChuYW1lIGFzIGFueSwgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdDtcblxuXHRcdFx0aWYgKHUuaG9zdCA9PT0gJycpXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh1LnVzZXJuYW1lICE9PSAnJyB8fCB1LnBhc3N3b3JkICE9PSAnJyB8fCB1LnBvcnQgIT09ICcnIHx8IHUucHJvdG9jb2wgIT09ICcnKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBVUkwgJHt1fWApXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IHMgPSB1LnRvU3RyaW5nKCk7XG5cblx0XHRcdGlmICh1LnByb3RvY29sID09PSAnJyAmJiB1Lmhvc3QgPT09ICcnKVxuXHRcdFx0e1xuXHRcdFx0XHRzID0gcy5yZXBsYWNlKC9eXFwvXFwvLywgJycpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmhyZWY7XG5cdH1cblxuXHR0b1N0cmluZygpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5ocmVmO1xuXHR9XG5cblx0Lypcblx0dG9KU09OKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnRvSlNPTigpO1xuXHR9XG5cdCAqL1xuXG5cdC8qXG5cdGdldCBoYXNoKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhhc2hcblx0fVxuXG5cdHNldCBoYXNoKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5oYXNoID0gdmFsdWVcblx0fVxuXG5cdGdldCBob3N0KClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLmhvc3Rcblx0fVxuXG5cdHNldCBob3N0KHZhbHVlKVxuXHR7XG5cdFx0ZGVsZXRlIHRoaXNbU1lNX0hJRERFTl0uaG9zdG5hbWU7XG5cblx0XHR0aGlzW1NZTV9VUkxdLmhvc3QgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBob3N0bmFtZSgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIuaG9zdG5hbWVcblx0fVxuXG5cdHNldCBob3N0bmFtZSh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLmhvc3RuYW1lO1xuXG5cdFx0c3VwZXIuaG9zdG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IGhyZWYoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0uaHJlZlxuXHR9XG5cblx0c2V0IGhyZWYodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLmhyZWYgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IG9yaWdpbigpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5vcmlnaW5cblx0fVxuXG5cdGdldCBwYXNzd29yZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5wYXNzd29yZFxuXHR9XG5cblx0c2V0IHBhc3N3b3JkKHZhbHVlKVxuXHR7XG5cdFx0dGhpc1tTWU1fVVJMXS5wYXNzd29yZCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgcGF0aG5hbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucGF0aG5hbWVcblx0fVxuXG5cdHNldCBwYXRobmFtZSh2YWx1ZSlcblx0e1xuXHRcdHRoaXNbU1lNX1VSTF0ucGF0aG5hbWUgPSB2YWx1ZVxuXHR9XG5cblx0Z2V0IHBvcnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXNbU1lNX1VSTF0ucG9ydFxuXHR9XG5cblx0c2V0IHBvcnQodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnBvcnQgPSB2YWx1ZVxuXHR9XG5cdCAqL1xuXG5cdGdldCBwcm90b2NvbCgpXG5cdHtcblx0XHRyZXR1cm4gc3VwZXIucHJvdG9jb2xcblx0fVxuXG5cdHNldCBwcm90b2NvbCh2YWx1ZSlcblx0e1xuXHRcdGRlbGV0ZSB0aGlzW1NZTV9ISURERU5dLnByb3RvY29sO1xuXG5cdFx0c3VwZXIucHJvdG9jb2wgPSB2YWx1ZVxuXHR9XG5cblx0Lypcblx0Z2V0IHNlYXJjaCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpc1tTWU1fVVJMXS5zZWFyY2hcblx0fVxuXG5cdHNldCBzZWFyY2godmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnNlYXJjaCA9IHZhbHVlXG5cdH1cblxuXHRnZXQgc2VhcmNoUGFyYW1zKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnNlYXJjaFBhcmFtc1xuXHR9XG5cblx0Z2V0IHVzZXJuYW1lKClcblx0e1xuXHRcdHJldHVybiB0aGlzW1NZTV9VUkxdLnVzZXJuYW1lXG5cdH1cblxuXHRzZXQgdXNlcm5hbWUodmFsdWUpXG5cdHtcblx0XHR0aGlzW1NZTV9VUkxdLnVzZXJuYW1lID0gdmFsdWVcblx0fVxuXG5cdCAqL1xuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdGdldCBzY2hlbWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucHJvdG9jb2xcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgcHJvdG9jb2xcblx0ICovXG5cdHNldCBzY2hlbWUodmFsdWU6IHN0cmluZylcblx0e1xuXHRcdHRoaXMucHJvdG9jb2wgPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0Z2V0IGZyYWdtZW50KClcblx0e1xuXHRcdHJldHVybiB0aGlzLmhhc2hcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgaGFzaFxuXHQgKi9cblx0c2V0IGZyYWdtZW50KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLmhhc2ggPSB2YWx1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAYWxpYXMgc2VhcmNoXG5cdCAqL1xuXHRnZXQgcXVlcnkoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuc2VhcmNoXG5cdH1cblxuXHQvKipcblx0ICogQGFsaWFzIHNlYXJjaFxuXHQgKi9cblx0c2V0IHF1ZXJ5KHZhbHVlOiBzdHJpbmcpXG5cdHtcblx0XHR0aGlzLnNlYXJjaCA9IHZhbHVlO1xuXHR9XG5cblx0LyoqXG5cdCAqIGNsb25lIGludG8gYSBvYmplY3Rcblx0ICpcblx0ICogQHJldHVybnMge0lVUkxPYmplY3R9XG5cdCAqL1xuXHR0b09iamVjdCh1cmw6IFVSTCk6IElVUkxPYmplY3Rcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLnRvT2JqZWN0KHVybClcblx0fVxuXG5cdHN0YXRpYyB0b09iamVjdCh1cmw6IFVSTCk6IElVUkxPYmplY3Rcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKS5yZWR1Y2UoKGEsIGIpID0+XG5cdFx0e1xuXHRcdFx0aWYgKGIgPT09ICdzZWFyY2hQYXJhbXMnKVxuXHRcdFx0e1xuXHRcdFx0XHRhW2JdID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh1cmwuc2VhcmNoUGFyYW1zLmVudHJpZXMoKSBhcyBhbnkgYXMgW3N0cmluZywgc3RyaW5nXVtdKVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHRhW2JdID0gdGhpc1tiXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFcblx0XHR9LCB7fSBhcyBJVVJMT2JqZWN0KVxuXHR9XG5cblx0a2V5cygpOiBJVXJsS2V5c1tdXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKClcblx0fVxuXG5cdHZhbHVlcygpXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC52YWx1ZXModGhpcylcblx0fVxuXG5cdGVudHJpZXMoKTogSUVudHJpZXNcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmVudHJpZXModGhpcylcblx0fVxuXG5cdHN0YXRpYyBrZXlzKCk6IElVcmxLZXlzW11cblx0e1xuXHRcdHJldHVybiBbXG5cdFx0XHQnaHJlZicsXG5cdFx0XHQncHJvdG9jb2wnLFxuXHRcdFx0J3VzZXJuYW1lJyxcblx0XHRcdCdwYXNzd29yZCcsXG5cdFx0XHQnaG9zdCcsXG5cdFx0XHQnaG9zdG5hbWUnLFxuXHRcdFx0J3BvcnQnLFxuXHRcdFx0J3BhdGhuYW1lJyxcblx0XHRcdCdzZWFyY2gnLFxuXHRcdFx0J3NlYXJjaFBhcmFtcycsXG5cdFx0XHQnaGFzaCcsXG5cdFx0XVxuXHR9XG5cblx0c3RhdGljIHZhbHVlcyh1cmw6IFVSTClcblx0e1xuXHRcdHJldHVybiBMYXp5VVJMLmtleXMoKS5tYXAobmFtZSA9PiB1cmxbbmFtZV0pXG5cdH1cblxuXHRzdGF0aWMgZW50cmllcyh1cmw6IFVSTCk6IElFbnRyaWVzXG5cdHtcblx0XHRyZXR1cm4gTGF6eVVSTC5rZXlzKCkubWFwKG5hbWUgPT4gW25hbWUsIHVybFtuYW1lXV0pIGFzIElFbnRyaWVzXG5cdH1cblxuXHRjcmVhdGVVUkxTZWFyY2hQYXJhbXMoaW5pdD86IHN0cmluZ1tdW10gfCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHwgc3RyaW5nIHwgVVJMU2VhcmNoUGFyYW1zIHwgVVJMKVxuXHR7XG5cdFx0aWYgKGluaXQgaW5zdGFuY2VvZiBVUkwpXG5cdFx0e1xuXHRcdFx0aW5pdCA9IGluaXQuc2VhcmNoUGFyYW1zO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKGluaXQpXG5cdH1cblxufVxuXG5leHBvcnQgdHlwZSBJRW50cmllcyA9IChbXCJoYXNoXCIgfCBcImhvc3RcIiB8IFwiaG9zdG5hbWVcIiB8IFwiaHJlZlwiIHwgXCJwYXNzd29yZFwiIHwgXCJwYXRobmFtZVwiIHwgXCJwb3J0XCIgfCBcInByb3RvY29sXCIgfCBcInNlYXJjaFwiIHwgXCJ1c2VybmFtZVwiLCBzdHJpbmddIHwgW1wic2VhcmNoUGFyYW1zXCIsIFVSTFNlYXJjaFBhcmFtc10pW11cblxuZXhwb3J0IHR5cGUgSUVudHJpZXNSb3c8VCBleHRlbmRzIElVcmxLZXlzPiA9IFtULCBVUkxbVF1dXG5cbmZ1bmN0aW9uIF9udW1lcmFibGUobGliKVxue1xuXHRsZXQgZHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhsaWIpO1xuXG5cdChbXG5cdFx0J2hyZWYnLFxuXHRcdCdwcm90b2NvbCcsXG5cdFx0J3VzZXJuYW1lJyxcblx0XHQncGFzc3dvcmQnLFxuXHRcdCdob3N0Jyxcblx0XHQnaG9zdG5hbWUnLFxuXHRcdCdwb3J0Jyxcblx0XHQncGF0aG5hbWUnLFxuXHRcdCdzZWFyY2gnLFxuXHRcdCdzZWFyY2hQYXJhbXMnLFxuXHRcdCdoYXNoJyxcblx0XSBhcyBjb25zdClcblx0XHQuZm9yRWFjaCgobmFtZSkgPT5cblx0XHR7XG5cdFx0XHRpZiAobmFtZSBpbiBkcylcblx0XHRcdHtcblx0XHRcdFx0ZHNbbmFtZV0uZW51bWVyYWJsZSA9IHRydWU7XG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGxpYiwgbmFtZSwgZHNbbmFtZV0pXG5cdFx0XHR9XG5cdFx0fSlcblx0O1xufVxuXG5leHBvcnQgdHlwZSBJVXJsS2V5cyA9XG5cdHwgJ2hyZWYnXG5cdHwgJ3VzZXJuYW1lJ1xuXHR8ICdwYXNzd29yZCdcblx0fCAnaG9zdCdcblx0fCAnaG9zdG5hbWUnXG5cdHwgJ3BvcnQnXG5cdHwgJ3BhdGhuYW1lJ1xuXHR8ICdzZWFyY2gnXG5cdHwgJ3NlYXJjaFBhcmFtcydcblx0fCAncHJvdG9jb2wnXG5cdHwgJ2hhc2gnXG5cdDtcblxuZXhwb3J0IGNsYXNzIFVSTFNlYXJjaFBhcmFtc0xhenkgZXh0ZW5kcyBVUkxTZWFyY2hQYXJhbXMgaW1wbGVtZW50cyBVUkxTZWFyY2hQYXJhbXNcbntcblx0Y2xvbmUoKTogVVJMU2VhcmNoUGFyYW1zTGF6eVxuXHR7XG5cdFx0Y29uc29sZS5kaXIodGhpcy5lbnRyaWVzKCkpO1xuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRyZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtc0xhenkodGhpcy5lbnRyaWVzKCkpXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRTeW1ib2xDb250ZXh0KCk6IHN5bWJvbFxue1xuXHRsZXQgdSA9IG5ldyBVUkwoYGh0dHBzOi8vbG9jYWxob3N0YCk7XG5cblx0Y29uc3QgU3ltYm9sQ29udGV4dCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModSlcblx0XHQuZmlsdGVyKHN5bSA9PiB1W3N5bV0uaG9zdCA9PSAnbG9jYWxob3N0JylbMF1cblx0O1xuXG5cdHJldHVybiBTeW1ib2xDb250ZXh0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElVUkxPYmplY3Rcbntcblx0aHJlZjogc3RyaW5nO1xuXHRwcm90b2NvbDogc3RyaW5nO1xuXHR1c2VybmFtZTogc3RyaW5nO1xuXHRwYXNzd29yZDogc3RyaW5nO1xuXHRob3N0OiBzdHJpbmc7XG5cdGhvc3RuYW1lOiBzdHJpbmc7XG5cdHBvcnQ6IHN0cmluZztcblx0cGF0aG5hbWU6IHN0cmluZztcblx0c2VhcmNoOiBzdHJpbmc7XG5cdHNlYXJjaFBhcmFtczogVVJMU2VhcmNoUGFyYW1zO1xuXHRoYXNoOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29yZSh1cmw6IElVUkxMaWtlIHwgW0lVUkxMaWtlLCBJVVJMTGlrZT9dLCBiYXNlPzogSVVSTExpa2UpXG57XG5cdGlmIChBcnJheS5pc0FycmF5KHVybCkpXG5cdHtcblx0XHRpZiAoYmFzZSA9PSBudWxsKVxuXHRcdHtcblx0XHRcdFt1cmwsIGJhc2VdID0gdXJsO1xuXHRcdH1cblx0fVxuXG5cdGlmICh1cmwgJiYgdXJsIGluc3RhbmNlb2YgVVJMKVxuXHR7XG5cdFx0dXJsID0gdXJsLmhyZWY7XG5cdH1cblx0ZWxzZSBpZiAodHlwZW9mIHVybCAhPT0gJ3N0cmluZycpXG5cdHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBBcmd1bWVudCAnJHt1cmx9JyBpcyBub3QgYXNzaWduYWJsZSB0byB1cmwgbGlrZS5gKVxuXHR9XG5cblx0bGV0IF91cmw6IFVSTDtcblx0Y29uc3QgX2hpZGRlbl86IFBhcnRpYWw8VVJMPiA9IHt9O1xuXG5cdGlmIChiYXNlID09PSAnJylcblx0e1xuXHRcdGJhc2UgPSB2b2lkIDA7XG5cdH1cblxuXHR0cnlcblx0e1xuXHRcdF91cmwgPSBuZXcgVVJMKHVybCwgYmFzZSlcblx0fVxuXHRjYXRjaCAoZSlcblx0e1xuXHRcdGxldCBvazogYm9vbGVhbjtcblxuXHRcdGlmICgvSW52YWxpZCBVUkwvLnRlc3QoZS5tZXNzYWdlKSlcblx0XHR7XG5cdFx0XHRpZiAodHlwZW9mIGJhc2UgPT09ICdzdHJpbmcnKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgb2xkID0gYmFzZTtcblx0XHRcdFx0bGV0IHUgPSB1cmxQYXJzZShiYXNlKS8qIGFzIFVSTCAmIHtcblx0XHRcdFx0XHRcdHNldChuYW1lOiBrZXlvZiBVUkwsIHZhbHVlOiBzdHJpbmcpOiB2b2lkXG5cdFx0XHRcdFx0fSovO1xuXG5cdFx0XHRcdGlmICgoXG5cdFx0XHRcdFx0dS5ob3N0ID09PSAnJ1xuXHRcdFx0XHRcdHx8IHUucHJvdG9jb2wgPT09ICcnXG5cdFx0XHRcdCkpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZiAoIW9sZC5pbmNsdWRlcygnLycpICYmIFtcblx0XHRcdFx0XHRcdHUucHJvdG9jb2wgKyB1Lmhvc3QsXG5cdFx0XHRcdFx0XHR1LnByb3RvY29sICsgdS5wYXRobmFtZSxcblx0XHRcdFx0XHRdLmluY2x1ZGVzKG9sZC50b0xvd2VyQ2FzZSgpKSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHR1ID0gdXJsUGFyc2UoJycpO1xuXG5cdFx0XHRcdFx0XHR1LnNldCgnaG9zdCcsIG9sZCk7XG5cdFx0XHRcdFx0XHR1LnNldCgncHJvdG9jb2wnLCBFTlVNX0ZBS0UucHJvdG9jb2wpO1xuXHRcdFx0XHRcdFx0dS5zZXQoJ3BhdGhuYW1lJywgJycpO1xuXG5cdFx0XHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IEVOVU1fRkFLRS5wcm90b2NvbDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodS5ob3N0ID09PSAnJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodS5wYXRobmFtZSAhPSAnJyAmJiAhdS5wYXRobmFtZS5pbmNsdWRlcygnLycpKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHR1LnNldCgnaG9zdCcsIHUucGF0aG5hbWUpO1xuXHRcdFx0XHRcdFx0XHR1LnNldCgncGF0aG5hbWUnLCAnJyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHUuc2V0KCdob3N0JywgRU5VTV9GQUtFLmhvc3RuYW1lKTtcblxuXHRcdFx0XHRcdFx0XHRfaGlkZGVuXy5ob3N0bmFtZSA9IHUuaG9zdG5hbWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHUucHJvdG9jb2wgPT09ICcnKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHUuc2V0KCdwcm90b2NvbCcsIEVOVU1fRkFLRS5wcm90b2NvbCk7XG5cdFx0XHRcdFx0XHRfaGlkZGVuXy5wcm90b2NvbCA9IHUucHJvdG9jb2w7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdGlmICh1LnBhdGhuYW1lICE9PSAnJyAmJiAhdS5wYXRobmFtZS5zdGFydHNXaXRoKCcvJykpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRcdFx0dS5zZXQoJ3BhdGhuYW1lJywgJy8nICsgdS5wYXRobmFtZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0X3VybCA9IG5ldyBVUkwodXJsLCB1LnRvU3RyaW5nKCkpO1xuXG5cdFx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChiYXNlID09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdGJhc2UgPSBgJHtFTlVNX0ZBS0UucHJvdG9jb2x9Ly8ke0VOVU1fRkFLRS5ob3N0bmFtZX1gO1xuXG5cdFx0XHRcdF91cmwgPSBuZXcgVVJMKHVybCwgYmFzZSk7XG5cblx0XHRcdFx0X2hpZGRlbl8ucHJvdG9jb2wgPSBFTlVNX0ZBS0UucHJvdG9jb2w7XG5cdFx0XHRcdF9oaWRkZW5fLmhvc3RuYW1lID0gRU5VTV9GQUtFLmhvc3RuYW1lO1xuXG5cdFx0XHRcdG9rID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIW9rKVxuXHRcdHtcblx0XHRcdHRocm93IGVcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdHVybDogX3VybCxcblx0XHRoaWRkZW46IF9oaWRkZW5fLFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlVUkxcbiJdfQ==