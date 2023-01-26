import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import SectionBar from "./SectionBar";
import TeamManager from "./TeamManager";
import TasksManager from "./TasksManager";
import TeamSettings from "./TeamSettings";

import { useError } from "../../context/errorContext";
import { useTeam } from "../../context/teamContext";
import { useNavigate } from "react-router-dom";

function ProjectManager() {
	const { setError } = useError();
	const { updateTeam } = useTeam();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProjectData = async () => {
			const projectId = localStorage.getItem("useProjectId");
			const response = await axios(
				`http://127.0.0.1:3636/project/${projectId}`
			);
			if (!response.data.projectExists) {
				console.log("no wchodzę do warunku");
				navigate("/");
				setError({
					is: true,
					message: response.data.message,
				});
				return;
			}
			setError({
				is: false,
				message: "",
			});
			localStorage.setItem("lastProjectId", projectId);
			updateTeam(response.data);
		};

		fetchProjectData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<SectionBar />
			<Routes>
				<Route path="team" element={<TeamManager />} />
				<Route path="tasks" element={<TasksManager />} />
				<Route path="settings" element={<TeamSettings />} />
			</Routes>
		</>
	);
}

export default ProjectManager;
