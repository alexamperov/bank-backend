const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());

// Роуты
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const dealRoutes = require('./routes/dealRoutes');
const delayRoutes = require('./routes/delayRoutes');
const payRoutes = require('./routes/payRoutes');
const dataRoutes = require('./routes/dataRoutes');

app.use('/api', userRoutes);
app.use('/api', applicationRoutes);
app.use('/api', dealRoutes);
app.use('/api', delayRoutes);
app.use('/api', payRoutes);
app.use('/api', dataRoutes)

app.listen(PORT, () => {
    console.log(process.env.EMAIL_PASS)
    console.log(`Server running on port ${PORT}`);
});