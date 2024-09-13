import AdminSignIn from "./Pages/Admin_Sign_In";
import { useState, createContext } from "react";
import HomePage from "./Pages/Default_Home_Page";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const MapContext = createContext();

function Run() {
	const [DefaultMapLocation, setDefaultMapLocation] = useState([
		{
			Name: "Taft",
			Zoom: 11,
			X: 11.9038073336903,
			Y: 125.36533722559534,
			outlines: [
				{ X: 11.782170048098457, Y: 125.28843293003246 },
				{ X: 11.921947471158985, Y: 125.25478730072373 },
				{ X: 11.950163052083685, Y: 125.42301544726747 },
				{ X: 11.869539327517373, Y: 125.43194183871675 },
				{ X: 11.78165678005133, Y: 125.28958336415504 },
			],
		},
	]);

	return (
		<MapContext.Provider value={[DefaultMapLocation, setDefaultMapLocation]}>
			<BrowserRouter>
				<Routes>
					<Route
						index
						path="/Home"
						element={<HomePage />}
					/>
					<Route
						path="/Admin_Login"
						element={<AdminSignIn />}
					/>
					<Route
						path="*"
						element={
							<h1 className="text-center text-4xl sm:text-6xl  lg:text-8xl uppercase font-bold text-white mb-10 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
								404
							</h1>
						}
					/>
				</Routes>
			</BrowserRouter>
		</MapContext.Provider>
	);
}
export default Run;
