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
ItemCategory,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemItemCategoryController {
  constructor(
    @repository(ItemRepository) protected itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/item-categories', {
    responses: {
      '200': {
        description: 'Array of Item has many ItemCategory through AssocItemItemCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ItemCategory)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ItemCategory>,
  ): Promise<ItemCategory[]> {
    return this.itemRepository.itemCategories(id).find(filter);
  }

  @post('/items/{id}/item-categories', {
    responses: {
      '200': {
        description: 'create a ItemCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(ItemCategory)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Item.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCategory, {
            title: 'NewItemCategoryInItem',
            exclude: ['ID'],
          }),
        },
      },
    }) itemCategory: Omit<ItemCategory, 'ID'>,
  ): Promise<ItemCategory> {
    return this.itemRepository.itemCategories(id).create(itemCategory);
  }

  @patch('/items/{id}/item-categories', {
    responses: {
      '200': {
        description: 'Item.ItemCategory PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ItemCategory, {partial: true}),
        },
      },
    })
    itemCategory: Partial<ItemCategory>,
    @param.query.object('where', getWhereSchemaFor(ItemCategory)) where?: Where<ItemCategory>,
  ): Promise<Count> {
    return this.itemRepository.itemCategories(id).patch(itemCategory, where);
  }

  @del('/items/{id}/item-categories', {
    responses: {
      '200': {
        description: 'Item.ItemCategory DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ItemCategory)) where?: Where<ItemCategory>,
  ): Promise<Count> {
    return this.itemRepository.itemCategories(id).delete(where);
  }
}
