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
        if (error.response.data.message == "jwt expired") {
          navigate("/login");
        }
        console.log(error.message);
      });
  }, []);
  console.log(memoriesImage);

  return (
    // <>

    // </>
    <div>
    <div className="row mx-auto">
      {memoriesImage &&
        memoriesImage.map((t) => (
          <div className="mx-auto col-lg-3 col-sm-10 mt-3 col-md-5">
            <div className="card" style={{ width: "19rem" }}>
              <img className="card-img-top" src={t.Image} alt="Card image cap"
               style={{ width: "300px",height:"300px" }}
               />
              <div className="card-body">
                <p className="card-text">
                 {t.content}
                </p>
              </div>
            </div>
          </div>
          
        ))}
    </div>
   </div>
  );
}

//  {/* {memoriesImage.map(()=>{
//       <p>{memoriesImage.content}</p>
//     })} */}
//       {/* <div className="card">
//         <div className="upper-container">
//           <div className="image-container">
//             <img src="https://images.pexels.com/photos/15851976/pexels-photo-15851976.jpeg" alt=""  height="100px"  width="100px" />
//           </div>
//         </div>
//         <div className="lower-container">
//           <h3> your name</h3>
//           <p>Hi, I am Manisha Singh. If you talk about my educational background, I completed my Bachelor of Engineering degree in 2006. After that, I changed my line of profession and got into writing for the English language always remained my first love.</p>

//         </div>
//       </div> */}
