import PropTypes from "prop-types";
function Legend({ isLegendVisible }) {
	return (
		<>
			<div
				className={`${isLegendVisible ? "opacity-100 visible " : "opacity-0 invisible"} flex transition-opacity duration-150 ease-out justify-around flex-col bg-opacity-50 lg:bg-opacity-100  bg-white fixed bottom-0 h-52 right-0 w-80 overflow-auto`}>
				<p>
					<span className="bg-yellow-300 size-1 px-3 mx-2"></span>
					Very High Susceptivility Flooding
				</p>
				<p>
					<span className="bg-yellow-300 size-1 px-3 mx-2"></span>{" "}
					Flooding
				</p>
				<p>
					<span className="bg-yellow-300 size-1 px-3 mx-2"></span>{" "}
					Flooding
				</p>
				<p>
					<span className="bg-yellow-300 size-1 px-3 mx-2"></span>
					Very High Susceptivility Flooding
				</p>
				<p>
					<span className="bg-yellow-300 size-1 px-3 mx-2"></span>
					Very High Susceptivility Flooding
				</p>
			</div>
		</>
	);
}
Legend.propTypes = {
	isLegendVisible: PropTypes.bool,
};
export default Legend;
