import { logger } from './Logger';
import ErrorHandler from '../handlers/ErrorHander';

export const errorHandler = (err) => {
	logger.error(JSON.stringify(err));

	if (typeof ErrorHandler.fn === 'function') {
		ErrorHandler.fn(err);
	}
};
