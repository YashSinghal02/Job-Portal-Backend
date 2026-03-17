
// File Upload
const fileUpload = async (req, res) => {
  console.log("🚀 Upload controller triggered");
  console.log("File Object:", req.file);

  if (!req.file) {
    throw new Error("File not uploaded");
  }

  res.status(200).json({
    message: "File uploaded successfully",
    url: req.file.path,
    public_id: req.file.filename,
  });
};

export { fileUpload };