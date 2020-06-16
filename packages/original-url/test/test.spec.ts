'use strict'

import pem from 'https-pem';
import originalUrl from '../index';

/**
 * Basic HTTP
 */

test('http - root, no special http headers', function (done)
{
	expect.assertions(1)
	return http(function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'http://localhost:' + port + '/',
			raw: '/',
		})

		done()
	})
})

test('http - path, no special http headers', function (done)
{
	expect.assertions(1)
	http({ path: '/some/path' }, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'localhost',
			port: port,
			pathname: '/some/path',
			full: 'http://localhost:' + port + '/some/path',
			raw: '/some/path',
		})
		done()
	})
})

test('http - path+query params, no special http headers', function (done)
{
	expect.assertions(1)
	http({ path: '/some/path?key=value' }, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'localhost',
			port: port,
			pathname: '/some/path',
			search: '?key=value',
			full: 'http://localhost:' + port + '/some/path?key=value',
			raw: '/some/path?key=value',
		})
		done()
	})
})

test('http - IPv4 host header', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Host': '127.0.0.1',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: '127.0.0.1',
			pathname: '/',
			full: 'http://127.0.0.1/',
			raw: '/',
		})
		done()
	})
})

test('http - IPv6 host header', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Host': '[::1]',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: '[::1]',
			pathname: '/',
			full: 'http://[::1]/',
			raw: '/',
		})
		done()
	})
})

/**
 * Basic HTTPS
 */

test('https - root, no special http headers', function (done)
{
	expect.assertions(1)
	https(function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('https - path, no special http headers', function (done)
{
	expect.assertions(1)
	https({ path: '/some/path' }, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/some/path',
			full: 'https://localhost:' + port + '/some/path',
			raw: '/some/path',
		})
		done()
	})
})

test('https - path+query params, no special http headers', function (done)
{
	expect.assertions(1)
	https({ path: '/some/path?key=value' }, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/some/path',
			search: '?key=value',
			full: 'https://localhost:' + port + '/some/path?key=value',
			raw: '/some/path?key=value',
		})
		done()
	})
})

/**
 * Protocol header
 */

test('X-Forwarded-Proto: https', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Proto': 'https',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Proto - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Proto': ['https', 'http'],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Protocol: https', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Protocol': 'https',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Protocol - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Protocol': ['https', 'http'],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('X-Url-Scheme: https', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Url-Scheme': 'https',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('X-Url-Scheme - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Url-Scheme': ['https', 'http'],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('Front-End-Https: on', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Front-End-Https': 'on',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('Front-End-Https - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Front-End-Https': ['on', 'off'],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Ssl: on', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Ssl': 'on',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Ssl - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Ssl': ['on', 'off'],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'localhost',
			port: port,
			pathname: '/',
			full: 'https://localhost:' + port + '/',
			raw: '/',
		})
		done()
	})
})

/**
 * Hostname header
 */

test('Host: example.com', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Host': 'example.com',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			pathname: '/',
			full: 'http://example.com/',
			raw: '/',
		})
		done()
	})
})

test('Host: example.com:1337', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Host': 'example.com:1337',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/',
			full: 'http://example.com:1337/',
			raw: '/',
		})
		done()
	})
})

test('Host: example.com:1337/some/path?key=value#hash', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'Host': 'example.com:1337/some/path?key=value#hash',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'http://example.com:1337/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

test('Host: https://example.com:1337/some/path?key=value#hash', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'Host': 'https://example.com:1337/some/path?key=value#hash',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'https://example.com:1337/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

test('X-Forwarded-Host: example.com', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Host': 'example.com',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			pathname: '/',
			full: 'http://example.com/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Host - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Host': ['example.com', 'example.net'],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			pathname: '/',
			full: 'http://example.com/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Host: example.com:1337', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Host': 'example.com:1337',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/',
			full: 'http://example.com:1337/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Host: example.com:1337/some/path?key=value#hash', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'X-Forwarded-Host': 'example.com:1337/some/path?key=value#hash',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'http://example.com:1337/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

test('X-Forwarded-Host: https://example.com:1337/some/path?key=value#hash', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'X-Forwarded-Host': 'https://example.com:1337/some/path?key=value#hash',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'https://example.com:1337/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

/**
 * Port header
 */

test('X-Forwarded-Port: 1337', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Port': '1337',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'localhost',
			port: 1337,
			pathname: '/',
			full: 'http://localhost:1337/',
			raw: '/',
		})
		done()
	})
})

