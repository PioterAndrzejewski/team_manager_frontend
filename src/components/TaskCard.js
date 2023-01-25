import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";

function TaskCard(props) {
	const {
		taskId,
		taskName,
		taskDescription,
		taskDueDate,
		taskFinished,
		taskFinishedDate,
		taskAssignees,
	} = props.taskData;
	return (
		<Grid item xs={12} md={6} sx={{ flexGrow: 1 }}>
			<Card sx={{ display: "flex" }}>
				<CardContent sx={{ flex: 1 }}>
					<Typography component="h2" variant="h5">
						{taskName}
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						{taskDescription}
					</Typography>
					<Typography variant="subtitle1" paragraph>
						Due date: {taskDueDate.toLocaleDateString()}
					</Typography>
					<Button size="small">Edit</Button>
					<Button size="small" color="error">
						Remove task
					</Button>
					<Button size="small">Mark as finished</Button>
				</CardContent>

				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Box sx={{ flexGrow: "grow" }}>
						<Typography
							component="span"
							variant="body2"
							color="text.secondary"
							align="center"
						>
							Assignees
						</Typography>
					</Box>

					<Button size="medium">
						<CheckCircleOutlineSharpIcon sx={{ m: "5px" }} />
						<Link color="inherit" noWrap variant="body2" href="github.com">
							Mark as finished
						</Link>
					</Button>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default TaskCard;
