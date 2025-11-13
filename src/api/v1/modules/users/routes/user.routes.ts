import { Router } from "express";
import { asyncHandler } from "../../../common/utils/asyncHandler";
import { ControllerProvider } from "../../../ControllerProvider";
import { validateBody, validateFileSchema } from "../../../common/middlewares/validate.middleware";
import { uploadSingle } from "../../../common/middlewares/upload.middleware";
import { imageSchema, updateUserSchema } from "../validations/user.validation";
import { authenticateJWT } from "../../auth/middlewares/auth.middleware";

export const userRouter = Router();
const userController = ControllerProvider.userController;

/**
 * @route   GET /api/v1/users
 * @desc    Get all users
 * @access  Private (Admin)
 */
userRouter.get(
  "/",
  authenticateJWT,
  asyncHandler(userController.getAll.bind(userController))
);

/**
 * @route   GET /api/v1/users/current-user
 * @desc    Get details of the logged-in user
 * @access  Private
 */
userRouter.get(
  "/current-user",
  authenticateJWT,
  asyncHandler(userController.getCurrentUser.bind(userController))
);

/**
 * @route   PATCH /api/v1/users/update-account
 * @desc    Update user profile details (name, email, etc.)
 * @access  Private
 */
userRouter.patch(
  "/update-account",
  authenticateJWT,
  validateBody(updateUserSchema),
  asyncHandler(userController.updateAccountDetails.bind(userController))
);

/**
 * @route   PATCH /api/v1/users/avatar
 * @desc    Update user avatar (optional upload)
 * @access  Private
 */
userRouter.patch(
  "/avatar",
  authenticateJWT,
  uploadSingle("avatar"), // optional field
  validateFileSchema(imageSchema, { optional: true }),
  asyncHandler(userController.updateAvatar.bind(userController))
);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
userRouter.get(
  "/:id",
  authenticateJWT,
  asyncHandler(userController.getById.bind(userController))
);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete a user (soft delete or permanent based on logic)
 * @access  Private
 */
userRouter.delete(
  "/:id",
  authenticateJWT,
  asyncHandler(userController.delete.bind(userController))
);

export default userRouter;
