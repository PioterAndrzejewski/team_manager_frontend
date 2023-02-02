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
				<HomeStats />
			</main>
		</>
	);
}

export default Home;
