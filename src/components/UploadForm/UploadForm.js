import { useState } from "react";
import "./UploadForm.scss";

const Upload = ({ setSelectedFile }) => {
  const [fileName, setFileName] = useState("");

  const getFileName = (e) => {
    let file = e.target.value;
    file = file.replace(/\\/g, "/").split("/").pop();
    setFileName(file);
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="signUpForm__upload">
      <div className="input__wrapper">
        <input
          name="file"
          type="file"
          id="input__file"
          className="input input__file"
          multiple
          onChange={(e) => getFileName(e)}
          accept="image/jpeg,image/jpg"
          max-size="5000"
        />
        <label htmlFor="input__file" className="input__file-button error">
          <span className="input__file-icon-wrapper">Upload</span>
          <span className="input__file-button-text">
            {fileName ? fileName : "Upload your photo"}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Upload;
