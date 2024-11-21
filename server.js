
const http = require('http');
const fs = require('fs');
const path = require('path');

//Function to serve files
function serverFile(res, filePath, contentType){
  fs.readFile(filePath, (err, content)=>{
    if(err){
      //If the file isn't found. 404
      if(err.code === 'ENOENT'){
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
      } else {
        //Some server error
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');

      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}



const server = http.createServer((req, res) => {
  let url = req.url.toLowerCase();

  console.log(`Requested URL: ${url}`);

  // Remove query strings and fragments
  url = url.split('?')[0].split('#')[0];

  // If URL ends with '/', serve 'index.html'

  if (url.endsWith('/')) {
    url += 'index';
  }

  // Default content type
  let contentType = 'text/html';
  
  // Handle image requests
  if (url.startsWith('img/')){
    contentType = 'image/jpeg';


  }

  // Build file path
  let filePath = path.join(__dirname, url);

  // Check if the file exists
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      // File exists, serve it
      serverFile(res, filePath, contentType);
    } else {
      // For non-image files, try adding '.html' extension
      if (!url.startsWith('/img/')) {
        filePath += '.html';

        fs.stat(filePath, (err2, stats2) => {
          if (!err2 && stats2.isFile()) {
            // File exists with '.html', serve it
            serverFile(res, filePath, 'text/html');
          } else {
            // File doesn't exist, send 404
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          }
        });
      } else {
        // For images, send 404 if not found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



