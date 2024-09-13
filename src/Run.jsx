import LoginForm from "./Pages/Admin_SignIn";
import { useState } from "react";
import MainComponent from "./Pages/HomePage";
function Run() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<div>
			{/* If Already Logged in, Run Main Component*/}
			{isLoggedIn ? (
				<MainComponent />
			) : (
				<LoginForm setIsLoggedIn={setIsLoggedIn} />
			)}
		</div>
	);
}
export default Run;
