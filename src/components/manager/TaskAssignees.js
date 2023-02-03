import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import PersonRemove from "@mui/icons-material/PersonRemove";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import TeamMemberCardSmall from "./TeamMemberCardSmall";
import TeamMemberNewCardSmall from "./TeamMemberNewCardSmall";
import NewAssigneeMenu from "./NewAssigneeMenu";

import { useAssignee } from "../../context/assigneeContext";
import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

function TaskAssignees({ taskId, controls }) {
	const {
		projectId,
		updateTasks,
		teamMembers,
		teamTasks,
		updateTeamMembers,
		HOST,
	} = useTeam();
	const { anchorEl, setAnchorEl, setAnchorElId, anchorElId } = useAssignee();
	const [removeAssigneeId, setRemoveAssigneeId] = useState(undefined);

	const taskToRender = teamTasks.find((task) => task.taskId === taskId);
	const { taskAssignees } = taskToRender;

	const assigneeStyle = controls
		? {
				color: "black",
				justifyContent: "flex-start",
				transition: "0.1s",
				cursor: "pointer",
				"&:hover": {
					transform: "scale(105%)",
					backgroundColor: "#eedddd",
				},
		  }
		: {
				color: "black",
				justifyContent: "flex-start",
				cursor: "auto",
		  };

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post(`${HOST}/task`, {
				mode: "removeassignee",
				projectId,
				taskToEditId: taskId,
				assigneeToRemove: removeAssigneeId,
			});
			updateTasks(response.data.projectTasks);
			updateTeamMembers(response.data.projectMembers);
		};

		if (removeAssigneeId !== undefined) {
			handleFetch();
			setRemoveAssigneeId(undefined);
		}
	}, [removeAssigneeId]);

	const handleAddAssigneeClick = (e) => {
		setAnchorEl(e.target);
		setAnchorElId(taskId);
	};

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
					Assignees:
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-start",
					}}
				>
					{taskAssignees.map((assigneeId) => {
						const teamMemberToRender = teamMembers.find(
							(member) => member.memberId === assigneeId
						);
						return (
							<Button
								color="error"
								key={assigneeId}
								disabled={!controls}
								sx={assigneeStyle}
								onClick={() => {
									if (controls) {
										setRemoveAssigneeId(assigneeId);
									}
								}}
							>
								<CardMedia
									component="img"
									sx={{
										// 16:9
										mr: "15px",
										borderRadius: "50%",
										height: "40px",
										width: "40px",
									}}
									image={teamMemberToRender.memberImageURL}
									alt="random"
								/>

								{teamMemberToRender.memberName}
								{controls && <PersonRemove sx={{ ml: "15px" }} />}
							</Button>
						);
					})}
				</Box>
			</Box>
			{anchorElId === taskId && <NewAssigneeMenu taskId={taskId} />}
			{controls && (
				<Button
					size="medium"
					onClick={handleAddAssigneeClick}
					sx={{
						m: "5px",
						transition: "0.1s",
						"&:hover": {
							transform: "scale(105%)",
							backgroundColor: "#e6f2ff",
						},
					}}
				>
					<PersonAddIcon sx={{ m: "5px" }} />
					Add Assignee
				</Button>
			)}
		</CardContent>
	);
}

export default TaskAssignees;
