import { ICategoryRepository } from "./modules/category/repositories/category.repository.interface";
import { MongoCategoryRepository } from "./modules/category/repositories/mongodb/category.repository";
import { MongoUserRepository } from "./modules/users/repositories/mongoose/user.repository";
import { IUserRepository } from "./modules/users/repositories/user.repository.interface";

export class RepositoryProvider {
    private static _userRepositoryInstance: MongoUserRepository;
    private static _categoryRepositoryInstance: MongoCategoryRepository;

    static get userRepository(): IUserRepository {
        if (!this._userRepositoryInstance)
            this._userRepositoryInstance = new MongoUserRepository();
        return this._userRepositoryInstance;
    }

    static get categoryRepository(): ICategoryRepository {
        if (!this._categoryRepositoryInstance)
            this._categoryRepositoryInstance = new MongoCategoryRepository();
        return this._categoryRepositoryInstance;
    }
}
