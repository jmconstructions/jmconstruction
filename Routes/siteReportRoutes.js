// const express = require("express");
// const siteController = require("../controllers/siteReportController");

// const path = require("path");
// const siteController = require(path.join(
//   __dirname,
//   "../controllers/siteReportController"
// ));

const express = require("express");
const path = require("path");
const siteController = require("./../Controllers/siteReportController");

const router = express.Router();

router
  .route("/")
  .post(
    siteController.uploadSiteImages,
    siteController.processSiteImages,
    siteController.createSiteReport
  )
  .get(siteController.getsitereports);

router.get("/report/:id", siteController.generatePDF);
router.get("/search", siteController.searchreport);
router.get("/trends", siteController.getInspectionTrends); // Moved this route above `/:id`
router.get("/employeeperformance", siteController.getInspectionByEmployee);
router
  .route("/:id")
  .patch(siteController.updatereport)
  .get(siteController.getsitesinglereport)
  .delete(siteController.deletereport);

module.exports = router;
