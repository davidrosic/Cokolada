const {performScraping, performScrapingAdvanced} = require('../scraper/Scraper');
const ScraperModel = require('../models/Scraper');

const fetchData = async () => {
  try {
    let linkJSON = [];
    const links = await performScraping();
    const uniqueArray = [...new Set(links)];
    const linksAdvanced = await performScrapingAdvanced();
    const uniqueArrayAdvanced = [...new Set(linksAdvanced)];

	const processLinks = (link) => {
		try {
			const parts = link.split('/');
			const linkName = parts[parts.length - 2];
			linkJSON.push({url:link, linkName:linkName});
		} catch (err) {
			linkJSON.push({url:link, linkName: "Unknown"});
		}
	};

	uniqueArrayAdvanced.forEach(link => {
		let linkName = processLinks(link);
        linkJSON.push({url:link, linkName:linkName});
    });

    uniqueArray.forEach(link => {
		let linkName = processLinks(link);
        linkJSON.push({url:link, linkName:linkName});
    });

    return linkJSON;
  } catch (error) {
    console.error("Error:", error.message);
    throw error; 
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
			const linkArray = await fetchData();
			for (let link of linkArray) {
				console.log(link);
				if (await ScraperModel.findOne({ linkName: link.linkName }).exec()) {
					console.log("Font is already in DB!");
				} else {
					if ( link.url === undefined || link.linkName === undefined || link.url === "" || link.linkName === "" ) {
						console.log("Error");
					} else {
						await ScraperModel.create({ "url": link.url, "linkName": link.linkName });
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
