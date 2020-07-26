import { IRow, ISheet } from "../interfaces/table-sheet";
import { Nullable } from "../types";
import { CsvParser } from "../csv-parser";
import { BaseSheet } from "./base";

interface RewardData {
  readonly itemId: Required<number>;
  // Actually `decimal` type.
  readonly ratio: Required<number>;
  readonly min: Required<number>;
  readonly max: Required<number>;
}

class StageSheetRow implements IRow<number> {
  get key(): number {
    return this.id;
  }

  public readonly id: number;
  public readonly costAP: number;
  public readonly turnLimit: number;
  public readonly background: string;
  public readonly bgm: string;
  public readonly rewards: ReadonlyArray<RewardData>;
  public readonly dropItemMin: number;
  public readonly dropItemMax: number;

  constructor(row: ReadonlyMap<string, string>) {
    this.id = parseInt(row.get("id")!);
    this.costAP = parseInt(row.get("costAP")!);
    this.turnLimit = parseInt(row.get("turnLimit")!);
    this.background = row.get("background")!;
    this.bgm = row.get("bgm")!;

    const rewards: RewardData[] = [];
    const rewardsCount = 10;

    for (let i = 0; i < rewardsCount; ++i) {
      const itemIdColumn = `item${i}`;
      const itemId = row.get(itemIdColumn)!;
      if ("" === itemId) {
        continue;
      }

      rewards.push({
        itemId: parseInt(itemId),
        ratio: parseFloat(row.get(`${itemIdColumn}_ratio`)!),
        min: parseInt(row.get(`${itemIdColumn}_min`)!),
        max: parseInt(row.get(`${itemIdColumn}_max`)!),
      });
    }

    this.rewards = rewards;

    this.dropItemMax = parseInt(row.get("max_drop")!);
    this.dropItemMin = parseInt(row.get("min_drop")!);
  }
}

// FIXME: how can we make fixture to test `StageSheet`?
// TODO: documentation.
export class StageSheet extends BaseSheet<number, StageSheetRow> {
  static parse(csv: string): StageSheet {
    const parser = new CsvParser();
    const rows = parser.parse(csv);
    return new StageSheet(rows.map((row) => new StageSheetRow(row)));
  }
}
