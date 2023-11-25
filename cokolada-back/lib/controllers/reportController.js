const ReportModel = require('../models/Report');

class ReportController {
    async getReports() {
        try{
            return await ReportModel.find();
        } catch(error) {
            console.log("lib::controllers::reportController.js::getReports\n",error);
        }
    };

    async createReport(params) {
        try {
            const email = params.email;
            const text = params.text;
            
            if(email==="undefined" || text==="undefined"){
                return "Error"
            } else {
                await ReportModel.create({"email": email, "text": text});
                return "Created report!";
            }           
        } catch(error) {
            console.log("lib::controllers::reportController.js::createReport\n",error);
        }
    };

}

const reportController = new ReportController();
module.exports = reportController;