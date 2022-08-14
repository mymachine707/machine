const { json } = require('express')
const fs = require('fs')

function saveFile(data, fileName) {
    let stringSource = JSON.stringify(data, null, "\t")
    fs.writeFile(fileName, stringSource, err => {
        if(err) console.log(err)
    }) 
}

function readFile(fileName) {
    let rowDate = fs.readFileSync(fileName, 'utf8');
    let jsonDate = JSON.parse(rowDate)
    return jsonDate
}

module.exports = {
    saveFile,
    readFile
}