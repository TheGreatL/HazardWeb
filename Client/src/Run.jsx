import AdminSignIn from "./Pages/Admin_Sign_In";
import { useState, createContext } from "react";
import HomePage from "./Pages/Default_Home_Page";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MapContext = createContext();
export const UserContext = createContext();

function Run() {
	const [isUser, setIsUser] = useState(true);
	const [DefaultMapLocation, setDefaultMapLocation] = useState([
		{
			Name: "Taft",
			Zoom: 11.5,
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
		<UserContext.Provider value={[isUser, setIsUser]}>
			<MapContext.Provider
				value={[DefaultMapLocation, setDefaultMapLocation]}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/home"
							element={<HomePage />}
						/>
						<Route
							index
							path="/"
							element={
								<Navigate
									to="/home"
									replace
								/>
							}
						/>
						<Route
							path="/admin_login"
							element={<AdminSignIn />}
						/>
						<Route
							path="*"
							element={
								<>
									<div className="flex flex-col  justify-center items-center h-screen fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
										<h1 className="text-center text-4xl sm:text-6xl  lg:text-8xl  uppercase font-bold text-white mb-10 ">
											404
										</h1>
										<h1 className="text-center text-4xl sm:text-6xl  lg:text-8xl uppercase font-bold text-white mb-10">
											Page
											Not
											Found
										</h1>
									</div>
								</>
							}
						/>
					</Routes>
				</BrowserRouter>
			</MapContext.Provider>
		</UserContext.Provider>
	);
}
export default Run;
