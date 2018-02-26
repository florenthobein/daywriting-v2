'use latest';

import bodyParser from 'body-parser';
import express from 'express';
import Webtask from 'webtask-tools';
import { MongoClient } from 'mongodb';
import { ObjectID } from 'mongodb';

// TODO debug
// import async from 'async-es';
var async = require("async");

const DAILYCHALLENGES_COLLECTION = 'dailychallenges';
const MISSIONS_COLLECTION = 'missions';
const HIDDEN_FIELDS = { 'old_id_fr': 0, 'old_id_en': 0, 'mission.old_id_fr': 0, 'mission.old_id_en': 0 };

const server = express();
server.use(bodyParser.json());

// Find all the current month's challenges
server.get('/', (req, res, next) => {
	let date = req.query.month || '';
	let lang = req.query.lang;

	let now = new Date();

	// Check the queried month
	if (date.match(/^[0-2][0-9]\-[0-9]{2}$/)) {
		let month = parseInt(date.substring(0, 2), 10);
		let year = parseInt(date.substring(3, 5), 10);
		let d = new Date(2000+year, month-1);
		if (d.getTime() > now.getTime()) date = null;
		else date = `-${date}`;
	} else if (date) {
		res.status(400).send();
		return;
	}

	// If no month or invalid queried month
	if (!date) {
		let month = now.getUTCMonth() < 9 ? '0'+(now.getUTCMonth()+1) : ''+(now.getUTCMonth()+1);
		let year = ''+(now.getUTCFullYear()-2000);
		date = `-${month}-${year}`;
	}

	// Connect to the db
	mongdb(req.webtaskContext, (err, db) => {
		if (err) return next(err);

		// Check if already exist
		db.collection(DAILYCHALLENGES_COLLECTION).find({
			'datekey': new RegExp(date)
		}, Object.assign({}, HIDDEN_FIELDS, { '_id': 0, 'mission._id': 0 })).toArray((err, data) => {
			db.close();
			if (err) return next(err);

			res.status(200).send(data);
		});
	});
});

// Create a daily challenge
server.post('/', (req, res, next) => {
	let datekey = req.query.datekey || '';

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

	// Connect to the db
	mongdb(req.webtaskContext, (err, db) => {
		if (err) return next(err);

		// Check if already exist
		db.collection(DAILYCHALLENGES_COLLECTION).findOne({ datekey: datekey }, HIDDEN_FIELDS, (err, data) => {
			if (!err && data) {
				delete data._id;
				delete data.mission._id;
				res.status(200).send(data);
				return;
			}

			// Get a random mission
			db.collection(MISSIONS_COLLECTION).aggregate([{ '$sample': { size: 1} }, { $project: HIDDEN_FIELDS }], (err, data) => {
				if (err || !data.length) return next(err);
				// Save new daily challenge
				let new_document = {
					datekey: datekey,
					mission: data[0]
				};
			});
		});
	});
});


function mongdb(webtaskContext, fct) {
	// this secrets are configured when creating the Webtask
	const { AUTH0_SECRET, MONGO_USER, MONGO_PASSWORD, MONGO_URL } = webtaskContext.secrets;

	// connects to MongoDB and returns the user collection
	MongoClient.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`, fct);
}

module.exports = Webtask.fromExpress(server);
