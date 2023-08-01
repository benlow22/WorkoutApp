import { useState } from "react";
import { ISession } from "../contexts/AuthProvider";
import { TError } from "../api/types";

// c
export function useRequest<TApiParams extends any[], TResponseData>(
	apiFunc: (
		...args: TApiParams
	) => Promise<{ data: TResponseData | null; error: TError }>
): [
	response: TResponseData | null,
	loading: boolean,
	error: TError,
	request: (...args: TApiParams) => Promise<void>
] {
	const [loading, setLoading] = useState(true);
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
			console.error("ERROR in UseRequest", e);
		} finally {
			setLoading(false);
		}
	};

	return [response, loading, error, request];
}
