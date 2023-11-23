import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {FilesourceDataSource} from '../datasources';
import {Item, ItemRelations, ItemCategory, AssocItemItemCategory, User} from '../models';
import {AssocItemItemCategoryRepository} from './assoc-item-item-category.repository';
import {ItemCategoryRepository} from './item-category.repository';
import {UserRepository} from './user.repository';

export class ItemRepository extends DefaultCrudRepository<
  Item,
  typeof Item.prototype.ID,
  ItemRelations
> {

  public readonly itemCategories: HasManyThroughRepositoryFactory<ItemCategory, typeof ItemCategory.prototype.ID,
          AssocItemItemCategory,
          typeof Item.prototype.ID
        >;

  public readonly AddedByUser: BelongsToAccessor<User, typeof Item.prototype.ID>;

  public readonly assocItemItemCategories: HasManyRepositoryFactory<AssocItemItemCategory, typeof Item.prototype.ID>;

  constructor(
    @inject('datasources.filesource') dataSource: FilesourceDataSource, @repository.getter('AssocItemItemCategoryRepository') protected assocItemItemCategoryRepositoryGetter: Getter<AssocItemItemCategoryRepository>, @repository.getter('ItemCategoryRepository') protected itemCategoryRepositoryGetter: Getter<ItemCategoryRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Item, dataSource);
    this.assocItemItemCategories = this.createHasManyRepositoryFactoryFor('assocItemItemCategories', assocItemItemCategoryRepositoryGetter,);
    this.registerInclusionResolver('assocItemItemCategories', this.assocItemItemCategories.inclusionResolver);
    this.AddedByUser = this.createBelongsToAccessorFor('AddedByUser', userRepositoryGetter,);
    this.registerInclusionResolver('AddedByUser', this.AddedByUser.inclusionResolver);
    this.itemCategories = this.createHasManyThroughRepositoryFactoryFor('itemCategories', itemCategoryRepositoryGetter, assocItemItemCategoryRepositoryGetter,);
    this.registerInclusionResolver('itemCategories', this.itemCategories.inclusionResolver);
  }
}
