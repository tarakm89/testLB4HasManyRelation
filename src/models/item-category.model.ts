import {Entity, model, property, hasMany} from '@loopback/repository';
import {Item} from './item.model';
import {AssocItemItemCategory} from './assoc-item-item-category.model';

@model({settings: {strict: false}})
export class ItemCategory extends Entity {
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
  ItemCategoryName: string;

  @hasMany(() => Item, {through: {model: () => AssocItemItemCategory, keyFrom: 'ItemCategoryID', keyTo: 'ItemID'}})
  items: Item[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ItemCategory>) {
    super(data);
  }
}

export interface ItemCategoryRelations {
  // describe navigational properties here
}

export type ItemCategoryWithRelations = ItemCategory & ItemCategoryRelations;
