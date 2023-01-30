const express = require("express")
const path = require("path")

const app = express()

require("./config/mongo.config")
const cors = require("cors");
app.use(cors({ origin: "*" }));


const routes = require("./routes/index")
app.use("", routes)
app.use('/uploads', express.static('public'));


app.use((err: any, req: any, res: any, next: any) => {
    let status_code = err?.status || 500;
    let msg = err?.msg || "Errorr";
    res.status(status_code).json(
        {
            result: null,
            status: false,
            msg: msg
        }
    )
})



app.listen(3003, "localhost", (err: any) => {
    if (err) {
        console.log("Error connecting server")
    } else {
        console.log("Server connected to port 3003")
        console.log("Press Ctrl + C to end the connection")
    }
})

export { }