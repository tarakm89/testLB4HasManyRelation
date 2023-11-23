import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {ItemCategory} from './item-category.model';
import {AssocItemItemCategory} from './assoc-item-item-category.model';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Item extends Entity {
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
  ItemName: string;

  @property({
    type: 'number',
    required: true,
  })
  Quantity: number;
  @hasMany(() => ItemCategory, {through: {model: () => AssocItemItemCategory, keyFrom: 'ItemID', keyTo: 'ItemCategoryID'}})
  itemCategories: ItemCategory[];

  @belongsTo(() => User, {name: 'AddedByUser'})
  AddedBy: number;

  @hasMany(() => AssocItemItemCategory, {keyTo: 'ItemID'})
  assocItemItemCategories: AssocItemItemCategory[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Item>) {
    super(data);
  }
}

export interface ItemRelations {
  // describe navigational properties here
}

export type ItemWithRelations = Item & ItemRelations;
