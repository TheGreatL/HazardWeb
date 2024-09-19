import { useContext, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import BarangayButton from "../Components/Barangay_Button";
import DisplayHazardRisk from "../Components/Hazard_Display";
import { UserIcon } from "lucide-react";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Run";
function Default_Home_Page() {
	const [isSideBarShowing, setSideBar] = useState(false);
	const [isHazardToggle, setHazardToggle] = useState(0);
	const [isLegendVisible, setLegendVisibility] = useState(false);
	const navigateLoginAdmin = useNavigate();
	const [isUser] = useContext(UserContext);
	// const fetchData = async () => {
	// 	try {
	// 		const response = await axios.get(
	// 			"http://localhost:5000/api/barangay"
	// 		);

	// 		console.log(response.data);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	// useEffect(() => {
	// 	fetchData();
	// }, []);

	return (
		<>
			<main className="grid lg:grid-cols-[auto,1fr] grid-cols-1  bg-transparent max-w-full h-screen ">
				<div
					className={`${isSideBarShowing ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}   ease-in-out   duration-300 transition-all  flex bg-gray-400 lg:bg-transparent fixed left-0 bottom-0 right-32  bg-transparent  gap-0.5  lg:flex flex-col  overflow-hidden lg:static top-0 z-10`}>
					<p className=" text-wrap bg-white rounded-xl  lg:text-xl text-center  p-3 lg:p-8 my-3 px-0 lg:px-14 m-2 font-bold uppercase">
						List of Barangay
					</p>
					<BarangayButton />
				</div>
				<div className="flex flex-col  bg-transparent overflow-hidden">
					<header className="flex  justify-around  px-5 flex-wrap">
						<Button
							onClick={() => {
								setHazardToggle(
									(
										isHazardToggle
									) =>
										isHazardToggle ==
										1
											? 0
											: 1
								);
							}}
							className={`lg:p-7 my-3 p-2 mx-3 py-2 text-base sm:tracking-widest tracking-wider lg:mx-10  rounded-2xl lg:text-3xl lg:tracking-wider uppercase font-bold text-white ${isHazardToggle == 1 ? "bg-gray-500" : "bg-red-500"}  flex-grow 2xl:max-w-full`}>
							Flood
						</Button>
						<Button
							onClick={() => {
								setHazardToggle(
									(
										isHazardToggle
									) =>
										isHazardToggle ==
										2
											? 0
											: 2
								);
							}}
							className={`lg:p-7 my-3 p-2 mx-3 py-2 text-base sm:tracking-widest tracking-wider lg:mx-10  rounded-2xl lg:text-3xl lg:tracking-wider uppercase font-bold text-white ${isHazardToggle == 2 ? "bg-gray-500" : "bg-green-500"}  flex-grow 2xl:max-w-full `}>
							Landslide
						</Button>
						<IconButton
							onClick={() =>
								setSideBar(
									(
										isSideBarShowing
									) => {
										if (
											isLegendVisible
										)
											setLegendVisibility(
												() =>
													false
											);
										return !isSideBarShowing;
									}
								)
							}
							className="lg:hidden flex justify-center items-center bg-white mx-2 my-2 p-3 rounded-xl text-black">
							<Menu />
						</IconButton>
						<IconButton
							disabled={!isUser}
							className="text-black bg-white self-center justify-self-center rounded-xl   size-12 lg:size-16 "
							onClick={() => {
								navigateLoginAdmin(
									"/Admin_Login"
								);
							}}>
							<UserIcon />
						</IconButton>
					</header>
					<div className=" flex-grow flex items-center justify-center overflow-auto flex-col lg:flex-row  relative">
						<DisplayHazardRisk />
					</div>
				</div>
			</main>
		</>
	);
}
export default Default_Home_Page;
