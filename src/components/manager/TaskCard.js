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

import TeamMemberCardSmall from "./TeamMemberCardSmall";
import TeamMemberNewCardSmall from "./TeamMemberNewCardSmall";
import NewAssigneeMenu from "./NewAssigneeMenu";
import TaskAssignees from "./TaskAssignees";

import { useAssignee } from "../../context/assigneeContext";
import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

function TaskCard({ taskId }) {
	const [editId, setEditId] = useState(undefined);
	const [mode, setMode] = useState(undefined);

	const { projectId, updateTasks, teamTasks } = useTeam();
	const { setEditTaskModalOpen, setModalMode } = useModal();

	const {
		taskName,
		taskDescription,
		taskAssignees,
		taskDueDate,
		taskFinished,
		taskFinishedDate,
	} = teamTasks[taskId];

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post("http://127.0.0.1:3636/task", {
				projectId,
				taskToEditId: taskId,
				mode,
				finishedDate: moment(),
			});
			updateTasks(response.data.updatedTaskList);
		};

		if (editId != undefined) {
			handleFetch();
			setEditId(undefined);
		}
	}, [editId]);

	const handleEditButton = (e) => {
		setModalMode("edit");
		setEditTaskModalOpen(true);
	};

	const handleRemoveButton = (e) => {
		const confirm = prompt(
			`You are going to remove task: "${teamTasks[taskId].taskName}". Are you sure? This action is irreversibikible.
			Please write "remove" to confirm`
		);
		if (confirm === "remove") {
			setMode("remove");
			setEditId(taskId);
		}
	};

	const handleSetFinishButton = (e) => {
		setEditId(taskId);
		if (teamTasks[taskId].taskFinished) {
			setMode("setunfinished");
			return;
		}
		setMode("setfinished");
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
					<Typography component="h2" variant="h5">
						{taskName}
					</Typography>
					<Typography variant="subtitle1">{`${taskDescription}`}</Typography>
					<Typography variant="caption" color="text.secondary">
						Due date:{" "}
						{`${moment(teamTasks[taskId].taskDueDate).format("DD-MM-YYYY")}`}
					</Typography>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Finished date:{" "}
							{teamTasks[taskId].taskFinished
								? `${moment(teamTasks[taskId].taskFinishedDate).format(
										"DD-MM-YYYY"
								  )}`
								: "Task is not finished yet"}
						</Typography>
					</Box>
					<Box>
						<Button
							size="small"
							sx={{
								transition: "0.2s",
								"&:hover": {
									transform: "scale(110%)",
									backgroundColor: "#DDEDF0",
								},
							}}
							onClick={handleEditButton}
						>
							Edit
						</Button>
						<Button
							size="small"
							color="error"
							onClick={handleRemoveButton}
							sx={{
								transition: "0.02s",
								"&:hover": {
									transform: "scale(110%)",
									backgroundColor: "#DDEDF0",
								},
							}}
						>
							Remove task
						</Button>
						<Button
							size="small"
							onClick={handleSetFinishButton}
							sx={{
								transition: "0.02s",
								"&:hover": {
									transform: "scale(110%)",
									backgroundColor: "#DDEDF0",
								},
							}}
						>
							{teamTasks[taskId].taskFinished
								? "Mark as unfinished"
								: "Mark as finished"}
						</Button>
					</Box>
				</CardContent>
				<TaskAssignees taskId={taskId}></TaskAssignees>
			</Card>
		</Grid>
	);
}

export default TaskCard;
