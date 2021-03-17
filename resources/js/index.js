//const { newRequestToCurl, curlToNewRequest } = require('../../converters/go/newrequest')

document.getElementById('inputBox').addEventListener('input', e => {
    const inputFramework = document.getElementById("inputFramework").value
    const outputFramework = document.getElementById("outputFramework").value

    newRequestToJSON(e.target.value)
});

function newRequestToJSON(input) {

    var requestJSON = {
        Headers: []
    }


    input.split(`\n`).forEach(line => {
        let requestInfoRegex = new RegExp(`(?:NewRequest)\(([^)]+)\)`)
        requestInfoRegex.exec(line) ? console.log(requestInfoRegex.exec(line)[1]) : null
    
        let headerInfoRegex = new RegExp(`(?:Header.Set)\(([^)]+)\)`)
        headerInfoRegex.exec(line) ? console.log(headerInfoRegex.exec(line)[1]) : null
    });

    console.log(requestJSON)
}