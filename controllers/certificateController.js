const pdfService = require("../services/pdfService");
const path = require("path");

let registerId = 12297001;

exports.generateCertificate = async (req, res) => {
  try {
    // Prepare data for the certificate
    const data = {
      registerId: registerId++,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      zipCode: req.body.zipCode,
      state: req.body.state,
      country: req.body.country,
      dob: req.body.dob,
      gender: req.body.gender,
      bloodGroup: req.body.bloodGroup,
      dateTime: new Date().toLocaleString(),
    };

    // Generate the PDF
    const pdfPath = await pdfService.createPDF(data);

    // Return the download link to the generated PDF
    const downloadLink = `${req.protocol}://${req.get(
      "host"
    )}/pdf/${path.basename(pdfPath)}`;

    res
      .status(200)
      .json({ message: "PDF generated successfully", downloadLink });
  } catch (error) {
    console.log(error, "err");
    res.status(500).json({ message: "Error generating PDF", error });
  }
};
