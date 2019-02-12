import inquirer, { Questions } from "inquirer";
import pkg from "../package.json";
import program from "commander";
import colors from "colors-cli";
import { parser } from "../../parser/src/index";
import { Answer, questions } from "./questions";
import fs from "fs";
import { resolve } from "path"

interface File {
  name?: string;
  size?: number;
}

enum FieldType {
  Name,
  Size,
  NameAndSize,
  All
}

const init = async (questions: Questions) => {
  const input = await inquirer.prompt<Answer>(questions);
  const parsedData = parser(input.query);
  const files = walk(parsedData.field, parsedData.path);
  show(files);
  init(questions);
}
// init(questions);

const walk = (field: string, path: string): File[] => {
  const fieldType = mapField(field);
  const filenames = fs.readdirSync(resolve(process.cwd(), path));
  return filenames.map((filename) => {
    const stats = fs.statSync(resolve(process.cwd(), `${path}/${filename}`));

    // common file info
    const file: File = {}

    switch (fieldType) {
      case FieldType.Name:
        return ({
          ...file, ...{
            name: filename
          }
        });
      case FieldType.Size:
        return ({
          ...file, ...{
            size: stats.size
          }
        });
      case FieldType.NameAndSize:
        return ({
          ...file, ...{
            name: filename,
            size: stats.size
          }
        });
      case FieldType.All:
        return ({
          ...file, ...{
            name: filename,
            size: stats.size
          }
        });
    }
  })
}

const mapField = (field: string): FieldType => {
  switch (field) {
    case "name":
      return FieldType.Name;
    case "size":
      return FieldType.Size;
    case "name,size":
    case "size,name":
      return FieldType.NameAndSize;
    default:
      return FieldType.All;
  }
}

const show = (files: File[]) => {
  console.table(files);
}

// version
program.version(pkg.version, "-v, --version")

// help
program.on("--help", () => {
  console.log("");
  console.log("Examples:");
  console.log(` dirql> select * from ./\t${colors.black_bt("// display all field")}`);
  console.log(` dirql> select name from ./\t${colors.black_bt("// display name field")}`);
  console.log(` dirql> select name from /usr\t${colors.black_bt("// display absolute path")}`);
});
program.action(() => {
  init(questions);
})

program.parse(process.argv);