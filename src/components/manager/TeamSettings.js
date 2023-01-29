import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useTeam } from "../../context/teamContext";
import { useError } from "../../context/errorContext";

function TeamSettings() {
	const [deleteProject, setDeleteProject] = useState(false);
	const { projectName, projectId } = useTeam();
	const navigate = useNavigate();
	const { setError } = useError();

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post("http://127.0.0.1:3636/removeproject", {
				projectId: projectId,
			});
			if (response.success) {
				navigate("/");
				localStorage.removeItem("lastProjectName");
				localStorage.removeItem("lastProjectId");
				localStorage.removeItem("useProjectId");
				setError({
					is: true,
					message: "Project has been removed",
				});
			}
		};
		if (deleteProject) {
			handleFetch();

			setDeleteProject(false);
		}
	}, [deleteProject]);

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
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
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
									autoFocus
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
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
