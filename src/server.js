// http and handlers
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
// Port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCss,
    '/success': htmlHandler.getResponse,
    '/badRequest': htmlHandler.getResponse,
    '/unauthorized': htmlHandler.getResponse,
    '/forbidden': htmlHandler.getResponse,
    '/internal': htmlHandler.getResponse,
    '/notImplemented': htmlHandler.getResponse,
    index: htmlHandler.getIndex
};

const onRequest = (request, response) => {
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

    request.query = Object.fromEntries(parsedUrl.searchParams);

    if(request.headers.accept){
        request.acceptedTypes = request.headers.accept.split(',');
    }

    const handler = urlStruct[parsedUrl.pathname];
    if(handler){
        handler(request, response);
    } 
    else{
        urlStruct.index(request, response);
    }
};

// Create Server 
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});
