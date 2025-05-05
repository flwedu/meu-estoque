export class QueryError<T> extends Error {
	constructor(
		message: string,
		public details: T,
	) {
		super(message);
	}
}
