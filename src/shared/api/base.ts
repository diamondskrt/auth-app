import Cookies from 'js-cookie'
import { ofetch } from 'ofetch'

import { dataFormatter, TJsonApiBody } from '~/shared/lib/data-formatter'

import { HeadersInit, Meta } from './model'

class Api {
  private baseUrl: string = import.meta.env.VITE_BASE_URL
  private headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  private getAuthHeaders(): HeadersInit {
    const token = Cookies.get('auth-app/accessToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private async request<T>(
    endpoint: string,
    options: Omit<RequestInit, 'headers'> & { headers?: HeadersInit } = {},
    deserialize = false
  ): Promise<{ data: T; meta: Meta }> {
    const url = `${this.baseUrl}${endpoint}`
    const config = {
      ...options,
      headers: {
        ...this.headers,
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    }

    try {
      const res = await ofetch<{ data: T; meta: Meta }>(url, config)
      return {
        data: deserialize
          ? (dataFormatter.deserialize(res as TJsonApiBody) as T)
          : res?.data,
        meta: res?.meta,
      }
    } catch (error) {
      const errorMessage = (error as Error)?.message ?? 'Unknown error'
      throw new Error(errorMessage)
    }
  }

  public get<T>({
    endpoint,
    params,
    deserialize,
  }: {
    endpoint: string
    params?: Record<string, string>
    deserialize?: boolean
  }): Promise<{ data: T; meta: Meta }> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : ''
    return this.request<T>(
      `${endpoint}${queryString}`,
      { method: 'GET' },
      deserialize
    )
  }

  public post<T>(
    endpoint: string,
    body: unknown
  ): Promise<{ data: T; meta: Meta }> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
    })
  }

  public patch<T>(
    endpoint: string,
    body: unknown
  ): Promise<{ data: T; meta: Meta }> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
      },
    })
  }

  public delete<T>(endpoint: string): Promise<{ data: T; meta: Meta }> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      headers: {
        Accept: 'application/vnd.api+json',
      },
    })
  }
}

export const apiInstance = new Api()
