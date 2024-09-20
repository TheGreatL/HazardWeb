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
	const [hazardSusceptibility, setHazardSusceptibility] = useState("");
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
								susceptibility:
									hazardSusceptibility,
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
											"FL200"
										}>
										Flood
									</MenuItem>
									<MenuItem
										value={
											"LS200"
										}>
										Landslide
									</MenuItem>
								</Select>
							</FormControl>

							<FormControl
								fullWidth
								variant="outlined">
								<InputLabel id="select-label-susceptibility">
									Hazard
									Susceptibility
								</InputLabel>
								<Select
									labelId="select-label-susceptibility"
									label="Hazard Susceptibility"
									value={
										hazardSusceptibility
									}
									onChange={(
										event
									) => {
										setHazardSusceptibility(
											() =>
												event
													.target
													.value
										);
									}}>
									<MenuItem
										value={
											1
										}>
										1
									</MenuItem>
									<MenuItem
										value={
											2
										}>
										2
									</MenuItem>
									<MenuItem
										value={
											3
										}>
										4
									</MenuItem>
									<MenuItem
										value={
											4
										}>
										4
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
