import React from "react";

import Chrono from "./Chrono";
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

	return (
		<>
			<Typography
				component="h4"
				variant="h4"
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
		</>
	);
}

export default Home;
