require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { ObjectId } = require('mongodb');
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uuqn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const roomsCollection = client.db('StayEase').collection('Rooms');
    const bookingsCollection = client.db('StayEase').collection('bookings');

    // Get all rooms
    app.get('/rooms', async (req, res) => {
      const rooms = await roomsCollection.find({}).toArray();
      res.json(rooms);
    });

    // Get a specific room
    app.get('/rooms/:id', async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const room = await roomsCollection.findOne(query);
      res.json(room);
    });

    // Get all bookings
    app.get('/bookings', async (req, res) => {
      const bookings = await bookingsCollection.find({}).toArray();
      res.json(bookings);
    });

    // Post booking
    app.post('/bookings', async (req, res) => {
      const bookingData = req.body;
    
      try {
        // Insert the booking directly into the bookings collection
        const result = await bookingsCollection.insertOne(bookingData);
    
        if (result.acknowledged) {
          res.json({ success: true, message: "Room booked successfully!" });
        } else {
          res.status(500).json({ success: false, message: "Failed to book room" });
        }
      } catch (error) {
        console.error("Error while booking room:", error);
        res.status(500).json({ success: false, message: "An error occurred during booking" });
      }
    });
          
          
 // get a specific booking
 app.get('/bookings/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await bookingsCollection.findOne(query);
  res.send(result)
})
  //delete specific booking
  app.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await bookingsCollection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Booking not found" });
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
          

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.log);

app.get('/', (req, res) => {
  res.send('There are many rooms here');
});

app.listen(port, () => {
  console.log(`Server is Running at: ${port}`);
});
