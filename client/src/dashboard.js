import React, { useState } from "react";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import FeaturedInfo from "./featuredinfo";

import Barchart from "./barchart";
function Dashboard() {
  function refreshPage() {
    window.location.href = "http://localhost:3000/recommended";
  }
  const user_type = localStorage.getItem("user_type");
  if (user_type === "admin") {
    return (
      <div>
        <h2>ADMIN DASHBOARD</h2>
        <br />
        <Box>
          <FeaturedInfo />
          <br />
          <br />
          <Barchart />
        </Box>
      </div>
    );
  } else {
    return refreshPage();
  }
}
export default Dashboard;
