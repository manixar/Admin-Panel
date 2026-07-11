import api from './axios';
import { tokenManager } from '@/lib/tokenManager';
import type { UserData } from '@/lib/tokenManager';

export interface SendOtpRequest {
    phoneNumber: string;
    password: string;
}

export interface SendOtpResponse {
    message?: string;
}

export interface VerifyOtpRequest {
    phoneNumber: string;
    otp: string;
}

export interface VerifyOtpResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    exp: number;
    isNewUser: boolean;
    adminId: number;
    firstName: string;
    lastName: string;
    email: string;
    acl: number;
    isSuperAdmin: boolean;
    phoneNumber: string;
}

export interface RefreshTokenRequest {
    refresh: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    tokenType: string;
    exp: number;
}

export const sendOtp = async (
    data: SendOtpRequest
): Promise<SendOtpResponse> => {
    const response = await api.post<SendOtpResponse>('/auth/otp/send', data);
    return response.data;
};

export const verifyOtp = async (
    data: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
    const response = await api.post<VerifyOtpResponse>(
        '/auth/otp/verify',
        data
    );

    const { accessToken, refreshToken, ...userData } = response.data;
    tokenManager.setTokens(accessToken, refreshToken, userData);

    return response.data;
};

export const refreshToken = async (
    data: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
    const response = await api.post<RefreshTokenResponse>(
        '/auth/token/refresh',
        data
    );

    const { accessToken } = response.data;
    const userData = tokenManager.getUserData();
    const refreshToken = tokenManager.getRefreshToken();

    if (userData && refreshToken) {
        tokenManager.setTokens(accessToken, refreshToken, userData);
    }

    return response.data;
};

export const getCurrentUser = (): UserData | null => {
    return tokenManager.getUserData();
};

export const isAuthenticated = (): boolean => {
    return tokenManager.isTokenValid();
};

export const logout = () => {
    tokenManager.clearAll();
    window.location.href = '/';
};

export const getAccessToken = (): string | null => {
    return tokenManager.getAccessToken();
};

export const getRefreshToken = (): string | null => {
    return tokenManager.getRefreshToken();
};
