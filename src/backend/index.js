const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./configs/database')
const morgan = require('morgan');
const userRouter = require('./routes/user')
const tourRouter = require('./routes/tour')
const app = express();

//middleware
app.use(morgan('dev'))
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

//routes
app.use('/api/v1', tourRouter);
app.use('/api/v1', userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})


