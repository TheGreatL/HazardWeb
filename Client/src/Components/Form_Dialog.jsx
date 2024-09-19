import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	Button,
	IconButton,
	TextField,
	FormGroup,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
} from "@mui/material";
import PropTypes from "prop-types";
import { XIcon } from "lucide-react";
import { useRef, useState } from "react";

function Form_Dialog({ isDialogOpen, setDialogOpen, setHazardDetails }) {
	const hazardName = useRef();
	const hazardDetails = useRef();
	const [hazardtype, setHazardType] = useState("");

	return (
		<>
			<Dialog open={isDialogOpen} scroll="paper" fullWidth={true}>
				<DialogTitle
					style={{
						color: "black",
						fontSize: "1.5rem",
						display: "flex",
						justifyItems: "center",
						alignItems: "center",
					}}>
					<p
						style={{
							flexGrow: 1,
						}}>
						Hazard Infomration
					</p>
					<IconButton
						onClick={() =>
							setDialogOpen(() => false)
						}>
						<XIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setDialogOpen(() => false);
							setHazardDetails({
								name: hazardName
									.current
									.value,
								type: hazardtype,
								details: hazardDetails
									.current
									.value,
							});
						}}>
						<FormGroup
							style={{
								display: "flex",
								gap: "1rem",
								padding: "1rem",
							}}>
							<TextField
								inputRef={
									hazardName
								}
								id="outlined-basic"
								label="Name"
								variant="outlined"
								size="small"
							/>
							<FormControl
								fullWidth
								variant="outlined">
								<InputLabel id="demo-simple-select-label">
									Hazard
									Type
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									label="Hazard Type"
									value={
										hazardtype
									}
									onChange={(
										event
									) => {
										setHazardType(
											() =>
												event
													.target
													.value
										);
									}}>
									<MenuItem
										value={
											"FLOOD"
										}>
										Flood
									</MenuItem>
									<MenuItem
										value={
											"LANDSLIDE"
										}>
										Landslide
									</MenuItem>
								</Select>
							</FormControl>
							<TextField
								inputRef={
									hazardDetails
								}
								id="outlined-basic"
								label="Hazard Details"
								multiline
								rows={5}
								variant="outlined"
								size="small"
							/>
							<DialogActions>
								<Button
									style={{
										backgroundColor:
											"red",
										// width: "100%",
										// marginInline: "2rem",
										// marginBottom: "1rem",
									}}
									type="submit"
									variant="contained">
									Submit
								</Button>
							</DialogActions>
						</FormGroup>
					</form>
				</DialogContent>
			</Dialog>
		</>
	);
}
Form_Dialog.propTypes = {
	isDialogOpen: PropTypes.bool,
	setDialogOpen: PropTypes.func,
	setHazardDetails: PropTypes.func,
};

export default Form_Dialog;
