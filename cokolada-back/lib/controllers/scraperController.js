const performScraping = require('../scraper/Scraper');
const ScraperModel = require('../models/Report');

const fetchData = async () => {
  try {

    let linkJSON = [];
    const links = await performScraping();
    const uniqueArray = [...new Set(links)];
    uniqueArray.forEach(link => {
        
        let linkName = processLinks(link);
        linkJSON.push({url:link, linkName:linkName});

    })
    //console.log(linkJSON);
    return linkJSON; 
  } catch (error) {
    console.error("Error:", error.message);
    throw error; 
  }
};

const processLinks = (link) => {
  try {
      const parts = link.split('/');

      if (parts.length >= 2) {
        return parts[parts.length - 2];
      } else {
        return "Unknown";
      }
    
    //console.log(parts);
  } catch (error) {
    console.error("Error processing links:", error.message);
  }
};

fetchData();

class ScraperController {
    async getScrapers() {
        try{
            return await ScraperModel.find();
        } catch(error) {
            console.log("lib::controllers::scrapeController.js::getScrapers\n",error);
        }
    };

    async createScrapers() {
        try{
            const url = linkJSON.url;
            const linkName = linkJSON.linkName;

            if(await ScraperModel.findOne({linkName: linkName}).exec()){
                return "Font is already in DB!"
            } else {

                if(url==="undefined" || linkName==="undefined"){
                    return "Error"
                } else {
                    await ScraperModel.create({"url": url, "linkName": linkName});
                    return "Created report!";
                }

            }


        } catch(error) {
            console.log("lib::controllers::reportScraper.js::createScraper\n",error);
        }
    }
}