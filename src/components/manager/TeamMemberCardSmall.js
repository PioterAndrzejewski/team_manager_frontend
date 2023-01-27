import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useTeam } from "../../context/teamContext";

function TeamMemberCardSmall({ memberId }) {
	const { teamMembers } = useTeam();

	const memberIndex = teamMembers.findIndex((member) => member.id === memberId);

	return (
		<Grid
			item
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
						alt="random"
						sx={{ borderRadius: "50%" }}
						// image={teamMembers[memberIndex].memberImageURL}
					/>

					<Typography gutterBottom variant="caption" component="h4">
						{/* {teamMembers[memberIndex].memberName} */}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default TeamMemberCardSmall;
