import moment from "moment/moment";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AssigneeContext = createContext(undefined);

export const AssigneeProvider = ({ children }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	return (
		<AssigneeContext.Provider
			value={{
				anchorEl,
				setAnchorEl,
			}}
		>
			{children}
		</AssigneeContext.Provider>
	);
};

export const useAssignee = () => useContext(AssigneeContext);
