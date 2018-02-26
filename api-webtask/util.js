'use latest';

// const util = require('./util.js');
// util.auth
// util.mongdb
// util.sieve

import { MongoClient } from 'mongodb';

const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

module.exports = function auth(req, res, next) {
	const issuer = 'https://' + req.webtaskContext.secrets.AUTH0_DOMAIN + '/';
	jwt({
		secret: jwksRsa.expressJwtSecret({ jwksUri: issuer + '.well-known/jwks.json' }),
		aud: req.webtaskContext.secrets.AUDIENCE,
		issuer: issuer,
		algorithms: [ 'RS256' ]
	})(req, res, next);
};

module.exports = function mongdb(webtaskContext, fct) {
	// this secrets are configured when creating the Webtask
	const { AUTH0_SECRET, MONGO_USER, MONGO_PASSWORD, MONGO_URL } = webtaskContext.secrets;

	// connects to MongoDB and returns the user collection
	MongoClient.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`, fct);
}

module.exports = function sieve(doc, map) {
	var res = {};
	for (let key in doc) {
		// let split = key.split(/\./g);
		// if (split.length) {
		// 	for (let i in split) {
		// 		// todo
		// 	}
		// }
		if (!map[key]) continue;
		if (map[key] === true) res[key] = doc[key];
		else res[map[key]] = doc[key];
	}
	return res;
}
