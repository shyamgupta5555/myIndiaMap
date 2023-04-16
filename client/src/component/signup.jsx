import React, { useEffect, useState } from "react";
import { Route, NavLink, useNavigate } from "react-router-dom";
import {
  TextField,
  Grid,
  Paper,
  Avatar,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  AvatarGroup,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { api } from "../ApiCall";

export function SignUp() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  const paperStyle = {
    padding: 20,
    height: "70%",
    align: "center",
    width: 400,
    margin: "20px auto ",
    borderRadius: "60px",
  };

  const handel = async (e) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("Image", image);

    e.preventDefault();
    api
      .post("/accounts/register", formData)
      .then((response) => {
        setError("");
        console.log(response.data);
        localStorage.setItem("id", response.data._id);

        if (response) navigate("/login");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
    console.log(error);
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <div
      style={{
        borderRadius: "200px",
      }}
    >
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <AvatarGroup
              total={1000}
              className="d-flex justify-content-center "
              style={{ width: "100%" }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://imglarger.com/Images/before-after/ai-image-enlarger-1-before-2.jpg"
                style={avatarStyle}
              ></Avatar>
              <Avatar
                alt="Remy Sharp"
                src="https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg"
                style={avatarStyle}
              ></Avatar>
              <Avatar
                alt="Remy Sharp"
                src="https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
                style={avatarStyle}
              ></Avatar>
              <Avatar
                alt="Remy Sharp"
                src="https://img.freepik.com/premium-photo/young-business-arab-woman-isolated-againstwhite-pointing-with-forefingersa-expressing-excitement-desire_1187-23653.jpg"
                style={avatarStyle}
              ></Avatar>
            </AvatarGroup>
          </Grid>

          <br />
          <h1 style={{ textAlign: "center" }} autoFocus>
            Create Account
          </h1>
          {error && (
            <p style={{ textAlign: "center" }} className="alert alert-danger">
              {error}
            </p>
          )}
          <div style={{ padding: "20px" }}>
            <TextField
              variant="outlined"
              label="name"
              type="name"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="outlined"
              label="Phone Number"
              type="text"
              pattern="[0-9]"
              fullWidth
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <br />
            <br />
            <TextField
              variant="filled"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            {/* <TextField
              variant="filled"
              label="ConformPassword"
              type="password"
              fullWidth
              value={confPassword}
              onChange={(e) => {
                setConfPassword(e.target.value);
              }}
            /> */}
          </div>
          <input
            id="photo-upload"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="I am accepted term and condition"
          />
          <br />
          <br />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={handel}
          >
            Sign up
          </Button>
          <br />
          <br />
          <NavLink to="/login">already account create</NavLink>
        </Paper>
      </Grid>
    </div>
  );
}
