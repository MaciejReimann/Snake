const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();

// Set static folder
app.use(express.static(path.resolve(__dirname, '../client/public')));

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
