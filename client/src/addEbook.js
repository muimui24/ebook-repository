import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Axios from "axios";
import { Box, Button } from "@mui/material";

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
  const [subject, setSubject] = useState("");
  const [year_pub, setYear_pub] = useState("");
  const [pub_place, setPub_Place] = useState("");
  const [accession_no, setAccession_no] = useState("");
  const [call_no, setCall_no] = useState("");

  var fileName = "";
  var thumbnailName = "";

  const submitBook = () => {
    Axios.post("http://192.168.1.58:8000/api/insert", {
      ebookTitle: title,
      ebookAuthor: author,
      ebookCategory: category,
      ebookDescription: description,
      ebookFileName: fileName,
      ebookThumbnail: thumbnailName,
      ebookSubject: subject,
      year_published: year_pub,
      place_publication: pub_place,
      accession: accession_no,
      call_number: call_no,
    }).then((result) => {
      alert("Successfully Uploaded");
      handleClose();
      window.location.reload(false);
    });
    console.log(title);
  };

  // ------------upload------------------------------
  var file = null;
  const onInputChange = async (e) => {
    fileName = e.target.files[0].name;
    file = e.target.files[0];
    console.log(fileName);
    console.log(file);
  };

  const onSubmit = (e) => {
    const data = new FormData();

    data.append("file", file);

    Axios.post("http://192.168.1.58:8000/upload", data)
      .then((e) => {
        console.log("Success");
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };
  var thumb = null;
  const inputThumbnail = async (e) => {
    thumbnailName = e.target.files[0].name;
    thumb = e.target.files[0];
    console.log(thumbnailName);
    console.log(thumb);
  };
  const submitThumbnail = (e) => {
    const bookdata = new FormData();

    bookdata.append("file", thumb);

    Axios.post("http://192.168.1.58:8000/upload", bookdata)
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
    Axios.get("http://192.168.1.58:8000/api/read").then((response) => {
      setEbookList(response.data);
    });
  }, []);
  // ------------delete book from data base----------------------
  const deleteBook = (bookId) => {
    Axios.delete(`http://192.168.1.58:8000/api/delete/${bookId}`).then(
      (response) => {
        window.location.reload(false);
        alert("Successfully Deleted");
      }
    );
  };
  // ------------update book from data base----------------------
  const [form, setForm] = useState([
    {
      updateId: 0,
      updateTitle: "",
      updateAuthor: "",
      updateCategory: "",
      updateDescription: "",
      updateSubject: "",
      updateYearPublished: "",
      placePublished: "",
      updateCallNo: "",
      updateAccessionNo: "",
    },
  ]);

  const updateForm = (book) => {
    setForm({
      updateId: book.id,
      updateTitle: book.title,
      updateAuthor: book.author,
      updateCategory: book.category,
      updateDescription: book.description,
      updateSubject: book.subject,
      updateYearPublished: book.year_published,
      placePublished: book.publication_place,
      updateCallNo: book.call_no,
      updateAccessionNo: book.accession_no,
    });
  };
  const updateBook = () => {
    Axios.put("http://192.168.1.58:8000/api/update", {
      ebookNewId: form.updateId,
      ebookNewTitle: form.updateTitle,
      ebookNewAuthor: form.updateAuthor,
      ebookNewCategory: form.updateCategory,
      ebookNewDescription: form.updateDescription,
      ebookNewSubject: form.updateSubject,
      updateYearPublished: form.updateYearPublished,
      placePublished: form.placePublished,
      updateCallNo: form.updateCallNo,
      updateAccessionNo: form.updateAccessionNo,
    });
    handleClickCloseUpdate();
    alert("Successfully updated");
    window.location.reload(false);
  };

  const [searchInput, setSearchInput] = useState("");
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };
  const filtered = ebookList.filter((item) => {
    return (
      item.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.author.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

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
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="year published"
            label="Year Published"
            type="text"
            fullWidth
            onChange={(e) => {
              setYear_pub(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="place"
            label="Place of Publication"
            type="text"
            fullWidth
            onChange={(e) => {
              setPub_Place(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="call"
            label="Call No."
            type="text"
            fullWidth
            onChange={(e) => {
              setCall_no(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="accession"
            label="Accession No."
            type="text"
            fullWidth
            onChange={(e) => {
              setAccession_no(e.target.value);
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
          <h6>Upload PDF file:</h6>
          <input
            type="file"
            className="form-control"
            multiple
            label="upload pdf"
            onChange={onInputChange}
          />
          <h6>Upload thumbnail image:</h6>
          <input
            type="file"
            className="form-control"
            multiple
            onChange={inputThumbnail}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onSubmit();
              submitBook();
              submitThumbnail();
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
            id="newSubject"
            label="Subject"
            type="text"
            value={form.updateSubject}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, updateSubject: e.target.value })
            }
          />

          <TextField
            margin="dense"
            id="year"
            label="Year Published"
            type="text"
            value={form.updateYearPublished}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, updateYearPublished: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="place"
            label="Place of Publication"
            type="text"
            value={form.placePublished}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, placePublished: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="call"
            label="Call No."
            type="text"
            value={form.updateCallNo}
            fullWidth
            onChange={(e) => setForm({ ...form, updateCallNo: e.target.value })}
          />
          <TextField
            margin="dense"
            id="accession"
            label="Accession No."
            type="text"
            value={form.updateAccessionNo}
            fullWidth
            onChange={(e) =>
              setForm({ ...form, updateAccessionNo: e.target.value })
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
      <h2>MANAGE E-BOOKS</h2>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ width: "75%", display: "flex" }}
          placeholder="Search..."
          label="Search"
          type="text"
          onChange={(e) => searchItems(e.target.value)}
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
        Add Book
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Year Published</StyledTableCell>
              <StyledTableCell>Publication Place</StyledTableCell>
              <StyledTableCell>Call No.</StyledTableCell>
              <StyledTableCell>Accession No.</StyledTableCell>
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
                <StyledTableCell align="left" component="th" scope="row">
                  {val.title}
                </StyledTableCell>
                <StyledTableCell align="left">{val.author}</StyledTableCell>
                <StyledTableCell align="left">{val.category}</StyledTableCell>
                <StyledTableCell align="left">
                  {val.year_published}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {val.publication_place}
                </StyledTableCell>
                <StyledTableCell align="left">{val.call_no}</StyledTableCell>
                <StyledTableCell align="left">
                  {val.accession_no}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default AddEbook;
