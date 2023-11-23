import {Entity, model, property, hasMany} from '@loopback/repository';
import {Item} from './item.model';

@model({settings: {strict: false}})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  UserName: string;

  @property({
    type: 'string',
    required: true,
  })
  Designation: string;

  @hasMany(() => Item, {keyTo: 'AddedBy'})
  items: Item[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
