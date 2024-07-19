const axios = require("axios")
const fs  = require("fs")
const cheerio = require("cheerio");
const { log } = require("console");

const pageUrl ="https://www.linkedin.com/jobs/search?trk=guest_homepage-basic_guest_nav_menu_jobs&position=1&pageNum=0";

const pageUrl2 = "https://www.guru.com/d/jobs/";


const getData = async () =>{
       try{
        console.log("data starated");

        let res = await axios.get(pageUrl2);
        let Data = res.data;

        fs.writeFileSync("data.txt",JSON.stringify(Data))
        // console.log("data saved",Data);
       }
       catch(e){
        console.log("errorres",e);
       }

}

// getData();

const pageData = fs.readFileSync("data.txt", 'utf8');

        
const $ = cheerio.load(pageData);


const titles = $(".jobRecord__title.jobRecord__title--changeVisited");

console.log(`Number of elements found: ${titles.length}`);


    const products = []

    titles.each((index,element)=>{
       const title = $(element).text();
    console.log(title);
    })

    // console.log(products);