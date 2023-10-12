export interface IHttpHook {
  loading: boolean;
  error: string | null;
  request: (
    url: string,
    method?: string,
    body?: any,
    headers?: Record<string, string>
  ) => Promise<any>;
  clearError: () => void;
}