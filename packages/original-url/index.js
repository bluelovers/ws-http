"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalUrl = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2QkFBNEQ7QUFDNUQsc0VBQTZDO0FBQzdDLGlDQUFpRTtBQWtCakUsU0FBZ0IsV0FBVyxDQUFDLEdBQUc7SUFFOUIsTUFBTSxHQUFHLEdBQVcsR0FBRyxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFBO0lBQzlDLE1BQU0sR0FBRyxHQUFHLFdBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUE7SUFDL0IsTUFBTSxNQUFNLEdBQVksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNsRixNQUFNLE1BQU0sR0FBWTtRQUN2QixHQUFHLEVBQUUsR0FBRztLQUNELENBQUE7SUFDUixJQUFJLElBQXdCLENBQUE7SUFFNUIsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDekI7UUFDQyxJQUNBO1lBQ0Msd0VBQXdFO1lBQ3hFLGtDQUFrQztZQUNsQyxJQUFJLFNBQVMsR0FBSSx5QkFBYyxDQUFDLHFCQUFjLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUs3RCxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ04sSUFBSSxHQUFHLHNCQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3RDLElBQUksU0FBUyxDQUFDLEdBQUcsRUFDakI7Z0JBQ0MsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQyxpREFBaUQ7Z0JBQ3ZGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDaEQsYUFB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QUE7SUFFdEMsT0FBTztJQUNQLElBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUN0QztRQUNDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUN0RCxJQUFJLE1BQU0sQ0FBQyxJQUFJO1lBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNqRCxJQUFJLE1BQU0sQ0FBQyxRQUFRO1lBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQ25ELElBQUksTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDL0MsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQTtLQUMzQztJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2QsQ0FBQztBQXBKRCxrQ0FvSkM7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVybCwgVXJsV2l0aFN0cmluZ1F1ZXJ5IH0gZnJvbSAndXJsJztcbmltcG9ydCBwYXJzZUZvcndhcmRlZCBmcm9tICdmb3J3YXJkZWQtcGFyc2UnO1xuaW1wb3J0IHsgcGFyc2VQYXJ0aWFsVVJMLCBnZXRGaXJzdEhlYWRlciwgaXNJUHY2IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVzdWx0XG57XG5cdHJhdzogc3RyaW5nO1xuXHRwcm90b2NvbDogc3RyaW5nIHwgJ2h0dHBzOicgfCAnaHR0cDonO1xuXHQvKipcblx0ICogaG9zdG5hbWUgKyBwb3J0XG5cdCAqL1xuXHRob3N0OiBzdHJpbmc7XG5cdGhvc3RuYW1lOiBzdHJpbmc7XG5cdHBvcnQ6IG51bWJlcjtcblx0cGF0aG5hbWU6IHN0cmluZztcblx0c2VhcmNoOiBzdHJpbmc7XG5cdGhhc2g6IHN0cmluZztcblx0ZnVsbDogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3JpZ2luYWxVcmwocmVxKVxue1xuXHRjb25zdCByYXc6IHN0cmluZyA9IHJlcS5vcmlnaW5hbFVybCB8fCByZXEudXJsXG5cdGNvbnN0IHVybCA9IHBhcnNlVXJsKHJhdyB8fCAnJylcblx0Y29uc3Qgc2VjdXJlOiBib29sZWFuID0gcmVxLnNlY3VyZSB8fCAocmVxLmNvbm5lY3Rpb24gJiYgcmVxLmNvbm5lY3Rpb24uZW5jcnlwdGVkKVxuXHRjb25zdCByZXN1bHQ6IElSZXN1bHQgPSB7XG5cdFx0cmF3OiByYXcsXG5cdH0gYXMgYW55XG5cdGxldCBob3N0OiBVcmxXaXRoU3RyaW5nUXVlcnlcblxuXHRpZiAocmVxLmhlYWRlcnMuZm9yd2FyZGVkKVxuXHR7XG5cdFx0dHJ5XG5cdFx0e1xuXHRcdFx0Ly8gQWx3YXlzIGNob29zZSB0aGUgb3JpZ2luYWwgKGZpcnN0KSBGb3J3YXJkZWQgcGFpciBpbiBjYXNlIHRoZSByZXF1ZXN0XG5cdFx0XHQvLyBwYXNzZWQgdGhyb3VnaCBtdWx0aXBsZSBwcm94aWVzXG5cdFx0XHRsZXQgZm9yd2FyZGVkID0gKHBhcnNlRm9yd2FyZGVkKGdldEZpcnN0SGVhZGVyKHJlcSwgJ2ZvcndhcmRlZCcpKSBhcyBbe1xuXHRcdFx0XHRmb3I6IHN0cmluZyxcblx0XHRcdFx0Ynk6IHN0cmluZyxcblx0XHRcdFx0cHJvdG86IHN0cmluZyxcblx0XHRcdFx0aG9zdDogc3RyaW5nXG5cdFx0XHR9XSlbMF1cblx0XHRcdGhvc3QgPSBwYXJzZVBhcnRpYWxVUkwoZm9yd2FyZGVkLmhvc3QpXG5cdFx0XHRpZiAoZm9yd2FyZGVkLmZvcilcblx0XHRcdHtcblx0XHRcdFx0Y29uc3QgY29ubiA9IGZvcndhcmRlZC5mb3Iuc3BsaXQoJ10nKSAvLyBpbiBjYXNlIG9mIElQdjYgYWRkcjogWzIwMDE6ZGI4OmNhZmU6OjE3XToxMzM3XG5cdFx0XHRcdGNvbnN0IHBvcnQgPSBjb25uW2Nvbm4ubGVuZ3RoIC0gMV0uc3BsaXQoJzonKVsxXVxuXHRcdFx0XHQvLyBAdHMtaWdub3JlXG5cdFx0XHRcdGlmIChwb3J0KSBob3N0LnBvcnQgPSBOdW1iZXIocG9ydClcblx0XHRcdH1cblx0XHRcdGlmIChmb3J3YXJkZWQucHJvdG8pIGhvc3QucHJvdG9jb2wgPSBmb3J3YXJkZWQucHJvdG8gKyAnOidcblx0XHR9XG5cdFx0Y2F0Y2ggKGUpXG5cdFx0e31cblx0fVxuXHRlbHNlIGlmIChyZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtaG9zdCddKVxuXHR7XG5cdFx0aG9zdCA9IHBhcnNlUGFydGlhbFVSTChnZXRGaXJzdEhlYWRlcihyZXEsICd4LWZvcndhcmRlZC1ob3N0JykpXG5cdH1cblxuXHRpZiAoIWhvc3QpXG5cdHtcblx0XHRpZiAodHlwZW9mIHJlcS5oZWFkZXJzLmhvc3QgPT09ICdzdHJpbmcnKVxuXHRcdHtcblx0XHRcdGhvc3QgPSBwYXJzZVBhcnRpYWxVUkwocmVxLmhlYWRlcnMuaG9zdClcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGhvc3QgPSB7fSBhcyBhbnlcblx0XHR9XG5cdH1cblxuXHQvLyBwcm90b2NvbFxuXHRpZiAodXJsLnByb3RvY29sKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gdXJsLnByb3RvY29sXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLXByb3RvJ10pXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSBnZXRGaXJzdEhlYWRlcihyZXEsICd4LWZvcndhcmRlZC1wcm90bycpICsgJzonXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLXByb3RvY29sJ10pXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSBnZXRGaXJzdEhlYWRlcihyZXEsICd4LWZvcndhcmRlZC1wcm90b2NvbCcpICsgJzonXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtdXJsLXNjaGVtZSddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC11cmwtc2NoZW1lJykgKyAnOidcblx0fVxuXHRlbHNlIGlmIChyZXEuaGVhZGVyc1snZnJvbnQtZW5kLWh0dHBzJ10pXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSBnZXRGaXJzdEhlYWRlcihyZXEsICdmcm9udC1lbmQtaHR0cHMnKSA9PT0gJ29uJ1xuXHRcdFx0PyAnaHR0cHM6J1xuXHRcdFx0OiAnaHR0cDonXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLXNzbCddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtc3NsJykgPT09ICdvbidcblx0XHRcdD8gJ2h0dHBzOidcblx0XHRcdDogJ2h0dHA6J1xuXHR9XG5cdGVsc2UgaWYgKGhvc3QucHJvdG9jb2wpXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSBob3N0LnByb3RvY29sXG5cdH1cblx0ZWxzZSBpZiAoc2VjdXJlKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gJ2h0dHBzOidcblx0fVxuXHRlbHNlXG5cdHtcblx0XHRyZXN1bHQucHJvdG9jb2wgPSAnaHR0cDonXG5cdH1cblxuXHQvLyBob3N0bmFtZVxuXHRpZiAodXJsLmhvc3RuYW1lKVxuXHR7XG5cdFx0cmVzdWx0Lmhvc3RuYW1lID0gdXJsLmhvc3RuYW1lXG5cdH1cblx0ZWxzZSBpZiAoaG9zdC5ob3N0bmFtZSkgcmVzdWx0Lmhvc3RuYW1lID0gaG9zdC5ob3N0bmFtZVxuXG5cdC8vIGZpeCBmb3IgSVB2NiBsaXRlcmFsIGJ1ZyBpbiBsZWdhY3kgdXJsIC0gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS93YXRzb24vb3JpZ2luYWwtdXJsL2lzc3Vlcy8zXG5cdGlmIChpc0lQdjYocmVzdWx0Lmhvc3RuYW1lKSkgcmVzdWx0Lmhvc3RuYW1lID0gJ1snICsgcmVzdWx0Lmhvc3RuYW1lICsgJ10nXG5cblx0Ly8gcG9ydFxuXHRpZiAodXJsLnBvcnQpXG5cdHtcblx0XHRyZXN1bHQucG9ydCA9IE51bWJlcih1cmwucG9ydClcblx0fVxuXHRlbHNlIGlmIChyZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtcG9ydCddKVxuXHR7XG5cdFx0cmVzdWx0LnBvcnQgPSBOdW1iZXIoZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtcG9ydCcpKVxuXHR9XG5cdGVsc2UgaWYgKGhvc3QucG9ydCkgcmVzdWx0LnBvcnQgPSBOdW1iZXIoaG9zdC5wb3J0KVxuXG5cdGlmIChyZXN1bHQuaG9zdG5hbWUpXG5cdHtcblx0XHRyZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSArIChob3N0LnBvcnQgPyAnOicgKyBob3N0LnBvcnQgOiAnJyk7XG5cdH1cblxuXHQvLyBwYXRobmFtZVxuXHRpZiAodXJsLnBhdGhuYW1lKVxuXHR7XG5cdFx0cmVzdWx0LnBhdGhuYW1lID0gdXJsLnBhdGhuYW1lXG5cdH1cblx0ZWxzZSBpZiAoaG9zdC5wYXRobmFtZSkgcmVzdWx0LnBhdGhuYW1lID0gaG9zdC5wYXRobmFtZSAvLyBUT0RPOiBDb25zaWRlciBpZiB0aGlzIHNob3VsZCB0YWtlIHByaW9yaXR5IG92ZXIgdXJsLnBhdGhuYW1lXG5cblx0Ly8gc2VhcmNoXG5cdGlmICh1cmwuc2VhcmNoKVxuXHR7XG5cdFx0cmVzdWx0LnNlYXJjaCA9IHVybC5zZWFyY2hcblx0fVxuXHRlbHNlIGlmIChob3N0LnNlYXJjaCkgcmVzdWx0LnNlYXJjaCA9IGhvc3Quc2VhcmNoIC8vIFRPRE86IENvbnNpZGVyIGlmIHRoaXMgc2hvdWRsIHRha2UgcHJpb3JpdHkgb3ZlciB1cmkuc2VhcmNoXG5cblx0Ly8gaGFzaFxuXHRpZiAoaG9zdC5oYXNoKSByZXN1bHQuaGFzaCA9IGhvc3QuaGFzaFxuXG5cdC8vIGZ1bGxcblx0aWYgKHJlc3VsdC5wcm90b2NvbCAmJiByZXN1bHQuaG9zdG5hbWUpXG5cdHtcblx0XHRyZXN1bHQuZnVsbCA9IHJlc3VsdC5wcm90b2NvbCArICcvLycgKyByZXN1bHQuaG9zdG5hbWVcblx0XHRpZiAocmVzdWx0LnBvcnQpIHJlc3VsdC5mdWxsICs9ICc6JyArIHJlc3VsdC5wb3J0XG5cdFx0aWYgKHJlc3VsdC5wYXRobmFtZSkgcmVzdWx0LmZ1bGwgKz0gcmVzdWx0LnBhdGhuYW1lXG5cdFx0aWYgKHJlc3VsdC5zZWFyY2gpIHJlc3VsdC5mdWxsICs9IHJlc3VsdC5zZWFyY2hcblx0XHRpZiAocmVzdWx0Lmhhc2gpIHJlc3VsdC5mdWxsICs9IHJlc3VsdC5oYXNoXG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9yaWdpbmFsVXJsXG4iXX0=