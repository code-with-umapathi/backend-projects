require("dotenv").config();
const app = require("./app");
const { testConenction } = require("./config/db");
const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await testConenction();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    } catch (err) {
        console.log("Failed to connect MYSQL");
        process.exit(1);
    }
}
start();