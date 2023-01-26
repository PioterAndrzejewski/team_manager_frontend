import React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import avatar from "../../images/avatar.jpg";

function TeamMemberNewCard() {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card
				sx={{
					height: "100%",
					display: "flex",
					flexDirection: "column",
					cursor: "pointer",
					transition: "0.15s ease",
					"&:hover": {
						transform: "scale(104%)",
					},
				}}
			>
				<CardMedia
					component="img"
					sx={{
						// 16:9
						pt: "0",
					}}
					src={avatar}
					alt="empty avatar"
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
