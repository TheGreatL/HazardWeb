import axios from "axios";
export const writeData = async (passData) => {
	try {
		const response = await axios.post(
			"http://localhost:5000/api/hazard/insert",
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
