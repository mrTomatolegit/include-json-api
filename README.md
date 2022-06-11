# JSON:API Parser

This package allows fast and easy parsing of the JSON:API's complex appearance.

# Installation

npm: `npm i json-api-parser`

yarn: `yarn add json-api-parser`

# Usage

```js
const payload = {}; // This is the payload you received from the JSON:API endpoint
const { parseJSONAPI } = require('json-api-parser');
const root = parseJSONAPI(payload);

// `root` represents the root of the received JSON
// The requested data is found in root.data (Array or singular data)

// Not array
root.data.getRelationship(root, 'relkey');

// Array
root.data[0].getRelationship(root, 'relkey');
root.data.map(d => d.getRelationship(root, 'relkey'));

// You can also serialize the JSON:API into a more comfortable payload
// This moves all the references to `included` into the appropriate relationship value
// This has a maximum depth of 5 by default
root.serializeData();

// You can override the maximum depth by specifying it as an argument
root.serializeData(15);

// Maximum depth is put in place to avoid circular references from going overboard
```

# Contributions

Contributions are welcome! You can fork this repository and leave a pull request

# License

Please view the [license file](./LICENSE) for information about this project's license

# Author

Made by [mrTomatolegit](https://github.com/mrTomatolegit) for use with the Patreon API that I despise
