import * as React from "react";
import { Box } from "@mui/system";
import "./display.css";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import {
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const Reset = () => {
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleClickCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const user_id = localStorage.getItem("id");
  const [newPassword1, setnewPassword1] = React.useState("");
  const [newPassword2, setnewPassword2] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const id = localStorage.getItem("user_id");

  const inputupdated = () => {
    Axios.put("http://192.168.1.58:8000/api/updatepassword", {
      id: user_id,
      NewPassword: newPassword2,
    });
    handleClickCloseUpdate();
    alert("Successfully updated");
    window.location.reload(false);
  };

  const updatepassword = () => {
    Axios.post("http://192.168.1.58:8000/api/changepassword", {
      userId: id,
      password: oldPassword,
    }).then((response) => {
      if (
        response.data.message !== "Incorrect password" &&
        response.data.message !== "User not exist" &&
        newPassword1 === newPassword2
      ) {
        inputupdated();
      } else {
      }
    });

    // if (newPassword1 === newPassword2) {
    //   Axios.put("http://192.168.1.58:8000/api/updatepassword", {
    //     id: user_id,
    //     NewPassword: newPassword2,
    //   });
    //   handleClickCloseUpdate();
    //   alert("Successfully updated");
    //   window.location.reload(false);
    // } else {
    //   alert("password dont match");
    // }
  };

  return (
    <>
      <Dialog open={openUpdate}>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="oldpassword"
            label="Old Password"
            type="text"
            fullWidth
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <TextField
            margin="dense"
            id="newpassword"
            label="Input New Password"
            type="text"
            value={newPassword1}
            fullWidth
            onChange={(e) => setnewPassword1(e.target.value)}
          />
          <TextField
            margin="dense"
            id="oldpassword"
            label="Confirm Password"
            type="text"
            value={newPassword2}
            fullWidth
            onChange={(e) => setnewPassword2(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updatepassword();
            }}
          >
            Submit
          </Button>
          <Button onClick={handleClickCloseUpdate}>Close</Button>
        </DialogActions>
      </Dialog>
      <div className="container">
        <h1 align="center">Account Setting</h1>
      </div>
      <div className="container">
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            ID: {localStorage.getItem("user_id")} <br />
            <br />
            Name: {localStorage.getItem("user_name")} <br />
            <br />
            User Type:{localStorage.getItem("user_type")}
            <br />
            <br />
            Course: {localStorage.getItem("user_dep")} <br />
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleClickOpenUpdate}
          >
            Update Password
          </Button>
        </Box>
      </div>
    </>
  );
};
export default Reset;
