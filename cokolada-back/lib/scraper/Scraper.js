const cheerio = require("cheerio");
const axios = require("axios");


const performScraping = async () => {
    try {
        const axiosResponse = await axios.request({
            method: "GET",
            url: "https://fontesk.com/tag/cyrillic/",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            }
        });
        const $ = cheerio.load(axiosResponse.data);
        const links = [];
        const aElements = $('a');

        const regex = /font\/$/;
        aElements.each((index, element) => {
            const hrefValue = $(element).attr('href');
            if (hrefValue && regex.test(hrefValue)) { links.push(hrefValue); }
        });

        return links;
    } catch (error) {
        console.error("Error performing scraping:", error.message);
    }
};

const performScrapingAdvanced = async () => {
    try {
        const axiosResponse = await axios.request({
            method: "GET",
            url: "https://www.tipometar.org/tipometar/Fontovi.html",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
            }
        });
        const uri = "https://www.tipometar.org/tipometar/";
        const $ = cheerio.load(axiosResponse.data);

        const links = [];
        const aElements = $('a');
        const regex = /\/.*\/.*\//;
        aElements.each((index, element) => {
            const hrefValue = $(element).attr('href');
            if (hrefValue && hrefValue.endsWith('.html') && regex.test(hrefValue)) {
                links.push(uri+hrefValue);
            }
        });
        return links;
    } catch (error) {
        console.error("Error performing scraping:", error.message);
    }
};

module.exports = {
    performScraping,
    performScrapingAdvanced
};
