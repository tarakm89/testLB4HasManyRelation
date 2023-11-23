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
ItemCategory,
AssocItemItemCategory,
Item,
} from '../models';
import {ItemCategoryRepository} from '../repositories';

export class ItemCategoryItemController {
  constructor(
    @repository(ItemCategoryRepository) protected itemCategoryRepository: ItemCategoryRepository,
  ) { }

  @get('/item-categories/{id}/items', {
    responses: {
      '200': {
        description: 'Array of ItemCategory has many Item through AssocItemItemCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Item)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Item>,
  ): Promise<Item[]> {
    return this.itemCategoryRepository.items(id).find(filter);
  }

  @post('/item-categories/{id}/items', {
    responses: {
      '200': {
        description: 'create a Item model instance',
        content: {'application/json': {schema: getModelSchemaRef(Item)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ItemCategory.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {
            title: 'NewItemInItemCategory',
            exclude: ['ID'],
          }),
        },
      },
    }) item: Omit<Item, 'ID'>,
  ): Promise<Item> {
    return this.itemCategoryRepository.items(id).create(item);
  }

  @patch('/item-categories/{id}/items', {
    responses: {
      '200': {
        description: 'ItemCategory.Item PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Item, {partial: true}),
        },
      },
    })
    item: Partial<Item>,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.itemCategoryRepository.items(id).patch(item, where);
  }

  @del('/item-categories/{id}/items', {
    responses: {
      '200': {
        description: 'ItemCategory.Item DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Item)) where?: Where<Item>,
  ): Promise<Count> {
    return this.itemCategoryRepository.items(id).delete(where);
  }
}
