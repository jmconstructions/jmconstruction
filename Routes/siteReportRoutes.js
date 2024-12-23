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
// // Add debugging
// console.log("Current directory:", __dirname);
// console.log(
//   "Attempting to load from:",
//   path.resolve(__dirname, "../controllers/siteReportController.js")
// );

// try {
//   const controllerPath = require.resolve(
//     "../controllers/siteReportController",
//     {
//       paths: [__dirname],
//     }
//   );
//   console.log("Resolved controller path:", controllerPath);
//   const siteController = require(controllerPath);
// } catch (error) {
//   console.error("Error resolving controller:", error);
//   process.exit(1);
// }

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
