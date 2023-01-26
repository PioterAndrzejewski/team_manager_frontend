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
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
	const navigate = useNavigate();

	const [formEntries, setFormEntries] = useState(undefined);

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
		console.log("robie useefekt");
		console.log(formEntries);
		const fetchCreateProject = async () => {
			const response = await axios.post(
				"http://127.0.0.1:3636/createproject",
				formEntries
			);
			console.log(response.data);
			if (response.data.creationSuccess) {
				localStorage.setItem("lastProjectId", response.data.projectId);
				localStorage.setItem("lastProjectName", response.data.projectName);
				navigate("/manager");
			}
		};

		if (formEntries !== undefined) {
			console.log("przechodzę warunek");
			fetchCreateProject();
		}
	}, [formEntries]);

	return (
		<main>
			<Container component="main" maxWidth="xs">
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
							sx={{ mt: 3, mb: 2 }}
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
