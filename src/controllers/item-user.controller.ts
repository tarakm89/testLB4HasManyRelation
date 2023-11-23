import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Item,
  User,
} from '../models';
import {ItemRepository} from '../repositories';

export class ItemUserController {
  constructor(
    @repository(ItemRepository)
    public itemRepository: ItemRepository,
  ) { }

  @get('/items/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Item',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.number('id') id: typeof Item.prototype.ID,
  ): Promise<User> {
    return this.itemRepository.AddedByUser(id);
  }
}
