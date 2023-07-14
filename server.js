const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;
const frontEndRotes = require("./routes/frontEndRoutes");
const apiRoutes = require("./routes/apiRotes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use("/api", apiRoutes)
app.use('/', frontEndRotes)

app.listen(PORT,() => {
    console.log('Server started at http://localhost:' + PORT);
})