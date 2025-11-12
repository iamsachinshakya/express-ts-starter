import { AuthController } from "./modules/auth/controllers/auth.controller";
import { IAuthController } from "./modules/auth/controllers/auth.controller.interface";
import { CategoryController } from "./modules/category/controllers/category.controller";
import { ICategoryController } from "./modules/category/controllers/category.controller.interface";
import { UserController } from "./modules/users/controllers/user.controller";
import { IUserController } from "./modules/users/controllers/user.controller.interface";
export class ControllerProvider {
    static _userControllerInstance: UserController;
    static _authControllerInstance: AuthController;
    static _categoryControllerInstance: CategoryController

    static get userController(): IUserController {
        if (!this._userControllerInstance)
            this._userControllerInstance = new UserController();
        return this._userControllerInstance;
    }

    static get authController(): IAuthController {
        if (!this._authControllerInstance)
            this._authControllerInstance = new AuthController();
        return this._authControllerInstance;
    }

    static get categoryController(): ICategoryController {
        if (!this._categoryControllerInstance)
            this._categoryControllerInstance = new CategoryController();
        return this._categoryControllerInstance;
    }
}
