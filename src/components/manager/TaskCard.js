import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";

import TeamMemberCardSmall from "./TeamMemberCardSmall";
import TeamMemberNewCardSmall from "./TeamMemberNewCardSmall";

import { useTeam } from "../../context/teamContext";

function TaskCard(props) {
	const {
		taskId,
		taskName,
		taskDescription,
		taskDueDate,
		taskFinished,
		taskFinishedDate,
		taskAssignees,
	} = props.taskData;

	const [removeId, setRemoveId] = useState(undefined);

	const { teamMembers, projectId, updateTasks } = useTeam();

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post("http://127.0.0.1:3636/task", {
				projectId,
				taskToRemoveId: taskId,
				mode: "remove",
			});
			updateTasks(response.data.updatedTaskList);
		};

		if (removeId != undefined) {
			handleFetch();
			setRemoveId(undefined);
		}
	}, [removeId]);

	const handleRemoveButton = (e) => {
		e.preventDefault();
		const confirm = prompt(
			`You are going to remove task: "${taskName}". Are you sure? This action is irreversibikible.
			Please write "remove" to confirm`
		);
		if (confirm === "remove") {
			setRemoveId(taskId);
		}
	};

	return (
		<Grid item xs={12} md={6} sx={{ flexGrow: 1, m: 1 }}>
			<Card sx={{ display: "flex" }}>
				<CardContent
					sx={{
						flex: 1,
						flexGrow: "grow",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Typography compon`ent="h2" variant="h5">
						{taskName}
					</Typography>
					<Typography variant="subtitle1">{`${taskDescription}`}</Typography>
					<Typography variant="caption" color="text.secondary">
						Due date: {`${taskDueDate}`}
					</Typography>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Finished date:{" "}
							{taskFinished
								? `${taskFinishedDate}`
								: "Task is not finished yet"}
						</Typography>
					</Box>
					<Box>
						<Button size="small">Edit</Button>
						<Button size="small" color="error" onClick={handleRemoveButton}>
							Remove task
						</Button>
						<Button size="small">
							{taskFinished ? "Mark as unfinished" : "Mark as finished"}
						</Button>
					</Box>
				</CardContent>

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
						<Box sx={{ display: "flex" }}>
							{taskAssignees.map((assignee) => {
								return (
									<TeamMemberCardSmall
										teamMemberId={assignee.memberId}
										key={assignee.memberId}
									/>
								);
							})}
							<TeamMemberNewCardSmall />
						</Box>
					</Box>

					<Button size="medium">
						<CheckCircleOutlineSharpIcon sx={{ m: "5px" }} />
						<Link color="inherit" noWrap variant="body2" href="github.com">
							{taskFinished ? "UNFINISHED" : "FINISHED"}
						</Link>
					</Button>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default TaskCard;
