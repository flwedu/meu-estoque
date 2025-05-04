export class QueryError extends Error {
	constructor(
		message: string,
		public details: any,
	) {
		super(message);
	}
}
