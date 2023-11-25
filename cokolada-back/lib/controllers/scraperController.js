const performScraping = require('../scraper/Scraper');
const ScraperModel = require('../models/Scraper');

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



class ScraperController {
    async getScrapers() {
        try {
            return await ScraperModel.find();
        } catch (error) {
            console.log("lib::controllers::scrapeController.js::getScrapers\n", error);
        }
    }

    async createScrapers() {
        try {
            const linkArray = await fetchData(); // Wait for fetchData to complete

            console.log(linkArray);

            for (let link of linkArray) {
                if (await ScraperModel.findOne({ linkName: link.linkName }).exec()) {
                    console.log("Font is already in DB!");
                } else {
                    if (link.url === "undefined" || link.linkName === "undefined") {
                        console.log("Error");
                    } else {
                        await ScraperModel.create({ "url": link.url, "linkName": link.linkName });
                        console.log("Created report!");
                    }
                }
            }
        } catch (error) {
            console.log("lib::controllers::reportScraper.js::createScraper\n", error);
        }
    }
}

const scraperController = new ScraperController();
module.exports = scraperController;
