import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import TaskAssignees from "./TaskAssignees";

import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

function TaskCard({ taskId, finished, controls }) {
	const [editId, setEditId] = useState(undefined);
	const [mode, setMode] = useState(undefined);
	const [taskOverDue, setTaskOverDue] = useState(false);

	const { projectId, updateTasks, teamTasks, updateTeamMembers, HOST } =
		useTeam();
	const { setEditTaskModalOpen, setModalMode, changeTaskToEdit } = useModal();

	const taskToRender = teamTasks.find((task) => task.taskId === taskId);
	const {
		taskName,
		taskDescription,
		taskDueDate,
		taskFinished,
		taskFinishedDate,
	} = taskToRender;

	useEffect(() => {
		setTaskOverDue(moment() > moment(taskDueDate) && !taskFinished);
	}, []);

	useEffect(() => {
		const handleFetch = async () => {
			const response = await axios.post(`${HOST}/task`, {
				projectId,
				taskToEditId: taskId,
				mode,
				finishedDate: moment(),
			});
			if (!response.data.success) {
				return;
			}

			if (
				mode === "setfinished" ||
				mode === "setunfinished" ||
				mode === "edit"
			) {
				updateTasks(response.data.updatedTaskList);
				return;
			}

			if (
				mode === "addassignee" ||
				mode === "removeassignee" ||
				mode === "remove"
			) {
				updateTasks(response.data.updatedTaskList);
				updateTeamMembers(response.data.projectMembers);
			}
		};

		if (editId !== undefined) {
			handleFetch();
			setEditId(undefined);
		}
	}, [editId]);

	const handleEditButton = (e) => {
		changeTaskToEdit({
			taskId,
			taskName,
			taskDescription,
			taskDueDate,
			taskFinished,
			taskFinishedDate,
		});
		setModalMode("edit");
		setEditTaskModalOpen(true);
	};

	const handleRemoveButton = (e) => {
		const confirm = prompt(
			`You are going to remove task: "${taskName}". Are you sure? This action is irreversibikible.
			Please write "remove" to confirm`
		);
		if (confirm === "remove") {
			setMode("remove");
			setEditId(taskId);
		}
	};

	const handleSetFinishButton = (e) => {
		setEditId(taskId);
		if (taskFinished) {
			setMode("setunfinished");
			return;
		}
		setMode("setfinished");
	};

	return (
		<Grid item xs={12} md={6} sx={{ flexGrow: 1, m: 1 }}>
			<Card
				sx={{
					display: "flex",
					backgroundColor: taskOverDue && "#FFB09F",
					opacity: finished && 0.5,
				}}
			>
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
						Due date: {`${moment(taskDueDate).format("DD-MM-YYYY")}`}
					</Typography>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Finished date:{" "}
							{taskFinished
								? `${moment(taskFinishedDate).format("DD-MM-YYYY")}`
								: "Task is not finished yet"}
						</Typography>
						{taskOverDue && (
							<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
								This task is overdue
							</Typography>
						)}
					</Box>
					{controls && (
						<Box sx={{ mt: "10px" }}>
							<Button
								size="small"
								sx={{
									transition: "0.1s",
									backgroundColor: "white",
									boxShadow: "grey 1px 1px 3px",
									"&:hover": {
										transform: "scale(105%)",
										backgroundColor: "#e6f2ff",
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
									mx: "5px",
									transition: "0.1s",
									backgroundColor: "white",
									boxShadow: "grey 1px 1px 3px",
									"&:hover": {
										transform: "scale(105%)",
										backgroundColor: "#FFF4F4",
									},
								}}
							>
								Remove task
							</Button>
							<Button
								size="small"
								onClick={handleSetFinishButton}
								sx={{
									transition: "0.1s",
									backgroundColor: "white",
									boxShadow: "grey 1px 1px 3px",
									"&:hover": {
										transform: "scale(105%)",
										backgroundColor: "#e6f2ff",
									},
								}}
							>
								{taskFinished ? "Mark as unfinished" : "Mark as finished"}
							</Button>
						</Box>
					)}
				</CardContent>
				{!finished && (
					<TaskAssignees taskId={taskId} controls={controls}></TaskAssignees>
				)}
			</Card>
		</Grid>
	);
}

export default TaskCard;
