import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function TeamMemberCardSmall({ teamMember }) {
	return (
		<Grid
			item
			key={teamMember}
			sx={{
				width: "60px",
			}}
		>
			<Card
				sx={{
					display: "flex",
					boxShadow: "0",
				}}
			>
				<CardContent sx={{ border: "none" }}>
					<CardMedia
						component="img"
						image={teamMember.memberImageURL}
						alt="random"
						sx={{ borderRadius: "50%" }}
					/>

					<Typography gutterBottom variant="caption" component="h4">
						{teamMember.memberName}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default TeamMemberCardSmall;
