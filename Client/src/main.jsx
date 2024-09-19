import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import "leaflet-draw/dist/leaflet.draw.css"; // Leaflet Draw CSS
import "sweetalert2/src/sweetalert2.scss";
import Run from "./Run";
import { StyledEngineProvider } from "@mui/material";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<StyledEngineProvider injectFirst>
			<Run />
		</StyledEngineProvider>
	</StrictMode>
);
