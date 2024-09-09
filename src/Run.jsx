import LoginForm from "./Pages/Admin_SignIn";
import MainComponent from "./Pages/HomePage";
function Run() {
	const isLoggedIn = true;
	return (
		<div>
			{/* If Already Logged in, Run Main Component*/}
			{isLoggedIn ? <MainComponent /> : <LoginForm />}
		</div>
	);
}
export default Run;
