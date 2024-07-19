const express = require("express");
const puppeteer = require("puppeteer");


// const app = express();

(async ()=>{

    // launch the browser
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage()
  await page.goto("https://www.naukri.com/it-jobs?src=gnbjobs_homepage_srch")

    // Set Screen Size
    await page.setViewport({width:1080,height:1024});


    
    //Take Screenshot
    // await page.screenshot({path:"flipkart.png"})
    
    //Create PDF
   try{
    await page.pdf({path:"flipkar.pdf",format:"A4"})
   } 
   catch(e){
    console.log("error paras",e);
   }
 

    //
    
    // Close the browser
    // await browser.close()

})()


// app.listen(8080,()=>{
//     console.log("Server is up at port no 8080");
// })