# @bookmate/preconfigured-winston-logger

## Summary

Common config for Winston logger

## Usage

```javascript
const { getPreconfiguredLogger } = require('@bookmate/preconfigured-winston-logger');

const env = require('env'); // a custom environment information manager

const logger = getPreconfiguredLogger({
  environment: env.getEnvironment()
});
```

## Options of getPreconfiguredLogger
- `environment`, optional, — either `production` or `development`
- `requestIdGetter`, optional, – a function that accepts Express' `req` object and gets its identifier (relevant only in prod environment)

## Note
When using with express-winston, the version of express-winston should be at least 3 (the logger is expecting the Express request object to be passed to it in the `meta` field, which was added only in [this commit](https://github.com/bithavoc/express-winston/commit/93df82ef9feff467bdedf25478ca62dbd05effa5#diff-168726dbe96b3ce427e7fedce31bb0bcR162)).
