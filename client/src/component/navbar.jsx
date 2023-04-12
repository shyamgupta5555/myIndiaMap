import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";

export function Navbar() {
  return (
    <>
      <nav className="navbar navbar-light bg-">
        <div  className="d-flex justify-content-around"  style={{ "padding-left": "10px", display: "flex" }}>
          <a className="navbar-brand" href="#">
            <img
              src="https://www.mapmyindia.com/about/images/MMI_Logo_large.png"
              width="30%"
              height="50%"
              className="d-flex justify-content-around"
              alt="loading......."

            />
          </a>
          {/* <LogoutIcon style={{ "width": "10%", height:"50px" }} /> */}
        </div>
      </nav>
    </>
  );
}
