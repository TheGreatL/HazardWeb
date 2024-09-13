import { useState, useEffect } from "react";
import { useContext } from "react";
import { MapContext } from "../Run";

function Barangay_Button() {
	const getData = async () => {
		const response = await fetch("/src/Data/Barangay_List.json");
		const data = await response.json();
		return data;
	};
	const [, setMapLocation] = useContext(MapContext);
	const [buttons, setButtons] = useState([]);
	useEffect(() => {
		getData.then((data) => {
			const bu = Object.keys(data).map((key) => (
				<button
					onClick={() => {
						setMapLocation([data[key]]);
					}}
					key={key}
					className="text-ellipsis bg-white rounded-xl py-5 text-base lg:text-2xl">
					{data[key].Name}
				</button>
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
