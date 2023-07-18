require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const app = express();
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = 3500 || process.env.PORT;


//connect to mongodb
connectDB();


//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());


//serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/subdir', express.static(path.join(__dirname, 'public')));

//routes
app.use("/", require("./routes/root"));//home route
app.use("/subdir", require("./routes/subdir"));//subdir route
app.use("/register", require("./routes/register"));//register route
app.use("/auth", require("./routes/auth"));//authentication route
app.use("/refresh", require("./routes/refresh"))//refresh token route
app.use("/logout", require("./routes/logout"))//logout route

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));//employee route

//404 error--page not found
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if (req.type.accepts(json)){
        res.json({ error: "Page not found"});
    }
    else {
        res.type('txt').send("404 Not Found");
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });
});


