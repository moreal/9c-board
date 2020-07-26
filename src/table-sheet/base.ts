import { ISheet, IRow } from "../interfaces/table-sheet";
import { CsvParser } from "../csv-parser";
import { Nullable } from "../types";

export abstract class BaseSheet<TKey, TRow extends IRow<TKey>>
  implements ISheet<TKey, TRow> {
  private readonly keyRowMap: Map<TKey, TRow>;

  constructor(private readonly rows: TRow[]) {
    this.keyRowMap = new Map<TKey, TRow>();
    for (const row of rows) {
      this.keyRowMap.set(row.key, row);
    }
  }

  public get(key: TKey): Nullable<TRow> {
    return this.keyRowMap.has(key) ? this.keyRowMap.get(key)! : null;
  }
}
