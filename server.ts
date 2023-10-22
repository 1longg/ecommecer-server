import app from "./src/app";
require('dotenv').config()

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...")
})
