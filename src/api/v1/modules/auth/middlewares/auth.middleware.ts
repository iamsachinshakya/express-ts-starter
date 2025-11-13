import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../../common/utils/asyncHandler";
import { ApiError } from "../../../common/utils/apiError";
import { verifyToken } from "../utils/jwt.util";
import { IAuthUser } from "../../users/models/user.model.interface";
import { env } from "../../../../../app/config/env";
import { RepositoryProvider } from "../../../RepositoryProvider";

/**
 *   Middleware: Authenticate requests using JWT
 * - Extracts token from cookies or Authorization header
 * - Verifies and decodes token payload
 * - Confirms user exists in the database
 * - Attaches `req.user` for downstream authorization checks
 */
export const authenticateJWT = asyncHandler(
    async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
        const authHeader = req.header("Authorization");
        const token =
            req.cookies?.accessToken ||
            (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined);

        if (!token) throw new ApiError("Unauthorized request – token missing", 401);

        // Verify token and decode user payload
        const decoded = verifyToken(token, env.ACCESS_TOKEN_SECRET) as IAuthUser;

        if (!decoded?.id) throw new ApiError("Invalid or malformed token", 401);

        // Validate user existence (optional but recommended for production)
        const user = await RepositoryProvider.userRepository.findById(decoded.id);
        if (!user) throw new ApiError("Invalid or expired access token", 401);

        req.user = {
            id: user.id,
            email: user.email,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
        };

        next();
    }
);
