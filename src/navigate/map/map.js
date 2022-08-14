import "./map.css";
import "leaflet/dist/leaflet.css";

import {
	MapContainer,
	TileLayer,
	useMap,
	Marker,
	Popup,
	LocationMarker,
} from "react-leaflet";
import L from "leaflet";

function Map(props) {
	//fixing library marker icon
	delete L.Icon.Default.prototype._getIconUrl;
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
		iconUrl: require("leaflet/dist/images/marker-icon.png"),
		shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
	});

	var params = props.params;
	const position = [35.834601, 10.634374];
	var markersLocations = params.map((p) => {
		return { loc: [p.longitude, p.latitude], name: p.company_name };
	});
	console.log(markersLocations);
	return (
		<div className="mapContainer">
			<MapContainer center={position} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markersLocations.map((m) => {
					return (
						<Marker key={m.name} position={m.loc}>
							<Popup>{m.name}</Popup>
						</Marker>
					);
				})}
			</MapContainer>
		</div>
	);
}

export default Map;
