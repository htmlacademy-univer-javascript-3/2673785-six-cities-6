import {FC, useEffect, useRef} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {useMap} from './utils.ts';
import type {City, Point, Points} from '../../types/types.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants/Icons/Icons.ts';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  city: City;
  points: Points;
  selectedPoint: Point;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export const Map: FC<MapProps> = ({city, points, selectedPoint}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
};
