import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { UserContext } from "../Run";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
function Admin_Sign_In() {
	const [, setIsUser] = useContext(UserContext);
	const password = useRef();
	const email = useRef();
	const form = useRef();
	const [isInputValid, setInputValid] = useState(true);
	const navigate = useNavigate();
	return (
		<>
			<section className="h-screen flex ">
				<div className="flex m-auto flex-col 2xl:max-w-full  ">
					<h1 className=" text-center text-4xl sm:text-6xl  lg:text-8xl uppercase font-bold text-white mb-10 2xl:text-9xl ">
						Admin Sign in
					</h1>
					<form
						className="flex flex-col flex-grow   gap-5 p-3 lg:p-5  justify-center lg:items-center w-full mx-auto lg:max-w-[600px]   sm:self-center overflow-hidden"
						onSubmit={(e) => {
							e.preventDefault();

							if (
								email.current
									.value ===
									"" ||
								password.current
									.value ===
									""
							) {
								setInputValid(
									() =>
										false
								);
								console.log(
									isInputValid
								);
								return;
							}
							setIsUser(() => false);
							setInputValid(() => true);
							const MySwal =
								withReactContent(
									Swal
								);
							MySwal.fire({
								position: "center",
								icon: "success",
								title: "Login Sucessful",
								showConfirmButton: false,
								timer: 1000,
							});
							setTimeout(() => {
								navigate("/Home", {
									replace: true,
								});
							}, 1000);
						}}
						id={form}>
						<input
							className="lg:px-5 px-3 lg:py-3 py-2   text-xs lg:text-base rounded-xl   lg:w-full outline lg:min-w-[500px] lg:min-h-[50px] outline-black"
							type="text"
							name=""
							ref={email}
							placeholder="Email"
						/>
						<input
							className="lg:px-5 px-3 lg:py-3 py-2   text-xs lg:text-base rounded-xl  lg:w-full outline lg:min-w-[500px] lg:min-h-[50px] outline-black"
							type="text"
							name=""
							ref={password}
							placeholder="password"
						/>
						<Alert
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: "1.2rem",
								display: isInputValid
									? "none"
									: "flex",
								width: "100%",
								justifyContent:
									"center",
								alignItems: "center",
							}}
							severity="error"
							variant="filled">
							Your input is not valid
						</Alert>
						<Button
							className="bg-white py-1 px-3 lg:py-3 lg:px-5 rounded-xl text-lg lg:text-2xl text-black font-bold uppercase tracking-wider self-center "
							type="submit">
							Submit
						</Button>
					</form>
					{/* <button className="text-white text-lg font-semibold tracking-wider">forgot password?</button> */}
				</div>
			</section>
		</>
	);
}

export default Admin_Sign_In;
