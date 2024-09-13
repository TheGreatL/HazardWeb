import PropTypes from "prop-types";
import { XIcon } from "lucide-react";
import { PieChart } from "@mui/x-charts";
function Legend({ isLegendVisible, setLegendVisibility, Label }) {
	return (
		<>
			<div
				className={`${isLegendVisible ? "opacity-100 visible " : "opacity-0 invisible hidden"}  z-50 flex justify-start gap-10  transition-opacity duration-150 ease-out  flex-col bg-opacity-50  bg-black lg:w-96 fixed bottom-0 top-32 w-52 right-0 lg:right-40 p-4 rounded-lg`}>
				<button
					className="absolute top-0.5 right-0.5 p-2 text-white bg-gray-700 rounded-full z-50"
					onClick={() => setLegendVisibility(() => false)}>
					<XIcon />
				</button>
				<div className=" h-32 z-0 text-white ">
					<PieChart
						className="text-sm"
						series={[
							{
								data: [
									{
										id: 0,
										value: 10,
										label:
											Label +
											" High",
									},
									{
										id: 1,
										value: 15,
										label:
											Label +
											" Moderate",
									},
									{
										id: 2,
										value: 20,
										label:
											Label +
											" low",
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
									color: "#8884d8",
								},
							},
						]}
						slotProps={{
							legend: {
								labelStyle: {
									fontSize: "0.8rem",
									fill: "#fff",
								},
							},
						}}
					/>
				</div>
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
Legend.propTypes = {
	isLegendVisible: PropTypes.bool,
	Label: PropTypes.string,
	setLegendVisibility: PropTypes.func,
};
export default Legend;
