import { IParser } from "./interfaces/parser";
import { EmptyColumnNameError } from "./errors/parser/EmptyColumnNameError";
import { UnexpectedColumnError } from "./errors/parser/UnexpectedColumnError";

export class CsvParser
  implements IParser<string, ReadonlyArray<ReadonlyMap<string, string>>> {
  parse(input: string): ReadonlyArray<ReadonlyMap<string, string>> {
    const rows: Array<Map<string, string>> = [];

    // Convert CRLF to LF
    const csv = input.replace(/\r\n/g, "\n");

    const lines = csv.split("\n");

    const [columnLine, ...rowLines] = lines;
    if ("" === columnLine) {
      // If there was no column, it will not process parsing more.
      return rows;
    }
    const columns = columnLine.split(",");
    // Check empty column name.
    for (const column of columns) {
      if (column === "") {
        throw new EmptyColumnNameError(
          "Empty column name doesn't support.",
          csv,
          columnLine,
          0
        );
      }
    }

    for (const [rowIndex, rowLine] of rowLines.entries()) {
      const row = new Map<string, string>();
      const cells = rowLine.split(",");
      if (cells.length !== columns.length) {
        throw new UnexpectedColumnError(
          `Expected the count of cell (${cells.length}) equals with the count of columns (${columns.length})`,
          csv,
          rowLine,
          rowIndex + 1
        );
      }

      for (const [cellIndex, cell] of cells.entries()) {
        row.set(columns[cellIndex], cell);
      }
      rows.push(row);
    }

    return rows;
  }
}
