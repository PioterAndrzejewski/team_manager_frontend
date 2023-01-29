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

function TeamManager() {
	const { teamTasks } = useTeam();

	return (
		<>
			<main>
				<TaskModal />
				<EditTaskModal />
				<Box
					sx={{
						bgcolor: "background.paper",
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
								})}
					</Container>
				</Box>
				<Box
					sx={{
						bgcolor: "background.paper",
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

export default TeamManager;
