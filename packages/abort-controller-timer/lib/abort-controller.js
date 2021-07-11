"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

if (typeof AbortController === 'undefined')
{
	exports.default = require("abort-controller")
}
else
{
	exports.default = AbortController;
}
