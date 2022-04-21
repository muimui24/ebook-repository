import { useState } from "react";
import axios from "axios";
import "./style.css";

export const FileUploader = () => {
  const [file, setFile] = useState(null);
  const onInputChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };
  const onSubmit = (e) => {
    console.log();
    e.preventDefault();

    const data = new FormData();

    data.append("file", file);

    axios
      .post("//localhost:8000/upload", data)
      .then((e) => {
        console.log("Success");
      })
      .catch((e) => {
        console.error("Error", e);
      });
  };
  return (
    <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form-group files">
        <label>upload file</label>
        <input
          type="file"
          onChange={onInputChange}
          className="form-control"
          multiple
        />
      </div>
      <button>Submit</button>
    </form>
  );
};
