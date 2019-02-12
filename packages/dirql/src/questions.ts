import { Questions } from 'inquirer';

export const questions: Questions = [
  {
    type: 'input',
    name: 'query',
    message: 'dirql>',
  },
];

export interface Answer {
  query: string;
}
