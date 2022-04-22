const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "lester",
  password: "password",
  database: "ebook_repository",
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use(
  session({
    key: "userId",
    secret: "JLSA",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use("/files", express.static("public/files"));
// -----------create------------------------------------------
app.post("/api/insert", (req, res) => {
  const ebookTitle = req.body.ebookTitle;
  const ebookAuthor = req.body.ebookAuthor;
  const ebookCategory = req.body.ebookCategory;
  const ebookDescription = req.body.ebookDescription;
  const ebookFileName = req.body.ebookFileName;

  const sqlInsert =
    "INSERT INTO ebooks (title, author, category, file_name, description) VALUES (?,?,?,?,?);";
  db.query(
    sqlInsert,
    [ebookTitle, ebookAuthor, ebookCategory, ebookFileName, ebookDescription],
    (err, result) => {
      console.log(result);
    }
  );
});
// ---------------read------------------------------------------

app.get("/api/read", (req, res) => {
  const sqlSelect = "SELECT * FROM ebooks";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// ---------------read-------------------------------
app.delete("/api/delete/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const sqlDelete = "DELETE FROM ebooks WHERE id = ?";
  db.query(sqlDelete, bookId, (err, result) => {
    if (err) console.log(err);
  });
});
// ---------------update-------------------------------
app.put("/api/update", (req, res) => {
  const updateId = req.body.ebookNewId;
  const updateTitle = req.body.ebookNewTitle;
  const updateAuthor = req.body.ebookNewAuthor;
  const updateCategory = req.body.ebookNewCategory;
  const updateDescription = req.body.ebookNewDescription;

  const sqlUpdate =
    "UPDATE ebooks SET title = ?, author = ?, category = ?, description = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [updateTitle, updateAuthor, updateCategory, updateDescription, updateId],
    (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    }
  );
});

// --------------LOGIN-----------------------------------
app.post("/login", (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE user_id =? AND password =?",
    [userId, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        req.session.user = result;
        console.log(req.session.user);

        res.send(result);
      } else {
        res.send({ message: "Incorrect password" });
      }
    }
  );
});
// --------------get LOGIN session-----------------------------------
app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
// ------------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single("file");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});
app.listen(8000, () => {
  console.log("App is running on port 8000");
});

// app.use(express.static("public"));

// app.post("/demo", (req, res) => res.status(200).send({ demo: true }));
