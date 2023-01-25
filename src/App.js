import React from "react";

import Header from "./components/Header";
import ProjectSelector from "./components/ProjectSelector";
import CreateProject from "./components/CreateProject";
import Copyright from "./components/Copyright";
import ProjectManager from "./components/ProjectManager";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Header title="Team Manager" />
				<ProjectSelector />
				<CreateProject />
				<ProjectManager />
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</ThemeProvider>
		</div>
	);
}

export default App;
