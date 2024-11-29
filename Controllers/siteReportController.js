const mongoose = require("mongoose");
const multer = require("multer");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;
const puppeteer = require("puppeteer"); // Import Puppeteer
const Site = require("./../models/siteReportModel");
const AppError = require("../utils/appErrors");
const catchAsync = require("../utils/catchAsync");
const path = require("path");
const fs = require("fs");
const os = require("os");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage for multer
const multerStorage = multer.memoryStorage();

// Multer upload configuration
const multerFilter = (req, file, cb) => {
  // Allow only image files (e.g., jpg, jpeg, png, gif, etc.)
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Middleware for multiple image uploads
exports.uploadSiteImages = upload.fields([
  { name: "sitePhotos", maxCount: 5 },
  { name: "modificationPhoto", maxCount: 5 },
  { name: "clientsign", maxCount: 1 },
  { name: "employeesign", maxCount: 1 },
]);

exports.processSiteImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();

  // Function to upload images to Cloudinary
  const uploadToCloudinary = (buffer, folder) =>
    new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(new AppError("Image upload failed", 500));
          resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    });

  // Use sharp to process and compress images
  const processImage = async (fileBuffer, mimetype) => {
    let processedBuffer = fileBuffer;

    // If the image is not JPEG, convert it to JPEG with compression
    if (mimetype !== "image/jpeg") {
      processedBuffer = await sharp(fileBuffer)
        .resize(800) // Resize width to 800px, auto-adjust height
        .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
        .toBuffer();
    }

    return processedBuffer;
  };

  // Helper to process files in a specific field
  const processFiles = async (files, folder) => {
    return await Promise.all(
      files.map(async (file) => {
        const compressedBuffer = await processImage(file.buffer, file.mimetype);
        return await uploadToCloudinary(compressedBuffer, folder);
      })
    );
  };

  // Process site photos
  if (req.files.sitePhotos) {
    req.body.sitePhotos = await processFiles(
      req.files.sitePhotos,
      "site-inspections"
    );
  }

  // Process modification photos
  if (req.files.modificationPhoto) {
    req.body.modificationPhoto = await processFiles(
      req.files.modificationPhoto,
      "site-modifications"
    );
  }

  // Process client signature
  if (req.files.clientsign) {
    const compressedBuffer = await processImage(
      req.files.clientsign[0].buffer,
      req.files.clientsign[0].mimetype
    );
    req.body.clientsign = await uploadToCloudinary(
      compressedBuffer,
      "client-signatures"
    );
  }

  // Process employee signature
  if (req.files.employeesign) {
    const compressedBuffer = await processImage(
      req.files.employeesign[0].buffer,
      req.files.employeesign[0].mimetype
    );
    req.body.employeesign = await uploadToCloudinary(
      compressedBuffer,
      "employee-signatures"
    );
  }

  next();
});

