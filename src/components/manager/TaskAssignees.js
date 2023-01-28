import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import PersonRemove from "@mui/icons-material/PersonRemove";

import TeamMemberCardSmall from "./TeamMemberCardSmall";
import TeamMemberNewCardSmall from "./TeamMemberNewCardSmall";
import NewAssigneeMenu from "./NewAssigneeMenu";

import { useAssignee } from "../../context/assigneeContext";
import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

function TaskAssignees({ taskId }) {
	const { projectId, updateTasks, teamMembers, teamTasks, updateTeamMembers } =
		useTeam();
	const { anchorEl, setAnchorEl } = useAssignee();

	const [removeAssigneeId, setRemoveAssigneeId] = useState(undefined);

	const { taskAssignees } = teamTasks[taskId];

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post("http://127.0.0.1:3636/task", {
				projectId,
				taskToEditId: taskId,
				assigneeToRemove: removeAssigneeId,
				mode: "removeassignee",
			});
			updateTasks(response.data.projectTasks);
			updateTeamMembers(response.data.projectMembers);
		};

		if (removeAssigneeId !== undefined) {
			handleFetch();
			setRemoveAssigneeId(undefined);
		}
	}, [removeAssigneeId]);

	const handleAddAssigneeClick = () => {};

	return (
		<CardContent
			sx={{
				display: "flex",
				flexGrow: 0,
				flexDirection: "column",
				justifyContent: "space-between",
				width: "30%",
			}}
		>
			<Box>
				<Typography component="span" variant="body2" color="text.secondary">
					Assignees
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
					}}
				>
					{taskAssignees.map((assigneeId) => {
						return (
							<Button
								key={assigneeId}
								sx={{
									color: "black",
									justifyContent: "flex-start",
								}}
								onClick={() => {
									setRemoveAssigneeId(assigneeId);
								}}
							>
								<PersonRemove sx={{ mr: "15px" }} />
								{teamMembers[assigneeId].memberName}
							</Button>
						);
					})}
				</Box>
			</Box>
			<NewAssigneeMenu taskId={taskId} />
			<Button
				size="medium"
				onClick={handleAddAssigneeClick}
				sx={{
					transition: "0.1s",
					"&:hover": {
						transform: "scale(115%)",
					},
				}}
			>
				<CheckCircleOutlineSharpIcon sx={{ m: "5px" }} />
				Add Assignee
			</Button>
		</CardContent>
	);
}

export default TaskAssignees;
