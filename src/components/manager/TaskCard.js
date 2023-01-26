import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardContent from "@mui/material/CardContent";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";

import TeamMemberCardSmall from "./TeamMemberCardSmall";
import TeamMemberNewCardSmall from "./TeamMemberNewCardSmall";

import { useTeam } from "../../context/teamContext";

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

	const { teamMembers } = useTeam();

	return (
		<Grid item xs={12} md={6} sx={{ flexGrow: 1, m: 1 }}>
			<Card sx={{ display: "flex" }}>
				<CardContent
					sx={{
						flex: 1,
						flexGrow: "grow",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Typography component="h2" variant="h5">
						{taskName}
					</Typography>
					<Typography variant="subtitle1">{`${taskDescription}`}</Typography>
					<Typography variant="caption" color="text.secondary">
						Due date: {`${taskDueDate}`}
					</Typography>
					<Box>
						<Typography variant="caption" color="text.secondary">
							Finished date:{" "}
							{taskFinished
								? `${taskFinishedDate}`
								: "Task is not finished yet"}
						</Typography>
					</Box>
					<Box>
						<Button size="small">Edit</Button>
						<Button size="small" color="error">
							Remove task
						</Button>
						<Button size="small">
							{taskFinished ? "Mark as unfinished" : "Mark as finished"}
						</Button>
					</Box>
				</CardContent>

				<CardContent
					sx={{
						display: "flex",
						flexGrow: 0,
						flexDirection: "column",
						justifyContent: "space-between",
						width: "30%",
					}}
				>
					<Box>
						<Typography component="span" variant="body2" color="text.secondary">
							Assignees
						</Typography>
						<Box sx={{ display: "flex" }}>
							{taskAssignees.map((assignee) => {
								return (
									<TeamMemberCardSmall
										teamMember={teamMembers.find(
											(teamMember) => teamMember.memberId === assignee
										)}
										key={assignee.memberId}
									/>
								);
							})}
							<TeamMemberNewCardSmall />
						</Box>
					</Box>

					<Button size="medium">
						<CheckCircleOutlineSharpIcon sx={{ m: "5px" }} />
						<Link color="inherit" noWrap variant="body2" href="github.com">
							{taskFinished ? "UNFINISHED" : "FINISHED"}
						</Link>
					</Button>
				</CardContent>
			</Card>
		</Grid>
	);
}

export default TaskCard;
