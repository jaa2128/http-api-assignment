const responses = {
    'success' : {
        message: 'This is a successful response'
    },
    'badRequest1' : {
        message: 'Missing valid query set to true',
        id: 'badRequest'
    },
    'badRequest2' : {
        message: 'This request has the required parameters'
    },
    'unauthorized1' : {
        message: 'Missing loggedIn query parameter set to yes',
        id: 'unauthorized'
    },
    'unauthorized2' : {
        message: 'You have successfully viewed the content.'
    },
    'forbidden' : {
        message: 'You do not have access to this content',
        id: 'forbidden'
    },
    'internalError' : {
        message: 'Internal Server Error. Something went wrong',
        id: 'internalError'
    },
    'notImplemented' : {
        message: 'A get request for this page has not been implemented yet. Check again later for updated content',
        id: 'notImplemented'
    },
    'notFound' : {
        message: 'The page you are looking for was not found',
        id: 'notFound'
    }

}

const respondJSON = (request, response, status, object) => {
    
    const content = JSON.stringify(object);

    console.log(content);

    // Set Headers including the type and length
    response.writeHead(status, {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    });


    response.write(content);
    response.end();
}

// converts JSON to XML 
// (Hard coded could be improved, wasn't sure of easier method)
const respondXML = (request, response, status, object) =>{
    let content = `<response>`;
    content += `<message>${object.message}</message>`;

    if(object.id){
        content += `<id>${object.id}</id>`;
    }

    content += `</response>`;

    console.log(content);

    response.writeHead(status, {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(content, 'utf8'),
    })

    response.write(content);
    response.end();
}

const success = (request, response) => {
    if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 200, responses['success']);
    }

    return respondJSON(request, response, 200, responses['success']);

}

const badRequest = (request, response) => {
    // if the ?valid query is not true or there is no query
    if(request.query.valid != 'true' || !request.query){

        //if the the requested type is xml, respond with xml
        if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 400, responses['badRequest1']);
    }

    // Otherwise send JSON
    return respondJSON(request, response, 400, responses['badRequest1']);
    }

    // If the valid query is true
    else if(request.query.valid == 'true'){

         //if the the requested type is xml, respond with xml
        if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 200, responses['badRequest2']);
    }

    // Otherwise send JSON
    return respondJSON(request, response, 200, responses['badRequest2']);
    }
}

const unauthorized = (request, response) => {
     // if the ?valid query is not true or there is no query
    if(request.query.loggedIn != 'yes' || !request.query){

        //if the the requested type is xml, respond with xml
        if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 401, responses['unauthorized1']);
    }

    // Otherwise send JSON
    return respondJSON(request, response, 401, responses['unauthorized1']);
    }

    // If the valid query is true
    else if(request.query.loggedIn == 'yes'){

         //if the the requested type is xml, respond with xml
        if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 200, responses['unauthorized2']);
    }

    // Otherwise send JSON
    return respondJSON(request, response, 200, responses['unauthorized2']);
    }
}

const forbidden = (request, response) => {
     if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 403, responses['forbidden']);
    }

    return respondJSON(request, response, 403, responses['forbidden']);

}

const internal = (request, response) => {
    if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 500, responses['internalError']);
    }

    return respondJSON(request, response, 500, responses['internalError']);

}

const notImplemented = (request, response) => {
    if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 501, responses['notImplemented']);
    }

    return respondJSON(request, response, 501, responses['notImplemented']);
}

const notFound = (request, response) => {
    if(request.acceptedTypes[0] === 'text/xml'){
        return respondXML(request, response, 404, responses['notFound']);
    }

    return respondJSON(request, response, 404, responses['notFound']);

}

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound
}