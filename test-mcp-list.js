const http = require('http');

const req = http.request({
  hostname: '127.0.0.1',
  port: 3845,
  path: '/mcp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream'
  }
}, (res) => {
  res.on('data', (chunk) => console.log(chunk.toString()));
  res.on('end', () => process.exit(0));
});

req.on('error', (e) => { console.error('ERR:', e.message); process.exit(1); });

// Initialize
req.write('{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}},"id":1}');

// List tools after a small delay
setTimeout(() => {
  req.write('{"jsonrpc":"2.0","method":"tools.list","params":{},"id":2}');
  req.end();
}, 100);

setTimeout(() => { console.log('T/O'); process.exit(0); }, 5000);