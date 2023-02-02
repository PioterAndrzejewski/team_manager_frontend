import React, { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TeamMemberCard from "./TeamMemberCard";
import TeamMemberNewCard from "./TeamMemberNewCard";
import TeamMemberModal from "./modals/TeamMemberModal";

import { useTeam } from "../../context/teamContext";

function TeamManager() {
	const { teamMembers } = useTeam();
	return (
		<>
			<main>
				<TeamMemberModal />

				<Box
					sx={{
						pt: 0.5,
						pb: 0.5,
					}}
				>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h3"
							align="center"
							color="text.primary"
							gutterBottom
						>
							Your team
						</Typography>
					</Container>
				</Box>
				<Container sx={{ py: 8 }} maxWidth="md">
					<Grid container spacing={4}>
						{teamMembers &&
							teamMembers.map((teamMember) => (
								<TeamMemberCard
									teamMember={teamMember}
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
