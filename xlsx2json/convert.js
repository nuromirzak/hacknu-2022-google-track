const readXlsxFile = require("read-excel-file/node");
const schema = require("./schema");
const fs = require("fs");
const data = [];

// Change these values to match your own file
const sheetName = "./hacknu-prod-data.xlsx"
const numberOfSheets = 5;

for (let i = 1; i <= numberOfSheets; i++) {
    readXlsxFile(sheetName, {schema, sheet: `prod${i}`}).then(
        ({rows, errors}) => {
            if (errors.length > 0) {
                console.log(`Errors in sheet ${i}:`);
                console.log(errors);
            } else {
                for (let key in rows) {
                    if (rows[key] === "null") {
                        rows[key] = null;
                    }
                }
                console.log(`Sheet ${i} read successfully`);
                data.push(rows);
            }
        }
    );
}

console.log(data);

// Save data to a file
setTimeout(() => {
    fs.writeFile("../starter/src/data.js", `export let data = `+JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data saved successfully");
        }
    });
}, 3000);