import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import * as React from "react";

import { useHistory } from "react-router-dom";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function MenuList(open) {
  // const ses = await sessionInfo();
  //   const { data: session, status } = useSession();
  //   // useEffect(() => {
  //   //   ses;
  //   // }, []);
  const history = useHistory();

  // function handleClick() {
  //   history.push("/ebooks");
  // }
  const user_type = localStorage.getItem("user_type");
  const user_id = localStorage.getItem("user_id");
  // let navigate = useNavigate();
  if (user_type === "admin" && user_id !== null) {
    return (
      <List>
        <ListItemButton
          onClick={() => {
            // navigate("/");
            history.push("/dashboard");
            window.location.reload(false);

            localStorage.setItem("opener", false);
          }}
          key="home"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            // navigate("/");
            history.push("/ebooks");
            window.location.reload(false);

            localStorage.setItem("opener", false);
          }}
          key="books"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText primary="View E-books" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            // navigate("/addEbook");
            history.push("/addEbook");
          }}
          key="E-Books"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <LibraryBooksRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Manage E-Books"
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            // navigate("/user");
            history.push("/user");
          }}
          key="Manage Accounts"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Users" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            // navigate("/print");
            history.push("/print");
          }}
          key="Print Report"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AdfScannerIcon />
          </ListItemIcon>
          <ListItemText primary="Print Report" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            // navigate("/reset");
            history.push("/reset");
          }}
          key="reset"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <AdminPanelSettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary="Reset Password"
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </List>
    );
  } else if (user_id === null) {
    return (
      <List>
        <ListItemButton
          onClick={() => {
            // navigate("/");
            history.push("/ebooks");
            window.location.reload(false);
          }}
          key="e-books"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </List>
    );
  }
  return (
    <List>
      <ListItemButton
        onClick={() => {
          history.push("/recommended");
          window.location.reload(false);
        }}
        key="recommended"
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <HomeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          history.push("/ebooks");
          window.location.reload(false);
        }}
        key="ebooks"
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Explore" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          // navigate("/reset");
          history.push("/reset");
        }}
        key="reset"
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <AdminPanelSettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Reset Password" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </List>
  );
}
