import { useState } from "react";
import { ISession } from "../contexts/AuthProvider";
import { TError } from "../api/types";

// const useApiCall = (apiFunc: (...args: any[]) => Promise<any>) => {
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState<Error | null>(null);
// 	const [response, setResponse] = useState({});

// 	const request = async (...args) => {};
// };

export function useRequest<TApiParams extends any[], TResponseData>(
	apiFunc: (
		...args: TApiParams
	) => Promise<{ data: TResponseData | null; error: TError }>,
	session: ISession
): [
	response: TResponseData | null,
	loading: boolean,
	error: TError,
	request: (...args: TApiParams) => Promise<void>
] {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<TError>(null);
	const [response, setResponse] = useState<TResponseData | null>(null);

	const request = async (...args: TApiParams) => {
		try {
			setLoading(true);
			setError(null);
			const { data, error } = await apiFunc(...args);
			if (error) {
				throw error;
			}
			setResponse(data);
		} catch (e) {
			// @ts-expect-error
			setError(e);
			// @ts-expect-error
			console.error("ERRRRPR", e.cause);
		} finally {
			setLoading(false);
		}
	};

	return [response, loading, error, request];
}
