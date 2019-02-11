import inquirer, { Questions } from "inquirer";
import { parser } from "../../parser/src/index";
import { questions, Answer } from "./questions";
import fs from "fs";
import { resolve } from "path"

interface File {
  isFile: boolean;
  name: string;
  size: number;
}

const init = async (questions: Questions) => {
  const input = await inquirer.prompt<Answer>(questions);
  const parsedData = parser(input.query);
  const files = walk(parsedData.field, parsedData.path);
  show(files);
}
init(questions);

const walk = (_field: string, path: string): File[] => {
  const filenames = fs.readdirSync(resolve(process.cwd(), path));
  return filenames.map((filename) => {
    const stats = fs.statSync(resolve(process.cwd(), path + filename))
    return ({
      isFile: stats.isFile(),
      name: filename,
      size: stats.size
    })
  })
}

const show = (files: File[]) => {
  console.table(files);
}