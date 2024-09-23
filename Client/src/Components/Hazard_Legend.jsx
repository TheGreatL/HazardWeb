import PropTypes from "prop-types";
import { XIcon } from "lucide-react";
import { PieChart } from "@mui/x-charts";
import { Button } from "@mui/material";
function Hazard_Legend({ isLegendVisible, setLegendVisibility, Label }) {
	const landslideColors = ["#FF4D4D", "#FF2A2A", "#B22222", "#8B0000"];
	const floodColors = ["#4DFF4D", "#32CD32", "#228B22", "#556B2F"];

	return (
		<>
			<div
				className={`${isLegendVisible ? "opacity-100 visible " : "opacity-0 invisible hidden"}  z-50 flex justify-start gap-10  transition-all duration-150 ease-in-out  flex-col bg-opacity-50  bg-black lg:w-96 fixed bottom-0 top-32 w-52 right-0 lg:right-40 p-4 rounded-lg`}>
				<Button
					className="absolute top-0.5 right-0.5 p-2 text-white bg-gray-700 rounded-full z-50"
					onClick={() => setLegendVisibility(() => false)}>
					<XIcon />
				</Button>

				<PieChart
					className="text-sm"
					series={[
						{
							data: [
								{
									id: 0,
									value: 10,
									label: "High",
									color: floodColors[0],
								},
								{
									id: 1,
									value: 15,
									label: "High",
									color: floodColors[1],
								},
								{
									id: 2,
									value: 20,
									label: "Low",
									color: floodColors[2],
								},
								{
									id: 3,
									value: 20,
									label: "Very Low",

									color: floodColors[3],
								},
							],
							highlightScope: {
								fade: "global",
								highlight: "item",
							},
							faded: {
								innerRadius: 30,
								additionalRadius:
									-30,
								color: "#4DFF4D",
							},
						},
					]}
					slotProps={{
						legend: {
							labelStyle: {
								tableLayout: "fixed",
								color: "white", // Set the text color to white
							},
							direction: "row",
							position: {
								horizontal: "middle", // Center the labels horizontally
								vertical: "bottom", // Position the labels at the bottom
							},
						},
					}}
					margin={{ right: 20, left: 20, bottom: 50 }}
				/>

				<div className="flex flex-col gap-2 text-white">
					<p className="text-sm text-white">
						<span className="bg-yellow-300 size-1 px-3 mx-2"></span>
						Very High Susceptivility Flooding
					</p>
					<p className="text-sm  text-white">
						<span className="bg-yellow-300 size-1 px-3 mx-2"></span>{" "}
						Flooding
					</p>
					<p className="text-sm  text-white">
						<span className="bg-yellow-300 size-1 px-3 mx-2"></span>{" "}
						{Label}
					</p>
					<p className="text-sm  text-white">
						<span className="bg-yellow-300 size-1 px-3 mx-2"></span>
						Very High Susceptivility Flooding
					</p>
					<p className="text-sm  text-white">
						<span className="bg-yellow-300 size-1 px-3 mx-2"></span>
						Very High Susceptivility Flooding
					</p>
				</div>
			</div>
		</>
	);
}
Hazard_Legend.propTypes = {
	isLegendVisible: PropTypes.bool,
	Label: PropTypes.string,
	setLegendVisibility: PropTypes.func,
};
export default Hazard_Legend;
