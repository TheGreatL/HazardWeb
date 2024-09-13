import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polyline } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Legend from "./Legend";
import PropTypes from "prop-types";
import FormDialog from "./Form_Dialog";

function DisplayHazardRisk({ barangay }) {
	const isUser = false;
	const [polylines, setPolylines] = React.useState([]);
	const mapRef = useRef();
	const outlineRef = useRef();
	const editableFG = useRef();
	const [markerColor, setMarker] = useState("#ff0000");
	const [isOpacityVisble, setOpacityVisibility] = useState(false);
	const [isLegendVisible, setLegendVisibility] = useState(false);
	const [Label, setLabel] = useState(null);
	const [clickedID, setClickedID] = useState(null);
	const [isDialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		if (mapRef.current) {
			const { Zoom, X, Y, outlines } = barangay[0];
			mapRef.current.flyTo([X, Y], Zoom);
			console.log(outlineRef.current);

			let coords = [];
			for (let i = 0; i < outlines.length; i++) {
				coords.push({ lat: outlines[i].X, lng: outlines[i].Y });
			}
			console.log(coords);
			// outlineRef.current._latlngs[0] = coords;
			console.log(outlineRef.current._latlngs[0]);
			outlineRef.current.setLatLngs(coords);
			outlineRef.current.redraw();
			// for (let i = 0; i < outlines.length; i++) {
			// 	outlineRef.current._latlngs[i][0].lat = outlines[i].Y;
			// 	outlineRef.current._latlngs[i][0].lng = outlines[i].X;
			// }
		}
	}, [barangay]);
	const handleCreated = (e) => {
		const { layer } = e;

		layer.on("dblclick", function (clickedLayer) {
			console.log(clickedLayer);
			setLegendVisibility(() => true);
			setOpacityVisibility(() => true);

			const {
				target: {
					_leaflet_id,
					_popup: { _content },
				},
			} = clickedLayer;
			setLabel(_content);
			setClickedID(_leaflet_id);
			console.log("OpacityVisibility", isOpacityVisble);
		});
		setDialogOpen(() => true);
		layer.bindPopup(prompt("Enter a title for the marker"));
		// Update state with new polyline
		setPolylines([...polylines, layer.getLatLngs()]);
	};

	// Handle the deletion of layers
	const handleDeleted = (e) => {
		const { layers } = e;

		layers.eachLayer((layer) => {
			if (layer._leaflet_id != outlineRef.current._leaflet_id) {
				// Remove deleted polyline from state
				setPolylines(
					polylines.filter(
						(polyline) =>
							polyline !==
							layer.getLatLngs()
					)
				);
			}
			// Optionally, add the polygon back or cancel deletion logic
			editableFG.current.leafletElement.addLayer(layer);
			return;
		});
	};

	return (
		<>
			<FormDialog
				className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
				isDialogOpen={isDialogOpen}
				setDialogOpen={setDialogOpen}
			/>
			<Legend
				isLegendVisible={isLegendVisible}
				setLegendVisibility={setLegendVisibility}
				Label={Label}
			/>
			<div className="flex relative size-10/12 overflow-hidden z-0  ">
				<MapContainer
					ref={mapRef}
					className="relative w-full h-full z-10"
					center={[barangay[0].X, barangay[0].Y]}
					zoom={barangay[0].Zoom}
					attributionControl={false}>
					{/* TileLayer defines the type of map to use, OpenStreetMap in this case */}
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					{/* Add markers to the map */}
					<FeatureGroup ref={editableFG}>
						{!isUser && (
							<EditControl
								position="topright"
								onCreated={
									handleCreated
								}
								onDeleted={
									handleDeleted
								}
								draw={{
									polyline: false, // Enable polyline drawing
									polygon: {
										shapeOptions: {
											color: markerColor, // Set default color for polygons
											opacity: 0.5,
											fillOpacity: 0.5,
										},
									},
									rectangle: false,
									circle: false,
									marker: true,
									circlemarker: false,
								}}
							/>
						)}
						<Polyline
							ref={outlineRef}
							pathOptions={{
								color: "red",
								weight: 1,
							}}
							interactive={false}
							positions={barangay[0].outlines.map(
								(element) => {
									return [
										element.X,
										element.Y,
									];
								}
							)}
						/>
					</FeatureGroup>
				</MapContainer>
				<div className="flex flex-col items-center gap-2 absolute bottom-5 left-5 z-50">
					{!isUser && (
						<input
							className=""
							onChange={(event) => {
								const newColor =
									event
										.target
										.value;
								setMarker(newColor);
							}}
							type="color"
							name="color"
							id="color"
							value={markerColor}
						/>
					)}
					<input
						className={`${isLegendVisible ? "opacity-100 visible " : "opacity-0 invisible"}  `}
						onChange={(event) => {
							const newOpacity =
								event.target.value;
							const map = mapRef.current;

							const targetLayer =
								map &&
								map._layers[
									clickedID
								];
							targetLayer.setStyle({
								fillOpacity:
									newOpacity /
									100,
							});
						}}
						type="range"
						name="opacity"
						id="opacityPicker"
						min={0}
						step={1}
						max={100}
					/>
				</div>
			</div>
		</>
	);
}
DisplayHazardRisk.propTypes = {
	barangay: PropTypes.array,
};
export default DisplayHazardRisk;
