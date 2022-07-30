import React, { useEffect, useState } from "react";

//components
import UserService from "../../services/UserService";
import Upload from "../UploadForm/UploadForm";

//UI
import TextField from "@mui/material/TextField";
import { Radio, RadioGroup } from "@mui/material";

import "./SignUpForm.scss";

//Form Validation

import { useFormik } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";

const SignUpForm = () => {
  //Validation
  const emailRegEx =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

  const validationSchema = Yup.object({
    name: Yup.string("Enter your name")
      .min(2, "Введите минимум 2 символа")
      .max(60, "Допустимо максимум 60 символов")
      .required("Name is required"),
    email: Yup.string("Enter your email")
      .matches(emailRegEx, "Неверный формат")
      .required("Email is required"),
    phone: Yup.string("Enter your phone number")
      .required("Number is required")
      .matches("[/^+380d{3}d{2}d{2}d{2}$/]", "Неверный формат"),
    position_id: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      position_id: "",
      file: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onFileUpload();
      const userData = JSON.stringify(values, null, 2);
      postUserData(userData);
    },
  });

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    formik.values.file = {
      selectedFile: selectedFile,
    };
    console.log(selectedFile);
  };

  const { getPositions, postUserData } = UserService();
  const [positions, setPositions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getPositions().then(({ positions }) => {
      setPositions(positions);
    });
    // eslint-disable-next-line
  }, []);

  const RadioElement = positions.map(({ id, name }) => {
    const styles = {
      color: "#D0CFCF",
      "&.Mui-checked": {
        color: "#00BDD3",
      },
      cursor: "pointer",
      padding: "0px",
      margin: "0px",
    };

    const handleChange = (id) => {
      formik.values.position_id = id;
    };

    return (
      <div className="radio-el" key={id}>
        <Radio
          className="customRadio"
          value={name}
          name={name}
          control={<Radio />}
          sx={styles}
          id={name}
          onChange={() => handleChange(id)}
        />
        <label htmlFor={name} className="radio-label">
          {name}
        </label>
      </div>
    );
  });

  return (
    <form className="signUpForm" onSubmit={formik.handleSubmit}>
      <h2 className="title">Working with POST request</h2>
      <div className="signUpForm__wrapper">
        <div className="signUpForm__inputs">
          <TextField
            id="name"
            label="Your name"
            name="name"
            variant="outlined"
            className="customInput"
            value={formik.values.name || ""}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="email"
            label="Your email"
            name="email"
            variant="outlined"
            className="customInput"
            value={formik.values.email || ""}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <InputMask
            mask="+380999999999"
            disabled={false}
            maskChar=""
            id="phone"
            label="Your phone number"
            name="phone"
            variant="outlined"
            className="customInput"
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          >
            {(inputProps) => <TextField {...inputProps} />}
          </InputMask>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="bread hidden">+38 (XXX) XXX - XX - XX</div>
          ) : (
            <div className="bread">+38 (XXX) XXX - XX - XX</div>
          )}
        </div>
        <p className="headline">Select Your Position</p>
        <div className="radio__group">
          <RadioGroup>{RadioElement}</RadioGroup>
        </div>
        <Upload setSelectedFile={setSelectedFile} />
      </div>
      <button className="btn" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default SignUpForm;
