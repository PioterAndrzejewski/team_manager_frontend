import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function TeamMemberNewCard() {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card
				sx={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<CardMedia
					component="img"
					sx={{
						// 16:9
						pt: "0",
					}}
					image="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Blank_square.svg/2048px-Blank_square.svg.png"
					alt="random"
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography gutterBottom variant="h5" component="h2">
						Add new member
					</Typography>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Grid>
	);
}

export default TeamMemberNewCard;
