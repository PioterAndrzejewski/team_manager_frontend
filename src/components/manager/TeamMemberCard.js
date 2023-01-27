import React, { useEffect, useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

function TeamMemberCard({ teamMember }) {
	const { projectId, updateTeamMembers, teamMembers } = useTeam();
	const [removeId, setRemoveId] = useState(undefined);
	const { teamModalOpen, setTeamModalOpen, setModalMode, setTeamMemberToEdit } =
		useModal();

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post("http://127.0.0.1:3636/removemember", {
				projectId,
				removeMemberId: teamMember.memberId,
			});
			updateTeamMembers(response.data.projectMembers);
		};
		if (removeId != undefined) {
			handleFetch();
			setRemoveId(undefined);
		}
	}, [removeId]);

	const handleRemoveButton = (e) => {
		e.preventDefault();
		const confirm = prompt(
			`You are going to remove ${teamMember.memberName}. Are you sure? This action is irreversibikible.
			Please write "remove" to confirm`
		);
		if (confirm === "remove") {
			setRemoveId(teamMember.memberId);
		}
	};

	const handleEditButton = (e) => {
		e.preventDefault();
		setModalMode("edit");
		setTeamMemberToEdit({
			id: teamMember.memberId,
			name: teamMember.memberName,
		});
		setTeamModalOpen(true);
	};

	return (
		<Grid item key={teamMember} xs={12} sm={6} md={4}>
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
					image={teamMember.memberImageURL}
					alt="random"
				/>
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography gutterBottom variant="h5" component="h2">
						{teamMember.memberName}
					</Typography>
					<Typography>
						Assigned tasks: {teamMember.memberTasks.length}
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small">View tasks</Button>
					<Button size="small" onClick={handleEditButton}>
						Edit
					</Button>
					<Button size="small" color="error" onClick={handleRemoveButton}>
						Remove
					</Button>
				</CardActions>
			</Card>
		</Grid>
	);
}

export default TeamMemberCard;
