import * as React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import CardMedia from "@mui/material/CardMedia";

import logo from "../images/logo.png";

import { Link as RouterLink } from "react-router-dom";

import { useError } from "../context/errorContext";

import { useNavigate } from "react-router-dom";

export default function ProjectSelector() {
	const [lastProject, setLastProject] = useState({
		lastProjectId: null,
		lastProjectName: null,
	});
	const [inputValue, setInputValue] = useState("");

	const { error, setError } = useError();
	const navigate = useNavigate();

	useEffect(() => {
		const lastProjectId = localStorage.getItem("lastProjectId");
		const lastProjectName = localStorage.getItem("lastProjectName");
		setLastProject({ lastProjectId, lastProjectName });
	}, []);

	const handleChange = (e) => {
		setInputValue(e.target.value.replace(/[^0-9]/g, ""));
	};

	const handleButton = (e) => {
		e.preventDefault();
		if (inputValue.length < 4) {
			setError({ is: true, message: "ID has at least 4 digits" });
			return;
		}
		setError({ is: false, message: "" });
		localStorage.setItem("useProjectId", inputValue);
		navigate("/manager/");
	};

	const handleLinkClick = () => {
		localStorage.setItem("useProjectId", localStorage.getItem("lastProjectId"));
		navigate("/manager/");
	};

	return (
		<main>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						p: "25px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						borderRadius: "10px",
						backgroundColor: "white",
						boxShadow: "#A5A5A5 2px 2px 5px",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<ManageAccounts />
					</Avatar>
					<Typography component="h1" variant="h5">
						Open existing project
					</Typography>
					{error.is && (
						<Alert severity="error" sx={{ m: 5 }}>
							{error.message}
						</Alert>
					)}
					<Box component="form" noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="projectId"
							label="Team Project ID"
							name="projectId"
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
							Open up
						</Button>
						<Button
							type="submit"
							fullWidth
							variant="outlined"
							sx={{ mt: 3, mb: 2 }}
							component={RouterLink}
							to="/createproject"
						>
							Create new Project
						</Button>
						<Grid container>
							<Grid item>
								{lastProject.lastProjectName == null ? (
									<Typography
										component="span"
										variant="body2"
										color="text.secondary"
										align="center"
									>
										Open up a project and find a shortcut here next time.
									</Typography>
								) : (
									<>
										<Typography variant="body2">Last project:</Typography>
										<Link
											onClick={handleLinkClick}
											variant="body2"
											sx={{
												cursor: "pointer",
											}}
										>
											{lastProject.lastProjectName}
										</Link>
									</>
								)}
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</main>
	);
}
