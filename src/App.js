import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ProjectSelector from "./components/ProjectSelector";
import CreateProject from "./components/CreateProject";
import Copyright from "./components/Copyright";
import ProjectManager from "./components/manager/ProjectManager";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ErrorProvider } from "./context/errorContext";
const theme = createTheme();

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<ErrorProvider>
					<header>
						<Header title="Team Manager" />
					</header>
					<Routes>
						<Route path="/" element={<ProjectSelector />} />
						<Route path="createproject" element={<CreateProject />} />
						<Route path="manager/*" element={<ProjectManager />} />
					</Routes>
					<Copyright sx={{ mt: 8, mb: 4 }} />
				</ErrorProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
