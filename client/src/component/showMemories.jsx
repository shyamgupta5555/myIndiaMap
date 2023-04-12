import React from "react";

export function Card1() {
  return (
    <>
      <div className="card" style={{"width": "18rem"}}>
        <img className="card-img-top" src="https://previews.123rf.com/images/nexusplexus/nexusplexus1804/nexusplexus180401176/98696496-concept-of-travel-and-discovery-with-old-map-and-compass-on-it.jpg" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}


