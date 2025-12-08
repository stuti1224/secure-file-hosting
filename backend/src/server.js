require("dotenv").config();
const connectDB = require("./utils/db");
const app = require("./app");

connectDB();

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
