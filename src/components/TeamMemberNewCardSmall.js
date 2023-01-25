import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function TeamMemberNewCardSmall() {
	return (
		<Grid item sx={{}}>
			<Card
				sx={{
					display: "flex",
					boxShadow: "0",
				}}
			>
				<CardContent sx={{ border: "none" }}>
					<Box
						sx={{
							width: "35px",
							height: "35px",
							backgroundColor: "gray",
							borderRadius: "50%",
							textAlign: "center",
							color: "white",
							lineHeight: "35px",
							fontSize: "20px",
						}}
					>
						?
					</Box>
					<Typography gutterBottom variant="caption" component="h4">
						Add
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default TeamMemberNewCardSmall;
