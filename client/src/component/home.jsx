import React, { useState } from "react";
import { Route, useNavigate, NavLink } from "react-router-dom";
import { api } from "../ApiCall";

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
    height: "80vh",
    align: "center",
    width: 500,
    margin: "20px auto",
    borderRadius: "60px",
  };

  const handelSubmit = async (e) => {
    let obj = { email: email, password: password };
    e.preventDefault();
    setError(validate(obj));

    api.post("accounts/login", obj)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log(response.data);
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

  const avatarStyle = {
    backgroundColor: "#1bbd7e",
    width: "50%",
    height: "50%",
  };

  return (
    <div>
      {error && (
        <p
          style={{ textAlign: "center" }}
          className="alert alert-danger center "
        >
          {error}
        </p>
      )}
      <div>
        <Grid>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar
                alt="Remy Sharp"
                src="https://thumbs.dreamstime.com/z/image-pretty-women-joyful-expressions-smile-broadly-point-each-other-thumbs-feel-overjoyed-wear-image-pretty-200280613.jpg"
                style={avatarStyle}
              ></Avatar>
            </Grid>
            <br />
            <h1 style={{ textAlign: "center" }}>LogIn</h1>
            <div style={{ padding: "30px" }}>
              <br />

              <TextField
                variant="outlined"
                label="Email"
                type="email"
                value={email}
                fullWidth
                required
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
                required
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
