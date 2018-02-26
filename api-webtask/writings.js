'use latest';

import bodyParser from 'body-parser';
import express from 'express';
import { fromExpress } from 'webtask-tools';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';

const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

// TODO debug
// import async from 'async-es';
var async = require("async");
// var DataTransform = require("node-json-transform").DataTransform,

const WRITINGS_COLLECTION = 'writings';
const DAILYCHALLENGES_COLLECTION = 'dailychallenges';
const LANGS = ['fr', 'en'];
// const HIDDEN_FIELDS = { _id: 0, 'mission._id': 0, 'mission.old_id_fr': 0, 'mission.old_id_en': 0 };

const server = express();
server.use(bodyParser.json());
const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');
app.use((req, res, next) => {
	const issuer = 'https://' + req.webtaskContext.secrets.AUTH0_DOMAIN + '/';
	jwt({
		secret: jwksRsa.expressJwtSecret({ jwksUri: issuer + '.well-known/jwks.json' }),
		// not a solution > https://github.com/auth0/express-jwt/issues/171
		aud: req.webtaskContext.secrets.AUDIENCE,
		issuer: issuer,
		algorithms: [ 'RS256' ]
	})(req, res, next);
});

// Class
// TODO

// Get a writing
server.get('/', (req, res, next) => {
	let datekey = req.query.day || '';
	let lang = req.query.lang || '';
	let user_id = req.query.user_id || '';
	let include = req.query.with || '';

	let now = new Date();

	// Check the queried date
	if (datekey.match(/^[0-3][0-9]\-[0-2][0-9]\-[0-9]{2}$/)) {
		let day = parseInt(datekey.substring(0, 2), 10);
		let month = parseInt(datekey.substring(3, 5), 10);
		let year = parseInt(datekey.substring(6, 8), 10);
		let d = new Date(2000+year, month-1, day);
		if (d.getTime() > now.getTime()) datekey = null;
	} else if (datekey) {
		res.status(400).send();
		return;
	}

	// If no date or invalid queried date
	if (!datekey) {
		let day = now.getUTCDate() < 10 ? '0'+now.getUTCDate() : ''+now.getUTCDate();
		let month = now.getUTCMonth() < 9 ? '0'+(now.getUTCMonth()+1) : ''+(now.getUTCMonth()+1);
		let year = ''+(now.getUTCFullYear()-2000);
		datekey = `${day}-${month}-${year}`;
	}

	// If it's the current user, auth check
	if (!user_id)
		; // todo

	// Connect to the db
	mongdb(req.webtaskContext, (err, db) => {
		if (err) return next(err);

		let filter = {}
		if (lang)
			filter['texts.' + lang] = 1;

		// Get the writing
		db.collection(WRITINGS_COLLECTION).findOne({
			'datekey': new RegExp(date)
		}, filter, (err, data) => {
			db.close();
			if (err) return next(err);
			// https://www.npmjs.com/package/node-json-transform
			// var dataTransform = DataTransform(data, {});
			// res.status(200).send(dataTransform.transform());
			res.status(200).send(data);
		});
	});
});

// Create or update a writing
server.post('/', (req, res, next) => {
	let datekey = request.body.datekey || '';
	let texts = request.body.texts || '';

	// Before everything, let's check the user
	if (!req.user) {
		res.status(401).send();
		return;
	}
	if (user_id && ObjectId.isValid(user_id)) {

	}

	// No funny game, we need the datekey
	if (!datekey) {
		res.status(400).send();
		return;
	}

	// Connect to the db
	mongdb(req.webtaskContext, (err, db) => {
		if (err) return next(err);

		// todo parallelize the two next ones

		// Get the challenge
		db.collection(DAILYCHALLENGES_COLLECTION).findOne({ datekey: datekey }, (err, challenge) => {
			if (err) return res.status(404).send();

			// Find an existing writing
			db.collection(WRITINGS_COLLECTION).findOne({ datekey: datekey, 'user._id': user_id }, (err, writing) => {
				// if (err) return res.status(404).send();
				// writing

			})
		})
	})


});

// UTIL //////////////////////////////////////////////////////////////////////

function mongdb(webtaskContext, fct) {
	// this secrets are configured when creating the Webtask
	const { AUTH0_SECRET, MONGO_USER, MONGO_PASSWORD, MONGO_URL } = webtaskContext.secrets;

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
