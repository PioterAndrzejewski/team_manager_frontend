import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useTeam } from "../../context/teamContext";
import { useError } from "../../context/errorContext";

function TeamSettings() {
	const [deleteProject, setDeleteProject] = useState(false);
	const [editProject, setEditProject] = useState("");
	const { projectName, projectId, changeProjectName, HOST } = useTeam();
	const [projectNameInput, setProjectNameInput] = useState("");

	const navigate = useNavigate();
	const { setError } = useError();

	const handleFetch = async (mode) => {
		const response = await axios.post(`${HOST}/editproject`, {
			projectId: projectId,
			mode,
			newProjectName: projectNameInput,
		});
		return response;
	};

	const handleInputChange = (e) => {
		setProjectNameInput(e.target.value);
	};

	const handleRenameButton = (e) => {
		e.preventDefault();
		setEditProject(true);
	};

	useEffect(() => {
		if (deleteProject) {
			handleFetch("remove");
			setDeleteProject(false);
			localStorage.removeItem("lastProjectName");
			localStorage.removeItem("lastProjectId");
			localStorage.removeItem("useProjectId");
			setError({
				is: true,
				message: "Project has been removed",
			});
			navigate("/");

			return;
		}
	}, [deleteProject]);

	useEffect(() => {
		if (editProject && projectNameInput.length < 4) {
			setError({
				is: true,
				message: "Project name must be at least 4 letters.",
			});
			setEditProject(false);
		}
		if (editProject) {
			const response = handleFetch("edit");
			setEditProject(false);
			localStorage.setItem("lastProjectName", projectNameInput);
			setError({
				is: false,
				message: "",
			});
			changeProjectName(projectNameInput);
		}
	}, [editProject]);

	const handleDeleteButton = () => {
		const confirm =
			prompt(`You are going to delete the project. This action is irreversible.
		Write "remove" to confirm
		`);

		if (confirm === "remove") {
			setDeleteProject(true);
		}
	};
	return (
		<main>
			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						padding: "60px",
						borderRadius: "15px",
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "white",
						boxShadow: "#A5A5A5 2px 2px 5px",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<SettingsIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Manage your project
					</Typography>
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<Grid container spacing={1}>
							<Grid item sm={12}>
								<TextField
									autoComplete="given-name"
									name="projectName"
									required
									fullWidth
									id="projectName"
									label="New project name"
									value={projectNameInput}
									onChange={handleInputChange}
									autoFocus
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleRenameButton}
						>
							Rename project
						</Button>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="error"
							sx={{ mt: 3, mb: 2 }}
							onClick={handleDeleteButton}
						>
							Delete project
						</Button>
					</Box>
				</Box>
			</Container>
		</main>
	);
}

export default TeamSettings;
