import React from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TeamMemberCard from "./TeamMemberCard";
import TeamMemberNewCard from "./TeamMemberNewCard";

import { useTeam } from "../context/teamContext";

function TeamManager() {
	const { teamMembers } = useTeam();

	return (
		<>
			<main>
				<Box
					sx={{
						bgcolor: "background.paper",
						pt: 8,
						pb: 6,
					}}
				>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="text.primary"
							gutterBottom
						>
							Team members
						</Typography>
					</Container>
				</Box>
				<Container sx={{ py: 8 }} maxWidth="md">
					<Grid container spacing={4}>
						{teamMembers.map((teamMember) => (
							<TeamMemberCard
								teamMember={teamMember}
								addCard={false}
								key={teamMember.memberId}
							/>
						))}
						<TeamMemberNewCard />
					</Grid>
				</Container>
			</main>
		</>
	);
}

export default TeamManager;
