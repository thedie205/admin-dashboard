import { api } from "./Axios";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Generic paginated GET against json-server, which supports
 * ?_page=1&_limit=10 and returns the total count in the
 * "X-Total-Count" response header.
 */
export async function fetchPaginated<T>(
  resource: string,
  page: number,
  limit: number,
  extraParams: Record<string, string | number> = {}
): Promise<PaginatedResult<T>> {
  const response = await api.get<T[]>(`/${resource}`, {
    params: { _page: page, _limit: limit, ...extraParams },
  });

  const total = Number(response.headers["x-total-count"] ?? response.data.length);

  return {
    data: response.data,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}