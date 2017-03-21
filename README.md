# globie-final-boss

## The final level of project management: custom webapp

Globie the FINAL BOSS is for our project management. It is a Meteor webapp. The MVP we are currently building is:

- Project overviews with quote record (days and time), contracts generated and digitally signed and timelines.
- User accounts for superadmin (globie), workers and clients. Workers edit all projects; clients have access to their related projects.
- Notifications via email and Slack for timeline deadlines.
- Data export of all data via json and contracts via PDF.


## Test
`meteor --settings settings.json test --driver-package dispatch:mocha-browser`
