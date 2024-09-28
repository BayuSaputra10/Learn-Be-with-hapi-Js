const http = require('http');
const requestListener = (request,response) => {
    // response.setHeader('Content-Type', 'text/html');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const { method, url } = request;


    if(url === '/') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({message: 'Ini Halaman Home'}));
        } else {
            response.statusCode = 400;
            response.end(JSON.stringify({message: 'Halaman Tidak dapat diakses dengan method ' + method}));
        }
        
    }else if(url === '/about') {
        if(method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({message: 'Halaman About'}));
        }else if(method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            })
            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 400;
                response.end(JSON.stringify({message: 'Hai, ' + name + 'Ini adalah Halaman About'}));
            })
        }
    } else {
        response.statusCode = 404;
        response.end(JSON.stringify({message: 'Halaman Tidak ditemukan'}));
    }
    
//     if (method === 'GET') {
//         response.end('<h1>Hello GET</h1>');
        
//     } else if (method === 'POST') {
//         let body = [];

//         request.on('data', (chunk) => {
//             body.push(chunk);
//         })
//         request.on('end', () => {
//             body = Buffer.concat(body).toString();
//             const { name } = JSON.parse(body);
//             response.end(`<h1>Hai, ${name}</h1>`);
//         })
// } else if (method === 'PUT') {
//     response.end('<h1>Method PUT</h1>');
// } else if (method === 'DELETE') {
//     response.end('<h1>Method DELETE</h1>');
// } else {
//     response.end('<h1>Method Not Allowed</h1>');
// }
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})