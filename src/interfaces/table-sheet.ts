import { Nullable } from "../types";

export interface IRow<TKey> {
  readonly key: TKey;
}

export interface IRowConstructor<TKey> {
  new (row: ReadonlyMap<string, string>): IRow<TKey>;
}

export interface ISheet<TKey, TRow extends IRow<TKey>> {
  get(key: TKey): Nullable<TRow>;
}
