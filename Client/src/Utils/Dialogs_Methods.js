import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const DIALOG_SUCCESS = (title, textContent, showConfirmButton, duration) => {
	MySwal.fire({
		position: "center",
		icon: "success",
		title: title,
		text: textContent ?? "",
		showConfirmButton: showConfirmButton ?? false,
		timer: duration ?? 1500,
	});
};

export const DIALOG_ERROR = (title, textContent, duration) => {
	MySwal.fire({
		position: "center",
		icon: "error",
		title: title,
		text: textContent,
		timer: duration ?? 1500,
	});
};
