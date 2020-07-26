import { CsvParser } from "./csv-parser";
import { UnexpectedColumnError } from "./errors/parser/UnexpectedColumnError";
import { EmptyColumnNameError } from "./errors/parser/EmptyColumnNameError";

describe("CsvParser", () => {
  const parser: CsvParser = new CsvParser();

  test("should return empty list from empty columns", () => {
    const parsed = parser.parse("");
    expect(parsed).toEqual([]);
  });

  test("should return empty list from empty rows", () => {
    const parsed = parser.parse("column1,column2");
    expect(parsed).toEqual([]);
  });

  test("should return map list from valid csv", () => {
    const parsed = parser.parse("column1,column2\nfoo,bar\nbaz,qux");
    const toMap = (t: { [key: string]: string }) => {
      return new Map(Object.keys(t).map((key) => [key, t[key]]));
    };
    expect(parsed).toEqual([
      toMap({
        column1: "foo",
        column2: "bar",
      }),
      toMap({
        column1: "baz",
        column2: "qux",
      }),
    ]);
  });

  test("should throw error when the count of rows and columns doesn't match", () => {
    const unexpectedColumnCsv = "column1,column2\nfoo,bar,baz";
    expect(() => parser.parse(unexpectedColumnCsv)).toThrowError(
      UnexpectedColumnError
    );
  });

  test("should throw error when empty string column name exists", () => {
    const unexpectedColumnCsv = "column1,column2,";
    expect(() => parser.parse(unexpectedColumnCsv)).toThrowError(
      EmptyColumnNameError
    );
  });
});
