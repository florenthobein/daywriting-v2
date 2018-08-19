# API endpoints

## Daily Challenges

### Get challenges
`GET /dailychallenges?month=02-18&lang=fr`
Retrieve all the daily challenges for the month `02-18` and language `fr`.
If `month` is not specified, will be this month.
If `lang` is not specified, will retrieve all the langs.
Public endpoint.

### Create challenges
`POST /dailychallenges?day=01-02-18`
Create a daily challenge for the day `01-02-18`. The day has to be in the past.
If the challenge already exist, doesn't do anything.
If `day` is not specified, will be today.
Public endpoint.

## Writings

### Get a writing
``` GET /writings?day=01-02-18&lang=fr&user_id=5a805716e50e308ee4f1f72f&with=mission,contributors
=> {
	"datekey": "01-02-18",
	"user": {"id": "5a805716e50e308ee4f1f72f", "name": "Florent Hobein"},
	"texts": {"fr": "Hello world!"},
	"settings": {"public": true},
	"metrics": {"word_count": 42, "read_count": 121}
	"mission": { ... },
	"contributors": [{ ... }]
}
```
Get a public text for the day `01-02-18` and user `5a805716e50e308ee4f1f72f` and language `fr`.
If `day` is not specified, will be today.
If `user_id` is not specified, will be the current authenticated user.
If `lang` is not specified, will retrieve all the langs.
If `with` is specified, will include extra data:
- `mission` will include the mission
- `contributors` will include a random array of people who also wrote on this mission
If the text is from an other user and is not public, will retrieve a `403 Forbidden` error.

### Create/update a writing
``` POST /writings
{
	"datekey": "01-02-18",
	"texts": {"fr": "Hello world!"}
}
```
Write or edit a text. If the daily challenge doesn't already exist, will return a `400 Bad Request` error.

### Modify a writing's settings
``` PUT /writings/settings?day=01-02-18
{
	"public": true
}
```
Define the public state of a writing. If no writings already exist for the date, will return a `400 Bad Request` error.
This modification will be applied to all languages.

## Users

### Get user writings
``` GET /users/writings&user_id=5a805716e50e308ee4f1f72f&lang=fr
=> [{
	"datekey": "01-02-18",
	"user": {"id": "5a805716e50e308ee4f1f72f", "name": "Florent Hobein"},
	"texts": {"fr": "Hello world!"},
	"meta": {"word_count": 42, "read_count": 121},
	"mission": { ... },
}, { ... }]
```
Get the list of text written by the user `5a805716e50e308ee4f1f72f` in the language `fr`.
If `user_id` is not specified, will be the current authenticated user.
If `lang` is not specified, will retrieve all the langs.

### Modify user settings
``` PUT /users/settings
{
	"lang": "fr",
	"auto_publish": true,
	"notifications": "always"
}
```
Change the current user's settings:
- `lang` (string): define the user's default language
- `auto_publish` (boolean, default `true`): if set to `false`, will make every new writing private.
- `notifications` (string): TODO
