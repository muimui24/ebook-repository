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
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

function AddEbook() {
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

  // ------------add book----------------------------
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const submitBook = () => {
    Axios.post("http://localhost:8000/api/insert", {
      ebookTitle: title,
      ebookAuthor: author,
      ebookCategory: category,
      ebookDescription: description,
      ebookFileName: fileName,
    }).then(() => {
      alert("successfully inserted");
    });
    console.log(title);
  };

  // ------------upload------------------------------
  const [file, setFile] = useState(null);
  const onInputChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    const data = new FormData();

    data.append("file", file);

    Axios.post("//localhost:8000/upload", data)
      .then((e) => {
        console.log("Success");
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };
  // ------------get book from data base------------------------

  const [ebookList, setEbookList] = useState([]);
  useState(() => {
    Axios.get("http://localhost:8000/api/read").then((response) => {
      setEbookList(response.data);
    });
  }, []);
  // ------------delete book from data base----------------------
  const deleteBook = (bookId) => {
    Axios.delete(`http://localhost:8000/api/delete/${bookId}`);
  };
  // ------------update book from data base----------------------
  const [form, setForm] = useState([
    {
      updateId: 0,
      updateTitle: "",
      updateAuthor: "",
      updateCategory: "",
      updateDescription: "",
    },
  ]);

  const updateForm = (book) => {
    setForm({
      updateId: book.id,
      updateTitle: book.title,
      updateAuthor: book.author,
      updateCategory: book.category,
      updateDescription: book.description,
    });
  };
  const updateBook = () => {
    Axios.put("http://localhost:8000/api/update", {
      ebookNewId: form.updateId,
      ebookNewTitle: form.updateTitle,
      ebookNewAuthor: form.updateAuthor,
      ebookNewCategory: form.updateCategory,
      ebookNewDescription: form.updateDescription,
    });
    handleClickCloseUpdate();
  };

  return (
    <>
      {/* ---------------add ebook dialog ---------*/}
      <Dialog open={open}>
        <DialogTitle>Book Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            type="file"
            className="form-control"
            multiple
            onChange={onInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onSubmit();
              submitBook();
            }}
          >
            Submit
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ---------------add ebook dialog ---------*/}
      {/* ---------------update ebook dialog ---------*/}
      <Dialog open={openUpdate}>
        <DialogTitle>Book Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="newtitle"
            label="Title"
            type="text"
            value={form.updateTitle}
            fullWidth
            onChange={(e) => setForm({ ...form, updateTitle: e.target.value })}
          />
          <TextField
            margin="dense"
            id="newauthor"
            label="Author"
            type="text"
            value={form.updateAuthor}
            fullWidth
            onChange={(e) => setForm({ ...form, updateAuthor: e.target.value })}
          />
          <TextField
            margin="dense"
            id="newcategory"
            label="Category"
            type="text"
            value={form.updateCategory}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, updateCategory: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="newdescription"
            label="Description"
            type="text"
            value={form.updateDescription}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, updateDescription: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              updateBook();
            }}
          >
            Submit
          </Button>
          <Button onClick={handleClickCloseUpdate}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ---------------update ebook dialog ---------*/}
      <h2>E-BOOKS</h2>
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon />}
        sx={{ m: "6px" }}
        onClick={handleClickOpen}
      >
        Add Book
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ebookList.map((val) => (
              <StyledTableRow key={val.id}>
                <StyledTableCell align="right">
                  <StyledTableCell align="right">
                    {" "}
                    <Button
                      onClick={() => {
                        updateForm(val);
                        handleClickOpenUpdate();
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button>
                      <DeleteIcon
                        onClick={() => {
                          deleteBook(val.id);
                        }}
                        type="button"
                        sx={{ color: "#ef5350" }}
                      />
                    </Button>
                  </StyledTableCell>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {val.title}
                </StyledTableCell>
                <StyledTableCell align="right">{val.author}</StyledTableCell>
                <StyledTableCell align="right">{val.category}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default AddEbook;
