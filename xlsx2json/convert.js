const readXlsxFile = require("read-excel-file/node");
const schema = require("./schema");

// Change these values to match your own file
const sheetName = "./hacknu-dev-data.xlsx"
const numberOfSheets = 10;

for (let i = 1; i <= numberOfSheets; i++) {
    readXlsxFile(sheetName, {schema, sheet: `dev${i}`}).then(
        ({rows, errors}) => {
            if (errors.length > 0) {
                console.log(errors);
            } else {
                for (let key in rows) {
                    if (rows[key] === "null") {
                        rows[key] = null;
                    }
                }
                console.log(rows);
            }
        }
    );
}
