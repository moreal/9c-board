export interface IParser<TInput, TResult> {
    parse(input: TInput): TResult;
}
