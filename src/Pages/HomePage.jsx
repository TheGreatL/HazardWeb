import { Menu, ChevronLeft } from "lucide-react";
import { useState } from "react";
import LeftSideBar from "../Components/Left_Side_Bar";
import DisplayHazardRisk from "../Components/Display_Hazard_Risk";
// import Legend from "../Components/Legend";
function MainComponent() {
	const [isSideBarShowing, setSideBar] = useState(false);
	const [isLegendVisible, setLegendVisibility] = useState(false);
	const [isHazardToggle, setHazardToggle] = useState(0);
	const [barangay, setBarangay] = useState([
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
		<>
			<main className="grid lg:grid-cols-[auto,1fr] grid-cols-1  bg-transparent max-w-full h-screen ">
				<LeftSideBar
					isSideBarShowing={isSideBarShowing}
					setBarangay={setBarangay}
				/>
				{/* Right Side */}
				<div className="flex flex-col  bg-transparent overflow-hidden">
					<header className="flex  justify-around ">
						<button
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
						</button>
						<button
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
						</button>
						<button
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
							className="lg:hidden flex justify-center items-center bg-white mx-2 my-2 p-3 rounded-xl">
							<Menu />
						</button>
					</header>
					{/* Map Container */}

					<div className=" flex-grow flex items-center justify-center overflow-auto flex-col lg:flex-row  relative">
						<DisplayHazardRisk
							// MapImages={}
							barangay={barangay}
						/>
					</div>
				</div>
				<button
					onClick={() =>
						setLegendVisibility(
							(isLegendVisible) => {
								if (
									isSideBarShowing
								)
									setSideBar(
										(
											isSideBarShowing
										) =>
											!isSideBarShowing
									);

								return !isLegendVisible;
							}
						)
					}
					className="fixed bg-yellow-300 bottom-52 -right-8 hover:-right-4 lg:-right-6 lg:hover:-right-4 transition-right duration-300 ease-out flex justify-start overflow-hidden size-12 items-start rounded-lg">
					<ChevronLeft className=" h-full" />
				</button>
			</main>
		</>
	);
}

export default MainComponent;
