import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FilesourceDataSource} from '../datasources';
import {ItemCategory, ItemCategoryRelations, Item, AssocItemItemCategory} from '../models';
import {AssocItemItemCategoryRepository} from './assoc-item-item-category.repository';
import {ItemRepository} from './item.repository';

export class ItemCategoryRepository extends DefaultCrudRepository<
  ItemCategory,
  typeof ItemCategory.prototype.ID,
  ItemCategoryRelations
> {

  public readonly items: HasManyThroughRepositoryFactory<Item, typeof Item.prototype.ID,
          AssocItemItemCategory,
          typeof ItemCategory.prototype.ID
        >;

  constructor(
    @inject('datasources.filesource') dataSource: FilesourceDataSource, @repository.getter('AssocItemItemCategoryRepository') protected assocItemItemCategoryRepositoryGetter: Getter<AssocItemItemCategoryRepository>, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>,
  ) {
    super(ItemCategory, dataSource);
    this.items = this.createHasManyThroughRepositoryFactoryFor('items', itemRepositoryGetter, assocItemItemCategoryRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
  }
}
