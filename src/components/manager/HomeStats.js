import React from "react";

import TaskCard from "./TaskCard";

import { useTeam } from "../../context/teamContext";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";

function Home() {
	const { teamTasks } = useTeam();

	return (
		<>
			<Typography
				component="h5"
				variant="h5"
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
							return (
								<TaskCard
									taskId={task.taskId}
									key={task.taskId}
									controls={false}
								/>
							);
						})
						.sort((a, b) => {
							if (moment(a.taskDueDate) > moment(b.taskDueDate)) {
								return 1;
							} else {
								return -1;
							}
						})}
			</Container>
			<Container sx={{ py: 2 }} maxWidth="md">
				<Typography
					component="h5"
					variant="h5"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Last finished task:
				</Typography>
				{teamTasks &&
					teamTasks
						.filter((task) => task.taskFinished)
						.sort((a, b) => {
							if (moment(a.taskFinishedDate) > moment(b.taskFinishedDate)) {
								return -1;
							} else {
								return 1;
							}
						})
						.map((task, index) => {
							if (index === 0) {
								return (
									<TaskCard
										taskId={task.taskId}
										key={task.taskId}
										finished={true}
										controls={true}
									/>
								);
							}
						})}
				<Typography
					component="h5"
					variant="h5"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Stats:
				</Typography>
				<Typography
					component="h6"
					variant="h6"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Total tasks: {teamTasks.length}
				</Typography>
				<Typography
					component="h6"
					variant="h6"
					align="center"
					color="text.primary"
					gutterBottom
				>
					Finished Tasks: {teamTasks.filter((task) => task.taskFinished).length}
				</Typography>
			</Container>
		</>
	);
}

export default Home;
