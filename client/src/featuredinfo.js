import "./featuredInfo.css";
import React, { useState } from "react";
import Axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BookIcon from "@mui/icons-material/Book";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EventIcon from "@mui/icons-material/Event";

export default function FeaturedInfo() {
  const [totalBooks, setTotalBooks] = useState(0);
  const [UploadThisMonth, setUploadThisMonth] = useState(0);
  const [visit, setVisit] = useState(0);

  React.useState(() => {
    Axios.get("  http://localhost:8000/api/countbook").then((response) => {
      setTotalBooks(response.data.length);
    });
  }, []);
  React.useState(() => {
    Axios.post("  http://localhost:8000/api/uploadThisMonth", {}).then(
      (response) => {
        if (response.data.message === "failed") {
        } else {
          setUploadThisMonth(response.data.length);
        }
      }
    );
  });

  React.useState(() => {
    Axios.post("  http://localhost:8000/api/countvisits", {}).then(
      (response) => {
        if (response.data.message === "failed") {
          console.log("failed");
        } else {
          setVisit(response.data.length);
        }
      }
    );
  });
  return (
    <div className="featured">
      <div className="featuredItem total">
        <span className="featuredTitle">
          <FileUploadIcon className="featuredIcon negative" />
          Total E-Books Uploaded
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalBooks} </span>
          <span className="featuredMoneyRate">
            E-BOOKS <BookIcon />{" "}
          </span>
        </div>
      </div>
      <div className="featuredItem monthly">
        <span className="featuredTitle">
          <EventIcon /> Total Upload For This Month
        </span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{UploadThisMonth}</span>
          <span className="featuredMoneyRate">
            UPLOADS <FileUploadIcon />
          </span>
        </div>
      </div>
      <div className="featuredItem visit">
        <span className="featuredTitle">Total visits for this Month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{visit}</span>
          <span className="featuredMoneyRate">
            VISITS <RecentActorsIcon />{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
