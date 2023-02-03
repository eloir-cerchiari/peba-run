export class LogService{
	constructor() {}

	log(message: string): void {
		console.info(message);
	}
	debug(message: string): void {
		console.debug(message);
	}

	error(message: string): void {
		console.error(message);
	}

	warn(message: string): void {
		console.warn(message);
	}

	info(message: string): void {
		console.info(message);
	}

	verbose(message: string): void {
		console.info(message);
	}

}

export function makeLogService(): LogService {
	return new LogService();
}