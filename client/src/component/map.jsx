import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Chip,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../ApiCall";
import jwtDecode from "jwt-decode";

export function Map() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [createMemories, setMemories] = useState(""); // create memories data store
  const [image, setImage] = useState("");
  const [position, setPosition] = useState({}); // position lat ,lng
  const [memories, setMemoriesList] = useState([]); //all list get memories
  const [show, setShow] = useState(false); // memories show out put
  const mapRef = useRef();
  const [open, setOpen] = useState(false); // memories create popup
  const [shortMemories, setShortMemories] = useState(""); //on click one memories show
  const decoded = jwtDecode(localStorage.getItem("token"));

  useEffect(() => {
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
        console.log(m);
        e.stopPropagation();
        setShortMemories(m);
        setShow(true);
      });
    });
  }, [memories]);

  const getLatLang = (e) => {
    setOpen(true);
    const position = {
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    };
    setPosition(position);

    const marker = new window.mappls.Marker({
      map: mapRef.current,
      // position: position,
      icon_url: "https://apis.mapmyindia.com/map_v3/1.png",
    });
    setPosition(position);

    setData((data) => [...data, position]);
    
  };

  const initMap = useCallback(() => {
    mapRef.current = new window.mappls.Map("map", {
      center: { lat: 28.612964, lng: 77.229463 },
    });
    mapRef.current?.addListener?.("click", getLatLang);
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

  useEffect(() => {
    api
      .get("/users/memories")
      .then((response) => {
        setMemoriesList(response.data.data);
      })
      .catch((error) => {
        if (error.response.data.message == "jwt expired") {
          navigate("/login");
        }
        console.log(error.message);
      });
  }, [open]);

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
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.data.message == "jwt expired") {
          navigate("/login");
        }
        console.log(error.response.data.message);
      });
  }

  function handleDeleted() {
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

  console.log(shortMemories);

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
        <DialogTitle style={{ color: "red" }}>
          Add Memories & Review
        </DialogTitle>
        <span style={{ paddingLeft: "20px" }}>⭐⭐⭐⭐⭐</span>
        <hr></hr>
        <div style={{ paddingLeft: "20px", display: "flex" }}>
          <Avatar
            alt={decoded.name}
            src={decoded.profileImage}
            onClick={() => {
              navigate("/profile");
            }}
          />
          <span style={{ paddingLeft: "20px " }}>
            <h3>{decoded.name.toUpperCase()}</h3>
          </span>
        </div>
        <footer className="blockquote-footer text-center m-0">
          Save and share memories <cite title="Source Title">With Mapples</cite>
        </footer>
        <hr></hr>
        <span className="text-center text-muted">{shortMemories.content}</span>
        <img src={shortMemories.Image} alt="not found" />
        <hr></hr>
        <DialogActions>
          <Chip
            className="margin-right: 1rem  "
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
        </DialogActions>
      </Dialog>

      {/* //////////////////////////////// */}
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
        <span style={{ paddingLeft: "20px " }}>⭐⭐⭐⭐⭐</span>
        <span>
          <Link to="/profile">show all photo</Link>
        </span>
        <hr></hr>
        <div style={{ paddingLeft: "20px", display: "flex" }}>
          <Avatar
            alt={decoded.name}
            src={decoded.profileImage}
            style={{ width: "20%", height: "20%" }}
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

          <button type="button" onClick={handel} className="btn btn-success">
            Save Memories
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
