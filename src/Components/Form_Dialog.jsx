import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
	IconButton,
	TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { XIcon } from "lucide-react";

function FormDialog({ isDialogOpen, setDialogOpen }) {
	console.log("FOMR OPEN? ", isDialogOpen);
	return (
		<>
			<Dialog open={isDialogOpen} scroll={"paper"}>
				<DialogTitle>
					<div className="flex ">
						<p className="flex-grow">Title</p>
						<IconButton
							onClick={() =>
								setDialogOpen(
									() =>
										false
								)
							}>
							<XIcon></XIcon>
						</IconButton>
					</div>
				</DialogTitle>
				<DialogContent>
					<form
						action=""
						className="flex flex-col gap-3  flex-grow w-full  min-w-[500px] p-2 ">
						<TextField
							id="outlined-basic"
							label="Flood"
							variant="outlined"
							size="small"
						/>
						<TextField
							id="outlined-basic"
							label="Landslide"
							variant="outlined"
							size="small"
						/>
						<TextField
							id="outlined-basic"
							label="Landslide"
							variant="outlined"
							size="small"
						/>
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() =>
							setDialogOpen(() => false)
						}
						variant="contained"
						style={{
							color: "white",
							backgroundColor: "#ff0000",
							flexGrow: 1,
							margin: "1rem",
						}}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
FormDialog.propTypes = {
	isDialogOpen: PropTypes.bool,
	setDialogOpen: PropTypes.func,
};

export default FormDialog;
