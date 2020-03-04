"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const forwarded_parse_1 = __importDefault(require("forwarded-parse"));
const net_1 = require("net");
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
    if (net_1.isIPv6(result.hostname))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZCQUE0RDtBQUM1RCxzRUFBNkM7QUFDN0MsNkJBQTZCO0FBQzdCLGlDQUF5RDtBQWN6RCxTQUFnQixXQUFXLENBQUMsR0FBRztJQUU5QixNQUFNLEdBQUcsR0FBVyxHQUFHLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUE7SUFDOUMsTUFBTSxHQUFHLEdBQUcsV0FBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQTtJQUMvQixNQUFNLE1BQU0sR0FBWSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2xGLE1BQU0sTUFBTSxHQUFZO1FBQ3ZCLEdBQUcsRUFBRSxHQUFHO0tBQ0QsQ0FBQTtJQUNSLElBQUksSUFBd0IsQ0FBQTtJQUU1QixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUN6QjtRQUNDLElBQ0E7WUFDQyx3RUFBd0U7WUFDeEUsa0NBQWtDO1lBQ2xDLElBQUksU0FBUyxHQUFJLHlCQUFjLENBQUMscUJBQWMsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBSzdELENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDTixJQUFJLEdBQUcsc0JBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDdEMsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUNqQjtnQkFDQyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLGlEQUFpRDtnQkFDdkYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNoRCxhQUFhO2dCQUNiLElBQUksSUFBSTtvQkFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNsQztZQUNELElBQUksU0FBUyxDQUFDLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQTtTQUMxRDtRQUNELE9BQU8sQ0FBQyxFQUNSLEdBQUU7S0FDRjtTQUNJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUN4QztRQUNDLElBQUksR0FBRyxzQkFBZSxDQUFDLHFCQUFjLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtLQUMvRDtJQUVELElBQUksQ0FBQyxJQUFJLEVBQ1Q7UUFDQyxJQUFJLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUN4QztZQUNDLElBQUksR0FBRyxzQkFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDeEM7YUFFRDtZQUNDLElBQUksR0FBRyxFQUFTLENBQUE7U0FDaEI7S0FDRDtJQUVELFdBQVc7SUFDWCxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQ2hCO1FBQ0MsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO0tBQzlCO1NBQ0ksSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEVBQ3pDO1FBQ0MsTUFBTSxDQUFDLFFBQVEsR0FBRyxxQkFBYyxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtLQUNoRTtTQUNJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxFQUM1QztRQUNDLE1BQU0sQ0FBQyxRQUFRLEdBQUcscUJBQWMsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsR0FBRyxHQUFHLENBQUE7S0FDbkU7U0FDSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQ3BDO1FBQ0MsTUFBTSxDQUFDLFFBQVEsR0FBRyxxQkFBYyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUE7S0FDM0Q7U0FDSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFDdkM7UUFDQyxNQUFNLENBQUMsUUFBUSxHQUFHLHFCQUFjLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLEtBQUssSUFBSTtZQUNoRSxDQUFDLENBQUMsUUFBUTtZQUNWLENBQUMsQ0FBQyxPQUFPLENBQUE7S0FDVjtTQUNJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUN2QztRQUNDLE1BQU0sQ0FBQyxRQUFRLEdBQUcscUJBQWMsQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxJQUFJO1lBQ2hFLENBQUMsQ0FBQyxRQUFRO1lBQ1YsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtLQUNWO1NBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUN0QjtRQUNDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtLQUMvQjtTQUNJLElBQUksTUFBTSxFQUNmO1FBQ0MsTUFBTSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7S0FDMUI7U0FFRDtRQUNDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFBO0tBQ3pCO0lBRUQsV0FBVztJQUNYLElBQUksR0FBRyxDQUFDLFFBQVEsRUFDaEI7UUFDQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7S0FDOUI7U0FDSSxJQUFJLElBQUksQ0FBQyxRQUFRO1FBQUUsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBRXZELCtGQUErRjtJQUMvRixJQUFJLFlBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQUUsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUE7SUFFMUUsT0FBTztJQUNQLElBQUksR0FBRyxDQUFDLElBQUksRUFDWjtRQUNDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtLQUM5QjtTQUNJLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUN4QztRQUNDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLHFCQUFjLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtLQUM3RDtTQUNJLElBQUksSUFBSSxDQUFDLElBQUk7UUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFFbkQsV0FBVztJQUNYLElBQUksR0FBRyxDQUFDLFFBQVEsRUFDaEI7UUFDQyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUE7S0FDOUI7U0FDSSxJQUFJLElBQUksQ0FBQyxRQUFRO1FBQUUsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUMsZ0VBQWdFO0lBRXhILFNBQVM7SUFDVCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQ2Q7UUFDQyxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7S0FDMUI7U0FDSSxJQUFJLElBQUksQ0FBQyxNQUFNO1FBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFBLENBQUMsOERBQThEO0lBRWhILE9BQU87SUFDUCxJQUFJLElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBRXRDLE9BQU87SUFDUCxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsRUFDdEM7UUFDQyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDdEQsSUFBSSxNQUFNLENBQUMsSUFBSTtZQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDakQsSUFBSSxNQUFNLENBQUMsUUFBUTtZQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNuRCxJQUFJLE1BQU0sQ0FBQyxNQUFNO1lBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQy9DLElBQUksTUFBTSxDQUFDLElBQUk7WUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUE7S0FDM0M7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNkLENBQUM7QUEvSUQsa0NBK0lDO0FBRUQsa0JBQWUsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcGFyc2UgYXMgcGFyc2VVcmwsIFVybFdpdGhTdHJpbmdRdWVyeSB9IGZyb20gJ3VybCc7XG5pbXBvcnQgcGFyc2VGb3J3YXJkZWQgZnJvbSAnZm9yd2FyZGVkLXBhcnNlJztcbmltcG9ydCB7IGlzSVB2NiB9IGZyb20gJ25ldCc7XG5pbXBvcnQgeyBwYXJzZVBhcnRpYWxVUkwsIGdldEZpcnN0SGVhZGVyIH0gZnJvbSAnLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBJUmVzdWx0XG57XG5cdHJhdzogc3RyaW5nO1xuXHRwcm90b2NvbDogc3RyaW5nIHwgJ2h0dHBzOicgfCAnaHR0cDonO1xuXHRob3N0bmFtZTogc3RyaW5nO1xuXHRwb3J0OiBudW1iZXI7XG5cdHBhdGhuYW1lOiBzdHJpbmc7XG5cdHNlYXJjaDogc3RyaW5nO1xuXHRoYXNoOiBzdHJpbmc7XG5cdGZ1bGw6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9yaWdpbmFsVXJsKHJlcSlcbntcblx0Y29uc3QgcmF3OiBzdHJpbmcgPSByZXEub3JpZ2luYWxVcmwgfHwgcmVxLnVybFxuXHRjb25zdCB1cmwgPSBwYXJzZVVybChyYXcgfHwgJycpXG5cdGNvbnN0IHNlY3VyZTogYm9vbGVhbiA9IHJlcS5zZWN1cmUgfHwgKHJlcS5jb25uZWN0aW9uICYmIHJlcS5jb25uZWN0aW9uLmVuY3J5cHRlZClcblx0Y29uc3QgcmVzdWx0OiBJUmVzdWx0ID0ge1xuXHRcdHJhdzogcmF3LFxuXHR9IGFzIGFueVxuXHRsZXQgaG9zdDogVXJsV2l0aFN0cmluZ1F1ZXJ5XG5cblx0aWYgKHJlcS5oZWFkZXJzLmZvcndhcmRlZClcblx0e1xuXHRcdHRyeVxuXHRcdHtcblx0XHRcdC8vIEFsd2F5cyBjaG9vc2UgdGhlIG9yaWdpbmFsIChmaXJzdCkgRm9yd2FyZGVkIHBhaXIgaW4gY2FzZSB0aGUgcmVxdWVzdFxuXHRcdFx0Ly8gcGFzc2VkIHRocm91Z2ggbXVsdGlwbGUgcHJveGllc1xuXHRcdFx0bGV0IGZvcndhcmRlZCA9IChwYXJzZUZvcndhcmRlZChnZXRGaXJzdEhlYWRlcihyZXEsICdmb3J3YXJkZWQnKSkgYXMgW3tcblx0XHRcdFx0Zm9yOiBzdHJpbmcsXG5cdFx0XHRcdGJ5OiBzdHJpbmcsXG5cdFx0XHRcdHByb3RvOiBzdHJpbmcsXG5cdFx0XHRcdGhvc3Q6IHN0cmluZ1xuXHRcdFx0fV0pWzBdXG5cdFx0XHRob3N0ID0gcGFyc2VQYXJ0aWFsVVJMKGZvcndhcmRlZC5ob3N0KVxuXHRcdFx0aWYgKGZvcndhcmRlZC5mb3IpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IGNvbm4gPSBmb3J3YXJkZWQuZm9yLnNwbGl0KCddJykgLy8gaW4gY2FzZSBvZiBJUHY2IGFkZHI6IFsyMDAxOmRiODpjYWZlOjoxN106MTMzN1xuXHRcdFx0XHRjb25zdCBwb3J0ID0gY29ubltjb25uLmxlbmd0aCAtIDFdLnNwbGl0KCc6JylbMV1cblx0XHRcdFx0Ly8gQHRzLWlnbm9yZVxuXHRcdFx0XHRpZiAocG9ydCkgaG9zdC5wb3J0ID0gTnVtYmVyKHBvcnQpXG5cdFx0XHR9XG5cdFx0XHRpZiAoZm9yd2FyZGVkLnByb3RvKSBob3N0LnByb3RvY29sID0gZm9yd2FyZGVkLnByb3RvICsgJzonXG5cdFx0fVxuXHRcdGNhdGNoIChlKVxuXHRcdHt9XG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLWhvc3QnXSlcblx0e1xuXHRcdGhvc3QgPSBwYXJzZVBhcnRpYWxVUkwoZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtaG9zdCcpKVxuXHR9XG5cblx0aWYgKCFob3N0KVxuXHR7XG5cdFx0aWYgKHR5cGVvZiByZXEuaGVhZGVycy5ob3N0ID09PSAnc3RyaW5nJylcblx0XHR7XG5cdFx0XHRob3N0ID0gcGFyc2VQYXJ0aWFsVVJMKHJlcS5oZWFkZXJzLmhvc3QpXG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHRob3N0ID0ge30gYXMgYW55XG5cdFx0fVxuXHR9XG5cblx0Ly8gcHJvdG9jb2xcblx0aWYgKHVybC5wcm90b2NvbClcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IHVybC5wcm90b2NvbFxuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1wcm90byddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtcHJvdG8nKSArICc6J1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1wcm90b2NvbCddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAneC1mb3J3YXJkZWQtcHJvdG9jb2wnKSArICc6J1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LXVybC1zY2hlbWUnXSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtdXJsLXNjaGVtZScpICsgJzonXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ2Zyb250LWVuZC1odHRwcyddKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gZ2V0Rmlyc3RIZWFkZXIocmVxLCAnZnJvbnQtZW5kLWh0dHBzJykgPT09ICdvbidcblx0XHRcdD8gJ2h0dHBzOidcblx0XHRcdDogJ2h0dHA6J1xuXHR9XG5cdGVsc2UgaWYgKHJlcS5oZWFkZXJzWyd4LWZvcndhcmRlZC1zc2wnXSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9IGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtZm9yd2FyZGVkLXNzbCcpID09PSAnb24nXG5cdFx0XHQ/ICdodHRwczonXG5cdFx0XHQ6ICdodHRwOidcblx0fVxuXHRlbHNlIGlmIChob3N0LnByb3RvY29sKVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gaG9zdC5wcm90b2NvbFxuXHR9XG5cdGVsc2UgaWYgKHNlY3VyZSlcblx0e1xuXHRcdHJlc3VsdC5wcm90b2NvbCA9ICdodHRwczonXG5cdH1cblx0ZWxzZVxuXHR7XG5cdFx0cmVzdWx0LnByb3RvY29sID0gJ2h0dHA6J1xuXHR9XG5cblx0Ly8gaG9zdG5hbWVcblx0aWYgKHVybC5ob3N0bmFtZSlcblx0e1xuXHRcdHJlc3VsdC5ob3N0bmFtZSA9IHVybC5ob3N0bmFtZVxuXHR9XG5cdGVsc2UgaWYgKGhvc3QuaG9zdG5hbWUpIHJlc3VsdC5ob3N0bmFtZSA9IGhvc3QuaG9zdG5hbWVcblxuXHQvLyBmaXggZm9yIElQdjYgbGl0ZXJhbCBidWcgaW4gbGVnYWN5IHVybCAtIHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2F0c29uL29yaWdpbmFsLXVybC9pc3N1ZXMvM1xuXHRpZiAoaXNJUHY2KHJlc3VsdC5ob3N0bmFtZSkpIHJlc3VsdC5ob3N0bmFtZSA9ICdbJyArIHJlc3VsdC5ob3N0bmFtZSArICddJ1xuXG5cdC8vIHBvcnRcblx0aWYgKHVybC5wb3J0KVxuXHR7XG5cdFx0cmVzdWx0LnBvcnQgPSBOdW1iZXIodXJsLnBvcnQpXG5cdH1cblx0ZWxzZSBpZiAocmVxLmhlYWRlcnNbJ3gtZm9yd2FyZGVkLXBvcnQnXSlcblx0e1xuXHRcdHJlc3VsdC5wb3J0ID0gTnVtYmVyKGdldEZpcnN0SGVhZGVyKHJlcSwgJ3gtZm9yd2FyZGVkLXBvcnQnKSlcblx0fVxuXHRlbHNlIGlmIChob3N0LnBvcnQpIHJlc3VsdC5wb3J0ID0gTnVtYmVyKGhvc3QucG9ydClcblxuXHQvLyBwYXRobmFtZVxuXHRpZiAodXJsLnBhdGhuYW1lKVxuXHR7XG5cdFx0cmVzdWx0LnBhdGhuYW1lID0gdXJsLnBhdGhuYW1lXG5cdH1cblx0ZWxzZSBpZiAoaG9zdC5wYXRobmFtZSkgcmVzdWx0LnBhdGhuYW1lID0gaG9zdC5wYXRobmFtZSAvLyBUT0RPOiBDb25zaWRlciBpZiB0aGlzIHNob3VsZCB0YWtlIHByaW9yaXR5IG92ZXIgdXJsLnBhdGhuYW1lXG5cblx0Ly8gc2VhcmNoXG5cdGlmICh1cmwuc2VhcmNoKVxuXHR7XG5cdFx0cmVzdWx0LnNlYXJjaCA9IHVybC5zZWFyY2hcblx0fVxuXHRlbHNlIGlmIChob3N0LnNlYXJjaCkgcmVzdWx0LnNlYXJjaCA9IGhvc3Quc2VhcmNoIC8vIFRPRE86IENvbnNpZGVyIGlmIHRoaXMgc2hvdWRsIHRha2UgcHJpb3JpdHkgb3ZlciB1cmkuc2VhcmNoXG5cblx0Ly8gaGFzaFxuXHRpZiAoaG9zdC5oYXNoKSByZXN1bHQuaGFzaCA9IGhvc3QuaGFzaFxuXG5cdC8vIGZ1bGxcblx0aWYgKHJlc3VsdC5wcm90b2NvbCAmJiByZXN1bHQuaG9zdG5hbWUpXG5cdHtcblx0XHRyZXN1bHQuZnVsbCA9IHJlc3VsdC5wcm90b2NvbCArICcvLycgKyByZXN1bHQuaG9zdG5hbWVcblx0XHRpZiAocmVzdWx0LnBvcnQpIHJlc3VsdC5mdWxsICs9ICc6JyArIHJlc3VsdC5wb3J0XG5cdFx0aWYgKHJlc3VsdC5wYXRobmFtZSkgcmVzdWx0LmZ1bGwgKz0gcmVzdWx0LnBhdGhuYW1lXG5cdFx0aWYgKHJlc3VsdC5zZWFyY2gpIHJlc3VsdC5mdWxsICs9IHJlc3VsdC5zZWFyY2hcblx0XHRpZiAocmVzdWx0Lmhhc2gpIHJlc3VsdC5mdWxsICs9IHJlc3VsdC5oYXNoXG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9yaWdpbmFsVXJsXG4iXX0=