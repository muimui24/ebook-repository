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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import Axios from "axios";

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
        <header className="App-header">
          <Box
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Document file={pdfName} onLoadSuccess={onDocumentLoadSuccess}>
              <Page height={300} width={650} pageNumber={pageNumber} />
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
            sx={{ width: "75%", display: "flex" }}
            placeholder="Search..."
            label="Search"
            type="text"
            onChange={(e) => searchItems(e.target.value)}
          />
        </Box>
        <Grid container>
          {filtered.map((val) => (
            <Grid margin={1.5} item xs={9} sm={6} md={2} key={val.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
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
                        by: {val.author}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {val.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {val.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                      opener();
                      setPdfName("//localhost:8000/" + val.file_name);
                    }}
                  >
                    Read
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      // <ImageList container="true" display="flex">
      //   <Grid container>
      //     <Grid margin={1.5} item xs={10} sm={6} md={3}>
      //       <ImageListItem>
      //         {/* <img
      //   src={`${item.img}?w=248&fit=crop&auto=format`}
      //   srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
      //   alt={item.title}
      //   loading="lazy"
      // /> */}
      //         <Document
      //           file={`${
      //             "//localhost:8000/" + filename
      //           }?w=248&fit=crop&auto=format`}
      //           onLoadSuccess={onDocumentLoadSuccess}
      //         >
      //           <Page
      //             height={100}
      //             pageNumber={pageNumber}
      //             onClick={() => {
      //               opener();

      //               setPdfName("//localhost:8000/" + filename);
      //             }}
      //           />
      //         </Document>
      //         <ImageListItemBar
      //           title=""
      //           subtitle={<span>by: ""</span>}
      //           position="below"
      //         />
      //       </ImageListItem>
      //       <ImageListItem>
      //         {/* <img
      //   src={`${item.img}?w=248&fit=crop&auto=format`}
      //   srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
      //   alt={item.title}
      //   loading="lazy"
      // /> */}
      //         <Document
      //           file={`${"//localhost:8000/Advances in Human Factors, Business Management, Training and Education_ Proceedings of the AHFE 2016 International Conference on Human Factors, Business Management and Society, July 27-31, 2016, Walt Disney World®, .pdf"}?w=248&fit=crop&auto=format`}
      //           onLoadSuccess={onDocumentLoadSuccess}
      //         >
      //           <Page
      //             height={100}
      //             pageNumber={pageNumber}
      //             onClick={() => {
      //               opener();

      //               setPdfName(
      //                 "//localhost:8000/Advances in Human Factors, Business Management, Training and Education_ Proceedings of the AHFE 2016 International Conference on Human Factors, Business Management and Society, July 27-31, 2016, Walt Disney World®, .pdf"
      //               );
      //             }}
      //           />
      //         </Document>
      //         <ImageListItemBar
      //           title=""
      //           subtitle={<span>by: ""</span>}
      //           position="below"
      //         />
      //       </ImageListItem>
      //     </Grid>
      //   </Grid>
      //   {/* {itemData.map((item) => ( */}

      //   {/* ))} */}
      // </ImageList>
    );
  }
}

// <ImageList container display="flex">
//       <Grid container>
//         <Grid margin={1.5} item xs={10} sm={6} md={3}>
//           <ImageListItem>
//             {/* <img
//         src={`${item.img}?w=248&fit=crop&auto=format`}
//         srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//         alt={item.title}
//         loading="lazy"
//       /> */}
//             <Document
//               file={`${
//                 "//localhost:8000/" + filename
//               }?w=248&fit=crop&auto=format`}
//               onLoadSuccess={onDocumentLoadSuccess}
//             >
//               <Page
//                 height="150"
//                 pageNumber={pageNumber}
//                 onClick={() => {
//                   opener();

//                   setPdfName("//localhost:8000/" + filename);
//                 }}
//               />
//             </Document>
//             <ImageListItemBar
//               title=""
//               subtitle={<span>by: ""</span>}
//               position="below"
//             />
//           </ImageListItem>
//           <ImageListItem>
//             {/* <img
//         src={`${item.img}?w=248&fit=crop&auto=format`}
//         srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//         alt={item.title}
//         loading="lazy"
//       /> */}
//             <Document
//               file={`${"//localhost:8000/Advances in Human Factors, Business Management, Training and Education_ Proceedings of the AHFE 2016 International Conference on Human Factors, Business Management and Society, July 27-31, 2016, Walt Disney World®, .pdf"}?w=248&fit=crop&auto=format`}
//               onLoadSuccess={onDocumentLoadSuccess}
//             >
//               <Page
//                 height="150"
//                 pageNumber={pageNumber}
//                 onClick={() => {
//                   opener();

//                   setPdfName(
//                     "//localhost:8000/Advances in Human Factors, Business Management, Training and Education_ Proceedings of the AHFE 2016 International Conference on Human Factors, Business Management and Society, July 27-31, 2016, Walt Disney World®, .pdf"
//                   );
//                 }}
//               />
//             </Document>
//             <ImageListItemBar
//               title=""
//               subtitle={<span>by: ""</span>}
//               position="below"
//             />
//           </ImageListItem>
//         </Grid>
//       </Grid>
//       {/* {itemData.map((item) => ( */}

//       {/* ))} */}
//     </ImageList>