test('X-Forwarded-Port - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'X-Forwarded-Port': ['1337', '80'],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'localhost',
			port: 1337,
			pathname: '/',
			full: 'http://localhost:1337/',
			raw: '/',
		})
		done()
	})
})

/**
 * Forwarded header
 */

test('Forwarded: host=example.com', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Forwarded': 'host=example.com',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			pathname: '/',
			full: 'http://example.com/',
			raw: '/',
		})
		done()
	})
})

test('Forwarded: host=example.com; proto=https', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Forwarded': 'host=example.com; proto=https',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'example.com',
			pathname: '/',
			full: 'https://example.com/',
			raw: '/',
		})
		done()
	})
})

test('Forwarded: for="10.0.0.1:1337";host=example.com', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Forwarded': 'for="10.0.0.1:1337";host=example.com',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/',
			full: 'http://example.com:1337/',
			raw: '/',
		})
		done()
	})
})

test('Forwarded: for="[2001:db8:cafe::17]:1337";host=example.com', function (done)
{
	expect.assertions(1)
	const opts = {
		headers: {
			'Forwarded': 'for="[2001:db8:cafe::17]:1337";host=example.com',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/',
			full: 'http://example.com:1337/',
			raw: '/',
		})
		done()
	})
})

test('Forwarded: host="example.com:1337/some/path?key=value#hash"', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'Forwarded': 'host="example.com:1337/some/path?key=value#hash"',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'http://example.com:1337/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

test('Forwarded: host="https://example.com:1337/some/path?key=value#hash"', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'Forwarded': 'host="https://example.com:1337/some/path?key=value#hash"',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'https:',
			hostname: 'example.com',
			port: 1337,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'https://example.com:1337/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

test('Forwarded: host="https://example.com:1337/some/path?key=value#hash"; proto=http; for="10.0.0.1:1234"', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'Forwarded': 'host="https://example.com:1337/some/path?key=value#hash"; proto=http; for="10.0.0.1:1234"',
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1234,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'http://example.com:1234/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

test('Forwarded - multiple headers', function (done)
{
	expect.assertions(1)
	const opts = {
		path: '/some/other/path?key=value',
		headers: {
			'Forwarded': [
				'host="https://example.com:1337/some/path?key=value#hash"; proto=http; for="10.0.0.1:1234"',
				'host="https://example.net:1337/some/other/path?key2=value2#hash2"',
			],
		},
	}
	http(opts, function (result, port)
	{
		expect(result).toEqual({
			protocol: 'http:',
			hostname: 'example.com',
			port: 1234,
			pathname: '/some/other/path',
			search: '?key=value',
			hash: '#hash',
			full: 'http://example.com:1234/some/other/path?key=value#hash',
			raw: '/some/other/path?key=value',
		})
		done()
	})
})

/**
 * Edge cases
 */

test('No Host header', function (done)
{
	const mockReq = { url: '/', headers: {}, connection: {} }
	expect(originalUrl(mockReq)).toEqual({
		protocol: 'http:',
		pathname: '/',
		raw: '/',
	})
	done()
})

/**
 * Utils
 */

function http(opts, onRequest?)
{
	if (typeof opts === 'function') return http({}, opts)

	const _http = require('http')

	const server = _http.createServer(function (req, res)
	{
		let result = originalUrl(req)
		delete result.host;

		onRequest(result, server.address().port)
		res.end()
	})

	server.listen(function ()
	{
		opts.port = server.address().port
		const req = _http.request(opts, function (res)
		{
			res.resume()
			res.on('end', function ()
			{
				server.close()
			})
		})
		req.end()
	})

	return server
}

function https(opts, onRequest?)
{
	if (typeof opts === 'function') return https({}, opts)

	const _https = require('https')

	const server = _https.createServer(pem, function (req, res)
	{
		let result = originalUrl(req)
		delete result.host;

		onRequest(result, server.address().port)
		res.end()
	})

	server.listen(function ()
	{
		opts.port = server.address().port
		opts.rejectUnauthorized = false
		const req = _https.request(opts, function (res)
		{
			res.resume()
			res.on('end', function ()
			{
				server.close()
			})
		})
		req.end()
	})

	return server
}
