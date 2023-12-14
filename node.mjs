import express from 'express'; 
import jsonRouter  from 'express-json-rpc-router'; 
import ethers  from "ethers";
//import ethereum  from "./ethereum.json";
import fs from "fs"; 

const provider = new ethers.providers.JsonRpcProvider(); 
const signer = provider.getSigner()

const bal = await provider.getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
const balance = ethers.utils.formatEther(bal)
//console.log(balance)

const tx = await signer.sendTransaction({
   to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
   value: ethers.utils.parseUnits("0.001", "ether"),
 });

const receipt = await tx.wait();
//console.log("receipt", receipt)

const app = express()

app.get("/getuser", function(req, res){
  fs.readFile(__dirname + "/" + "ethereum.json", "utf8", function(err, data){
    console.log(data);
    res.end(data)
  })
})
app.listen(3000, () => console.log('Example app listening on port 3000'))
