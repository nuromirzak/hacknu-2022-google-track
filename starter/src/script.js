const data = require("./data.js");

const getNames = (data) => {
    let names = [];
    for (let key in data) {
        console.log(key);
    }
    return names;
}

const names = getNames(data);

const names = getNames(data);

let names = document.getElementById("append-lastLocation")
let newName = document.createElement("li")
let link = document.createElement("a")
link.setAttribute("href", "#")
link.setAttribute("className", "btn d-flex justify-content-between")
let div = document.createElement("div")
div.setAttribute("style", "margin-right: 50px;")
link.push(div)
let theName = document.createElement("b")
theName.innerHTML = 'Alice'
names.push(theName)





    //it was supposed to get the names from the parsed data.js
