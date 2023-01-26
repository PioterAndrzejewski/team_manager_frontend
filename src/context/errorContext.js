import { createContext, useContext, useState } from "react";

const ErrorContext = createContext(undefined);

export const ErrorProvider = ({ children }) => {
	const [error, setError] = useState({ is: false, message: "" });

	return (
		<ErrorContext.Provider
			value={{
				error,
				setError,
			}}
		>
			{children}
		</ErrorContext.Provider>
	);
};

export const useError = () => useContext(ErrorContext);
