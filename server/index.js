const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');
const massive = require('massive');
require('dotenv').config();


const app= express();
app.use( express.json() );
// app.use( express.static( __dirname + '/../public/build' ) );

massive({
    host: 'ec2-35-173-94-156.compute-1.amazonaws.com',
    port: 5432,
    database: 'ddpv3ca9fjkv67',
    user: 'xzemxrwexpuqyp',
    password: '84f8987a407e95de6b8d2f9c356cb7b912bf09b4097529d02c282c83cffe6b99',
    ssl: {rejectUnauthorized: false}
  })
.then(db=>{
    app.set("db", db);
    console.log('db connected')
})
.catch(err => console.log(err))

app.get('/api/inventory', controller.read)
app.post('/api/inventory', controller.create)
app.delete('/api/inventory/:id', controller.delete)
app.put('/api/inventory/:id', controller.update)
app.get('/api/inventory/:id', controller.getOne)

const port = process.env.PORT ;

app.listen(4444, () => {
    console.log(`Server listening at localhost:4444`);
});