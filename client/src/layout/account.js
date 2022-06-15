import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import Rating from "@mui/material/Rating";
import PersonIcon from "@mui/icons-material/Person";
import { DialogTitle } from "@mui/material";
import Axios from "axios";
import Typography from "@mui/material/Typography";
import StarRateIcon from "@mui/icons-material/StarRate";
import TextField from "@mui/material/TextField";
import "../featuredInfo.css";

export default function AccountMenu() {
  const [rate1, setRate1] = React.useState(3);
  const [rate2, setRate2] = React.useState(3);
  const [rate3, setRate3] = React.useState(3);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [opendialog, setOpen] = React.useState(false);
  const handleCloseDialog = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user_id = localStorage.getItem("user_id");
  const user_name = localStorage.getItem("user_name");
  const user_department = localStorage.getItem("user_dep");

  const submitRating = () => {
    Axios.post("  http://localhost:8000/api/rating", {
      rate1: rate1,
      rate2: rate2,
      rate3: rate3,
      user_id: user_id,
      user_name: user_name,
    });
    console.log("failed");
  };
  const action = async () => {
    await submitRating();
    await logout();
    refreshPage();
  };
  function logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    localStorage.removeItem("id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user_dep");
  }
  function refreshPage() {
    window.location.reload(false);
  }
  if (user_id !== null) {
    return (
      <React.Fragment>
        <Dialog open={opendialog}>
          <DialogTitle>
            Dear Students/Clients,
            <Typography component="legend">
              We aim to provide you with quality, effective and efficient
              services. Please let us know how we are able to serve you. Choose
              your responses using the following rating scale.
              <br />
              Excellent =
              <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <br />
              Very Satisfactory = <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <br />
              Satisfactory = <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <StarRateIcon className="star" />
              <br />
              Needs Improvement = <StarRateIcon className="star" />
              <StarRateIcon className="star" /> {"  or  "}{" "}
              <StarRateIcon className="star" />
            </Typography>
          </DialogTitle>

          <DialogContent>
            <br />
            <Typography component="legend">
              Serves/Accommodates the client courteously/politely?
            </Typography>
            <Rating
              name="simple-controlled"
              value={rate1}
              onChange={(event, newValue) => {
                setRate1(newValue);
              }}
            />

            <br />
            <Typography component="legend">
              Promptly attends to client needs?
            </Typography>
            <Rating
              name="simple-controlled"
              value={rate2}
              onChange={(event, newValue) => {
                setRate2(newValue);
              }}
            />
            <br />
            <Typography component="legend">
              Gives clear and correct information/instruction?
            </Typography>
            <Rating
              name="simple-controlled"
              value={rate3}
              onChange={(event, newValue) => {
                setRate3(newValue);
              }}
            />
            <br />
            <TextField
              margin="dense"
              id="category"
              label="Comment"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                action();
              }}
            >
              Submit Rating to Log-out
            </Button>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Log out">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar /> {user_id}
          </MenuItem>
          <Divider />

          <MenuItem
            onClick={() => {
              // logout();
              // refreshPage();
              setOpen(true);
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
  return null;
}
