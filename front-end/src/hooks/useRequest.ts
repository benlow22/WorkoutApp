import { useState } from "react";

// const useApiCall = (apiFunc: (...args: any[]) => Promise<any>) => {
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState<Error | null>(null);
// 	const [response, setResponse] = useState({});

// 	const request = async (...args) => {};
// };

export function useRequest<TApiParams extends any[], TResponseData>(
	apiFunc: (...args: TApiParams) => Promise<TResponseData>
): [
	response: TResponseData | null,
	loading: boolean,
	error: Error | null,
	request: (...args: TApiParams) => Promise<void>
] {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [response, setResponse] = useState<TResponseData | null>(null);

	const request = async (...args: TApiParams) => {
		try {
			setLoading(true);
			setError(null);
			const responseData = await apiFunc(...args);
			setResponse(responseData);
			setLoading(false);
		} catch (e) {
			// @ts-expect-error
			setError(e);
		}
	};

	return [response, loading, error, request];
}
