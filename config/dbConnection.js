const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        const connecting = await mongoose.connect(process.env.MONGO_URI, { // optional
            useNewUrlParser: true, //→ uses new URL parser to avoid deprecation warnings.
            useUnifiedTopology: true, //→ uses new server discovery/monitoring engine (recommended by MongoDB).
        });
        console.log(`✅ MongoDB Connected: ${connecting.connection.host}, 🚀 DB URL: ${process.env.MONGO_URI}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
}


module.exports = dbConnection; //export default dbConnection;