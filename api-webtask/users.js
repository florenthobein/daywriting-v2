'use latest';

import bodyParser from 'body-parser';
import express from 'express';
import { fromExpress } from 'webtask-tools';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';

const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

const USERS_COLLECTION = 'users';
const USER_API = {
	'_id': 'id',
	'sub': true,
	'updated_at': true,
	'name': true,
	'email': true,
	'picture': true,
};

const server = express();
server.use(bodyParser.json());
var auth = (req, res, next) => {
	const issuer = 'https://' + req.webtaskContext.secrets.AUTH0_DOMAIN + '/';
	jwt({
		secret: jwksRsa.expressJwtSecret({ jwksUri: issuer + '.well-known/jwks.json' }),
		aud: req.webtaskContext.secrets.AUDIENCE,
		issuer: issuer,
		algorithms: [ 'RS256' ]
	})(req, res, next);
};

server.get('/', auth, (req, res) => {
	if (!req.user || !req.user.sub) return res.status(301).send();

	// Connect to the db
	mongdb(req.webtaskContext, (err, db) => {

		// Get the User
		db.collection(USERS_COLLECTION).findOne({
			'sub': req.user.sub
		}, (err, data) => {
			if (err) return next(err);
			res.status(200).send(sieve(data, USER_API));
		});
	});
});

server.post('/auth', auth, (req, res) => {

	if (!req.user || !req.user.sub) return res.status(400).send();

	// Connect to the db
	mongdb(req.webtaskContext, (err, db) => {

		// Get the User
		db.collection(USERS_COLLECTION).findOne({
			'sub': req.user.sub
		}, (err, data) => {
			if (err || !data) {
				// doesn't exist: we create it
				let new_document = req.user;
				db.collection(USERS_COLLECTION).save(new_document, (err) => {
					if (err) return next(err);
					res.status(201).send(sieve(new_document, USER_API));
				});
			} else {
				// exists: we update the timestamp
				// todo
				res.status(200).send(sieve(data, USER_API));
			}
		});
	});

});

// UTIL //////////////////////////////////////////////////////////////////////

function mongdb(webtaskContext, fct) {
	// this secrets are configured when creating the Webtask
	const { MONGO_USER, MONGO_PASSWORD, MONGO_URL } = webtaskContext.secrets;

	// connects to MongoDB and returns the user collection
	MongoClient.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`, fct);
}

function sieve(doc, map) {
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

module.exports = fromExpress(server);
