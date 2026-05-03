const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 3845,
  path: '/mcp',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/event-stream'
  }
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  res.on('data', (chunk) => { console.log('Data:', chunk.toString().substring(0, 300)); });
  res.on('end', () => { console.log('End'); });
});

req.on('error', (e) => { console.error('Error:', e.message); });

req.write(JSON.stringify({
  jsonrpc: '2.0',
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'test', version: '1.0' }
  },
  id: 1
}));

setTimeout(() => {
  req.write(JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/list',
    params: {},
    id: 2
  }));
}, 500);

setTimeout(() => { console.log('Timeout'); process.exit(0); }, 4000);