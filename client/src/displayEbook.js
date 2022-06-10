import * as React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import "./display.css";
import { useState } from "react";
import Axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import { styled } from "@mui/material/styles";

// const Root = styled("div")(({ theme }) => ({
//   padding: theme.spacing(1),
//   [theme.breakpoints.down("md")]: {
//     width: 1,
//   },
// }));

export default function Thumbnail() {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [viewer, setViewer] = React.useState(false);
  const [pdfName, setPdfName] = React.useState("");
  const [ebookList, setEbookList] = React.useState([]);
  const [page, setPage] = React.useState(700);
  const hasWindow = typeof window !== "undefined";
  const width = hasWindow ? window.innerWidth : null;

  const handleChange = (event) => {
    setPage(event.target.value);
  };
  const jumpPage = (event) => {
    setPageNumber(parseInt(event.target.value));
  };
  const usertype = localStorage.getItem("user_type");
  React.useState(() => {
    Axios.get("  http://localhost:8000/api/read").then((response) => {
      setEbookList(response.data);
    });
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offSet) {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  }
  // function changePageto(page) {
  //   setPageNumber(page);
  // }
  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }

  function opener(file) {
    if (usertype === "admin") {
      window.location = file;
    } else if (width <= 400) {
      setPage(400);
      setViewer(true);
    }
    setViewer(true);
  }

  var closing = localStorage.getItem("opener");
  if (closing === false) {
    setViewer(false);
  }

  const [searchInput, setSearchInput] = useState("");
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const filtered = ebookList.filter((item) => {
    return (
      item.category.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.author.toLowerCase().includes(searchInput.toLowerCase())
    );
  });
  // if (width < 400) {
  //   setPage();
  // }

  if (viewer === true && usertype !== "admin" && width > 400) {
    return (
      <div
        className="pdf"
        onContextMenu={(e) => e.preventDefault()}
        display="flex"
        align="center"
      >
        <Grid
          container
          align="center"
          sx={{
            justifyContent: "space-between",
            "& .MuiTextField-root": {
              m: { xs: 1, md: 2, lg: 2 },
              width: { xs: "8ch", md: "12ch", lg: "12ch" },
            },
            "& .MuiFormControl-root": {
              m: { xs: 1, md: 2, lg: 2 },
              width: { xs: "8ch", md: "12ch", lg: "12ch" },
            },
          }}
        >
          {pageNumber > 1 && (
            <Button
              variant="contained"
              onClick={changePageBack}
              sx={{ height: { xs: 25, sm: 30, md: 40, lg: 50 } }}
            >
              <ArrowBackIosNewIcon />
            </Button>
          )}
          <TextField
            sx={{ size: { xs: "small" } }}
            placeholder="Search..."
            label="Jump to..."
            type="Number"
            size="small"
            value={pageNumber}
            onChange={jumpPage}
          />{" "}
          <FormControl
            sx={{ height: { xs: 25, sm: 30, md: 40, lg: 50 } }}
            size="small"
          >
            <InputLabel id="demo-simple-select-label">Zoom</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={page}
              label="Zoom"
              onChange={handleChange}
            >
              <MenuItem value={400}>10%</MenuItem>
              <MenuItem value={500}>25%</MenuItem>
              <MenuItem value={600}>50%</MenuItem>
              <MenuItem value={650}>75%</MenuItem>
              <MenuItem value={700}>100%</MenuItem>
              <MenuItem value={1000}>125%</MenuItem>
              <MenuItem value={1100}>150%</MenuItem>
              <MenuItem value={1200}>175%</MenuItem>
              <MenuItem value={1300}>200%</MenuItem>
            </Select>
          </FormControl>
          {/* <Button
            variant="contained"
            onClick={() => {
              close();
            }}
          >
            exit
          </Button> */}
          {pageNumber < numPages && (
            <Button
              variant="contained"
              onClick={changePageNext}
              sx={{ height: { xs: 25, sm: 30, md: 40, lg: 50 } }}
            >
              <ArrowForwardIosIcon />
            </Button>
          )}
        </Grid>
        <header
          className="App-header"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              justifyContent: "space-between",
            }}
            bgcolor="black"
          >
            <Document file={pdfName} onLoadSuccess={onDocumentLoadSuccess}>
              <Page height={page} pageNumber={pageNumber} />
            </Document>
          </Box>{" "}
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </header>
        {/* <div>
          <Document file={pdfName} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index}`} pageNumber={index} />
            ))}
          </Document>
        </div> */}
      </div>
    );
  } else if (viewer === true && usertype !== "admin" && width <= 400) {
    return (
      <div
        className="pdf"
        onContextMenu={(e) => e.preventDefault()}
        display="flex"
        align="center"
      >
        <Grid
          container
          align="center"
          sx={{
            justifyContent: "space-between",
            "& .MuiTextField-root": { m: 1, width: "8ch" },
            "& .MuiFormControl-root": {
              m: { xs: 1, md: 2, lg: 2 },
              width: { xs: "8ch", md: "12ch", lg: "12ch" },
            },
          }}
        >
          {pageNumber > 1 && (
            <Button
              variant="contained"
              onClick={changePageBack}
              sx={{ height: { xs: 25 } }}
            >
              <ArrowBackIosNewIcon />
            </Button>
          )}
          <TextField
            placeholder="Search..."
            label="Jump to..."
            type="Number"
            value={pageNumber}
            onChange={jumpPage}
            size="small"
          />
          <FormControl
            sx={{ height: { xs: 25, sm: 30, md: 40, lg: 50 } }}
            size="small"
          >
            <InputLabel id="demo-simple-select-label">Zoom</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={page}
              label="Select Page"
              onChange={handleChange}
            >
              <MenuItem value={400}>10%</MenuItem>
              <MenuItem value={500}>25%</MenuItem>
              <MenuItem value={600}>50%</MenuItem>
              <MenuItem value={650}>75%</MenuItem>
              <MenuItem value={700}>100%</MenuItem>
              <MenuItem value={1000}>125%</MenuItem>
              <MenuItem value={1100}>150%</MenuItem>
              <MenuItem value={1200}>175%</MenuItem>
              <MenuItem value={1300}>200%</MenuItem>
            </Select>
          </FormControl>

          {pageNumber < numPages && (
            <Button
              variant="contained"
              onClick={changePageNext}
              sx={{ height: { xs: 25 } }}
            >
              <ArrowForwardIosIcon />
            </Button>
          )}
        </Grid>
        <header
          className="App-header"
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              justifyContent: "space-between",
            }}
            bgcolor="black"
          >
            <Document file={pdfName} onLoadSuccess={onDocumentLoadSuccess}>
              <Page height={page} pageNumber={pageNumber} />
            </Document>
          </Box>{" "}
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </header>
        {/* <div>
          <Document file={pdfName} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index}`} pageNumber={index} />
            ))}
          </Document>
        </div> */}
      </div>
    );
  } else {
    return (
      <div>
        <h2>E-BOOKS</h2>
        <Box sx={{ display: "flex" }}>
          <TextField
            sx={{ width: "100%", display: "flex" }}
            placeholder="Search..."
            label="Search"
            type="text"
            onChange={(e) => searchItems(e.target.value.toString())}
          />
        </Box>
        <Grid container>
          {filtered.map((val) => (
            <Grid margin={3} item xs={10} sm={6} md={2.5} key={val.id}>
              <Card margin={1.5} sx={{ height: "550px" }}>
                <CardActionArea
                  onClick={() => {
                    opener("  http://localhost:8000/" + val.file_name);
                    setPdfName(" http://localhost:8000/" + val.file_name);
                    // history.push("http://192.168.1.58:8000/" + val.file_name);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={" http://localhost:8000/" + val.thumbnail}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {val.title}
                    </Typography>

                    <Box display="">
                      <Typography variant="body2" color="text.secondary">
                        By: {val.author}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Category: {val.category}
                        <br />
                        Year Published:{val.year_published}
                        <br />
                        Place of Publication:{val.publication_place}
                        <br />
                        Suubject:{val.subject}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Accesion #: {val.accession_no}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Call #:{val.call_no}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {val.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}
