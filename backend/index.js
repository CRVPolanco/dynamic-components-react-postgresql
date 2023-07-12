const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes');
const { errorHandler, boomErrorHandler } = require('./middlewares/errors.handler');

app.use(cors());
app.use(express.json());

app.use(errorHandler);

apiRouter(app);

app.listen(3000, () => console.log('App running at port 3000'));
