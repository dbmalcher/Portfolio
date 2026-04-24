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

let buffer = '';
const messages = [];

const req = http.request(options, (res) => {
  res.on('data', (chunk) => {
    buffer += chunk.toString();
  });
  
  res.on('end', () => {
    const lines = buffer.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const json = JSON.parse(line.slice(6));
          messages.push(json);
        } catch (e) {}
      }
    }
    
    console.log('=== MESSAGES ===');
    for (const msg of messages) {
      if (msg.error) {
        console.log('ERROR:', JSON.stringify(msg.error, null, 2));
      } else if (msg.result) {
        console.log('SUCCESS');
        console.log(JSON.stringify(msg.result, null, 2).substring(0, 1000));
      }
    }
    process.exit(0);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
  process.exit(1);
});

// Try calling a tool directly without listing first
// Common Figma MCP tools include: get_figma_data, get_code, etc.
req.write(JSON.stringify({
  jsonrpc: '2.0',
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'opencode', version: '1.0' }
  },
  id: 1
}));

setTimeout(() => {
  // Try calling a tool - let's try to get file data
  req.write(JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: 'get_figma_data',
      arguments: { url: 'https://www.figma.com/design/r8wb2b9YjJFTHYNOhJBrZG/Portfolio-2.0?node-id=70-335' }
    },
    id: 2
  }));
}, 100);

setTimeout(() => {
  req.end();
}, 3000);
