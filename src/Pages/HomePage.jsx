import { Menu, ChevronLeft } from "lucide-react";
import { useState } from "react";
import LeftSideBar from "../Components/Left_Side_Bar";
import DisplayHazardRisk from "../Components/Display_Hazard_Risk";
import Legend from "../Components/Legend";
function MainComponent() {
	const [isSideBarShowing, setSideBar] = useState(false);
	const [isLegendVisible, setLegendVisibility] = useState(false);
	const [isHazardToggle, setHazardToggle] = useState(0);

	async function FetchData() {
		try {
			const response = await fetch("/src/Data/HazardData.json");
			if (!response.ok) {
				throw new Error("error");
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<main className="grid lg:grid-cols-[auto,1fr] grid-cols-1  bg-transparent max-w-full h-screen ">
				<LeftSideBar isSideBarShowing={isSideBarShowing} />
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
							isHazardToggle={
								isHazardToggle
							}
							// MapImages={}
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
				<Legend isLegendVisible={isLegendVisible} />
			</main>
		</>
	);
}

export default MainComponent;
