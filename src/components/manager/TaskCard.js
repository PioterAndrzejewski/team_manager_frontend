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

import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

function TaskCard(props) {
	const [editId, setEditId] = useState(undefined);
	const [mode, setMode] = useState(undefined);

	const { projectId, updateTasks } = useTeam();
	const { changeTaskToEdit, setEditTaskModalOpen, setModalMode } = useModal();
	const {
		taskId,
		taskName,
		taskDescription,
		taskDueDate,
		taskFinished,
		taskFinishedDate,
		taskAssignees,
	} = props.taskData;

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
		changeTaskToEdit({
			taskId,
			taskName,
			taskDescription,
			taskDueDate,
			taskFinished,
			taskFinishedDate,
		});
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
						Due date: {`${moment(taskDueDate).format("DD-MM-YYYY")}`}
					</Typography>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Finished date:{" "}
							{taskFinished
								? `${moment(taskFinishedDate).format("DD-MM-YYYY")}`
								: "Task is not finished yet"}
						</Typography>
					</Box>
					<Box>
						<Button
							size="small"
							sx={{
								transition: "0.02s",
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

					<Button
						size="medium"
						onClick={handleSetFinishButton}
						sx={{
							transition: "0.1s",
							"&:hover": {
								transform: "scale(115%)",
							},
						}}
					>
						<CheckCircleOutlineSharpIcon sx={{ m: "5px" }} />
						{taskFinished ? "UNFINISHED" : "FINISHED"}
					</Button>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default TaskCard;
