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

`environment` — either `production` or `development`
