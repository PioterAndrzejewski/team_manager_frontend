import React from "react";

import TaskCard from "./TaskCard";
import NewTaskCard from "./NewTaskCard";
import TaskModal from "./modals/TaskModal";
import EditTaskModal from "./modals/EditTaskModal";

import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";

function TasksManager() {
	const { teamTasks } = useTeam();
	const { editTaskModalOpen, taskModalOpen } = useModal();

	return (
		<>
			<main>
				{taskModalOpen && <TaskModal />}
				{editTaskModalOpen && <EditTaskModal />}
				<Box
					sx={{
						pt: 8,
					}}
				>
					<Typography
						component="h3"
						variant="h3"
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
								.sort((a, b) => {
									if (moment(a.taskDueDate) > moment(b.taskDueDate)) {
										return 1;
									} else {
										return -1;
									}
								})
								.filter((task) => !task.taskFinished)
								.map((task) => {
									return (
										<TaskCard
											taskId={task.taskId}
											key={task.taskId}
											finished={false}
											controls={true}
										/>
									);
								})}
					</Container>
				</Box>
				<Box
					sx={{
						pb: 6,
					}}
				>
					<Typography
						component="h4"
						variant="h4"
						align="center"
						color="text.primary"
						gutterBottom
					>
						Finished Tasks:
					</Typography>
					<Container sx={{ py: 2 }} maxWidth="md">
						{teamTasks &&
							teamTasks
								.filter((task) => task.taskFinished)
								.map((task) => {
									return (
										<TaskCard
											taskId={task.taskId}
											key={task.taskId}
											finished={true}
											controls={true}
										/>
									);
								})
								.sort((a, b) => {
									if (moment(a.taskFinishedDate) > moment(b.taskFinishedDate)) {
										return 1;
									} else {
										return -1;
									}
								})}
					</Container>
				</Box>
			</main>
		</>
	);
}

export default TasksManager;
