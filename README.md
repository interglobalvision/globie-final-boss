# globie-final-boss

## The final level of project management: custom webapp

Globie the FINAL BOSS is for our project management. It is a Meteor webapp. The MVP we are currently building is:

- Project overviews with quote record (days and time), contracts generated and digitally signed and timelines.
- User accounts for superadmin (globie), workers and clients. Workers edit all projects; clients have access to their related projects.
- Notifications via email and Slack for timeline deadlines.
- Data export of all data via json and contracts via PDF.


## Test

### Run tests

To run tests use this command:

`meteor --settings settings.json test --driver-package dispatch:mocha-browser`

This will return rsults for client tests in the browser and server tests in the terminal.

### Write tests

This is a basic guide on how to write tests. Will be completed as we write more tests.

We use Chai as assertion library. Check out the [docs](http://chaijs.com/api/).

Things to take on account:

- The DB can be populated before running tests. Direct Mongo inserts are fine.
- Tests start with an empty database but the DB stays consitent as the tests run so sometimes is necessary to clean the DB or remove documents from it before each test.
- `beforeEach()` is your friend
- (?)

#### Testing Methods

Method tests should be saved in the same dir as the method file. E.g. `projectsMethods.js` and `projectsMethods.tests.js`.

