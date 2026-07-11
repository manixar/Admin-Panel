import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
    type AxiosError,
} from 'axios';
import { tokenManager } from '@/lib/tokenManager';

const baseURL =
    import.meta.env.VITE_API_BASE_URL || 'https://admapi.karlino.ir';

export const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: 30000,
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenManager.getAccessToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // AGE TOO REFRESHIM , DARKHASTO BE SAF BEFREST
            if (isRefreshing) {
                return new Promise((resolve) => {
                    addRefreshSubscriber((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            isRefreshing = true;

            try {
                const refreshToken = tokenManager.getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                //ERSALE REQUESTE REFRESH
                const response = await axios.post(
                    `${baseURL}/api/auth/token/refresh`,
                    { refresh: refreshToken },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    }
                );

                const { accessToken } = response.data;

                // UPDATE ACCESS TOKEN
                tokenManager.updateAccessToken(accessToken);

                onRefreshed(accessToken);

                // REQUESTE JADID
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // AGE REFRESH SUCCESFUL NABOOD KARBARO KHAREJ KON
                refreshSubscribers = [];
                tokenManager.clearAll();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

//LOGOUT
export const logout = () => {
    tokenManager.clearAll();
    window.location.href = '/login';
};

//BARRESI AUTHORICATION
export const isAuthenticated = (): boolean => {
    return tokenManager.isTokenValid();
};

//DARYAFTE ETELAATE USER FELI
export const getCurrentUser = () => {
    return tokenManager.getUserData();
};

export default api;
