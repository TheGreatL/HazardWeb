// import React, { useState } from "react";
import Proptypes from "prop-types";
import { useState, useEffect } from "react";

function LeftSideBar({ isSideBarShowing, setBarangay }) {
	async function GetData() {
		const response = await fetch("/src/Data/Barangay_List.json");
		const data = await response.json();
		return data;
	}
	const MyComponent = () => {
		console.log("RUN ONE");
		const [buttons, setButtons] = useState([]);

		useEffect(() => {
			GetData().then((data) => {
				const bu = Object.keys(data).map((key) => (
					<button
						onClick={() => {
							setBarangay([data[key]]);
						}}
						key={key}
						className="text-ellipsis bg-white rounded-xl py-5 text-base lg:text-2xl">
						{data[key].Name}
					</button>
				));
				setButtons(bu); // Update state with the array of buttons
			});
		}, []);

		return (
			<div className="scroll-smooth hide-scroll-bar  flex flex-col gap-3 overflow-auto  flex-grow p-3 py-5 ">
				{buttons}
			</div>
		); // Render the buttons
	};

	// Array.from(barangayButton).map((barangay) => {
	// 	return (
	// 		<button
	// 			key={barangay.Name}
	// 			className="text-ellipsis bg-white rounded-xl  py-5 text-base lg:text-2xl">
	// 			{barangay.Name}
	// 		</button>
	// 	);
	// });
	return (
		<>
			<div
				className={`${isSideBarShowing ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}  transition-opacity ease-in transition- duration-300 flex bg-gray-400 lg:bg-transparent fixed left-0 bottom-0 right-32  bg-transparent  gap-0.5  lg:flex flex-col  overflow-hidden lg:static top-0 z-10`}>
				<p className=" text-wrap bg-white rounded-xl  lg:text-xl text-center  p-3 lg:p-8 my-3 px-0 lg:px-14 m-2 font-bold uppercase">
					List of Barangay
				</p>
				<MyComponent />
			</div>
		</>
	);
}

LeftSideBar.propTypes = {
	isSideBarShowing: Proptypes.bool,
	setBarangay: Proptypes.func,
};
export default LeftSideBar;
