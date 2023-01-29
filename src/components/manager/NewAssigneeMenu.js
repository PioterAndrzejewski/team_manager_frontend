import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

import { useAssignee } from "../../context/assigneeContext";
import { useTeam } from "../../context/teamContext";

export default function NewAssigneeMenu({ taskId }) {
	const { teamMembers, teamTasks, updateTeamMembers, updateTasks, projectId } =
		useTeam();
	const { anchorEl, setAnchorEl, anchorElId, setAnchorElId } = useAssignee();

	const [assigneeToAdd, setAssigneeToAdd] = useState(undefined);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(undefined);
		setAnchorElId(undefined);
	};

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post("http://127.0.0.1:3636/task", {
				mode: "addassignee",
				projectId,
				taskToEditId: taskId,
				memberId: assigneeToAdd,
			});
			await updateTasks(response.data.projectTasks);
			await updateTeamMembers(response.data.projectMembers);
		};

		if (assigneeToAdd !== undefined) {
			handleFetch();
			setAssigneeToAdd(undefined);
		}
	}, [assigneeToAdd]);
	return (
		<div>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				sx={{ padding: "10px" }}
			>
				<Typography sx={{ padding: "5px" }}>Add Assignee: </Typography>
				{teamMembers
					.filter((member) => {
						const taskToRender = teamTasks.find(
							(task) => task.taskId === taskId
						);
						let memberIsNotAssignee = true;
						taskToRender.taskAssignees.forEach((assigneeId) => {
							if (assigneeId === member.memberId) {
								memberIsNotAssignee = false;
							}
						});
						return memberIsNotAssignee;
					})
					.map((teamMember) => {
						return (
							<MenuItem
								onClick={() => {
									setAssigneeToAdd(teamMember.memberId);
								}}
								key={teamMember.memberId}
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
									image={teamMember.memberImageURL}
									alt="random"
								/>
								{teamMember.memberName}
							</MenuItem>
						);
					})}
			</Menu>
		</div>
	);
}
