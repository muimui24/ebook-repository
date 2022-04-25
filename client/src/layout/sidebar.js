import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Users from "../users";

export default function MenuList(open) {
  // const ses = await sessionInfo();
  //   const { data: session, status } = useSession();
  //   // useEffect(() => {
  //   //   ses;
  //   // }, []);
  const user_type = localStorage.getItem("user_type");
  let navigate = useNavigate();
  if (user_type === "admin") {
    return (
      <List>
        <ListItemButton
          onClick={() => {
            navigate("/");
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
            navigate("/addEbook");
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
            navigate("/user");
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
      </List>
    );
  }
  return (
    <List>
      <ListItemButton
        onClick={() => {
          navigate("/");
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
    </List>
  );
}
