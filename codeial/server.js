import app from "./index.js";
const port = 8000;


app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
})