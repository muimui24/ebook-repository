import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SelectInput from "@mui/material/Select/SelectInput";
import { Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Viewer from "./viewpdf";
import { Box, flexbox } from "@mui/system";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4caf50",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Users() {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleClickCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ------------add USER----------------------------
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Gender, setGender] = useState("");
  const [userType, setUserType] = useState("");
  const [department, setDepartment] = useState("");
  const [religion, setReligion] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("isuroxas1978");

  const submitUser = () => {
    Axios.post("http://localhost:8000/api/insertuser", {
      fName: firstName.toLocaleUpperCase(),
      mName: middleName.toUpperCase(),
      lName: lastName.toLocaleUpperCase(),
      gender: Gender,
      userType: userType,
      department: department,
      religion: religion,
      userId: id,
      password: password,
    }).then((response) => {
      alert("Successfully Uploaded");
      handleClose();
      window.location.reload(false);
    });
    console.log(firstName);
  };

  // ------------get user from data base------------------------

  const [userList, setUserList] = useState([]);
  useState(() => {
    Axios.get("http://localhost:8000/api/getuser").then((response) => {
      setUserList(response.data);
    });
  }, []);
  // ------------delete book from data base----------------------
  const deleteUser = (userId) => {
    Axios.delete(`http://localhost:8000/api/deleteuser/${userId}`).then(
      (response) => {
        alert("Successfully Deleted");
        window.location.reload(false);
      }
    );
  };
  // ------------update user from data base----------------------
  const [form, setForm] = useState([
    {
      updateId: 0,
      updateFName: "",
      updateMName: "",
      updateLName: "",
      updateGender: "",
      updateDepartment: "",
      updateUserType: "",
      updateReligion: "",
      updatePassword: "",
      updatedUserId: 0,
    },
  ]);

  const updateForm = (user) => {
    setForm({
      updateId: user.id,
      updateFName: user.first_name,
      updateMName: user.middle_name,
      updateLName: user.last_name,
      updateGender: user.gender,
      updateUserType: user.user_type,
      updateDepartment: user.department,
      updateReligion: user.religion,
      updatePassword: user.password,
      updateUserId: user.user_id,
    });
  };
  const updateUser = () => {
    Axios.put("http://localhost:8000/api/updateuser", {
      userNewId: form.updateId,
      userNewFName: form.updateFName,
      userNewMName: form.updateMName,
      userNewLName: form.updateLName,
      userNewGender: form.updateGender,
      userNewUserType: form.updateUserType,
      userNewDepartment: form.updateDepartment,
      userNewReligion: form.updateReligion,
      userNewPassword: form.updatePassword,
      userNewUserId: form.updateUserId,
    }).then((response) => {
      handleClickCloseUpdate();
      alert("Successfully Updated");
      window.location.reload(false);
    });
  };
  // ------------------------resetpasword--------------------------
  const [openReset, setOpenReset] = useState(false);
  const openR = () => {
    setOpenReset(true);
  };
  const closeR = () => {
    setOpenReset(false);
  };
  const [defaultPasword, setDefaultPassword] = useState("isuroxas1978");
  var user_id;
  const getid = (id) => {
    user_id = id;
    console.log(user_id);
  };

  const updatepassword = () => {
    Axios.put("http://localhost:8000/api/resetpassword", {
      id: user_id,
      NewPassword: defaultPasword,
    });
    handleClickCloseUpdate();
    alert("Successfully updated");
    window.location.reload(false);
  };
  // ------------------------resetpasword--------------------------

  const [searchInput, setSearchInput] = useState("");
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };
  const filtered = userList.filter((item) => {
    return (
      item.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.department.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.user_id.toString().includes(searchInput.toString()) ||
      item.user_type.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.middle_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.religion.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchInput.toLowerCase())
    );
  });
  return (
    <>
      <Dialog open={openReset}>
        <DialogTitle>Confirm Reset?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updatepassword();
            }}
          >
            Confirm
          </Button>
          <Button onClick={closeR}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ---------------add user dialog ---------*/}
      <Dialog open={open}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="mname"
            label="Middle Name"
            type="text"
            fullWidth
            onChange={(e) => {
              setMiddleName(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />{" "}
          <Box
            sx={{
              display: "flex",
              pt: 2,
              pb: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Gender}
                label="Gender"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Type of User
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label="Type of User"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Faculty"}>Faculty</MenuItem>
                <MenuItem value={"Staff"}>Staff</MenuItem>
                <MenuItem value={"Visitor"}>Visitor</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={department}
              label="Department"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <MenuItem value={"BSIT"}>BSIT</MenuItem>
              <MenuItem value={"BSE"}>BSE</MenuItem>
              <MenuItem value={"BSC"}>BSC</MenuItem>
              <MenuItem value={"BSA"}>BSA</MenuItem>
              <MenuItem value={"BSAB"}>BSAB</MenuItem>
              <MenuItem value={"BSLEA"}>BSLEA</MenuItem>
              <MenuItem value={"BSF"}>BSF</MenuItem>
              <MenuItem value={"BSF"}>BSF</MenuItem>
              <MenuItem value={"MSF"}>MSF</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="religion"
            label="Religion"
            type="text"
            fullWidth
            onChange={(e) => {
              setReligion(e.target.value);
            }}
          />{" "}
          <TextField
            margin="dense"
            id="id"
            label="ID Number"
            type="text"
            fullWidth
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="pw"
            label="Password"
            type="text"
            value={password}
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              submitUser();
            }}
          >
            Submit
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ---------------delete confirmation ---------*/}
      {/* <Dialog open={open}>
        <DialogTitle>Confirm Delete?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              submitUser();
            }}
          >
            Submit
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog> */}
      {/* ---------------update user dialog ---------*/}
      <Dialog open={openUpdate}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            value={form.updateFName}
            fullWidth
            onChange={(e) => setForm({ ...form, updateFName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="mname"
            label="Middle Name"
            type="text"
            value={form.updateMName}
            fullWidth
            onChange={(e) => setForm({ ...form, updateMName: e.target.value })}
          />
          <TextField
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            value={form.updateLName}
            fullWidth
            onChange={(e) => setForm({ ...form, updateLName: e.target.value })}
          />{" "}
          <Box
            sx={{
              display: "flex",
              pt: 2,
              pb: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.updateGender}
                label="Gender"
                onChange={(e) =>
                  setForm({ ...form, updateGender: e.target.value })
                }
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Type of User
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.updateUserType}
                label="Type of User"
                onChange={(e) =>
                  setForm({ ...form, updateUserType: e.target.value })
                }
              >
                <MenuItem value={"Student"}>Student</MenuItem>
                <MenuItem value={"Faculty"}>Faculty</MenuItem>
                <MenuItem value={"Staff"}>Staff</MenuItem>
                <MenuItem value={"Visitor"}>Visitor</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Department</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={form.updateDepartment}
              label="Department"
              onChange={(e) =>
                setForm({ ...form, updateDepartment: e.target.value })
              }
            >
              <MenuItem value={"BSIT"}>BSIT</MenuItem>
              <MenuItem value={"BSE"}>BSE</MenuItem>
              <MenuItem value={"BSC"}>BSC</MenuItem>
              <MenuItem value={"BSA"}>BSA</MenuItem>
              <MenuItem value={"BSAB"}>BSAB</MenuItem>
              <MenuItem value={"BSLEA"}>BSLEA</MenuItem>
              <MenuItem value={"BSF"}>BSF</MenuItem>
              <MenuItem value={"BSF"}>BSF</MenuItem>
              <MenuItem value={"MSF"}>MSF</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="religion"
            label="Religion"
            type="text"
            value={form.updateReligion}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, updateReligion: e.target.value })
            }
          />{" "}
          <TextField
            margin="dense"
            id="id"
            label="ID Number"
            type="text"
            value={form.updateUserId}
            fullWidth
            onChange={(e) => setForm({ ...form, updateUserId: e.target.value })}
          />
          <TextField
            margin="dense"
            id="pw"
            label="Password"
            type="text"
            value={form.updatePassword}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, updatePassword: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateUser();
            }}
          >
            Submit
          </Button>
          <Button onClick={handleClickCloseUpdate}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ---------------update ebook dialog ---------*/}
      <h2>MANAGE USERS</h2>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ width: "75%", display: "flex" }}
          placeholder="Search..."
          label="Search"
          type="text"
          onChange={(e) => searchItems(e.target.value.toString())}
        />
      </Box>
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon />}
        sx={{ m: "6px" }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        {" "}
        Add New User
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Religion</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Type of User</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((val) => (
              <StyledTableRow key={val.id}>
                <StyledTableCell>
                  <Button
                    onClick={() => {
                      updateForm(val);
                      handleClickOpenUpdate();
                      console.log(userList);
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      openR();
                      getid(val.id);
                    }}
                  >
                    Reset Password
                  </Button>
                  <Button>
                    <DeleteIcon
                      onClick={() => {
                        deleteUser(val.id);
                      }}
                      type="button"
                      sx={{ color: "#ef5350" }}
                    />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left" component="th" scope="row">
                  {val.user_id}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {val.last_name +
                    ", " +
                    val.first_name +
                    " " +
                    val.middle_name}
                </StyledTableCell>
                <StyledTableCell align="left">{val.gender}</StyledTableCell>
                <StyledTableCell align="left">{val.religion}</StyledTableCell>
                <StyledTableCell align="left">{val.department}</StyledTableCell>
                <StyledTableCell align="left">{val.user_type}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default Users;
