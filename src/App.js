import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ProjectSelector from "./components/ProjectSelector";
import CreateProject from "./components/CreateProject";
import Copyright from "./components/Copyright";
import ProjectManager from "./components/manager/ProjectManager";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<header>
					<Header title="Team Manager" />
				</header>
				<Routes>
					<Route path="/" element={<ProjectSelector />} />
					<Route path="createproject" element={<CreateProject />} />
					<Route path="manager/*" element={<ProjectManager />} />
				</Routes>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</ThemeProvider>
		</div>
	);
}

export default App;
