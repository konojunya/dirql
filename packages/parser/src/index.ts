import { validate } from './validator';

export interface ParsedInput {
  command: string;
  field: string;
  key: string;
  path: string;
}

/**
 * query is like this
 * `select * from ./`
 */
export const parser = (query: string): ParsedInput => {
  const splitedQuery = query.split(' ');
  return validate(splitedQuery);
};
