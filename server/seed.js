const { execSync } = require("child_process")

const DB_NAME = "ShoeStoreDB"

try{
    execSync(`mongoimport --db ${DB_NAME} --collection shoes --file "${process.cwd()}/seedData.json" --jsonArray`);
    console.log("Data Imported to database ", +DB_NAME)
} catch(e){
    console.log(`Data could not be imported to ${DB_NAME}`)
    console.log("------error----- ", e)
}