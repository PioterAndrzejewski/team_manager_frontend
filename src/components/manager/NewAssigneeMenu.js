import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { useAssignee } from "../../context/assigneeContext";
import { useTeam } from "../../context/teamContext";

export default function NewAssigneeMenu({ taskId }) {
	const { teamMembers, teamTasks, updateTeamMembers, updateTasks, projectId } =
		useTeam();
	const { anchorEl, setAnchorEl } = useAssignee();

	const [assigneeToAdd, setAssigneeToAdd] = useState(undefined);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post("http://127.0.0.1:3636/task", {
				mode: "addassignee",
				projectId,
				taskId,
				memberId: assigneeToAdd,
			});
			updateTeamMembers(response.data.projectMembers);
			updateTasks(response.data.projectTasks);
		};

		if (assigneeToAdd !== undefined) {
			handleFetch();
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
						let memberIsNotAssignee = true;
						teamTasks[taskId].taskAssignees.forEach((assigneeId) => {
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
								{teamMember.memberName}
							</MenuItem>
						);
					})}
			</Menu>
		</div>
	);
}
