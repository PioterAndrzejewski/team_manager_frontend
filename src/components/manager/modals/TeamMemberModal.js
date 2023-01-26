import * as React from "react";
import FileUpload from "react-mui-fileuploader";
import axios from "axios";

import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import { useModal } from "../../../context/modalContext";
import { useError } from "../../../context/errorContext";
import { useTeam } from "../../../context/teamContext";
import { useNavigate } from "react-router-dom";

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

export default function TeamMemberModal(props) {
	const [fileToUpload, setFileToUpload] = useState([]);

	const { projectId, updateTeamMembers } = useTeam();
	const { teamModalOpen, setTeamModalOpen } = useModal();
	const { error, setError } = useError();
	const navigate = useNavigate();

	const handleClose = () => setTeamModalOpen(false);

	const [inputValue, setInputValue] = useState("");
	const handleChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleFilesChange = (files) => {
		setFileToUpload([...files]);
	};

	const handleButton = (e) => {
		e.preventDefault();
		if (inputValue.length < 4) {
			setError({ is: true, message: "Name must be at least 4 digits" });
			return;
		}
		if (fileToUpload.length < 1) {
			setError({ is: true, message: "You need to upload avatar" });
			return;
		}
		const handleFetch = async () => {
			let formData = new FormData();
			formData.append("projectId", projectId);
			formData.append("newMemberName", inputValue);
			const fileExtension = fileToUpload[0].name.split(".")[1];
			formData.append("fileExtension", fileExtension);
			formData.append("avatar", fileToUpload[0]);
			const response = await axios({
				method: "post",
				url: "http://127.0.0.1:3636/addmember",
				data: formData,
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log(response);
			updateTeamMembers(response.data.projectMembers);
			setError({ is: false, message: "" });
			handleClose();
		};
		handleFetch();
	};

	return (
		<div>
			<Modal
				open={teamModalOpen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography component="h1" variant="h5">
						Create new member
					</Typography>
					{error.is && (
						<Alert severity="error" sx={{ m: 5 }}>
							{error.message}
						</Alert>
					)}
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<FileUpload
							title="Upload member avatar"
							multiFile={false}
							acceptedType={"image/*"}
							onFilesChange={handleFilesChange}
							showPlaceholderImage={false}
							onContextReady={(context) => {}}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							id="newMemberName"
							label="New member name"
							name="newMemberName"
							value={inputValue}
							onChange={handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleButton}
						>
							Create teammate!
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
}
