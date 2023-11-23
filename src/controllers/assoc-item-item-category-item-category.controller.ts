import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AssocItemItemCategory,
  ItemCategory,
} from '../models';
import {AssocItemItemCategoryRepository} from '../repositories';

export class AssocItemItemCategoryItemCategoryController {
  constructor(
    @repository(AssocItemItemCategoryRepository)
    public assocItemItemCategoryRepository: AssocItemItemCategoryRepository,
  ) { }

  @get('/assoc-item-item-categories/{id}/item-category', {
    responses: {
      '200': {
        description: 'ItemCategory belonging to AssocItemItemCategory',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ItemCategory),
          },
        },
      },
    },
  })
  async getItemCategory(
    @param.path.number('id') id: typeof AssocItemItemCategory.prototype.ID,
  ): Promise<ItemCategory> {
    return this.assocItemItemCategoryRepository.ItemCategoryAssoc(id);
  }
}
