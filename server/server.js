const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use('/news', routes);

app.use(bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 500000
}));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`)
});