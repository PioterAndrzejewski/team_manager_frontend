import * as React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useTeam } from "../../context/teamContext";

export default function SignUp() {
	const navigate = useNavigate();
	const { HOST } = useTeam();

	const [formEntries, setFormEntries] = useState(undefined);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const dataFromForm = new FormData(event.currentTarget);
		const newFormEntries = {
			projectName: dataFromForm.get("projectName"),
			leaderName: dataFromForm.get("leaderName"),
		};
		setFormEntries(newFormEntries);
	};

	useEffect(() => {
		const fetchCreateProject = async () => {
			const response = await axios.post(`${HOST}/createproject`, formEntries);

			if (response.data.creationSuccess) {
				localStorage.setItem("lastProjectId", response.data.projectId);
				localStorage.setItem("useProjectId", response.data.projectId);
				localStorage.setItem("lastProjectName", response.data.projectName);
				setErrorMessage("");
				setIsError(false);
				navigate("/manager");
			}

			if (!response.data.creationSuccess) {
				setErrorMessage(response.data.message);
				setIsError(true);
			}
		};

		if (formEntries !== undefined) {
			fetchCreateProject();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formEntries, navigate]);

	return (
		<main>
			<Container
				component="main"
				maxWidth="xs"
				sx={{
					marginTop: "50px",
					paddingTop: "2px",
					paddingBottom: "20px",
					borderRadius: "10px",
					backgroundColor: "white",
					boxShadow: "#A5A5A5 2px 2px 5px",
				}}
			>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<AddCircleOutline />
					</Avatar>
					<Typography component="h1" variant="h5">
						Create a team project
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						{isError && (
							<Alert severity="error" sx={{ m: 5 }}>
								{errorMessage}
							</Alert>
						)}
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="projectName"
									required
									fullWidth
									id="projectName"
									label="Project name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="leaderName"
									label="Name of the leader"
									name="leaderName"
									autoComplete="family-name"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 5 }}
						>
							Create a project!
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="#" variant="body2" component={RouterLink} to="/">
									Already have a project? Open it here
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</main>
	);
}
