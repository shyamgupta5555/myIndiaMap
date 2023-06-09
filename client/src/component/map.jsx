import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper
} from "@mui/material";
import jwtDecode from "jwt-decode";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../ApiCall";

export function Map() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [createMemories, setMemories] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState({});
  const [memories, setMemoriesList] = useState([]);
  const [show, setShow] = useState(false);
  const mapRef = useRef();
  const [open, setOpen] = useState(false);
  const [shortMemories, setShortMemories] = useState("");
  const [error, setError] = useState("");
  const selectedMarker = useRef();

  const decoded = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
    if (!mapLoaded) {
      return;
    }
    memories.forEach((m) => {
      const lat = +m.lat;
      const lng = +m.lng;
      if (!lat || !lng) {
        return;
      }
      const marker = new window.mappls.Marker({
        map: mapRef.current,
        position: { lat, lng },
        icon_url: "https://apis.mapmyindia.com/map_v3/1.png",
      });

      marker.addListener("click", (e) => {
        e.stopPropagation();
        selectedMarker.current = marker;
        setShortMemories(m);
        setShow(true);
      });
    });
  }, [memories, mapLoaded]);

  const getLatLang = (e) => {
    setOpen(true);
    const position = {
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    };
    setPosition(position);

    setPosition(position);

    setData((data) => [...data, position]);
  };

  const initMap = useCallback(() => {
    mapRef.current = new window.mappls.Map("map", {
      center: { lat: 28.612964, lng: 77.229463 },
    });
    mapRef.current?.addListener?.("click", getLatLang);

    setMapLoaded(true);
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
      console.log(window.mappls);
    };
  }

  function fetchData() {
    api
      .get("/users/memories")
      .then((response) => {
        setMemoriesList(response.data.data);
      })
      .catch((error) => {
        if (error.response.data.message == "jwt expired") {
          navigate("/login");
        }
      });
  }

  useEffect(() => {
    fetchData();
  }, [open]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      loadScript();
    }
  }, []);

  function createMarker({ lat, lng }) {
    const marker = new window.mappls.Marker({
      map: mapRef.current,
      position: {
        lat,
        lng,
      },
      icon_url: "https://apis.mapmyindia.com/map_v3/1.png",
    });
  }

  function createMemory(e) {
    e.preventDefault();
    const obj = {
      lat: position.lat,
      lng: position.lng,
      userId: decoded.id,
      content: createMemories,
    };

    const formData = new FormData();
    formData.append("lat", position.lat);
    formData.append("lng", position.lng);
    formData.append("userId", decoded.id);
    formData.append("content", createMemories);
    formData.append("Image", image);

    setOpen(false);
    setMemories("");

    api
      .post("/users/memories", formData)
      .then((response) => {
        createMarker({
          lat: position.lat,
          lng: position.lng,
        });
      })
      .catch((error) => {
        if (error.response.data.message == "jwt expired") {
          navigate("/login");
        }
        setError(error.message.data.message);
        console.log(error.response.data.message);
      });
  }

  function handleDeleted(marker) {
    api
      .delete(`/users/memories/${shortMemories._id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setShow(false);
  }

  function showAllMemories() {
    navigate("/profile");
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
        open={show}
        onClose={() => setShow(false)}
      >
        <DialogTitle style={{ color: "red" }}>Memories</DialogTitle>
        <span style={{ paddingLeft: "20px" }}>⭐⭐⭐⭐⭐</span>
        <hr></hr>
        <div style={{ paddingLeft: "20px", display: "flex" }}>
          <Avatar
            alt={decoded.name}
            src={decoded.profileImage}
            onClick={() => {
              navigate("/profile");
            }}
            style={{ width: "17%", height: "30%" }}
          />
          <span style={{ paddingLeft: "20px " }}>
            <h3>{decoded.name.toUpperCase()}</h3>
          </span>
        </div>
        <footer className="blockquote-footer text-center m-0">
          Save and share memories <cite title="Source Title">With Mapples</cite>
        </footer>
        <hr></hr>
        <img
          src={shortMemories.Image}
          style={{ width: "200px", alignItems: "center" }}
          alt="not found"
        />
        <hr></hr>
        <span className="text-center text-muted">{shortMemories.content}</span>
        <hr></hr>

        <Chip
          className="success"
          label="Custom delete icon"
          onClick={handleDeleted}
          onDelete={handleDeleted}
          deleteIcon={<DeleteIcon />}
          variant="outlined"
        />
        <button
          type="button"
          onClick={() => {
            setShow(false);
          }}
          className="btn btn-danger m-5"
        >
          Discard
        </button>

        <DialogActions className="m-0 p-0"></DialogActions>

      </Dialog>

      {/* //////////////////////////////// */}
      <Dialog
        scroll="paper"
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        style={{ width: "100%" }}
      >
        <DialogTitle style={{ color: "red" }}>
          {" "}
          Add Memories & Review
        </DialogTitle>
        <span style={{ paddingLeft: "20px " }}>⭐⭐⭐⭐⭐</span>
        <hr></hr>
        <div style={{ paddingLeft: "20px", display: "flex" }}>
          <Avatar
            alt={decoded.name}
            src={decoded.profileImage}
            style={{ width: "17%", height: "30%" }}
            onClick={() => {
              navigate("/profile");
            }}
          ></Avatar>
          <span style={{ paddingLeft: "20px " }}>
            <h3>{decoded.name}</h3>
          </span>
          <div
            style={{
              paddingLeft: "50px",
              color: "light-black",
              frontSize: "20px",
            }}
          >
            <span>
              <p>lat:{position.lat}</p>
            </span>
            <span>
              <p>lng :{position.lng}</p>
            </span>
          </div>
        </div>
        <hr></hr>
        {error && (
          <p style={{ textAlign: "center" }} className="alert alert-danger">
            {error}
          </p>
        )}
        <Button onClick={showAllMemories}> Show All Memories</Button>
        <hr></hr>
        <input
          id="photo-upload"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <DialogContent>
          <DialogContentText></DialogContentText>
          <Grid>
            <Paper>
              <textarea
                className="form-control font-weight-normal"
                id="exampleFormControlTextarea1"
                rows="4"
                value={createMemories}
                required
                onChange={(e) => {
                  setMemories(e.target.value);
                }}
                style={{ color: "light-black", fontSize: "20px" }}
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

          <button
            type="button"
            onClick={createMemory}
            className="btn btn-success"
          >
            Save Memories
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
