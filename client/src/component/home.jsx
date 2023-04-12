import React, { useState } from "react";
import { Route, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

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
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";



export function Home() {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  const paperStyle = {
    padding: 20,
    height: "75vh",
    align: "center",
    width: 500,
    margin: "20px auto",
  };

  const handelSubmit = async (e) => {
    let obj = { email: email, password: password };
    e.preventDefault();
    setError(validate(obj));

    axios
      .post("http://localhost:5000/api/accounts/login", obj)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem( "id",response.data.id);
        console.log(response.data)

        if (response) navigate("/map");
      })

      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const validate = (values) => {
    const error = {};
    const regex = /^[0-9]$/i;
    if (!email) {
      error.email = "email is required";
    }
    if (!password) {
      error.password = "password is required";
    }
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <div>
      <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockIcon />
              </Avatar>
            </Grid>
            <br />
            <h1 style={{ "text-align": "center" }}>LogIn</h1>
            <div style={{ padding: "30px" }}>
              <br />
              {error && <p className="alert alert-danger">{error}</p>}
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                value={email}
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
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
            </div>
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handelSubmit}
            >
              Sign in
            </Button>
            <br />
            <Typography>
              <Link href="#">Forget password ?</Link>
            </Typography>
            <br />

            <NavLink to="/signup">Sign Up</NavLink>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
