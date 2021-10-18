const { TCPClient } = require('dns2');

const resolve = TCPClient({
  dns: '1.1.1.1'
});

(async () => {
  try {
    const result = await resolve('github.com');
    console.log(result.answers);
  } catch(error) {
    console.log(error);
  }
})();