const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mysql = require("mysql");
const app = express();
const bcrypt = require("bcrypt");
const { useState } = require("react");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "my-secret-pw",
  database: "elib",
});
app.use(
  cors({
    origin: ["http://localhost:3000", " http://192.168.1.4:3000"],
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
  const ebookSubject = req.body.ebookSubject;
  const year_published = req.body.year_published;
  const place_publication = req.body.place_publication;
  const accession = req.body.accession;
  const call_number = req.body.call_number;

  const sqlInsert =
    "INSERT INTO ebooks (title, author, category, file_name, description, thumbnail, subject, year_published, publication_place, call_no, accession_no) VALUES (?,?,?,?,?,?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [
      ebookTitle,
      ebookAuthor,
      ebookCategory,
      ebookFileName,
      ebookDescription,
      ebookThumbnail,
      ebookSubject,
      year_published,
      place_publication,
      call_number,
      accession,
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
  const updateSubject = req.body.ebookNewSubject;
  const updateYear = req.body.updateYearPublished;
  const updatePlace = req.body.placePublished;
  const updateCallNo = req.body.updateCallNo;
  const updateAccession = req.body.updateAccessionNo;

  const sqlUpdate =
    "UPDATE ebooks SET title = ?, author = ?, category = ?, description = ?, subject = ?, year_published = ?, publication_place = ?, call_no = ?, accession_no = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [
      updateTitle,
      updateAuthor,
      updateCategory,
      updateDescription,

      updateSubject,
      updateYear,
      updatePlace,
      updateCallNo,
      updateAccession,
      updateId,
    ],
    (err, result) => {
      if (err) console.log(err);
      else console.log(result);
    }
  );
});

// --------------LOGIN-----------------------------------
app.post("/login", async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  // req.body.password;
  //  req.body.password;
  // bcrypt.hash(password, 10).then((hash) => {
  //   console.log(hash);
  // });
  // const user = "SELECT * FROM users WHERE user_id =?";
  var dbpassword = "def";

  db.query("SELECT * FROM users WHERE user_id =? ", [userId], (err, result) => {
    if (err || result.length == 0) {
      res.send({ message: "User not exist" });
    } else if (result !== null) {
      dbpassword = result[0].password;

      bcrypt.compare(password, result[0].password).then((match) => {
        if (!match) {
          res.send({ message: "Incorrect password" });
        } else {
          req.session.user = result;

          res.send(result);
        }
      });
    }
  });
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

  bcrypt.hash(password, 10).then((hash) => {
    db.query(
      sqlInsert,
      [
        userId,
        hash,
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
});
// -----------log user------------------------------------------
app.post("/api/logreport", (req, res) => {
  const logInId = req.body.logInId;
  const logInName = req.body.logInName;
  const logInDepartment = req.body.logInDepartment;
  const logInType = req.body.logInType;
  const logDate = req.body.date;
  const logTime = req.body.time;
  const sqlInsert =
    "INSERT INTO login_reports (user_id,user_name,date, user_type, user_department, time) VALUES (?,?,?,?,?, ?);";

  db.query(
    sqlInsert,
    [logInId, logInName, logDate, logInType, logInDepartment, logTime],
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
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
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
// ----------------update password---------------
app.put("/api/updatepassword", (req, res) => {
  const updateId = req.body.id;
  const updatepassword = req.body.NewPassword;

  const sqlUpdate = "UPDATE users SET password = ? WHERE id = ?";

  bcrypt.hash(updatepassword, 10).then((hash) => {
    db.query(sqlUpdate, [hash, updateId], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
      console.log(result);
    });
  });
});

app.put("/api/userreset", (req, res) => {
  const updateId = req.body.id;
  const updatepassword = req.body.NewPassword;

  const sqlUpdate = "UPDATE users SET password = ? WHERE id = ?";

  bcrypt.hash(updatepassword, 10).then((hash) => {
    db.query(sqlUpdate, [hash, updateId], (err, result) => {
      if (err) console.log(err);
      else res.send(result);
    });
  });
});

// app.put("/api/resetpassword", (req, res) => {
//   const updateId = req.body.id;
//   const updatepassword = req.body.NewPassword;

//   const sqlUpdate = "UPDATE users SET password = ? WHERE id = ?";
//   db.query(sqlUpdate, [updatepassword, updateId], (err, result) => {
//     if (err) console.log(err);
//     else console.log(result);
//   });
// });

// -----------------------log in update password-------------------------------------

app.post("/api/changepassword", async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;

  // const user = "SELECT * FROM users WHERE user_id =?";
  var dbpassword;

  db.query("SELECT * FROM users WHERE user_id =? ", [userId], (err, result) => {
    if (err || result.length == 0) {
      res.send({ message: "User not exist" });
    } else if (result !== null) {
      dbpassword = result[0].password;
      bcrypt.compare(password, dbpassword).then((match) => {
        console.log(result);
        if (!match) {
          res.send({ message: "Incorrect password" });
        } else {
          req.session.user = result;

          res.send(result);
        }
      });
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
