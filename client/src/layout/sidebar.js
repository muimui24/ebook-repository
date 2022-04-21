import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuList(open) {
  // const ses = await sessionInfo();
  //   const { data: session, status } = useSession();
  //   // useEffect(() => {
  //   //   ses;
  //   // }, []);

  return (
    <List>
      <ListItemButton
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
        <ListItemText primary="Manage E-Books" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
      <ListItemButton
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
