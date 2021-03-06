import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Axios from "axios";
import { useHistory } from "react-router-dom";

const Print = () => {
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  // // const defaultData = [
  // //   {
  // //     id: "a",
  // //     user_id: "a",
  // //     user_name: "a",
  // //     user_department: "a",
  // //     user_type: "a",
  // //     time: "a",
  // //   },
  // // ];
  // ----------------get log--------------------------
  const [userList, setUserList] = useState([]);
  const history = useHistory();
  const userLog = () => {
    Axios.post("  http://localhost:8000/api/userlog", {
      dateLog: start_range,
      dateLogEnd: end_range,
    }).then((response) => {
      if (response.data.message === "failed") {
        setUserList([
          {
            id: "",
            user_id: "--",
            user_name: "--",
            user_department: "NO HISTORY OF LOG IN AT THIS DAY",
            user_type: "--",
            time: "--",
          },
        ]);
        console.log(userList);
      } else {
        console.log(response);
        setUserList(response.data);
      }
    });
  };
  // ----------------get log--------------------------

  var blank = "   ";
  var num = 0;
  const [value, setValue] = React.useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [value2, setValue2] = React.useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  const start_range = new Date(value)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  const end_range = new Date(value2)
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  // if (value === test) {
  //   console.log(test);
  // } else {
  //   console.log("asa");
  // }
  const marginTop = "30px";
  const marginRight = "10px";
  const marginBottom = "10px";
  const marginLeft = "10px";

  const getPageMargins = () => {
    return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <h2>REPORT FOR USER LOGGED IN HISTORY:</h2>
      <Button
        variant="outlined"
        onClick={() => {
          history.push("/logUpload");
        }}
      >
        Go to Book Upload Report
      </Button>
      <div className="print__section">
        <style>{getPageMargins()}</style>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Box sx={{ alignContent: "right" }}>
                <DatePicker
                  views={["year", "month", "day"]}
                  label="Start Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                  views={["year", "month", "day"]}
                  label="End Date"
                  value={value2}
                  onChange={(newValue) => {
                    setValue2(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Button
                  onClick={() => {
                    userLog();
                  }}
                  className="print__button"
                >
                  Get Report
                </Button>
                <Button
                  onClick={() => {
                    handlePrint();
                  }}
                  className="print__button"
                >
                  Print
                </Button>
              </Box>
              <div ref={componentRef} className="card" sx={{ p: 20 }}>
                <div className="float__start">
                  <br />
                  <h3 className="card-title mb-0" align="center">
                    <img src="/logoisu.png" height={30} alt="" /> ISU-R
                  </h3>
                  <h3 className="card-title mb-0" align="center">
                    E-BOOK REPOSITORY
                  </h3>
                  <h4 className="card-title mb-0" align="center">
                    Users Log In Report
                  </h4>
                  <br />
                  <h6 className="card-title mb-0" align="right">
                    {"Date:" +
                      value.toDateString() +
                      " - " +
                      value2.toDateString() +
                      "  `"}
                  </h6>
                </div>
                <hr />
                <div className="float__infoss">
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>Id</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Course</TableCell>
                          <TableCell>User Type</TableCell>
                          <TableCell>Time Logged in</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userList.map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>{blank}</TableCell>
                            <TableCell component="th" scope="row">
                              {(num = num + 1)}
                            </TableCell>
                            <TableCell align="left">{row.user_id}</TableCell>
                            <TableCell>{row.user_name}</TableCell>
                            <TableCell>{row.user_department}</TableCell>
                            <TableCell>{row.user_type}</TableCell>
                            <TableCell>{row.time}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};
export default Print;
