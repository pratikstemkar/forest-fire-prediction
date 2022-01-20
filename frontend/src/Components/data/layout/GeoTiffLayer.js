import React from "react";
import { useLeafletContext } from "@react-leaflet/core";
import GeoRasterLayer from "georaster-layer-for-leaflet";
const parseGeoraster = require("georaster");

const GeoTiffLayer = ({ image }) => {
  const context = useLeafletContext();

  React.useEffect(() => {
    let layer;
    fetch(image)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        console.log(arrayBuffer);
        parseGeoraster(arrayBuffer).then(georaster => {
          console.log(georaster);
          layer = new GeoRasterLayer({
            georaster: georaster,
            opacity: 0.5,
            resolution: 2100,
          });
          container.addLayer(layer);
        });
      });
    const container = context.layerContainer || context.map;

    return () => {
      container.removeLayer(layer);
    };
  });

  return null;
};

export default GeoTiffLayer;
