const { client } = require("../DB");
const path = require("path");
var fs = require("fs");
const { verifyUser } = require("../utils/auth");
const multer = require("multer");
const { getPdfUrl } = require("../utils");
const taskRouter = require("express").Router();

// multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/pdf_files/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + "-" + uniqueSuffix + ".pdf";
    cb(null, fileName);
    req.fileName = fileName;
  },
});

// multer upload
const upload = multer({
  storage: storage,
  fileFilter: async function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      return callback(new Error("Only pdf are allowed"));
    }
    // I want next function to validate real ext of files here.
    callback(null, true);
  },
});

taskRouter.use(verifyUser);

taskRouter.post("/", upload.single("pdfFile"), async (req, res) => {
  try {
    const { name, description, authorEmail } = req.body;
    const pdfUrl = getPdfUrl(req.fileName);
    if (name && description && authorEmail && pdfUrl) {
      await client.query(
        "INSERT INTO books( name, description, author_email, pdf_url) VALUES ($1, $2, $3, $4)",
        [name, description, authorEmail, pdfUrl]
      );
      res.send({ message: "Task added succesful" });
    }
    res.status(400).send({ message: "Some property missing" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

taskRouter.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const { rows } = await client.query(
        "SELECT * FROM books WHERE author_email = $1",
        [email]
      );
      return res.send({ data: rows });
    }
    const { rows } = await client.query("SELECT * FROM books");
    console.log(rows);
    res.send({ data: rows });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

taskRouter.patch("/", upload.single("pdfFile"), async (req, res) => {
  try {
    const { email, id } = req.query;
    const data = req.body;

    // tamp array bor build query string and query value
    const updateFields = [];
    const values = [];

    const { rows } = await client.query("SELECT * FROM books WHERE id = $1", [
      id,
    ]);

    const dataFromDB = rows[0];

    if (dataFromDB.author_email === email) {
      // update pdfUrl if pdf comes from client
      if (req.fileName) {
        // Split the URL by slashes and get the last element
        const parts = dataFromDB.pdf_url.split("/");
        const fileNameWithExtension =
          "public/pdf_files/" + parts[parts.length - 1];
        // delete pdfFile feild from data and add pdf_url in data
        delete data.pdfFile;
        data.pdf_url = getPdfUrl(req.fileName);
        // delete previous file
        fs.unlinkSync(fileNameWithExtension);
      }
      // Iterate over the object properties to determine which fields to update
      Object.keys(data).forEach((key, index) => {
        if (key !== "id" && key !== "id") {
          // Exclude the id field and any other field you don't want to update dynamically
          updateFields.push(`${key} = $${index + 1}`);
          values.push(data[key]);
        }
      });
      // query string
      const query = `UPDATE books SET ${updateFields.join(", ")} WHERE id = $${
        values.length + 1
      }`;
      await client.query(query, [...values, id]);
      return res.send({ message: "Updated successful" });
    }
    return res.status(401).send({ message: "Unathorize" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});

taskRouter.delete("/", async (req, res) => {
  try {
    const { id, email } = req.query;
    const { rows } = await client.query("SELECT * FROM books WHERE id = $1", [
      id,
    ]);

    const dataFromDB = rows[0];

    if (dataFromDB.author_email === email) {
      await client.query("DELETE FROM books WHERE id = $1", [id]);
      res.send({ message: "Deleted successful" });
    }
    res.status(401).send({ message: "Unathorize" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = taskRouter;
