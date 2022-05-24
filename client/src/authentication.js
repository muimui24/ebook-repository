import { useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const theme = createTheme();
function Login() {
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  // const user = localStorage.getItem("user_id");
  // if (user !== undefined && user !== null) {
  //   console.log(user);
  //   console.log("is Login");
  //   //todo: redirect to main
  // }
  // function logout() {
  //   localStorage.removeItem("user_id");
  // }
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setStatus] = useState("");

  function refreshPage() {
    window.location.reload(false);
  }

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://192.168.1.58:8000/login", {
      userId: userId,
      password: password,
    })
      .then((response) => {
        console.log(response.data.message);
        if (
          response.data.message !== "Incorrect password" &&
          response.data.message !== "User not exist"
        ) {
          console.log(response.data.message);
          localStorage.setItem("user_id", response.data[0].user_id);
          localStorage.setItem("id", response.data[0].id);
          localStorage.setItem("isLogIn", true);
          localStorage.setItem("user_type", response.data[0].user_type);
          localStorage.setItem("user_dep", response.data[0].department);
          localStorage.setItem(
            "user_name",
            response.data[0].first_name +
              " " +
              response.data[0].middle_name +
              " " +
              response.data[0].last_name
          );
          id = localStorage.getItem("user_id");
          name = localStorage.getItem("user_name");
          department = localStorage.getItem("user_dep");
          type = localStorage.getItem("user_type");

          // const userId = localStorage.getItem("user_id ");
          // setStatus(userId !== undefined ? "Login" : "No User Login");
          // console.log(loginStatus);
          // const user = localStorage.getItem("user_id");
          // console.log(user);
          submitlog();
          setStatus("");
          refreshPage();
        } else if (response.data.message === "User not exist") {
          setStatus("User does not exist");
        } else {
          setStatus("Incorrect Password");
        }
      })
      .then((response) => {});
  };
  // ------------------log in report -----------------

  // const [id, setid] = useState("");
  // const [name, setName] = useState("");
  // const [department, setDepartment] = useState("");
  // const [type, setType] = useState("");
  var id = "";
  var name = "";
  var department = "";
  var type = "";
  var date = new Date(new Date().setHours(0, 0, 0, 0));
  var today = new Date();

  var curTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const submitlog = () => {
    Axios.post("http://192.168.1.58:8000/api/logreport", {
      logInId: id,
      logInName: name,
      logInDepartment: department,
      logInType: type,
      date: date,
      time: curTime,
    });
    console.log(date);
  };
  const user_id = localStorage.getItem("user_id");
  if (user_id) {
    return (
      <Route exact path="/authentication">
        <Redirect to="/ebooks" />
      </Route>
    );
  } else
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h4">
                <img src="/logoisu.png" height={60} alt="" />
              </Typography>
              <Typography align="center" component="h3" variant="h4">
                ISU-R <br /> E-Book Repository
              </Typography>

              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Typography component="h1" variant="h6" color="red">
                {loginStatus}
              </Typography>
              <Box
                component="form"
                noValidate
                // onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Id"
                      name="email"
                      onChange={(e) => {
                        setUserId(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(e) => {
                    login();
                  }}
                >
                  LOG IN
                </Button>

                <Grid container justifyContent="flex-end"></Grid>
              </Box>
            </Box>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Container>
        </ThemeProvider>
      </Router>
    );
}

export default Login;
