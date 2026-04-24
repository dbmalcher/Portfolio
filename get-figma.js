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
  res.on('data', (chunk) => {
    const data = chunk.toString();
    if (data.startsWith('data: ')) {
      try {
        const msg = JSON.parse(data.slice(6));
        console.log(JSON.stringify(msg, null, 2));
      } catch (e) {}
    }
  });
  res.on('end', () => process.exit(0));
});

req.on('error', (e) => { console.error('ERR:', e.message); process.exit(1); });

req.write('{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}},"id":1}');
req.end();

setTimeout(() => { 
  const req2 = http.request({
    hostname: '127.0.0.1',
    port: 3845,
    path: '/mcp',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream'
    }
  }, (res) => {
    res.on('data', (chunk) => {
      const data = chunk.toString();
      if (data.startsWith('data: ')) {
        try {
          const msg = JSON.parse(data.slice(6));
          console.log(JSON.stringify(msg, null, 2));
        } catch (e) {}
      }
    });
    res.on('end', () => process.exit(0));
  });
  
  req2.on('error', (e) => { console.error('ERR:', e.message); process.exit(1); });
  
  req2.write(JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: 'get_figma_data',
      arguments: { url: 'https://www.figma.com/design/r8wb2b9YjJFTHYNOhJBrZG/Portfolio-2.0?node-id=70-335' }
    },
    id: 2
  }));
  req2.end();
}, 2000);

setTimeout(() => { console.log('T/O'); process.exit(0); }, 10000);