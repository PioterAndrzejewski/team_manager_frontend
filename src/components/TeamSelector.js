import * as React from "react";
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

export default function TeamSelector() {
	return (
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
					<ManageAccounts />
				</Avatar>
				<Typography component="h1" variant="h5">
					Open your team project
				</Typography>
				<Box component="form" noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Team Project ID"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Enter Project
					</Button>
					<Button
						type="submit"
						fullWidth
						variant="outlined"
						sx={{ mt: 3, mb: 2 }}
					>
						Create new Project!
					</Button>
					<Grid container>
						<Grid item>
							<Link href="#" variant="body2">
								{"Use last project: "}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
