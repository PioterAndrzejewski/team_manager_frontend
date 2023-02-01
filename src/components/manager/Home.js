import React from "react";

import Chrono from "./Chrono";
import TaskCard from "./TaskCard";
import NewTaskCard from "./NewTaskCard";
import TaskModal from "./modals/TaskModal";
import HomeStats from "./HomeStats";
import EditTaskModal from "./modals/EditTaskModal";
import { useTeam } from "../../context/teamContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";

function Home() {
	const { teamTasks } = useTeam();

	return (
		<>
			<TaskModal />
			<Container sx={{ py: 8 }} maxWidth="md">
				<Chrono />
			</Container>
			<main>
				<Typography
					component="h4"
					variant="h4"
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
				<HomeStats />
			</main>
		</>
	);
}

export default Home;
