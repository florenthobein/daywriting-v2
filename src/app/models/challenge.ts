// {
// 	"id": "5a805716e50e308ee4f1f72f",
// 	"datekey": "01-01-2018",
// 	"mission": {
// 		"id": "5a805716e50e308ee4f1f72f",
// 		"texts": {
// 			"fr": "Bonjour monde!",
// 			"en": "Hello world!"
// 		}
// 	}
// }

import { Mission } from './mission';

export interface IChallenge {
  id: string;
  datekey: string;
  mission: Mission;
}
