const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs-extra");
const ejs = require("ejs");

exports.createPDF = async (data) => {
  try {
    // Load the HTML template
    const templatePath = path.join(__dirname, "../templates/certificate.html");
    const htmlContent = await ejs.renderFile(templatePath, data);

    const certificatesFolder = path.join(__dirname, "../pdf");
    fs.ensureDirSync(certificatesFolder);

    // Path to save the PDF
    const pdfPath = path.join(
      certificatesFolder,
      `certificate_${data.registerId}.pdf`
    );

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set HTML content to the page
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    await page.pdf({
      path: pdfPath,
      width: "11in",
      height: "7.8in",
      printBackground: true,
      margin: {
        top: "0in",
        right: "0in",
        bottom: "0in",
        left: "0in",
      },
    });

    await browser.close();

    return pdfPath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
