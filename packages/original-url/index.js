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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZCQUE0RDtBQUM1RCxzRUFBNkM7QUFDN0MsaUNBQWlFO0FBY2pFLFNBQWdCLFdBQVcsQ0FBQyxHQUFHO0lBRTlCLE1BQU0sR0FBRyxHQUFXLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQTtJQUM5QyxNQUFNLEdBQUcsR0FBRyxXQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQy9CLE1BQU0sTUFBTSxHQUFZLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDbEYsTUFBTSxNQUFNLEdBQVk7UUFDdkIsR0FBRyxFQUFFLEdBQUc7S0FDRCxDQUFBO0lBQ1IsSUFBSSxJQUF3QixDQUFBO0lBRTVCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQ3pCO1FBQ0MsSUFDQTtZQUNDLHdFQUF3RTtZQUN4RSxrQ0FBa0M7WUFDbEMsSUFBSSxTQUFTLEdBQUkseUJBQWMsQ0FBQyxxQkFBYyxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FLN0QsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNOLElBQUksR0FBRyxzQkFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUN0QyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQ2pCO2dCQUNDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsaURBQWlEO2dCQUN2RixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2hELGFBQWE7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TSxDQUFDLElBQUksSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUNqRCxJQUFJLE1BQU0sQ0FBQyxRQUFRO1lBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQ25ELElBQUksTUFBTSxDQUFDLE1BQU07WUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDL0MsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQTtLQUMzQztJQUVELE9BQU8sTUFBTSxDQUFBO0FBQ2QsQ0FBQztBQS9JRCxrQ0ErSUM7QUFFRCxrQkFBZSxXQUFXLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwYXJzZSBhcyBwYXJzZVVybCwgVXJsV2l0aFN0cmluZ1F1ZXJ5IH0gZnJvbSAndXJsJztcbmltcG9ydCBwYXJzZUZvcndhcmRlZCBmcm9tICdmb3J3YXJkZWQtcGFyc2UnO1xuaW1wb3J0IHsgcGFyc2VQYXJ0aWFsVVJMLCBnZXRGaXJzdEhlYWRlciwgaXNJUHY2IH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVzdWx0XG57XG5cdHJhdzogc3RyaW5nO1xuXHRwcm90b2NvbDogc3RyaW5nIHwgJ2h0dHBzOicgfCAnaHR0cDonO1xuXHRob3N0bmFtZTogc3RyaW5nO1xuXHRwb3J0OiBudW1iZXI7XG5cdHBhdGhuYW1lOiBzdHJpbmc7XG5cdHNlYXJjaDogc3RyaW5nO1xuXHRoYXNoOiBzdHJpbmc7XG5cdGZ1bGw6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbmFsVXJsKHJlcSlcbntcblx0Y29uc3QgcmF3OiBzdHJpbmcgPSByZXEub3JpZ2luYWxVcmwgfHwgcmVxLnVybFxuXHRjb25zdCB1cmwgPSBwYXJzZVVybChyYXcgfHwgJycpXG5cdGNvbnN0IHNlY3VyZTogYm9vbGVhbiA9IHJlcS5zZWN1cmUgfHwgKHJlcS5jb25uZWN0aW9uICYmIHJlcS5jb25uZWN0aW9uLmVuY3J5cHRlZClcblx0Y29uc3QgcmVzdWx0OiBJUmVzdWx0ID0ge1xuXHRcdHJhdzogcmF3LFxuXHR9IGFzIGFueVxuXHRsZXQgaG9zdDogVXJsV2l0aFN0cmluZ1F1ZXJ5XG5cblx0aWYgKHJlcS5oZWFkZXJzLmZvcndhcmRlZClcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdC8vIEFsd2F5cyBjaG9vc2UgdGhlIG9yaWdpbmFsIChmaXJzdCkgRm9yd2FyZGVkIHBhaXIgaW4gY2FzZSB0aGUgcmVxdWVzdFxuXHRcdFx0Ly8gcGFzc2VkIHRocm91Z2ggbXVsdGlwbGUgcHJveGllc1xuXHRcdFx0bGV0IGZvcndhcmRlZCA9IChwYXJzZUZvcndhcmRlZChnZXRGaXJzdEhlYWRlcihyZXEsICdmb3J3YXJkZWQnKSkgYXMgW3tcblx0XHRcdFx0Zm9yOiBzdHJpbmcsXG5cdFx0XHRcdGJ5OiBzdHJpbmcsXG5cdFx0XHRcdHByb3RvOiBzdHJpbmcsXG5cdFx0XHRcdGhvc3Q6IHN0cmluZ1xuXHRcdFx0fV0pWzBdXG5cdFx0XHRob3N0ID0gcGFyc2VQYXJ0aWFsVVJMKGZvcndhcmRlZC5ob3N0KVxuXHRcdFx0aWYgKGZvcndhcmRlZC5mb3IpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IGNvbm4gPSBmb3J3YXJkZWQuZm9yLnNwbGl0KCddJykgLy8gaW4gY2FzZSBvZiBJUHY2IGFkZHI6IFsyMDAxOmRiODpjYWZlOjoxN106MTMzN1xuXHRcdFx0XHRjb25zdCBwb3J0ID0gY29ubltjb25uLmxlbmd0aCAtIDFdLnNwbGl0KCc6JylbMV1cblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRpZiAocG9ydCkgaG9zdC5wb3J0ID0gTnVtYmVyKHBvcnQpXG5cdFx0XHR9XG5cdFx0XHRpZiAoZm9yd2FyZGVkLnByb3RvKSBob3N0LnByb3RvY29sID0gZm9yd2FyZGVkLnByb3RvICsgJzonXG5cdFx0fVxuXHRcdGNhdGNoIChlKVxuXHRcdHt9XG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLWhvc3QnXSlcblx0e1xuXHRcdGhvc3QgPSBwYXJzZVBhcnRpYWxVUkwoZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtaG9zdCcpKVxuXHR9XG5cblx0aWYgKCFob3N0KVxuXHR7XG5cdFx0aWYgKHR5cGVvZiByZXEuaGVhZGVycy5ob3N0ID09PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRob3N0ID0gcGFyc2VQYXJ0aWFsVVJMKHJlcS5oZWFkZXJzLmhvc3QpXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRob3N0ID0ge30gYXMgYW55XG5cdFx0fVxuXHR9XG5cblx0Ly8gcHJvdG9jb2xcblx0aWYgKHVybC5wcm90b2NvbClcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IHVybC5wcm90b2NvbFxuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1wcm90byddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtcHJvdG8nKSArICc6J1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1wcm90b2NvbCddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtcHJvdG9jb2wnKSArICc6J1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LXVybC1zY2hlbWUnXSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtdXJsLXNjaGVtZScpICsgJzonXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ2Zyb250LWVuZC1odHRwcyddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAnZnJvbnQtZW5kLWh0dHBzJykgPT09ICdvbidcblx0XHRcdD8gJ2h0dHBzOidcblx0XHRcdDogJ2h0dHA6J1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1zc2wnXSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtZm9yd2FyZGVkLXNzbCcpID09PSAnb24nXG5cdFx0XHQ/ICdodHRwczonXG5cdFx0XHQ6ICdodHRwOidcblx0fVxuXHRlbHNlIGlmIChob3N0LnByb3RvY29sKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gaG9zdC5wcm90b2NvbFxuXHR9XG5cdGVsc2UgaWYgKHNlY3VyZSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9ICdodHRwczonXG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gJ2h0dHA6J1xuXHR9XG5cblx0Ly8gaG9zdG5hbWVcblx0aWYgKHVybC5ob3N0bmFtZSlcblx0e1xuXHRcdHJlc3VsdC5ob3N0bmFtZSA9IHVybC5ob3N0bmFtZVxuXHR9XG5cdGVsc2UgaWYgKGhvc3QuaG9zdG5hbWUpIHJlc3VsdC5ob3N0bmFtZSA9IGhvc3QuaG9zdG5hbWVcblxuXHQvLyBmaXggZm9yIElQdjYgbGl0ZXJhbCBidWcgaW4gbGVnYWN5IHVybCAtIHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2F0c29uL29yaWdpbmFsLXVybC9pc3N1ZXMvM1xuXHRpZiAoaXNJUHY2KHJlc3VsdC5ob3N0bmFtZSkpIHJlc3VsdC5ob3N0bmFtZSA9ICdbJyArIHJlc3VsdC5ob3N0bmFtZSArICddJ1xuXG5cdC8vIHBvcnRcblx0aWYgKHVybC5wb3J0KVxuXHR7XG5cdFx0cmVzdWx0LnBvcnQgPSBOdW1iZXIodXJsLnBvcnQpXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLXBvcnQnXSlcblx0e1xuXHRcdHJlc3VsdC5wb3J0ID0gTnVtYmVyKGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtZm9yd2FyZGVkLXBvcnQnKSlcblx0fVxuXHRlbHNlIGlmIChob3N0LnBvcnQpIHJlc3VsdC5wb3J0ID0gTnVtYmVyKGhvc3QucG9ydClcblxuXHQvLyBwYXRobmFtZVxuXHRpZiAodXJsLnBhdGhuYW1lKVxuXHR7XG5cdFx0cmVzdWx0LnBhdGhuYW1lID0gdXJsLnBhdGhuYW1lXG5cdH1cblx0ZWxzZSBpZiAoaG9zdC5wYXRobmFtZSkgcmVzdWx0LnBhdGhuYW1lID0gaG9zdC5wYXRobmFtZSAvLyBUT0RPOiBDb25zaWRlciBpZiB0aGlzIHNob3VsZCB0YWtlIHByaW9yaXR5IG92ZXIgdXJsLnBhdGhuYW1lXG5cblx0Ly8gc2VhcmNoXG5cdGlmICh1cmwuc2VhcmNoKVxuXHR7XG5cdFx0cmVzdWx0LnNlYXJjaCA9IHVybC5zZWFyY2hcblx0fVxuXHRlbHNlIGlmIChob3N0LnNlYXJjaCkgcmVzdWx0LnNlYXJjaCA9IGhvc3Quc2VhcmNoIC8vIFRPRE86IENvbnNpZGVyIGlmIHRoaXMgc2hvdWRsIHRha2UgcHJpb3JpdHkgb3ZlciB1cmkuc2VhcmNoXG5cblx0Ly8gaGFzaFxuXHRpZiAoaG9zdC5oYXNoKSByZXN1bHQuaGFzaCA9IGhvc3QuaGFzaFxuXG5cdC8vIGZ1bGxcblx0aWYgKHJlc3VsdC5wcm90b2NvbCAmJiByZXN1bHQuaG9zdG5hbWUpXG5cdHtcblx0XHRyZXN1bHQuZnVsbCA9IHJlc3VsdC5wcm90b2NvbCArICcvLycgKyByZXN1bHQuaG9zdG5hbWVcblx0XHRpZiAocmVzdWx0LnBvcnQpIHJlc3VsdC5mdWxsICs9ICc6JyArIHJlc3VsdC5wb3J0XG5cdFx0aWYgKHJlc3VsdC5wYXRobmFtZSkgcmVzdWx0LmZ1bGwgKz0gcmVzdWx0LnBhdGhuYW1lXG5cdFx0aWYgKHJlc3VsdC5zZWFyY2gpIHJlc3VsdC5mdWxsICs9IHJlc3VsdC5zZWFyY2hcblx0XHRpZiAocmVzdWx0Lmhhc2gpIHJlc3VsdC5mdWxsICs9IHJlc3VsdC5oYXNoXG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9yaWdpbmFsVXJsXG4iXX0=