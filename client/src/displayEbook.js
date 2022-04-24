import * as React from "react";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Viewer from "./viewpdf";
import "./display.css";
import { Grid } from "@mui/material";
export default function Thumbnail() {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [viewer, setViewer] = React.useState(false);
  const [pdfName, setPdfName] = React.useState("");

  var filename = "[Rowan_Jones]_Public_Sector_Accounting-3.pdf";
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
  function toView(book) {
    setPdfName(book);
  }
  function opener() {
    setViewer(true);
  }
  function close() {
    setViewer(false);
  }

  if (viewer === true) {
    return (
      <div className="pdf" onContextMenu={(e) => e.preventDefault()}>
        {pageNumber > 1 && (
          <button onClick={changePageBack}>Previous Page</button>
        )}
        {pageNumber < numPages && (
          <button onClick={changePageNext}>next Page</button>
        )}
        <button
          onClick={() => {
            close();
          }}
        >
          exit
        </button>
        <Document file={pdfName} onLoadSuccess={onDocumentLoadSuccess}>
          <Page height="600" pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  } else {
    return (
      <ImageList container display="flex">
        <Grid container>
          <Grid margin={1.5} item xs={10} sm={6} md={3}>
            <ImageListItem>
              {/* <img
          src={`${item.img}?w=248&fit=crop&auto=format`}
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        /> */}
              <Document
                file={`${
                  "//localhost:8000/" + filename
                }?w=248&fit=crop&auto=format`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  height="150"
                  pageNumber={pageNumber}
                  onClick={() => {
                    opener();

                    setPdfName("//localhost:8000/" + filename);
                  }}
                />
              </Document>
              <ImageListItemBar
                title=""
                subtitle={<span>by: ""</span>}
                position="below"
              />
            </ImageListItem>
            <ImageListItem>
              {/* <img
          src={`${item.img}?w=248&fit=crop&auto=format`}
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={item.title}
          loading="lazy"
        /> */}
              <Document
                file={`${"//localhost:8000/Advances in Human Factors, Business Management, Training and Education_ Proceedings of the AHFE 2016 International Conference on Human Factors, Business Management and Society, July 27-31, 2016, Walt Disney World®, .pdf"}?w=248&fit=crop&auto=format`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page
                  height="150"
                  pageNumber={pageNumber}
                  onClick={() => {
                    opener();

                    setPdfName(
                      "//localhost:8000/Advances in Human Factors, Business Management, Training and Education_ Proceedings of the AHFE 2016 International Conference on Human Factors, Business Management and Society, July 27-31, 2016, Walt Disney World®, .pdf"
                    );
                  }}
                />
              </Document>
              <ImageListItemBar
                title=""
                subtitle={<span>by: ""</span>}
                position="below"
              />
            </ImageListItem>
          </Grid>
        </Grid>
        {/* {itemData.map((item) => ( */}

        {/* ))} */}
      </ImageList>
    );
  }
}