// const multer = require("multer");
exports.getsitesinglereport = catchAsync(async (req, res, next) => {
  const doc = await Site.findById(req.params.id);
  if (!doc) {
    return next(new AppError("No doc found by that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.searchreport = catchAsync(async (req, res, next) => {
  const searchQuery = req.query.name;

  // Perform a case-insensitive search for users with names containing the query
  const site = await Site.find({
    $or: [
      { architectName: { $regex: new RegExp(searchQuery, "i") } },
      { clientName: { $regex: new RegExp(searchQuery, "i") } },
      { projectName: { $regex: new RegExp(searchQuery, "i") } },
    ],
  });
  res.status(200).json({
    status: "success",
    data: {
      site: site,
    },
  });
});

exports.getsitereports = catchAsync(async (req, res, next) => {
  // Fetch only active reports
  const doc = await Site.find({ active: true }).sort({ createdAt: -1 });

  if (!doc || doc.length === 0) {
    return next(new AppError("No reports found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.createSiteReport = catchAsync(async (req, res, next) => {
  // Create the sitereport without setting the image URL
  const doc = await Site.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

//for employees
exports.deletereport = catchAsync(async (req, res, next) => {
  await Site.findByIdAndUpdate(req.params.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updatereport = catchAsync(async (req, res, next) => {
  const doc = await Site.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("no doc found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getInspectionByEmployee = catchAsync(async (req, res, next) => {
  const inspections = await Site.aggregate([
    {
      $group: {
        _id: "$jmStaffEngineer", // Group by employee ID
        inspectionCount: { $sum: 1 }, // Count inspections per employee
      },
    },
    {
      $lookup: {
        from: "users", // Replace with your User collection name if different
        localField: "_id",
        foreignField: "_id",
        as: "employee",
      },
    },
    {
      $unwind: "$employee", // Convert employee array to object
    },
    {
      $sort: { inspectionCount: -1 }, // Sort by inspection count
    },
  ]);

  // Simplify response to include only names and inspection counts
  const simplifiedResponse = inspections.map((item) => ({
    name: item.employee.name,
    inspectionCount: item.inspectionCount,
  }));

  res.status(200).json({
    status: "success",
    data: simplifiedResponse,
  });
});

exports.getInspectionTrends = catchAsync(async (req, res, next) => {
  // Get query parameters
  const year = req.query.year || new Date().getFullYear(); // Default to the current year
  const weekly = req.query.weekly === "true"; // Weekly flag: if true, group by week

  // Aggregation pipeline
  const trends = await Site.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01`), // Start of the specified year
          $lt: new Date(`${parseInt(year) + 1}-01-01`), // Start of the next year
        },
      },
    },
    {
      $group: {
        _id: weekly
          ? {
              year: { $year: "$createdAt" },
              week: { $week: "$createdAt" }, // Group by week if weekly flag is true
            }
          : {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" }, // Group by month otherwise
            },
        inspectionsCount: { $sum: 1 }, // Count inspections
      },
    },
    {
      $sort: weekly
        ? { "_id.year": 1, "_id.week": 1 } // Sort by year and week
        : { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
    },
  ]);

  res.status(200).json({
    status: "success",
    data: trends,
  });
});
exports.generatePDF = catchAsync(async (req, res, next) => {
  let browser = null;
  const { id } = req.params;
  const url = `http://localhost:5173/pdf/${id}`;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--window-size=1920,1080",
      ],
      timeout: 120000, // 2 minutes
    });

    const page = await browser.newPage();

    // Set longer timeout for navigation
    await page.setDefaultNavigationTimeout(60000);

    // Set viewport
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

    // Add request interception to debug network issues
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      console.log(`Request to: ${request.url()}`);
      request.continue();
    });

    page.on("console", (msg) => console.log("Browser console:", msg.text()));

    // Navigate with explicit wait conditions
    try {
      await page.goto(url, {
        waitUntil: ["load", "networkidle0"],
        timeout: 60000,
      });

      // Wait for specific content to be loaded
      await page
        .waitForSelector("#report-content", {
          timeout: 30000,
        })
        .catch((err) => {
          console.log("Warning: Could not find #report-content");
        });

      // Remove navbar and button
      await page.evaluate(() => {
        const nav = document.querySelector("nav");
        if (nav) nav.remove();

        const reportContent = document.querySelector("#report-content");
        if (reportContent) {
          reportContent.style.marginTop = "0";
          reportContent.style.paddingTop = "0";
        }

        const button = document.querySelector(
          "button[onClick='downloadPDF()']"
        );
        if (button) button.remove();
      });

      // Wait for network to be idle and images to load
      await Promise.all([
        page
          .waitForNavigation({ waitUntil: "networkidle0", timeout: 30000 })
          .catch(() => {}),
        page.evaluate(() => {
          return new Promise((resolve) => {
            if (document.images.length === 0) resolve();
            let loaded = 0;
            const images = document.images;
            for (let i = 0; i < images.length; i++) {
              if (images[i].complete) {
                loaded++;
              } else {
                images[i].addEventListener("load", () => {
                  loaded++;
                  if (loaded === images.length) {
                    resolve();
                  }
                });
                images[i].addEventListener("error", () => {
                  loaded++;
                  if (loaded === images.length) {
                    resolve();
                  }
                });
              }
            }
            if (loaded === images.length) resolve();
          });
        }),
      ]);
    } catch (navigationError) {
      console.error("Navigation Error Details:", {
        message: navigationError.message,
        stack: navigationError.stack,
        url: url,
      });
      throw new AppError(`Navigation failed: ${navigationError.message}`, 500);
    }

    // Generate PDF with adjusted settings
    const pdfBuffer = await page.pdf({
      format: "A3",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
      displayHeaderFooter: false,
      timeout: 60000,
    });

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new AppError("PDF generation resulted in empty buffer", 500);
    }

    const tempFilePath = path.join(
      os.tmpdir(),
      `site-report-${id}-${Date.now()}.pdf`
    );

    try {
      await fs.promises.writeFile(tempFilePath, pdfBuffer);
    } catch (writeError) {
      console.error("Error writing PDF to temp file:", writeError);
      throw new AppError("Failed to save PDF to temporary storage", 500);
    }

    res.contentType("application/pdf");
    res.set(
      "Content-Disposition",
      `attachment; filename=site-report-${id}.pdf`
    );
    res.set("X-Content-Type-Options", "nosniff");

    res.sendFile(tempFilePath, async (err) => {
      try {
        if (err) {
          console.error("Error sending file:", err);
          throw err;
        }

        // Cleanup
        await fs.promises.unlink(tempFilePath);
        await browser.close();
      } catch (cleanupError) {
        console.error("Cleanup error:", cleanupError);
      }
    });
  } catch (error) {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error("Error closing browser:", closeError);
      }
    }

    console.error("PDF Generation Error:", {
      message: error.message,
      stack: error.stack,
      url: url,
      timestamp: new Date().toISOString(),
    });

    return next(new AppError(`PDF Generation Failed: ${error.message}`, 500));
  }
});
