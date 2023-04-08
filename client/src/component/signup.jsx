import React, { useState } from "react";
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

export function SignUp() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [phone, setPhone] = useState("");

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

    let result = await fetch("http://localhost:5000/api/accounts/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log(result);
    
    result = await result.json();
    if (result.status) navigate("/");
    console.log(result);
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineIcon />
            </Avatar>
          </Grid>
          <br />
          <h1 style={{ "text-align": "center" }}>Create Account</h1>
          <div style={{ width: 300, "padding-left": "50px" }}>
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
