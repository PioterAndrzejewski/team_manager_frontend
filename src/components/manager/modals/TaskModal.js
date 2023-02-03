import * as React from "react";
import axios from "axios";

import Modal from "@mui/material/Modal";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useModal } from "../../../context/modalContext";
import { useError } from "../../../context/errorContext";
import { useTeam } from "../../../context/teamContext";
import moment from "moment/moment";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function TaskModal() {
	const { projectId, updateTasks, HOST } = useTeam();
	const { taskModalOpen, setTaskModalOpen, modalMode } = useModal();
	const { error, setError } = useError();

	const [nameInputValue, setNameInputValue] = useState("");
	const [descriptionInputValue, setDescriptionInputValue] = useState("");

	const [dateValue, setDateValue] = useState(moment());

	const handleClose = () => {
		setError({ is: false, message: "" });
		setTaskModalOpen(false);
	};

	const handleNameChange = (e) => {
		setNameInputValue(e.target.value);
	};
	const handleDescriptionChange = (e) => {
		setDescriptionInputValue(e.target.value);
	};
	const handleDateChange = (newValue) => {
		setDateValue(newValue);
	};

	const handleButton = (e) => {
		e.preventDefault();
		if (nameInputValue.length < 4) {
			setError({ is: true, message: "Task name must be at least 4 digits" });
			return;
		}
		const handleFetch = async () => {
			let formData = new FormData();
			formData.append("projectId", projectId);
			formData.append("mode", modalMode);
			formData.append("taskDueDate", dateValue);
			formData.append("taskName", nameInputValue);
			formData.append("taskDescription", descriptionInputValue);

			const response = await axios({
				method: "post",
				url: `${HOST}/task`,
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});

			if (response.data.success) {
				setError({ is: false, message: "" });
				updateTasks(response.data.updatedTaskList);
				handleClose();
			}
		};
		handleFetch();
	};

	return (
		<div>
			<Modal
				open={taskModalOpen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography component="h1" variant="h5">
						{modalMode === "create" ? "Create new task" : `Edit task`}
					</Typography>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<Stack spacing={3}>
							{error.is && (
								<Alert severity="error" sx={{ width: "100%" }}>
									{error.message}
								</Alert>
							)}
							<TextField
								margin="normal"
								required
								fullWidth
								id="taskName"
								label={modalMode === "create" ? "New task name" : `Edit task: `}
								name="taskName"
								value={nameInputValue}
								onChange={handleNameChange}
								helperText="Please enter task name at least 4 characters"
							/>
							<TextField
								id="taskDescription"
								label="Task description"
								fullWidth
								multiline
								rows={4}
								value={descriptionInputValue}
								onChange={handleDescriptionChange}
								helperText="Please enter description or leave it blank"
							/>
							<LocalizationProvider
								dateAdapter={AdapterMoment}
								adapterLocale="pl-PL"
							>
								<MobileDatePicker
									label="Task due date"
									inputFormat="MM/DD/YYYY"
									showToolbar
									value={dateValue}
									onChange={handleDateChange}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleButton}
							>
								{modalMode === "create" ? "Create task" : `Edit task`}
							</Button>
						</Stack>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
