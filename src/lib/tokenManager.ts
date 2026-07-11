
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export interface UserData {
    adminId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    acl: number;
    isSuperAdmin: boolean;
}

export const tokenManager = {
    setTokens(accessToken: string, refreshToken: string, userData: UserData) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    },

    getAccessToken(): string | null {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    },

    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },


    getUserData(): UserData | null {
        const data = localStorage.getItem(USER_DATA_KEY);
        if (!data) return null;
        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    },

    // UPDATE ACCESS TOKEN BARA REFRESH
    updateAccessToken(accessToken: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    },

    // KHOOROJ
    clearAll() {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
    },

    //TOKEN ENQEZA DRE MOTABARE YA NA
    isTokenValid(): boolean {
        const token = this.getAccessToken();
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const exp = payload.exp * 1000; //TABDIL BE MILI SEC
            return Date.now() < exp;
        } catch {
            return false;
        }
    },

    // TOKEN VOJOD DARE YA NA
    hasToken(): boolean {
        return !!this.getAccessToken();
    }
};