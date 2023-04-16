import useSWR from 'swr';

export const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res: Response) => res.json());

export const useCustomSWR = (url: string) => {
    const { data, error, mutate } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading: !data && !error,
        mutate
    };
};

export const useCustomSWRWithArgs = (url: string, searchQuery: any, pages: number) => {
    const { data, error, mutate } = useSWR(`${url}?q=${searchQuery}&page=${pages}`, fetcher);

    return {
        data,
        error,
        isLoading: !data && !error,
        mutate
    };
};