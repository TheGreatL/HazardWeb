import { useState, useEffect } from "react";
import { useContext } from "react";
import { MapContext } from "../Run";
import { Button } from "@mui/material";
import axios from "axios";

function Barangay_Button() {
	const [, setMapLocation] = useContext(MapContext);
	const [buttons, setButtons] = useState([]);
	const getData = async () => {
		const response = await axios.get("/src/Data/Barangay_List.json");
		return response.data;
	};

	useEffect(() => {
		getData().then((data) => {
			const bu = Object.keys(data).map((key) => (
				<Button
					onClick={() => {
						setMapLocation([data[key]]);
					}}
					key={key}
					className="text-ellipsis bg-white rounded-xl py-5 text-base lg:text-2xl text-black normal-case">
					{data[key].Name}
				</Button>
			));
			setButtons(bu); // Update state with the array of buttons
		});
	}, [setMapLocation]);

	return (
		<div className="scroll-smooth hide-scroll-bar  flex flex-col gap-3 overflow-auto  flex-grow p-3 py-5 ">
			{buttons}
		</div>
	); // Render the button
}
export default Barangay_Button;
