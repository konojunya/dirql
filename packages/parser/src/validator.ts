import fs from 'fs';
import { resolve } from 'path';
import { ParsedInput } from './';

// expect
const expectCommands = ['select'];
const expectKeys = ['from'];
const expectFields = ['*', 'name', 'size', 'name,size', 'size,name'];

export const validate = (q: string[]): ParsedInput => {
  // expect command length 4
  if (q.length !== 4) {
    console.error('The command syntax is incorrect.\nExample: select * from ./');
    process.exit(1);
  }

  const [command, field, key, path] = q;

  // expect command
  if (!isExpectCommandType(command)) {
    console.error(`invalid command ${command}`);
    process.exit(1);
  }

  // expect field
  if (!isExpectFieldType(field)) {
    console.error(`invalid field ${field}`);
    process.exit(1);
  }

  // expect key
  if (!isExpectKeyType(key)) {
    console.error(`invalid key ${key}`);
    process.exit(1);
  }

  if (!isValidPath(path)) {
    console.error(`invalid path ${path}`);
    process.exit(1);
  }

  return {
    command,
    field,
    key,
    path,
  };
};

const isExpectCommandType = (command: string): boolean => {
  return !!expectCommands.find((c) => c === command);
};

const isExpectKeyType = (key: string): boolean => {
  return !!expectKeys.find((k) => k === key);
};

const isExpectFieldType = (field: string): boolean => {
  return !!expectFields.find((f) => f === field);
};

const isValidPath = (path: string): boolean => {
  let inValid = false;

  const filePath = resolve(process.cwd(), path);

  fs.stat(filePath, (err) => {
    if (err) {
      inValid = true;
    }
  });

  return !inValid;
};
