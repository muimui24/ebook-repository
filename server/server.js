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
  const ebookThumbnail = req.body.ebookThumbnail;

  const sqlInsert =
    "INSERT INTO ebooks (title, author, category, file_name, description, thumbnail) VALUES (?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [
      ebookTitle,
      ebookAuthor,
      ebookCategory,
      ebookFileName,
      ebookDescription,
      ebookThumbnail,
    ],
    (err, result) => {
      res.send(result);
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

app.get("/api/readbook", (req, res) => {
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
    if (result) {
      res.send(result);
    }
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
        res.send({ message: "error" });
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
      res.send(result);
    }
  );
});
// -----------log user------------------------------------------
app.post("/api/logreport", (req, res) => {
  const logInId = req.body.logInId;
  const logInName = req.body.logInName;
  const logInDepartment = req.body.logInDepartment;
  const logInType = req.body.logInType;
  const logDate = new Date(new Date().setHours(0, 0, 0, 0)).toDateString();
  const sqlInsert =
    "INSERT INTO login_reports (user_id,user_name,date, user_type, user_department) VALUES (?,?,?,?,?);";
  db.query(
    sqlInsert,
    [logInId, logInName, logDate, logInType, logInDepartment],
    (err, result) => {
      console.log(err);

      res.send(result);
    }
  );
});
// ---------------get log------------------------------------------

app.post("/api/userlog", (req, res) => {
  const date = req.body.dateLog;

  db.query(
    "SELECT * FROM login_reports WHERE date =? AND user_type !='admin' ",
    [date],
    (err, result) => {
      if (result.length === 0) {
        res.send({ message: "failed" });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        console.log(result.length);
      }
    }
  );
});

// ---------------get user------------------------------------------

app.get("/api/getuser", (req, res) => {
  const sqlSelect = "SELECT * FROM users WHERE user_type != 'admin' ";
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
      else {
        res.send(result);
      }
    }
  );
});
// ---------------user delete-------------------------------
app.delete("/api/deleteuser/:userId", (req, res) => {
  const userId = req.params.userId;
  const sqlDelete = "DELETE FROM users WHERE id = ?";
  db.query(sqlDelete, userId, (err, result) => {
    if (result) {
      res.send(result);
    }
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
