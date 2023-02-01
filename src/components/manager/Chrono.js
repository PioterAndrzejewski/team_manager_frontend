import React from "react";
import { Chrono } from "react-chrono";
import moment from "moment";

import { useTeam } from "../../context/teamContext";

const ChronoComponent = () => {
	const { teamTasks } = useTeam();

	const items = teamTasks
		.filter((task) => !task.taskFinished)
		.sort((taskA, taskB) => {
			if (moment(taskA.taskDueDate) > moment(taskB.taskDueDate)) {
				return 1;
			} else {
				return -1;
			}
		})
		.map((task) => {
			return {
				title: moment(task.taskDueDate).format("DD-MM-YYYY"),
				cardTitle: task.taskName,
				cardSubtitle: task.taskDescription,
			};
		});

	return (
		<Chrono
			items={items}
			mode="HORIZONTAL"
			key={Math.random() * 1000}
			allowDynamicUpdate={true}
			itemWidth="250"
			showAllCardsHorizontal={true}
			theme={{
				primary: "#253E66",
				secondary: "white",
			}}
		/>
	);
};

export default ChronoComponent;
