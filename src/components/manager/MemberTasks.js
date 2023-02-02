import React from "react";
import { useParams } from "react-router";

import TaskCard from "./TaskCard";
import NewTaskCard from "./NewTaskCard";
import EditTaskModal from "./modals/EditTaskModal";

import { useTeam } from "../../context/teamContext";
import { useModal } from "../../context/modalContext";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import moment from "moment";

function MemberTasks() {
	const { teamTasks, teamMembers } = useTeam();
	const { editTaskModalOpen, taskModalOpen } = useModal();
	const { id } = useParams();
	const memberToRender = teamMembers.find(
		(member) => member.memberId === parseInt(id)
	);
	return (
		<>
			<main>
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
						Tasks of {memberToRender.memberName}
					</Typography>
					<Container sx={{ py: 8 }} maxWidth="md">
						{teamTasks &&
							teamTasks
								.filter((task) => task.taskAssignees.includes(parseInt(id)))
								.map((task) => {
									return (
										<TaskCard
											taskId={task.taskId}
											key={task.taskId}
											controls={false}
										/>
									);
								})}
					</Container>
				</Box>
			</main>
		</>
	);
}

export default MemberTasks;
