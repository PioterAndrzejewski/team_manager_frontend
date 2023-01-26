import React from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TaskCard from "./TaskCard";

import { useTeam } from "../../context/teamContext";

function TeamManager() {
	const { teamTasks } = useTeam();

	return (
		<>
			<main>
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
						{teamTasks
							.filter((task) => !task.taskFinished)
							.map((task) => {
								return <TaskCard taskData={task} />;
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
						{teamTasks
							.filter((task) => task.taskFinished)
							.map((task) => {
								return <TaskCard taskData={task} />;
							})}
					</Container>
				</Box>
			</main>
		</>
	);
}

export default TeamManager;
