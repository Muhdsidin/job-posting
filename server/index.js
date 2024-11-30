const express = require("express")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 7777
const userRoute = require("./routes/UserRoute")
const connectDatabase = require("./config/db")

connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
   
    process.exit(1);
  });


app.use(cors());
app.use(express.json());

app.use("/user", userRoute)




app.listen(PORT, () => console.log(`Server is running on ${PORT } port`));


