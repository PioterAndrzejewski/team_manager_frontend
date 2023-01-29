import React from "react";

import TaskCard from "./TaskCard";
import NewTaskCard from "./NewTaskCard";
import TaskModal from "./modals/TaskModal";
import EditTaskModal from "./modals/EditTaskModal";

import { useTeam } from "../../context/teamContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";

function Home() {
	const { teamTasks } = useTeam();

	console.log("renderuje team manager");

	return (
		<>
			<main>
				<TaskModal />
				<Typography
					component="h2"
					variant="h2"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Stats:
				</Typography>
				<Typography
					component="h5"
					variant="h5"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Total tasks: {teamTasks.length}
				</Typography>
				<Typography
					component="h5"
					variant="h5"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Finished Tasks: {teamTasks.filter((task) => task.taskFinished).length}
				</Typography>
				<Typography
					component="h5"
					variant="h5"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Finished Tasks: {teamTasks.filter((task) => task.taskFinished).length}
				</Typography>
				<Typography
					component="h2"
					variant="h2"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Overdue tasks:
				</Typography>

				<Container sx={{ py: 8 }} maxWidth="md">
					{teamTasks &&
						teamTasks
							.filter(
								(task) =>
									!task.taskFinished && moment() > moment(task.taskDueDate)
							)
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
			</main>
		</>
	);
}

export default Home;
