import http from "http"
import fs from 'fs';

const server= http.createServer(function (req, res) {
    res.writeHead(200,{'Content-Type':'text/plain'}); 
    res.end("server created"); 
  });
  server.listen(5000, ()=>{
    console.log("seerver is runnimg in the port")
  })



  fs.writeFile('example.txt', 'Hello World!', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File written successfully!');
  });
