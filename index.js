const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crud-operation')
    .then(() => console.log('Connecting to MongoDB...'))
    .catch(error => console.error('MongoDb connection failed.', error));

