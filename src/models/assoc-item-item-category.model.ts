import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Item} from './item.model';
import {ItemCategory} from './item-category.model';

@model({settings: {strict: false}})
export class AssocItemItemCategory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;
  @belongsTo(() => Item, {name: 'ItemIDAssoc'})
  ItemID: number;

  @belongsTo(() => ItemCategory, {name: 'ItemCategoryAssoc'})
  ItemCategoryID: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AssocItemItemCategory>) {
    super(data);
  }
}

export interface AssocItemItemCategoryRelations {
  // describe navigational properties here
}

export type AssocItemItemCategoryWithRelations = AssocItemItemCategory & AssocItemItemCategoryRelations;
