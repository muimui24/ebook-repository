import react, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import Thumbnail from "./displayEbook";
import App from "./App";
import { withRouter } from "react-router";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useNavigate,
  useLocation,
  Navigate,
  Redirect,
} from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  const navigate = useNavigate();
  function redirect() {
    navigate("/");
  }
  const user = localStorage.getItem("user_id");
  if (user !== undefined && user !== null) {
    console.log(user);
    console.log("is Login");
    //todo: redirect to main
  }
  function logout() {
    localStorage.removeItem("user_id");
  }
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:8000/login", {
      userId: userId,
      password: password,
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("user_id", response.data[0].user_id);
        localStorage.setItem("isLogIn", true);
        const userId = localStorage.getItem("user_id");
        setStatus(userId !== undefined ? "Login" : "No User Login");
        console.log(loginStatus);
        const user = localStorage.getItem("user_id");
        console.log(user);
        redirect();
      } else {
        console.log(response.data.message);
      }
    });
  };
  useEffect(() => {
    // Axios.get("http://localhost:8000/login").then((response) => {
    //   if (response.data.loggedIn == true) {
    //     console.log(response);
    //     setStatus(response.data.user[0].id);
    // });
  });

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
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
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {
                logout();
              }}
            >
              logout
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default Login;
