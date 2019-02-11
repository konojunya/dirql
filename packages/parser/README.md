# dirql-parser

dirql's parser

[github.com/konojunya/dirql](https://www.npmjs.com/package/dirql)

## Usage

```js
const { parser } = require('dirql-parser');
```

# API

## parser(query: string): ParsedInput

example query:

```
select * from ./
```

## ParsedInput interface

```ts
interface ParsedInput {
  command: string;
  field: string;
  key: string;
  path: string;
}
```