import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FilesourceDataSource} from '../datasources';
import {AssocItemItemCategory, AssocItemItemCategoryRelations, Item, ItemCategory, AssocItemItemCategoryColor, Color} from '../models';
import {ItemRepository} from './item.repository';
import {ItemCategoryRepository} from './item-category.repository';
import {AssocItemItemCategoryColorRepository} from './assoc-item-item-category-color.repository';
import {ColorRepository} from './color.repository';

export class AssocItemItemCategoryRepository extends DefaultCrudRepository<
  AssocItemItemCategory,
  typeof AssocItemItemCategory.prototype.ID,
  AssocItemItemCategoryRelations
> {

  public readonly ItemIDAssoc: BelongsToAccessor<Item, typeof AssocItemItemCategory.prototype.ID>;

  public readonly ItemCategoryAssoc: BelongsToAccessor<ItemCategory, typeof AssocItemItemCategory.prototype.ID>;

  public readonly assocItemItemCategoryColors: HasManyRepositoryFactory<AssocItemItemCategoryColor, typeof AssocItemItemCategory.prototype.ID>;

  public readonly AsocItemToColor: HasManyThroughRepositoryFactory<Color, typeof Color.prototype.ID,
          AssocItemItemCategoryColor,
          typeof AssocItemItemCategory.prototype.ID
        >;

  public readonly colors: HasManyThroughRepositoryFactory<Color, typeof Color.prototype.ID,
          AssocItemItemCategoryColor,
          typeof AssocItemItemCategory.prototype.ID
        >;

  constructor(
    @inject('datasources.filesource') dataSource: FilesourceDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>, @repository.getter('ItemCategoryRepository') protected itemCategoryRepositoryGetter: Getter<ItemCategoryRepository>, @repository.getter('AssocItemItemCategoryColorRepository') protected assocItemItemCategoryColorRepositoryGetter: Getter<AssocItemItemCategoryColorRepository>, @repository.getter('ColorRepository') protected colorRepositoryGetter: Getter<ColorRepository>,
  ) {
    super(AssocItemItemCategory, dataSource);
    this.colors = this.createHasManyThroughRepositoryFactoryFor('colors', colorRepositoryGetter, assocItemItemCategoryColorRepositoryGetter,);
    this.registerInclusionResolver('colors', this.colors.inclusionResolver);
    this.AsocItemToColor = this.createHasManyThroughRepositoryFactoryFor('AsocItemToColor', colorRepositoryGetter, assocItemItemCategoryColorRepositoryGetter,);
    this.registerInclusionResolver('AsocItemToColor', this.AsocItemToColor.inclusionResolver);
    this.assocItemItemCategoryColors = this.createHasManyRepositoryFactoryFor('assocItemItemCategoryColors', assocItemItemCategoryColorRepositoryGetter,);
    this.registerInclusionResolver('assocItemItemCategoryColors', this.assocItemItemCategoryColors.inclusionResolver);
    this.ItemCategoryAssoc = this.createBelongsToAccessorFor('ItemCategoryAssoc', itemCategoryRepositoryGetter,);
    this.registerInclusionResolver('ItemCategoryAssoc', this.ItemCategoryAssoc.inclusionResolver);
    this.ItemIDAssoc = this.createBelongsToAccessorFor('ItemIDAssoc', itemRepositoryGetter,);
    this.registerInclusionResolver('ItemIDAssoc', this.ItemIDAssoc.inclusionResolver);
  }
}
