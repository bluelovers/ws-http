"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const forwarded_parse_1 = __importDefault(require("forwarded-parse"));
const util_1 = require("./util");
function originalUrl(req) {
    const raw = req.originalUrl || req.url;
    const url = url_1.parse(raw || '');
    const secure = req.secure || (req.connection && req.connection.encrypted);
    const result = {
        raw: raw,
    };
    let host;
    if (req.headers.forwarded) {
        try {
            // Always choose the original (first) Forwarded pair in case the request
            // passed through multiple proxies
            let forwarded = forwarded_parse_1.default(util_1.getFirstHeader(req, 'forwarded'))[0];
            host = util_1.parsePartialURL(forwarded.host);
            if (forwarded.for) {
                const conn = forwarded.for.split(']'); // in case of IPv6 addr: [2001:db8:cafe::17]:1337
                const port = conn[conn.length - 1].split(':')[1];
                // @ts-ignore
                if (port)
                    host.port = Number(port);
            }
            if (forwarded.proto)
                host.protocol = forwarded.proto + ':';
        }
        catch (e) { }
    }
    else if (req.headers['x-forwarded-host']) {
        host = util_1.parsePartialURL(util_1.getFirstHeader(req, 'x-forwarded-host'));
    }
    if (!host) {
        if (typeof req.headers.host === 'string') {
            host = util_1.parsePartialURL(req.headers.host);
        }
        else {
            host = {};
        }
    }
    // protocol
    if (url.protocol) {
        result.protocol = url.protocol;
    }
    else if (req.headers['x-forwarded-proto']) {
        result.protocol = util_1.getFirstHeader(req, 'x-forwarded-proto') + ':';
    }
    else if (req.headers['x-forwarded-protocol']) {
        result.protocol = util_1.getFirstHeader(req, 'x-forwarded-protocol') + ':';
    }
    else if (req.headers['x-url-scheme']) {
        result.protocol = util_1.getFirstHeader(req, 'x-url-scheme') + ':';
    }
    else if (req.headers['front-end-https']) {
        result.protocol = util_1.getFirstHeader(req, 'front-end-https') === 'on'
            ? 'https:'
            : 'http:';
    }
    else if (req.headers['x-forwarded-ssl']) {
        result.protocol = util_1.getFirstHeader(req, 'x-forwarded-ssl') === 'on'
            ? 'https:'
            : 'http:';
    }
    else if (host.protocol) {
        result.protocol = host.protocol;
    }
    else if (secure) {
        result.protocol = 'https:';
    }
    else {
        result.protocol = 'http:';
    }
    // hostname
    if (url.hostname) {
        result.hostname = url.hostname;
    }
    else if (host.hostname)
        result.hostname = host.hostname;
    // fix for IPv6 literal bug in legacy url - see https://github.com/watson/original-url/issues/3
    if (util_1.isIPv6(result.hostname))
        result.hostname = '[' + result.hostname + ']';
    // port
    if (url.port) {
        result.port = Number(url.port);
    }
    else if (req.headers['x-forwarded-port']) {
        result.port = Number(util_1.getFirstHeader(req, 'x-forwarded-port'));
    }
    else if (host.port)
        result.port = Number(host.port);
    if (result.hostname) {
        result.host = result.hostname + (host.port ? ':' + host.port : '');
    }
    // pathname
    if (url.pathname) {
        result.pathname = url.pathname;
    }
    else if (host.pathname)
        result.pathname = host.pathname; // TODO: Consider if this should take priority over url.pathname
    // search
    if (url.search) {
        result.search = url.search;
    }
    else if (host.search)
        result.search = host.search; // TODO: Consider if this shoudl take priority over uri.search
    // hash
    if (host.hash)
        result.hash = host.hash;
    // full
    if (result.protocol && result.hostname) {
        result.full = result.protocol + '//' + result.hostname;
        if (result.port)
            result.full += ':' + result.port;
        if (result.pathname)
            result.full += result.pathname;
        if (result.search)
            result.full += result.search;
        if (result.hash)
            result.full += result.hash;
    }
    return result;
}
exports.originalUrl = originalUrl;
exports.default = originalUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZCQUE0RDtBQUM1RCxzRUFBNkM7QUFDN0MsaUNBQWlFO0FBa0JqRSxTQUFnQixXQUFXLENBQUMsR0FBRztJQUU5QixNQUFNLEdBQUcsR0FBVyxHQUFHLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUE7SUFDOUMsTUFBTSxHQUFHLEdBQUcsV0FBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUMvQixNQUFNLE1BQU0sR0FBWSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2xGLE1BQU0sTUFBTSxHQUFZO1FBQ3ZCLEdBQUcsRUFBRSxHQUFHO0tBQ0QsQ0FBQTtJQUNSLElBQUksSUFBd0IsQ0FBQTtJQUU1QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN6QjtRQUNDLElBQ0E7WUFDQyx3RUFBd0U7WUFDeEUsa0NBQWtDO1lBQ2xDLElBQUksU0FBUyxHQUFJLHlCQUFjLENBQUMscUJBQWMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBSzdELENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDTixJQUFJLEdBQUcsc0JBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEMsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUNqQjtnQkFDQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLGlEQUFpRDtnQkFDdkYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNoRCxhQUFh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QTtJQUV0QyxPQUFPO0lBQ1AsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQ3RDO1FBQ0MsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQ3RELElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ2pELElBQUksTUFBTSxDQUFDLFFBQVE7WUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDbkQsSUFBSSxNQUFNLENBQUMsTUFBTTtZQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQTtRQUMvQyxJQUFJLE1BQU0sQ0FBQyxJQUFJO1lBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFBO0tBQzNDO0lBRUQsT0FBTyxNQUFNLENBQUE7QUFDZCxDQUFDO0FBcEpELGtDQW9KQztBQUVELGtCQUFlLFdBQVcsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBhcnNlIGFzIHBhcnNlVXJsLCBVcmxXaXRoU3RyaW5nUXVlcnkgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHBhcnNlRm9yd2FyZGVkIGZyb20gJ2ZvcndhcmRlZC1wYXJzZSc7XG5pbXBvcnQgeyBwYXJzZVBhcnRpYWxVUkwsIGdldEZpcnN0SGVhZGVyLCBpc0lQdjYgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSZXN1bHRcbntcblx0cmF3OiBzdHJpbmc7XG5cdHByb3RvY29sOiBzdHJpbmcgfCAnaHR0cHM6JyB8ICdodHRwOic7XG5cdC8qKlxuXHQgKiBob3N0bmFtZSArIHBvcnRcblx0ICovXG5cdGhvc3Q6IHN0cmluZztcblx0aG9zdG5hbWU6IHN0cmluZztcblx0cG9ydDogbnVtYmVyO1xuXHRwYXRobmFtZTogc3RyaW5nO1xuXHRzZWFyY2g6IHN0cmluZztcblx0aGFzaDogc3RyaW5nO1xuXHRmdWxsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmlnaW5hbFVybChyZXEpXG57XG5cdGNvbnN0IHJhdzogc3RyaW5nID0gcmVxLm9yaWdpbmFsVXJsIHx8IHJlcS51cmxcblx0Y29uc3QgdXJsID0gcGFyc2VVcmwocmF3IHx8ICcnKVxuXHRjb25zdCBzZWN1cmU6IGJvb2xlYW4gPSByZXEuc2VjdXJlIHx8IChyZXEuY29ubmVjdGlvbiAmJiByZXEuY29ubmVjdGlvbi5lbmNyeXB0ZWQpXG5cdGNvbnN0IHJlc3VsdDogSVJlc3VsdCA9IHtcblx0XHRyYXc6IHJhdyxcblx0fSBhcyBhbnlcblx0bGV0IGhvc3Q6IFVybFdpdGhTdHJpbmdRdWVyeVxuXG5cdGlmIChyZXEuaGVhZGVycy5mb3J3YXJkZWQpXG5cdHtcblx0XHR0cnlcblx0XHR7XG5cdFx0XHQvLyBBbHdheXMgY2hvb3NlIHRoZSBvcmlnaW5hbCAoZmlyc3QpIEZvcndhcmRlZCBwYWlyIGluIGNhc2UgdGhlIHJlcXVlc3Rcblx0XHRcdC8vIHBhc3NlZCB0aHJvdWdoIG11bHRpcGxlIHByb3hpZXNcblx0XHRcdGxldCBmb3J3YXJkZWQgPSAocGFyc2VGb3J3YXJkZWQoZ2V0Rmlyc3RIZWFkZXIocmVxLCAnZm9yd2FyZGVkJykpIGFzIFt7XG5cdFx0XHRcdGZvcjogc3RyaW5nLFxuXHRcdFx0XHRieTogc3RyaW5nLFxuXHRcdFx0XHRwcm90bzogc3RyaW5nLFxuXHRcdFx0XHRob3N0OiBzdHJpbmdcblx0XHRcdH1dKVswXVxuXHRcdFx0aG9zdCA9IHBhcnNlUGFydGlhbFVSTChmb3J3YXJkZWQuaG9zdClcblx0XHRcdGlmIChmb3J3YXJkZWQuZm9yKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zdCBjb25uID0gZm9yd2FyZGVkLmZvci5zcGxpdCgnXScpIC8vIGluIGNhc2Ugb2YgSVB2NiBhZGRyOiBbMjAwMTpkYjg6Y2FmZTo6MTddOjEzMzdcblx0XHRcdFx0Y29uc3QgcG9ydCA9IGNvbm5bY29ubi5sZW5ndGggLSAxXS5zcGxpdCgnOicpWzFdXG5cdFx0XHRcdC8vIEB0cy1pZ25vcmVcblx0XHRcdFx0aWYgKHBvcnQpIGhvc3QucG9ydCA9IE51bWJlcihwb3J0KVxuXHRcdFx0fVxuXHRcdFx0aWYgKGZvcndhcmRlZC5wcm90bykgaG9zdC5wcm90b2NvbCA9IGZvcndhcmRlZC5wcm90byArICc6J1xuXHRcdH1cblx0XHRjYXRjaCAoZSlcblx0XHR7fVxuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1ob3N0J10pXG5cdHtcblx0XHRob3N0ID0gcGFyc2VQYXJ0aWFsVVJMKGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtZm9yd2FyZGVkLWhvc3QnKSlcblx0fVxuXG5cdGlmICghaG9zdClcblx0e1xuXHRcdGlmICh0eXBlb2YgcmVxLmhlYWRlcnMuaG9zdCA9PT0gJ3N0cmluZycpXG5cdFx0e1xuXHRcdFx0aG9zdCA9IHBhcnNlUGFydGlhbFVSTChyZXEuaGVhZGVycy5ob3N0KVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0aG9zdCA9IHt9IGFzIGFueVxuXHRcdH1cblx0fVxuXG5cdC8vIHByb3RvY29sXG5cdGlmICh1cmwucHJvdG9jb2wpXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSB1cmwucHJvdG9jb2xcblx0fVxuXHRlbHNlIGlmIChyZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcHJvdG8nXSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtZm9yd2FyZGVkLXByb3RvJykgKyAnOidcblx0fVxuXHRlbHNlIGlmIChyZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcHJvdG9jb2wnXSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtZm9yd2FyZGVkLXByb3RvY29sJykgKyAnOidcblx0fVxuXHRlbHNlIGlmIChyZXEuaGVhZGVyc1sneC11cmwtc2NoZW1lJ10pXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSBnZXRGaXJzdEhlYWRlcihyZXEsICd4LXVybC1zY2hlbWUnKSArICc6J1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWydmcm9udC1lbmQtaHR0cHMnXSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGdldEZpcnN0SGVhZGVyKHJlcSwgJ2Zyb250LWVuZC1odHRwcycpID09PSAnb24nXG5cdFx0XHQ/ICdodHRwczonXG5cdFx0XHQ6ICdodHRwOidcblx0fVxuXHRlbHNlIGlmIChyZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtc3NsJ10pXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSBnZXRGaXJzdEhlYWRlcihyZXEsICd4LWZvcndhcmRlZC1zc2wnKSA9PT0gJ29uJ1xuXHRcdFx0PyAnaHR0cHM6J1xuXHRcdFx0OiAnaHR0cDonXG5cdH1cblx0ZWxzZSBpZiAoaG9zdC5wcm90b2NvbClcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGhvc3QucHJvdG9jb2xcblx0fVxuXHRlbHNlIGlmIChzZWN1cmUpXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSAnaHR0cHM6J1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9ICdodHRwOidcblx0fVxuXG5cdC8vIGhvc3RuYW1lXG5cdGlmICh1cmwuaG9zdG5hbWUpXG5cdHtcblx0XHRyZXN1bHQuaG9zdG5hbWUgPSB1cmwuaG9zdG5hbWVcblx0fVxuXHRlbHNlIGlmIChob3N0Lmhvc3RuYW1lKSByZXN1bHQuaG9zdG5hbWUgPSBob3N0Lmhvc3RuYW1lXG5cblx0Ly8gZml4IGZvciBJUHY2IGxpdGVyYWwgYnVnIGluIGxlZ2FjeSB1cmwgLSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dhdHNvbi9vcmlnaW5hbC11cmwvaXNzdWVzLzNcblx0aWYgKGlzSVB2NihyZXN1bHQuaG9zdG5hbWUpKSByZXN1bHQuaG9zdG5hbWUgPSAnWycgKyByZXN1bHQuaG9zdG5hbWUgKyAnXSdcblxuXHQvLyBwb3J0XG5cdGlmICh1cmwucG9ydClcblx0e1xuXHRcdHJlc3VsdC5wb3J0ID0gTnVtYmVyKHVybC5wb3J0KVxuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1wb3J0J10pXG5cdHtcblx0XHRyZXN1bHQucG9ydCA9IE51bWJlcihnZXRGaXJzdEhlYWRlcihyZXEsICd4LWZvcndhcmRlZC1wb3J0JykpXG5cdH1cblx0ZWxzZSBpZiAoaG9zdC5wb3J0KSByZXN1bHQucG9ydCA9IE51bWJlcihob3N0LnBvcnQpXG5cblx0aWYgKHJlc3VsdC5ob3N0bmFtZSlcblx0e1xuXHRcdHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lICsgKGhvc3QucG9ydCA/ICc6JyArIGhvc3QucG9ydCA6ICcnKTtcblx0fVxuXG5cdC8vIHBhdGhuYW1lXG5cdGlmICh1cmwucGF0aG5hbWUpXG5cdHtcblx0XHRyZXN1bHQucGF0aG5hbWUgPSB1cmwucGF0aG5hbWVcblx0fVxuXHRlbHNlIGlmIChob3N0LnBhdGhuYW1lKSByZXN1bHQucGF0aG5hbWUgPSBob3N0LnBhdGhuYW1lIC8vIFRPRE86IENvbnNpZGVyIGlmIHRoaXMgc2hvdWxkIHRha2UgcHJpb3JpdHkgb3ZlciB1cmwucGF0aG5hbWVcblxuXHQvLyBzZWFyY2hcblx0aWYgKHVybC5zZWFyY2gpXG5cdHtcblx0XHRyZXN1bHQuc2VhcmNoID0gdXJsLnNlYXJjaFxuXHR9XG5cdGVsc2UgaWYgKGhvc3Quc2VhcmNoKSByZXN1bHQuc2VhcmNoID0gaG9zdC5zZWFyY2ggLy8gVE9ETzogQ29uc2lkZXIgaWYgdGhpcyBzaG91ZGwgdGFrZSBwcmlvcml0eSBvdmVyIHVyaS5zZWFyY2hcblxuXHQvLyBoYXNoXG5cdGlmIChob3N0Lmhhc2gpIHJlc3VsdC5oYXNoID0gaG9zdC5oYXNoXG5cblx0Ly8gZnVsbFxuXHRpZiAocmVzdWx0LnByb3RvY29sICYmIHJlc3VsdC5ob3N0bmFtZSlcblx0e1xuXHRcdHJlc3VsdC5mdWxsID0gcmVzdWx0LnByb3RvY29sICsgJy8vJyArIHJlc3VsdC5ob3N0bmFtZVxuXHRcdGlmIChyZXN1bHQucG9ydCkgcmVzdWx0LmZ1bGwgKz0gJzonICsgcmVzdWx0LnBvcnRcblx0XHRpZiAocmVzdWx0LnBhdGhuYW1lKSByZXN1bHQuZnVsbCArPSByZXN1bHQucGF0aG5hbWVcblx0XHRpZiAocmVzdWx0LnNlYXJjaCkgcmVzdWx0LmZ1bGwgKz0gcmVzdWx0LnNlYXJjaFxuXHRcdGlmIChyZXN1bHQuaGFzaCkgcmVzdWx0LmZ1bGwgKz0gcmVzdWx0Lmhhc2hcblx0fVxuXG5cdHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3JpZ2luYWxVcmxcbiJdfQ==