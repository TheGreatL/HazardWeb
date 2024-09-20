import axios from "axios";
export const writeData = async (passData) => {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/hazard/POST/HazardInfo",
			passData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log(response);
		if (response.status == 200) {
			return true;
		}
		return false;
	} catch (error) {
		console.error("Error posting data:", error);
		return false; // Rethrow the error if you want to handle it later
	}
};
export const getHazards = async (hazardType) => {
	try {
		if (hazardType == 0) return;
		const filter = hazardType == 1 ? "FL200" : "LS200";
		const response = await axios.get(
			`http://localhost:5000/api/hazard/GET/${filter}`
		);
		return response.data;
	} catch (error) {
		console.log("Fetching Error", error);
	}
	return null;
};
