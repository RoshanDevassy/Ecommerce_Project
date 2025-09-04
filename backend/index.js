require('dotenv').config()

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CartMiddleware = require("./middlewares/CartMiddleware");

const app = express();
const PORT = process.env.PORT;


app.use(cors({
  origin: [process.env.FRONTEND_URI, 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "1234";

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/* async function connectDB() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error)
    process.exit(1);
  }
}

connectDB() */

app.get('/', (req, res) => {
  res.send("Connected")
})

/* User API */



app.post('/signup/user', async (req, res) => {
  const user_collection = client.db("ecommercedb").collection("users");

  const { username, password } = req.body;
  console.info("u & p :", username, password)

  if (!username || !password) return res.status(401).json('UserName or Password Not Entered!!!')

  const findUser = await user_collection.findOne({ username })
  console.info("Find User :", findUser)
  if (findUser) return res.status(401).json({ message: "User Already Found" })

  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await user_collection.insertOne({ username, password: hashedPassword, role: "user" })
  if (!response.acknowledged) return res.status(401).json({ message: "Not Signed Up" })

  res.status(201).json({ message: "User Created" })
})

app.post('/signup/admin', async (req, res) => {

  const user_collection = client.db("ecommercedb").collection("users");

  const { username, password } = req.body;
  console.info("u & p :", username, password)

  if (!username || !password) return res.status(401).json('UserName or Password Not Entered!!!')

  const findUser = await user_collection.findOne({ username })
  console.info("Find User :", findUser)
  if (findUser) return res.status(401).json({ message: "User Already Found" })

  const hashedPassword = await bcrypt.hash(password, 10);
  const response = await user_collection.insertOne({ username, password: hashedPassword, role: "admin" })
  if (!response.acknowledged) return res.status(401).json({ message: "Not Signed Up" })

  res.status(201).json({ message: "User Created" })
})

app.post('/login/user', async (req, res) => {

  try {

    const user_collection = client.db("ecommercedb").collection("users");

    const { username, password } = req.body;

    const findUser = await user_collection.findOne({ username })
    console.info("Login Find User :", findUser)
    if (!findUser) return res.status(401).json({ message: "User Not Found" })

    console.info("pass :", password, findUser.password)
    const findPass = await bcrypt.compare(password, findUser.password)
    console.info("Find Pass :", findPass)
    if (!findPass) return res.status(401).json({ message: "Password not Matched" });

    const token = jwt.sign({
      id: findUser._id, role: findUser.role
    },
      SECRET_KEY, {
      expiresIn: "1h"
    })

    console.info(`TOKEN : ${token}`)

    res.json({ token, user: { id: findUser._id, name: findUser.username, role: findUser.role } })
  } catch (error) {
    res.status(401).json({ error })
    console.warn("Error :", error)
  }
})

/* Products api */


app.post('/admin/addproduct', async (req, res) => {


  const products_collection = client.db("ecommercedb").collection("products");

  const data = req.body;
  const response = await products_collection.insertOne(data);
  const find = await products_collection.find().sort({ _id: -1 }).limit(1).toArray()
  res.status(201).json(find[0])
});

app.get('/getproducts', async (req, res) => {


  const products_collection = client.db("ecommercedb").collection("products");

  const response = products_collection.find();
  const response_toarray = await response.toArray()
  res.send(response_toarray);
})

app.put('/admin/updateproduct/:id', async (req, res) => {

  const products_collection = client.db("ecommercedb").collection("products");

  const id = req.params.id;
  const data = req.body;
  console.info("id :", id)

  console.info("data :", data)
  const response = await products_collection.updateOne({ _id: new ObjectId(id) }, { $set: data });

  res.send(response);
})

app.delete('/admin/deleteproduct/:id', async (req, res) => {

  const products_collection = client.db("ecommercedb").collection("products");

  const id = req.params.id;
  const response = await products_collection.deleteOne({ _id: new ObjectId(id) });
  res.send(response)
})


//Cart API


app.post('/addtocart', CartMiddleware, async (req, res) => {

  const cart_collection = client.db("ecommercedb").collection("cartitems");

  const data = req.body;
  console.info(`DATA :${JSON.stringify(data)}`)

  const userId = req.user.id

  const find_item = await cart_collection.findOne({ userID: new ObjectId(userId), _id: data._id })

  if (find_item) return res.status(400).json({ error: "Item already inserted" })

  const response = await cart_collection.insertOne({ ...data, userID: new ObjectId(userId) });

  if (!response.acknowledged) return res.status(400).json({ error: "Cart item not inserted" })

  console.info(`Cart POST : ${JSON.stringify(response)}`)

  const inserted_Id = response.insertedId

  const get = await cart_collection.findOne({ userID: new ObjectId(userId), _id: inserted_Id })

  if (!get) return res.status(404).json({ error: "Added item not found" })

  res.status(201).json(get)
})

app.get('/getcartitems', CartMiddleware, async (req, res) => {

  const cart_collection = client.db("ecommercedb").collection("cartitems");

  const response = await cart_collection.find({ userID: new ObjectId(req.user.id) }).toArray();

  console.info(`Cart Data of user id ${req.user.id} : ${JSON.stringify(response)}`)
  res.send(response);
})

app.delete('/deletecartitem/:id', CartMiddleware, async (req, res) => {

  const cart_collection = client.db("ecommercedb").collection("cartitems");

  const id = req.params.id;
  console.info("Cart item received id :", id)

  const finditem = await cart_collection.findOne({ _id: id, userID: new ObjectId(req.user.id) })
  console.info("product exists ? :", finditem)

  if (!finditem) {
    return res.status(400).json({ error: "No item Found to delete" })
  }

  const response = await cart_collection.deleteOne(finditem);
  console.info("response :", response)

  if (response.deletedCount === 0) {
    return res.status(404).json({ message: "No cart item found to delete" });
  }

  res.status(200).json({ userID: finditem.userID, _id: finditem._id })
})



/* app.listen(PORT, () => console.info(`Connected Port : ${PORT}`)); */

module.exports = app;



