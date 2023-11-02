import app from "./index.js";
const port = 8000;
import { chatServer } from "./index.js";



app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
})

chatServer.listen(5000);
console.log('chat server is listening on port 5000');
