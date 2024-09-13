import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import "leaflet-draw/dist/leaflet.draw.css"; // Leaflet Draw CSS
import Run from "./Run";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Run />
	</StrictMode>
);
