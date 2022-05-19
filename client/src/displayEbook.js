import * as React from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import "./display.css";
import { useState } from "react";
import Axios from "axios";
import { VALID_LOADERS } from "next/dist/server/image-config";

export default function Thumbnail() {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [viewer, setViewer] = React.useState(false);
  const [pdfName, setPdfName] = React.useState("");
  const [ebookList, setEbookList] = React.useState([]);
  React.useState(() => {
    Axios.get("http://localhost:8000/api/read").then((response) => {
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
  function changePageBack() {
    changePage(-1);
  }
  function changePageNext() {
    changePage(+1);
  }

  function opener() {
    setViewer(true);
  }
  function close() {
    setViewer(false);
  }
  var closing = localStorage.getItem("opener");
  if (closing === false) {
    setViewer(false);
  }
  const [searchBy, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
  if (viewer === true) {
    return (
      <div
        className="pdf"
        onContextMenu={(e) => e.preventDefault()}
        display="flex"
      >
        <Grid
          container
          align="center"
          sx={{
            justifyContent: "space-between",
          }}
        >
          {pageNumber > 1 && (
            <Button variant="contained" onClick={changePageBack}>
              Previous Page
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => {
              close();
            }}
          >
            exit
          </Button>{" "}
          {pageNumber < numPages && (
            <Button variant="contained" onClick={changePageNext}>
              next Page
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
          >
            {" "}
            <Document file={pdfName} onLoadSuccess={onDocumentLoadSuccess}>
              <Page height={600} pageNumber={pageNumber} />
            </Document>
          </Box>
          <p>
            Page {pageNumber} of {numPages}
          </p>{" "}
        </header>
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
            onChange={(e) => searchItems(e.target.value)}
          />
        </Box>
        <Grid container>
          {filtered.map((val) => (
            <Grid margin={3} item xs={10} sm={6} md={2.5} key={val.id}>
              <Card margin={1.5} sx={{ height: "550px" }}>
                <CardActionArea
                  onClick={() => {
                    opener();
                    setPdfName("//localhost:8000/" + val.file_name);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={"http://localhost:8000/" + val.thumbnail}
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
