import React, { useEffect, useState } from "react";
// import "./profile.css"
import { useNavigate } from "react-router-dom";
import { api } from "../ApiCall";

export function Boxx() {
  const navigate = useNavigate();
  const [memoriesImage, setMemoriesImage] = useState();

  useEffect(() => {
    api
      .get("/users/memories")
      .then((response) => {
        setMemoriesImage(response.data.data);
      })
      .catch((error) => {
        if (error.response.data.message === "jwt expired") {
          navigate("/login");
        }
        console.log(error.message);
      });
  }, []);

  return (
    <div>
      <div className="row mx-auto">
        {memoriesImage &&
          memoriesImage.map((t) => (
            <div className="mx-auto col-lg-3 col-sm-10 mt-3 col-md-5">
              <div className="card" style={{ width: "19rem" }}>
                <img
                  className="card-img-top"
                  src={t.Image}
                  alt="Card image cap"
                  style={{ width: "300px", height: "300px" }}
                />
                <div className="card-body">
                  <p className="card-text">{t.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
