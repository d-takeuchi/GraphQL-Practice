const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const config = require("./config/dev");
const cors = require("cors");

const app = express();

app.use(cors());
mongoose.connect(config.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open',()=>{
  console.log("db connected")
})

app.use("/graphql",graphqlHTTP({
  schema,
  graphiql:true
}));

app.listen(4000,()=>{
  console.log("listening port 4000");
})