const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middle ware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y8f6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    console.log('MongoDB connected');
    const serviceCollection = client.db('doctors_portal').collection('appointmentServices');
   
    app.get('/appointment', async(req, res) => {
      const query = {};
      const cursor =  serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    })

  }
  finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
    console.log(port);
})