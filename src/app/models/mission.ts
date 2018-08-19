// {
// 	"id": "5a805716e50e308ee4f1f72f",
// 	"texts": {
// 		"fr": "Bonjour monde!",
// 		"en": "Hello world!"
// 	}
// }

export interface Mission {
  id: string;
  texts: { [lang: string]: string; };
}
