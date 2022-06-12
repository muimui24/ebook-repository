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
  const recommended = req.body.recommended;

  const sqlInsert =
    "INSERT INTO ebooks (title, author, category, file_name, description, thumbnail, subject, year_published, publication_place, call_no, accession_no, recommended_to) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
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
      recommended,
    ],
    (err, result) => {
      res.send(result);
    }
  );
});

// -----------log upload------------------------------------------
app.post("/api/logupload", (req, res) => {
  const logInTitle = req.body.logInTitle;
  const logInAuthor = req.body.logInAuthor;
  const logInCategory = req.body.logInCategory;
  const logInSubject = req.body.logInSubject;
  const logInCallNo = req.body.logInCallNo;
  const logInAccNo = req.body.logInAccNo;
  const logDate = req.body.date;
  const logTime = req.body.time.toString();
  const sqlInsert =
    "INSERT INTO upload_log (title,author, subject,category, call_no,accession_no,date, time) VALUES (?,?,?,?,?, ?,?,?);";

  db.query(
    sqlInsert,
    [
      logInTitle,
      logInAuthor,
      logInSubject,
      logInCategory,
      logInCallNo,
      logInAccNo,
      logDate,
      logTime,
    ],
    (err, result) => {
      console.log(err);

      res.send(result);
    }
  );
});
///------=-=-=-=-=-=--get upload log==-=-=-=-=-=-=-=-=-

app.post("/api/uploadlog", (req, res) => {
  const date = req.body.dateLog;
  const date2 = req.body.dateLogEnd;

  db.query(
    "SELECT * FROM upload_log WHERE date >=? AND date <=? ",
    [date, date2],
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
  const updateRecommended = req.body.updateRecommended;

  const sqlUpdate =
    "UPDATE ebooks SET title = ?, author = ?, category = ?, description = ?, subject = ?, year_published = ?, publication_place = ?, call_no = ?, accession_no = ?, recommended_to = ? WHERE id = ?";
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
      updateRecommended,
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
  const date2 = req.body.dateLogEnd;

  db.query(
    "SELECT * FROM login_reports WHERE date >=? AND date <=?  AND user_type !='admin' ",
    [date, date2],
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
//-------==--=-=-=-=-count  bsit------=-=-=-=-
app.post("/api/countBsit", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "BSIT";

  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE()) AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//-------==--=-=-=-=-count  bse------=-=-=-=-
app.post("/api/countBse", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "BSE";

  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE()) AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//-------==--=-=-=-=-count  bsa------=-=-=-=-
app.post("/api/countBsa", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "BSA";

  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE())AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
}); //-------==--=-=-=-=-count  bsab------=-=-=-=-
app.post("/api/countBsab", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "BSAB";

  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE()) AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//-------==--=-=-=-=-count  bsc------=-=-=-=-
app.post("/api/countBsc", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "BSC";

  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE()) AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//-------==--=-=-=-=-count  bslea------=-=-=-=-
app.post("/api/countBslea", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "BSLEA";

  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE()) AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//-------==--=-=-=-=-count  bsf------=-=-=-=-
app.post("/api/countBsf", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "BSF";

  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE()) AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//-------==--=-=-=-=-count  msf------=-=-=-=-
app.post("/api/countmsf", (req, res) => {
  const year = req.body.year;
  const month = req.body.month;
  const course = "MSF";
  // SELECT * FROM student_enroll_date WHERE YEAR(enroll_date) = 2019 AND MONTH(enroll_date) = 12;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE())AND  user_department=?   ",
    [course],
    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//-------==--=-=-=-=-count  all books------=-=-=-=-
app.get("/api/countbook", (req, res) => {
  const sqlSelect = "SELECT * FROM ebooks";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

//---=-=-=-=-=-=-=-=-=uploads this month--=-===-=-=-=-=-
app.post("/api/uploadThisMonth", (req, res) => {
  // SELECT * FROM student_enroll_date WHERE YEAR(enroll_date) = 2019 AND MONTH(enroll_date) = 12;
  db.query(
    "SELECT * FROM upload_log WHERE YEAR(date) =YEAR(CURDATE())  AND MONTH(date) =  MONTH(CURDATE()) ",

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=count visits----=-=-=-=-==-------=-
app.post("/api/countvisits", (req, res) => {
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =YEAR(CURDATE()) AND MONTH(date) =  MONTH(CURDATE()) AND  user_type!='admin'   ",

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=jan----=-=-=-=-==-------=-
app.post("/api/countjan", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =1 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=feb----=-=-=-=-==-------=-
app.post("/api/countfeb", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =2 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=march----=-=-=-=-==-------=-
app.post("/api/countmar", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =3 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});

//==-=-=-=-=-=--=april---=-=-=-=-==-------=-
app.post("/api/countapr", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =4 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=may----=-=-=-=-==-------=-
app.post("/api/countmay", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =5 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=jun----=-=-=-=-==-------=-
app.post("/api/countjun", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =6 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=jul----=-=-=-=-==-------=-
app.post("/api/countjul", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =7 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=august----=-=-=-=-==-------=-
app.post("/api/countaug", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =8 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});

//==-=-=-=-=-=--=september----=-=-=-=-==-------=-
app.post("/api/countsept", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =9 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=october----=-=-=-=-==-------=-
app.post("/api/countoct", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =10 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=november----=-=-=-=-==-------=-
app.post("/api/countnov", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =11 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//==-=-=-=-=-=--=december----=-=-=-=-==-------=-
app.post("/api/countdec", (req, res) => {
  const year = req.body.year;
  db.query(
    "SELECT * FROM login_reports WHERE YEAR(date) =? AND MONTH(date) =12 AND  user_type!='admin'   ",
    [year],

    (err, result) => {
      if (err || result.length == 0) {
        res.send({ message: "failed" });
      } else if (result !== null) {
        res.send(result);
      } else {
      }
    }
  );
});
//--=-=-=-=-=-=-=-=-=recommended=-=-=-------------------
app.get("/api/recommended", (req, res) => {
  const course = req.body.course;

  const sqlSelect = "SELECT * FROM ebooks WHERE recommended_to = ?";
  db.query(sqlSelect, ["BSIT"], (err, result) => {
    res.send(result);
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
