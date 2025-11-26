// src/modules/auth/interfaces/authService.interface.ts

import { IRegisterData, IUserEntity, ILoginCredentials, IChangePassword } from "../../users/models/user.model.interface";

export interface IAuthService {
    registerUser(
        data: IRegisterData
    ): Promise<IUserEntity>;

    loginUser(data: ILoginCredentials): Promise<{ user: IUserEntity; accessToken: string; refreshToken: string }>;

    logoutUser(userId: string): Promise<IUserEntity | null>;

    refreshAccessToken(
        incomingRefreshToken: string
    ): Promise<{ accessToken: string }>;

    changeUserPassword(data: IChangePassword, userId: string): Promise<void>;
}
