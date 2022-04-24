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
    methods: ["GET", "POST", "PUT", "DELETE"],
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

// ---------------delete-------------------------------
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
// -----------create user------------------------------------------
app.post("/api/insertuser", (req, res) => {
  const firstName = req.body.fName;
  const middleName = req.body.mName;
  const lastName = req.body.lName;
  const gender = req.body.gender;
  const userType = req.body.userType;
  const department = req.body.department;
  const religion = req.body.religion;
  const userId = req.body.userId;
  const password = req.body.password;

  const sqlInsert =
    "INSERT INTO users (user_id,password, first_name, middle_name, last_name, user_type, department, religion, gender) VALUES (?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [
      userId,
      password,
      firstName,
      middleName,
      lastName,
      userType,
      department,
      religion,
      gender,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});
// ---------------get user------------------------------------------

app.get("/api/getuser", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
// ---------------update user-------------------------------
app.put("/api/updateuser", (req, res) => {
  const updateFName = req.body.userNewFName;
  const updateMName = req.body.userNewMName;
  const updateLName = req.body.userNewLName;
  const updateGender = req.body.userNewGender;
  const updateUserType = req.body.userNewUserType;
  const updateDepartment = req.body.userNewDepartment;
  const updateReligion = req.body.userNewReligion;
  const updateUserId = req.body.userNewUserId;
  const updatePassword = req.body.userNewPassword;
  const updateId = req.body.userNewId;

  const sqlUpdate =
    "UPDATE users SET id = ?, user_id = ?, password = ?, first_name = ?, middle_name = ?, last_name = ?, user_type = ?, department = ?, religion = ?, gender = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [
      updateId,
      updateUserId,
      updatePassword,
      updateFName,
      updateMName,
      updateLName,
      updateUserType,
      updateDepartment,
      updateReligion,
      updateGender,
      updateId,
    ],
    (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    }
  );
});
// ---------------user delete-------------------------------
app.delete("/api/deleteuser/:userId", (req, res) => {
  const userId = req.params.userId;
  const sqlDelete = "DELETE FROM users WHERE id = ?";
  db.query(sqlDelete, userId, (err, result) => {
    if (err) console.log(err);
  });
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
