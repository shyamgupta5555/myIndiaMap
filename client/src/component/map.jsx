import React, { useCallback, useEffect, useRef, useState } from "react";

export function Map() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   if (data.length) localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  // useEffect(() => {
  //   console.log(JSON.parse(localStorage.getItem("data") || []));
  //   setData(JSON.parse(localStorage.getItem("data") || []));
  // }, []);

  const mapRef = useRef();

  const getLatLang = (e) => {
    console.log(e.lngLat);

    const position = {
      lat: e.lngLat.lat,
      lng: e.lngLat.lng,
    };

    new window.mappls.Marker({
      map: mapRef.current,
      position: position,
      icon_url: "https://apis.mapmyindia.com/map_v3/1.png",
    });

    console.log(mapRef.current);

    setData((data) => [...data, position]);
  };

  const initMap = useCallback(() => {
    mapRef.current = new window.mappls.Map("map", {
      center: { lat: 28.612964, lng: 77.229463 },
    });
    mapRef.current.addListener("click", getLatLang);

    // setData((data) => {
    //   data.forEach((position) => {
    //     new window.mappls.Marker({
    //       map: mapRef.current,
    //       position: position,
    //       icon_url: "https://apis.mapmyindia.com/map_v3/1.png",
    //     });
    //   });

    //   return data;
    // });
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
    loadScript();
  }, []);

  return (
    <div
      style={{
        height: "100vh",
      }}
      id="map"
    ></div>
  );
}
