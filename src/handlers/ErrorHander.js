import { logger } from '../utils/Logger';

const ErrorHandler = {
	fn: null,

	registerDevHandler: (app) => {
		if (app.get('env') === 'development') {
			logger.debug('Loading Error handler');
		}
	},

	registerErrorHandler: (fn) => {
		if (typeof fn === 'function') {
			logger.debug('Loading Error handler');

			ErrorHandler.fn = fn;
		}
	},
};

export default ErrorHandler;
