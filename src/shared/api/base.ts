import { ofetch } from 'ofetch'

class Api {
  private baseUrl: string = import.meta.env.VITE_BASE_URL
  private headers: HeadersInit = { 'Content-Type': 'application/json' }

  private getAuthHeaders(): HeadersInit {
    const token = ''
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      headers: {
        ...this.headers,
        ...this.getAuthHeaders(),
      },
      ...options,
    }

    try {
      return await ofetch<T>(url, config)
    } catch (error) {
      throw Error((error as Error).message)
    }
  }

  public get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' })
  }

  public post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  public put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    })
  }

  public delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const apiInstance = new Api()
