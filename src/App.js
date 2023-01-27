import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import ProjectSelector from "./components/ProjectSelector";
import CreateProject from "./components/CreateProject";
import Copyright from "./components/Copyright";
import ProjectManager from "./components/manager/ProjectManager";
import CssBaseline from "@mui/material/CssBaseline";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ErrorProvider } from "./context/errorContext";
import { TeamProvider } from "./context/teamContext";
import { ModalProvider } from "./context/modalContext";

const themeLight = createTheme({
	palette: {
		background: {
			default: "#eaeaea",
		},
	},
});

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={themeLight}>
				<ErrorProvider>
					<CssBaseline />
					<header>
						<Header title="Team Manager" />
					</header>
					<main>
						<TeamProvider>
							<ModalProvider>
								<Routes>
									<Route path="/" element={<ProjectSelector />} />
									<Route path="createproject" element={<CreateProject />} />

									<Route path="manager/*" element={<ProjectManager />} />
								</Routes>
							</ModalProvider>
						</TeamProvider>
					</main>
					<footer>
						<Copyright sx={{ mt: 8, mb: 4 }} />
					</footer>
				</ErrorProvider>
			</ThemeProvider>
		</div>
	);
}

export default App;
