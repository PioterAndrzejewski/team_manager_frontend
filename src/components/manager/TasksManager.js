import React from "react";
import { useMemo } from "react";

import TaskCard from "./TaskCard";
import NewTaskCard from "./NewTaskCard";
import TaskModal from "./modals/TaskModal";
import EditTaskModal from "./modals/EditTaskModal";

import { useTeam } from "../../context/teamContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";

function TasksManager() {
	const { teamTasks } = useTeam();

	console.log("renderuje team manager");

	return (
		<>
			<main>
				<TaskModal />
				<EditTaskModal />
				<Box
					sx={{
						pt: 8,
						pb: 6,
					}}
				>
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						Current tasks:
					</Typography>
					<Container sx={{ py: 8 }} maxWidth="md">
						<NewTaskCard />
						{teamTasks &&
							teamTasks
								.filter((task) => !task.taskFinished)
								.map((task) => {
									return <TaskCard taskId={task.taskId} key={task.taskId} />;
								})
								.sort((a, b) => {
									if (moment(a.taskDueDate) > moment(b.taskDueDate)) {
										return 1;
									} else {
										return -1;
									}
								})}
					</Container>
				</Box>
				<Box
					sx={{
						pt: 8,
						pb: 6,
					}}
				>
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						Finished Tasks:
					</Typography>
					<Container sx={{ py: 8 }} maxWidth="md">
						{teamTasks &&
							teamTasks
								.filter((task) => task.taskFinished)
								.map((task) => {
									return <TaskCard taskId={task.taskId} key={task.taskId} />;
								})}
					</Container>
				</Box>
			</main>
		</>
	);
}

export default TasksManager;
