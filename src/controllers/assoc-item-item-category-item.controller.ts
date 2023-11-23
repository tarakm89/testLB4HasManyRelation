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
  Item,
} from '../models';
import {AssocItemItemCategoryRepository} from '../repositories';

export class AssocItemItemCategoryItemController {
  constructor(
    @repository(AssocItemItemCategoryRepository)
    public assocItemItemCategoryRepository: AssocItemItemCategoryRepository,
  ) { }

  @get('/assoc-item-item-categories/{id}/item', {
    responses: {
      '200': {
        description: 'Item belonging to AssocItemItemCategory',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Item),
          },
        },
      },
    },
  })
  async getItem(
    @param.path.number('id') id: typeof AssocItemItemCategory.prototype.ID,
  ): Promise<Item> {
    return this.assocItemItemCategoryRepository.ItemIDAssoc(id);
  }
}
