import { useQuery as rqUseQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

// Small wrapper in case we want to centralize defaults later.
export const useAppQuery = <TData = unknown, TError = Error>(
    options: UseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> => {
    return rqUseQuery(options);
};

export default useAppQuery;
