// import React, { useState } from "react";
import Barangay from "../Data/Barangay_List";
import Proptypes from "prop-types";
function LeftSideBar({ isSideBarShowing }) {
	return (
		<>
			<div
				className={`${isSideBarShowing ? "opacity-100 visible" : "opacity-0 invisible lg:opacity-100 lg:visible"}  transition-opacity ease-in transition- duration-300 flex bg-gray-400 lg:bg-transparent fixed left-0 bottom-0 right-32  bg-transparent  gap-0.5  lg:flex flex-col  overflow-hidden lg:static top-0 z-10`}>
				<p className=" text-wrap bg-white rounded-xl  lg:text-xl text-center  p-3 lg:p-8 my-3 px-0 lg:px-14 m-2 font-bold uppercase">
					List of Barangay
				</p>
				<div className="scroll-smooth hide-scroll-bar  flex flex-col gap-3 overflow-auto  flex-grow p-3 py-5">
					{Barangay.map((barangay) => (
						<button
							key={barangay}
							className="text-ellipsis bg-white rounded-xl  py-5 text-base lg:text-2xl">
							{barangay}
						</button>
					))}
				</div>
			</div>
		</>
	);
}

LeftSideBar.propTypes = {
	isSideBarShowing: Proptypes.bool,
};
export default LeftSideBar;
