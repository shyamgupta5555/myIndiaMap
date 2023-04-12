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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card1 } from "./showMemories";

export function SignUp() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const paperStyle = {
    padding: 20,
    height: "95vh",
    align: "center",
    width: 400,
    margin: "20px auto",
  };

  const handel = async (e) => {
    e.preventDefault();
    let obj = { name: name, email: email, password: password, phone: phone };
    console.log(obj);

    axios
      .post("http://localhost:5000/api/accounts/register", obj)
      .then((response) => {
        setError("");
        console.log(response.data)
        localStorage.setItem("id", response.data._id);
        
        if (response) navigate("/map");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
    console.log(error);
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <div>
    {/* <Card1 /> */}
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
          </Grid>
          <br />
          <h1 style={{ "text-align": "center" }}>Create Account</h1>
          <div
            style={{
              width: 300,
              "border-radius": "30px",
              "padding-left": "50px",
            }}
          >
            {error && <p className="alert alert-danger">{error}</p>}

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
            <TextField
              variant="filled"
              label="ConformPassword"
              type="password"
              fullWidth
              value={confPassword}
              onChange={(e) => {
                setConfPassword(e.target.value);
              }}
            />
          </div>
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
          <NavLink to="/">already account create</NavLink>
        </Paper>
      </Grid>
    </div>
  );
}
