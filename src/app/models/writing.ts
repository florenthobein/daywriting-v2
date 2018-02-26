// {
// 	"id": "5a805716e50e308ee4f1f72f",
// 	"datekey": "01-01-2018",
// 	"mission": {
// 		"id": "5a805716e50e308ee4f1f72f",
// 		"texts": {
// 			"fr": "Bonjour monde!",
// 			"en": "Hello world!"
// 		}
// 	},
// 	"texts": {
// 		"fr": "Voici mon texte.",
// 		"en": "Here is my text."
// 	}
// }

import { Mission } from "./mission"

export class Writing {
	id: string;
	datekey: string;
	mission: Mission;
	texts: { [lang:string]:string; };
}
