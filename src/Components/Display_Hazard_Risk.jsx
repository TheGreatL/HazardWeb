import { Plus, Minus } from "lucide-react";
import pob1_map from "/pob1_map.svg";
import pob1_f from "/pob1_flood.svg";
import pob1_l from "/pob1_landslide.svg";
import Proptypes from "prop-types";
function DisplayHazardRisk({ isHazardToggle }) {
	function ShowImage() {
		let image;
		if (isHazardToggle == 1) {
			image = (
				<img
					className=" w-full h-full absolute  left-0 top-0"
					src={pob1_f}
					alt=""
				/>
			);
		} else if (isHazardToggle == 2) {
			image = (
				<img
					className=" w-full h-full absolute left-0 top-0 "
					src={pob1_l}
					alt=""
				/>
			);
		}
		return image;
	}

	return (
		<>
			<div className="flex h-full relative">
				<div className="h-full overflow-hidden relative">
					<img
						className="h-full w-full"
						src={pob1_map}
						alt=""
					/>
					<ShowImage />
				</div>

				<div className="flex flex-col gap-2 absolute top-0 right-0  m-2">
					<button
						title="Zoom In"
						type="button"
						className="transition ease-in-out duration-300  p-3 rounded-md bg-white hover:bg-slate-400">
						<Plus className="m-auto size-3 2xl:size-10" />
					</button>
					<button
						title="Zoom Out"
						type="button"
						className="transition ease-in-out duration-300  p-3 rounded-md bg-white hover:bg-slate-400">
						<Minus className="m-auto size-3 2xl:size-10" />
					</button>
				</div>
			</div>
		</>
	);
}
DisplayHazardRisk.propTypes = {
	isHazardToggle: Proptypes.number,
};
export default DisplayHazardRisk;
