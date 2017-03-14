# Baby Connect API

A library for interacting with [Baby Connect](https://www.baby-connect.com/).

## Usage

```
const {BabyConnect} = require('baby-connect');
const bc = new BabyConnect(
  'you@example.com', 'hunter2', 'some-unique-device-id'
);
bc.getUser()
.then(user => user.kidByName('Joe'))
.then(kid => kid.startSleeping(new Date()))
.then(() => console.log('saved!'));
```

## Supported Actions

- `kid.startSleeping()`
- `kid.stopSleeping()`
- `kid.dirtyDiaper()`
- `kid.wetDiaper()`
- `kid.dirtyAndWetDiaper()`
- `kid.dryDiaper()`
- `kid.saveStatus(Kid.Category.OTHER, 'Message here')`: other events haven't been filled out yet, but can be accessed via the constants on `Kid.Category`.
