const express = require("express");
const {createServer} = require('http');
const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

const server = createServer(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
