const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

const db = require('./models');
const PORT = process.env.PORT || 5000;
const { notFound, errorHandler } = require("./middleware/errorMiddleware");





dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:100000}));
app.use(bodyParser.json({limit: '50mb', extended: true }));


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

/** Routes import */
const userRoutes = require("./routes/user");
const roleRoutes = require("./routes/role");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const clientRoutes = require("./routes/client");
const tableRoutes = require("./routes/table");
const orderRoutes = require("./routes/order");
const uploadRoutes = require("./routes/upload");




/** Routes */
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/upload", uploadRoutes);



const rootPath = path.resolve();

/* File folder */
app.use("/uploads", express.static(path.join(rootPath, "/uploads")));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(rootPath, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(rootPath, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}


/* Error Handlers */
app.use(notFound);
app.use(errorHandler);


app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

app.listen(4000, '192.168.1.100');

db.sequelize.sync().then(() => {
    app.listen(PORT, ()=>{
       console.log(`listening on http://localhost:${PORT}`); 
    });
});





