import React, { useCallback, useEffect, useRef, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Paper,
  Button,
  Grid,
  TextField,
  Avatar,
} from "@mui/material";
// import jwtDecode from "jwt-decode"

export function Map() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [createMemories, setMemories] = useState("");
  const [position, setPosition] = useState({});
  const [userData, setUserData] = useState([]);

  const [memories, setMemoriesList] = useState([]);

  const mapRef = useRef();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    memories.forEach((m) => {
      const lat = +m.lat;
      const lng = +m.lng;

      if (!lat || !lng) {
        return;
      }
      const marker = new window.mappls.Marker({
        map: mapRef.current,
        position: {
          lat,
          lng,
        },
        icon_url: "https://apis.mapmyindia.com/map_v3/1.png",
      });

      marker.addListener("click", (e) => {
        console.log(m);

        e.stopPropagation();
      });
    });
  }, [memories]);

  const getLatLang = (e) => {
    // console.log(e.lngLat);
    setOpen(true);

    const position = {
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    };

    setPosition(position);

    setData((data) => [...data, position]);
  };

  const initMap = useCallback(() => {
    mapRef.current = new window.mappls.Map("map", {
      center: { lat: 28.612964, lng: 77.229463 },
    });
    mapRef.current.addListener("click", getLatLang);
  }, []);

  function loadScript() {
    const script = document.createElement("script");
    script.type = "text/javascript";

    script.src =
      "https://apis.mappls.com/advancedmaps/api/bd81636ee13e89bb1ca168f03e430182/map_sdk?v=3.0&layer=vector";

    script.id = "googleMaps";
    document.body.appendChild(script);
    script.onload = () => {
      initMap();
    };
  }

  const headers = {
    Authorization: localStorage.getItem("token"),
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/memories", { headers })
      .then((response) => {
        setMemoriesList(response.data.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      loadScript();
    }
  }, []);

  function handel(e) {
    e.preventDefault();

    const obj = {
      lat: position.lat,
      lng: position.lng,
      userId: localStorage.getItem("id"),
      content: createMemories,
    };
    console.log(obj);
    setOpen(false);
    setMemories("");
    const headers = {
      Authorization: localStorage.getItem("token"),
    };
    axios
      .post("http://localhost:5000/api/users/memories", obj, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <div
        style={{
          height: "150vh",
        }}
        id="map"
      ></div>

      <Dialog
        scroll="paper"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle style={{ color: "red" }}>
          {" "}
          Add Memories & Review
        </DialogTitle>
        <span style={{ "padding-left": "20px " }}>⭐⭐⭐⭐⭐</span>
        <hr></hr>
        <div style={{ "padding-left": "20px", display: "flex" }}>
          <Avatar fullWidth />
          <span style={{ "padding-left": "20px " }}>
            <h3>shyam gupta</h3>
          </span>

          <span style={{ "padding-left": "10px" }}>
            <h6>lat:{position.lat}</h6>
          </span>
          <span style={{ "padding-left": "10px" }}>
            <h6>lng :{position.lng}</h6>
          </span>
        </div>
        <hr></hr>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Grid>
            <Paper>
              <textarea
                className="form-control font-weight-normal"
                id="exampleFormControlTextarea1"
                rows="4"
                value={createMemories}
                onChange={(e) => {
                  setMemories(e.target.value);
                }}
                style={{ color: "green" }}
              ></textarea>
            </Paper>
          </Grid>
        </DialogContent>
        <DialogActions>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
            }}
            className="btn btn-danger"
          >
            Discard
          </button>

          <button type="button" onClick={handel} className="btn btn-success">
            Save Memories
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
