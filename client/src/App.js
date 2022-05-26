import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuList from "./layout/sidebar";
import AccountMenu from "./layout/account";
import AddEbook from "./addEbook";
import Login from "./authentication";

import Users from "./users";
import Print from "./logreport";
import Thumbnail from "./displayEbook";
import Reset from "./resetPw";
import ProtectedRoutes from "./routesProtecting";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // let location = useLocation();
  // const [isAuth, setIsAuth] = useState(true);
  var isAuth = false;
  var adminAuth = false;

  const user_id = localStorage.getItem("user_id");
  const user_type = localStorage.getItem("user_type");
  console.log(user_id);
  if (user_id !== null && user_type === "admin") {
    adminAuth = true;
  }

  if (user_id !== null) {
    isAuth = true;
  }
  if (user_id === null) {
    return (
      <Router>
        {" "}
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            sx={{ backgroundColor: "#4caf50" }}
            position="fixed"
            open={open}
          >
            {/* <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" noWrap component="div" m="10px">
                  <img src="/logoisu.png" height={40} />
                  E-Book Management Repository of ISU-Roxas
                </Typography>
                <AccountMenu />
              </Box>
            </div>
          </Toolbar> */}
          </AppBar>
          {/* <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: "#e3f2fd" }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MenuList open={open} />

          <Divider />
        </Drawer> */}

          <Box component="main" sx={{ flexGrow: 2, p: 2 }}>
            <DrawerHeader />
            {/* <FileUploader /> */}
            {/* <AddEbook /> */}
            {/* <Viewer /> */}
            {/* <ImgMediaCard /> */}
            {/* <Login /> */}
            {/* <Tumbnail /> */}
            {/* <Routes> */}
            {/* <Route path="/addEbook" element={<AddEbook />} />
            <Route path="/user" element={<Users />} />
            <Route path="/" element={<Thumbnail />} />
            <Route path="*" element={<Thumbnail />} />
            <Route path="/print" element={<Print />} />
            <Route path="/reset" element={<Reset />} /> */}
            {/* <Route path="/authentication" element={<Login />} /> */}
            {/* </Routes> */}
            <Route path="/authentication">
              <Login />
            </Route>

            <ProtectedRoutes
              path="/addEbook"
              component={AddEbook}
              isAuth={adminAuth}
            />
            <ProtectedRoutes path="/reset" component={Reset} isAuth={isAuth} />
            <ProtectedRoutes
              path="/print"
              component={Print}
              isAuth={adminAuth}
            />
            <ProtectedRoutes
              path="/user"
              component={Users}
              isAuth={adminAuth}
            />
            <ProtectedRoutes
              path="/ebooks"
              component={Thumbnail}
              isAuth={isAuth}
            />
          </Box>
        </Box>{" "}
      </Router>
    );
  }
  return (
    <Router>
      {" "}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: "#4caf50" }}
          position="fixed"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 1,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <div style={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" noWrap component="div" m="0px">
                  <img src="/logoisu.png" height={30} alt="" />
                  ISU-R E-Book Repository
                </Typography>
                <AccountMenu />
              </Box>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{ backgroundColor: "#e3f2fd" }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <MenuList open={open} />

          <Divider />
        </Drawer>

        <Box
          component="main"
          sx={{
            pr: 1,
            pt: 2,

            width: {
              xs: 370,
              sm: 600,
              md: 820,
              lg: "100%",
            },
          }}
        >
          <DrawerHeader />
          <Route path="/authentication">
            <Login />
          </Route>

          <ProtectedRoutes
            path="/addEbook"
            component={AddEbook}
            isAuth={adminAuth}
          />
          <ProtectedRoutes path="/reset" component={Reset} isAuth={isAuth} />
          <ProtectedRoutes path="/print" component={Print} isAuth={adminAuth} />
          <ProtectedRoutes path="/user" component={Users} isAuth={adminAuth} />
          <ProtectedRoutes
            path={"/ebooks"}
            component={Thumbnail}
            isAuth={isAuth}
          />
        </Box>
      </Box>{" "}
    </Router>
  );
}

export default App;
