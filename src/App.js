import React from "react";
import TeamSelector from "./components/TeamSelector";
import Header from "./components/Header";
import Copyright from "./components/Copyright";
import CreateProject from "./components/CreateProject";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Header title="Team Manager" />
				<TeamSelector />
				<CreateProject />
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</ThemeProvider>
		</div>
	);
}

export default App;
