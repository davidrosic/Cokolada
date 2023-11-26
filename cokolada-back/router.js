const express = require('express');
const router = express.Router();
const publicationController = require('./lib/controllers/publicationController');
const reportController = require('./lib/controllers/reportController');
const scraperController = require('./lib/controllers/scraperController');
const bodyParser = require('body-parser').urlencoded({ extended: true });

/**
 * Retrieve the first n ordered publications based on the specified category, number, and order.
 *
 * Endpoint: GET http://localhost:8000/publication/:category/:number/:order?
 *
 * @param {string} category - The category of publications to retrieve {}.
 * @param {string} [number] - The number of publications to retrieve.
 * @param {string} [order] - Optional. The ordering criterion for the retrieved publications.
 * 
 * @throws {Error} Will throw an error if there is an issue retrieving publications.
 *
 * @return {Object} An array of ordered publications that match the specified criteria.
 */
router.get('/publication/:category/:number/:order?', async (req, res) => {
    try{
        const publications = await publicationController.getPublications(req.params);
        res.status(200).json(publications);
    } catch (err) {
        console.log("router.js\n",err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * Retrieve the publication based on the specified id.
 *
 * Endpoint: GET http://localhost:8000/publication/:id
 *
 * @param {string} id - The id of the publication to retrieve.
 * 
 * @throws {Error} Will throw an error if there is an issue retrieving publications.
 *
 * @return {Object} A single publication that match the specified id.
 */
router.get('/publication/:id', async (req, res) => {
    try{
        const publication = await publicationController.getPublicationById(req.params);
        res.status(200).json(publication);
    } catch (err) {
        console.log("router.js\n",err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * Handle POST request to create a new publication.
 *
 * @param {Object} req.body - The request body containing publication details.
 * @param {string} req.body.category - The category of the publication. Should be one of ['Razvoj', 'Dizajn', 'Resursi', 'Magazin'].
 * @param {string} req.body.title - The title of the publication. Required field.
 * @param {string} req.body.link - The link associated with the publication. Default is an empty string.
 * @param {string} req.body.text - The text content of the publication. Required field.
 * @param {string} req.body.author - The author of the publication. Default is "Власник".
 * 
 * @throws {Object} - JSON object with an 'error' property if an error occurs during the process.
 */
router.post('/publication/create', bodyParser, async (req, res) => {
    try{
        const response = await publicationController.createPublication(req.body);
        res.status(200).json(response);
    } catch (err) {
        console.log("router.js\n",err);
        res.status(500).json({ error: err.cause });
    }
});

/**
 * Handle POST request to add a comment to a publication.
 *
 * @param {Object} req.body - The request body containing comment details.
 * @param {string} req.body._id - The identifier of the publication to which the comment will be added.
 * @param {string} req.body.username - The username associated with the comment. Default is "Гост".
 * @param {string} req.body.comment - The text content of the comment. Default is an empty string.
 * 
 * @throws {Object} - JSON object with an 'error' property if an error occurs during the process.
 */
router.post('/publication/comment', bodyParser, async (req, res) => {
    try {
        const response = await publicationController.addComment(req.body);
        res.json(response);
    } catch (err) {
        console.log("router.js\n", err);
        res.status(500).json({ error: "Error while posting comment!" });
    }
});

/**
 * Handle GET request for a report in the db.
 * 
 * Does not take any params
 *
 * @throws {Object} - JSON object with an 'error' property if an error occurs during the process.
 */
router.get('/report', async (req,res) => {
    try{
        const reports = await reportController.getReports();
        res.json(reports);
    } catch(err) {
        console.log("router.js\n",err);
        res.status(500).json({ error: "Error while posting comment!" });
    }
});

/**
 * Handle POST request to create a report in the db.
 *
 * @param {Object} req.body - The request body containing comment details.
 * @param {string} req.body.email - The email associated with the report.
 * @param {string} req.body.text - The text content of the report.
 * 
 * @throws {Object} - JSON object with an 'error' property if an error occurs during the process.
 */
router.post('/report', bodyParser, async (req, res) => {
    try{
        const email = req.body.email;
        const text = req.body.text;
        const result = await reportController.createReport({email,text});
        res.status(200).json({"message": result});
    } catch(err) {
        console.log("router.js\n",err);
        res.status(500).json({ error: "Error while creating report!" });
    }
});

/**
 * Handle POST request to use the webscraper to acquire the from fonts from another website.
 * 
 * @throws {Object} - JSON object with an 'error' property if an error occurs during the process.
 */

router.post('/scraper', async (req, res) => {
    try{
        await scraperController.createScrapers();
        res.json(0);
    } catch(err) {
        console.log("router.js\n",err);

    }
});
/**
 * Handle GET request to display the fonts that the webscraper found on another website.
 * 
 * Endpoint: GET http://localhost:8000/scraper/
 * 
 * @throws {Object} - JSON object with an 'error' property if an error occurs during the process.
 */
router.get('/scraper', async (req, res) => {
    try{
        const scrapers = await scraperController.getScrapers();
        res.json(scrapers);
    } catch(err) {
        console.log("router.js\n",err);
    }
});

module.exports = router;