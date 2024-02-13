
import app from "./index.js";
import {connectToMongoDB} from "./src/config/mongodb.js";


const port = 3000;

app.listen(port,()=>{
    console.log("server is ported on "+ port);
    connectToMongoDB();
    
})