        var http = require("http");
        const fs = require('fs');
        let port =  8080;

        http.createServer(function(req,res){
                res.writeHead(200, {'Content-type' : 'text/html'});
                var url =req.url;

                if(url === '/'){
                    res.write("<form method='POST' action='/messages'> <input name='message' type='text' placeholder='type your message' > <button type='submit'>SUBMIT</button></form>");
                    res.end();
                }else if(url === '/messages' && req.method === 'POST'){
                    let body = '';

                    req.on('data', chunk => {
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        console.log(body);

                        let message = body.replace('message', '');
                        fs.writeFile('message.txt', message, err => {

                            if (err) throw err;
                            console.log('Message saved!!!');
                        });
                        res.end('Message saved!!!')
                    });
                } else {
                    res.write('<h1>Pahe Not Found</h1>');
                    res.end()
                }
            })
.listen(port, function() {
    console.log(`server running on port ${port}`);
});
