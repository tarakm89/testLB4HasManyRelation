import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Item,
  AssocItemItemCategory,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemAssocItemItemCategoryController {
  constructor(
    @repository(ItemRepository) protected itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/assoc-item-item-categories', {
    responses: {
      '200': {
        description: 'Array of Item has many AssocItemItemCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AssocItemItemCategory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AssocItemItemCategory>,
  ): Promise<AssocItemItemCategory[]> {
    return this.itemRepository.assocItemItemCategories(id).find(filter);
  }

  @post('/items/{id}/assoc-item-item-categories', {
    responses: {
      '200': {
        description: 'Item model instance',
        content: {'application/json': {schema: getModelSchemaRef(AssocItemItemCategory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Item.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategory, {
            title: 'NewAssocItemItemCategoryInItem',
            exclude: ['ID'],
            optional: ['ItemID']
          }),
        },
      },
    }) assocItemItemCategory: Omit<AssocItemItemCategory, 'ID'>,
  ): Promise<AssocItemItemCategory> {
    return this.itemRepository.assocItemItemCategories(id).create(assocItemItemCategory);
  }

  @patch('/items/{id}/assoc-item-item-categories', {
    responses: {
      '200': {
        description: 'Item.AssocItemItemCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AssocItemItemCategory, {partial: true}),
        },
      },
    })
    assocItemItemCategory: Partial<AssocItemItemCategory>,
    @param.query.object('where', getWhereSchemaFor(AssocItemItemCategory)) where?: Where<AssocItemItemCategory>,
  ): Promise<Count> {
    return this.itemRepository.assocItemItemCategories(id).patch(assocItemItemCategory, where);
  }

  @del('/items/{id}/assoc-item-item-categories', {
    responses: {
      '200': {
        description: 'Item.AssocItemItemCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AssocItemItemCategory)) where?: Where<AssocItemItemCategory>,
  ): Promise<Count> {
    return this.itemRepository.assocItemItemCategories(id).delete(where);
  }
}
