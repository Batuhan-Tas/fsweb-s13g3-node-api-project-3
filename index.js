// require your server and launch it

const server = require("./api/server");
const port = 9000;

server.listen(9000, () => {
  console.log(`Starting the development server on port ${port}`);
});
