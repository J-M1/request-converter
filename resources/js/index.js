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

        //Method, URL, body etc
        let requestInfoRegex = new RegExp(`(?:NewRequest)\\\(([^)]+)\\\)`)
        if(requestInfoRegex.exec(line)) {
            requestJSON["Method"] = [...requestInfoRegex.exec(line)[1].matchAll(`["\`'](.*?)["\`'$]`)][0][1]
            
        }
    

        //Regex headers from Header.Add(key, val) or Header.Set(key, val)
        let headerSetRegex = new RegExp(`(?:Header.Set)\\\(([^)]+)\\\)`)
        let headerAddRegex = new RegExp(`(?:Header.Add)\\\(([^)]+)\\\)`)
        if(headerSetRegex.exec(line)) {
            const headerObj = [...headerSetRegex.exec(line)[1].matchAll(`["\`'](.*?)["\`']`)]
            requestJSON.Headers.push({
                [headerObj[0][1]]: headerObj[1][1]
            })
        } else if (headerAddRegex.exec(line)) {
            const headerObj = [...headerAddRegex.exec(line)[1].matchAll(`["\`'](.*?)["\`']`)]
            requestJSON.Headers.push({
                [headerObj[0][1]]: headerObj[1][1]
            })
        }


    });

    console.log(requestJSON)
}