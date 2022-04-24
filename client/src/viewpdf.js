import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import "./App.css";

export default function Viewer(bookname) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  var filename = bookname;
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

  // /Users/johnlesterasprec/ebook-repository/server/public/Advances in Human Factors, Business Management, Training and Education_ Proceedings of the AHFE 2016 International Conference on Human Factors, Business Management and Society, July 27-31, 2016, Walt Disney World®, .pdf/server/public/[Rowan_Jones]_Public_Sector_Accounting-3.pdf
  return (
    <div className="App">
      <header className="App-header">
        {pageNumber > 1 && (
          <button onClick={changePageBack}>Previous Page</button>
        )}
        {pageNumber < numPages && (
          <button onClick={changePageNext}>next Page</button>
        )}
        <button onClick={() => {}}>exit</button>
        <Document
          file={"//localhost:8000/[Rowan_Jones]_Public_Sector_Accounting-3.pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page height="600" pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </header>{" "}
    </div>
  );
}
