import {FC, useEffect, useRef} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {useMap} from './utils.ts';
import type {Point, Points} from '../../types/types.ts';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants/Icons/Icons.ts';
import 'leaflet/dist/leaflet.css';
import {City} from '../../types/offerTypes/offer.ts';

interface MapProps {
  city: City;
  points: Points;
  selectedPoint?: Point;
  selectedOfferId?: string | null;
  height?: string;
  width?: string;
  offset?: string;
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

export const Map: FC<MapProps> = ({city, points, selectedPoint, selectedOfferId, height, width, offset}) => {
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
            selectedOfferId && point.offerId === selectedOfferId
            || selectedPoint && point.offerId === selectedPoint.offerId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint, selectedOfferId]);

  const mapHeight = height || '500px';
  const mapWidth = width || '500px';
  const mapOffset = offset || '0';

  return <div style={{height: mapHeight, width: mapWidth, margin: mapOffset}} ref={mapRef}></div>;
};
