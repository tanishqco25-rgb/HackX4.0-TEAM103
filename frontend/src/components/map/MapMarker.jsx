import { Marker, Popup } from "react-leaflet";
import { mapIcon } from "./MapMarkerIcon";

function MapMarker({ item, kind, onSelect, children }) { return <Marker position={item.position} icon={mapIcon(kind, item.severity || kind)} eventHandlers={{ click: () => onSelect(item, kind) }}><Popup>{children || <><strong>{item.id || item.name}</strong><br />{item.type || item.status}</>}</Popup></Marker>; }

export default MapMarker;