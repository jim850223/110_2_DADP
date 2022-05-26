const express = require("express");
const app = express()
port = 3000

/* app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log("WE GOT !")
  }) */

app.use((req, res) =>{
    //console.log(req)
    //console.dir(req)
    console.log([1,2])
    console.dir([1,2])
}) 

app.listen(port, () => {
    console.log("LISTENING ON PORT 3000!")
})