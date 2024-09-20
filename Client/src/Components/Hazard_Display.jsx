import { useState, useRef, useEffect, useContext } from "react";

import {
	MapContainer,
	TileLayer,
	FeatureGroup,
	Polyline,
	LayersControl,
	Marker,
	Polygon,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import Legend from "./Hazard_Legend";
import FormDialog from "./Form_Dialog";
import { MapContext, UserContext } from "../Run";
import { getHazards, writeData } from "../Utils/Server_Methods";
import Proptypes from "prop-types";
// CommonJS

import L, { featureGroup } from "leaflet";
import { DIALOG_ERROR, DIALOG_SUCCESS } from "../Utils/Dialogs_Methods";
import axios from "axios";
const { BaseLayer, Overlay } = LayersControl;
function Hazard_Display({ hazardToggle }) {
	const [MapLocation] = useContext(MapContext);
	const [isUser] = useContext(UserContext);
	const [polylines, setPolylines] = useState([]);
	const mapRef = useRef();
	const outlineRef = useRef();
	const markerRef = useRef();
	const editableFG = useRef();
	const [markerColor, setMarker] = useState("#ff0000");
	const [, setOpacityVisibility] = useState(false);
	const [isLegendVisible, setLegendVisibility] = useState(false);
	const [Label, setLabel] = useState(null);
	const [clickedID, setClickedID] = useState(null);
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [hazardDetails, setHazardDetails] = useState({});
	const [newLayer, setNewLayer] = useState(null);
	const [maps, setMaps] = useState([]);
	const [hazards, setHazards] = useState([]);

	const customIcon = L.icon({
		iconUrl: "/map-pin.svg", // Path to your custom icon image
		iconSize: [50, 50], // Size of the icon [width, height]
		iconAnchor: [25, 50], // Center the icon horizontally and position it at the bottom vertically
		popupAnchor: [0, -30], // Position popup above the icon
	});
	useEffect(() => {
		if (editableFG.current) {
			editableFG.current.clearLayers();
		}
		if (hazardToggle == 0) {
			return;
		}
		setHazards(() => []);
		getHazards(hazardToggle).then((datas) => {
			const hazardvar = Object.keys(datas).map((key) => {
				const data = datas[key];

				const position = [];
				data.Outlines.forEach((coords) => {
					position.push([
						Number(coords.HazardLong),
						Number(coords.HazardLat),
					]);
				});
				return (
					<Polygon
						key={data.HazardID}
						pathOptions={{
							color:
								data.HazardTypeID ==
								"LS200"
									? "green"
									: "red",
							weight: 5,
						}}
						positions={position}
					/>
				);
			});
			setHazards(() => hazardvar);
		});
	}, [hazardToggle]);
	useEffect(() => {
		if (mapRef.current) {
			const { Zoom, X, Y, outlines } = MapLocation[0];
			mapRef.current.flyTo([X, Y], Zoom);

			let coords = [];
			for (let i = 0; i < outlines.length; i++) {
				coords.push({
					lat: outlines[i].X,
					lng: outlines[i].Y,
				});
			}
			outlineRef.current.setLatLngs(coords);
		}
	}, [MapLocation]);

	const POST_DATA = async (passData, passLayer) => {
		//Correct
		if (await writeData(passData)) {
			console.log("write Data");
			DIALOG_SUCCESS("Sucess", "Writing Data Sucessful");
			if (passLayer instanceof L.Polygon) {
				setPolylines([...polylines, passLayer.getLatLngs()]);
			} else if (passLayer instanceof L.Marker) {
				setPolylines([...polylines, passLayer.getLatLng()]);
			}
			return;
		} else {
			//Error or False
			DIALOG_ERROR("Failed", "Writing Data Failed");
			if (mapRef.current.hasLayer(passLayer))
				mapRef.current.removeLayer(passLayer);
		}
	};
	useEffect(() => {
		if (isDialogOpen) {
			return;
		}
		if (newLayer == null) {
			return;
		}
		const layer = newLayer;

		const { name, type, details, susceptibility } = hazardDetails;
		console.log(layer.options.color);
		layer.setStyle({
			color: type === "LS200" ? "#008000" : "#FF0000", // Make sure the color format is correct with a `#`
		});
		const popupContent = `
			<div class="flex flex-col  items-center m-3 justify-center">
				<h3>Name:${name}</h3>
				<p>Info:${type}</p>
				<p>Info:${details}</p>
				<Button class="bg-slate-600 p-3 rounded-sm">EDIT</Button>
			</div>`;
		layer.bindPopup(popupContent);

		layer.on("dblclick", function (clickedLayer) {
			console.log(clickedLayer);
			setLegendVisibility(() => true);
			setOpacityVisibility(() => true);
			const {
				target: { _leaflet_id },
			} = clickedLayer;
			setLabel(_leaflet_id);
			setClickedID(_leaflet_id);
		});

		// Update state with new polyline
		const { _latlngs, _leaflet_id } = layer;
		const passData = {
			name: name,
			id: _leaflet_id,
			susceptibility: susceptibility,
			type: type,
			details: details,
			coords: _latlngs[0],
		};
		POST_DATA(passData, layer);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDialogOpen, newLayer, hazardDetails]);

	const handleCreated = (e) => {
		const { layer } = e;
		console.log(layer);
		setDialogOpen(() => true);
		setNewLayer(() => layer);
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

	const markerClicked = () => {
		mapRef.current.flyTo([MapLocation[0].X, MapLocation[0].Y], MapLocation[0].Zoom);
	};
	useState(() => {
		const Maps = async () => {
			const response = await axios.get("/src/Data/Map.json");
			return response.data;
		};

		Maps().then((data) => {
			const map = Object.keys(data).map((key) => (
				<BaseLayer key={key} name={data[key].name}>
					<TileLayer url={data[key].url} />
				</BaseLayer>
			));

			setMaps(() => map);
		});
	}, []);

	return (
		<>
			<FormDialog
				className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
				isDialogOpen={isDialogOpen}
				setDialogOpen={setDialogOpen}
				setHazardDetails={setHazardDetails}
			/>
			<Legend
				isLegendVisible={isLegendVisible}
				setLegendVisibility={setLegendVisibility}
				Label={Label}
			/>
			<div className="flex relative size-11/12 overflow-hidden z-0  border-4 border-white  rounded-2xl">
				<MapContainer
					ref={mapRef}
					className="relative w-full h-full z-10"
					center={[MapLocation[0].X, MapLocation[0].Y]}
					zoom={MapLocation[0].Zoom}
					attributionControl={false}>
					<LayersControl position="topright">
						{/* Base Layer */}
						<BaseLayer checked name="Default Map">
							<TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
						</BaseLayer>
						{maps.map((item) => item)}

						{/* Overlay layers */}
						<Overlay checked name="Hazards">
							<FeatureGroup
								ref={editableFG}>
								{hazards.map(
									(
										hazard
									) =>
										hazard
								)}
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
											polyline: false,
											polygon: {
												shapeOptions: {
													color: markerColor,
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
							</FeatureGroup>
						</Overlay>
						<Overlay
							name="Barangay Outline"
							checked>
							<FeatureGroup>
								<Polyline
									ref={
										outlineRef
									}
									pathOptions={{
										color: "red",
										weight: 5,
									}}
									interactive={
										false
									}
									positions={MapLocation[0].outlines.map(
										(
											element
										) => [
											element.X,
											element.Y,
										]
									)}
								/>
								<Marker
									eventHandlers={{
										click: markerClicked,
									}}
									ref={
										markerRef
									}
									icon={
										customIcon
									}
									position={[
										MapLocation[0]
											.X,
										MapLocation[0]
											.Y,
									]}
								/>
							</FeatureGroup>
						</Overlay>
						{/* <Overlay name="Roads">
							<TileLayer
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							/>
						</Overlay> */}
					</LayersControl>
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

export default Hazard_Display;
