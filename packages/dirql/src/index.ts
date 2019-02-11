import inquirer, { Questions } from "inquirer";
import { parser } from "../../parser/src/index";
import { questions, Answer } from "./questions";

const init = async (questions: Questions) => {
  const input = await inquirer.prompt<Answer>(questions);
  parser(input.query);
}
init(questions);