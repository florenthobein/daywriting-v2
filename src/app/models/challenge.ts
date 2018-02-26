// {
//	"id": "5a805716e50e308ee4f1f72f",
// 	"datekey": "01-01-2018",
// 	"mission": {
// 		"id": "5a805716e50e308ee4f1f72f",
// 		"texts": {
// 			"fr": "Bonjour monde!",
// 			"en": "Hello world!"
// 		}
// 	}
// }

import { Mission } from "./mission"

export class Challenge {
	datekey: string;
	mission: Mission;
	constructor(params?: any) {
		if (params && params.datekey) this.datekey = params.datekey;
		if (params && params.mission) this.mission = params.mission;
	}
}
