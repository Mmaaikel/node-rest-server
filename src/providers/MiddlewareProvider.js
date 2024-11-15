import { logger } from '../utils/Logger';
import { getRequestData } from '../handlers/RequestHandler';
import { errorHandler } from '../utils/ErrorUtils';
import requestIp from 'request-ip';

export default class MiddlewareProvider {
	static registerRequestLogger(app) {
		logger.debug('Registering request logger');
		app.use((request, response, next) => {
			const data = getRequestData(request);
			logger.info('Request URL : ', JSON.stringify(data.url));
			logger.info('Request headers : ', JSON.stringify(data.headers));
			logger.info('Request body : ', JSON.stringify(data.body));
			next();
		});
	}

	static registerIpMiddleware(app) {
		logger.debug('Registering ip middleware');
		app.use(requestIp.mw());
	}

	static registerFilters(app, serverConfig) {
		logger.debug('Registering global filter');
		app.use((request, response, next) => {
			const data = getRequestData(request);
			if (typeof serverConfig.filter === 'function') {
				logger.info('Executing filter...');
				const filterData = serverConfig.filter(data);
				if (filterData instanceof Promise) {
					filterData.then((filterDataResponse) => {
						response.locals = filterDataResponse || {};
						next();
					}, errorHandler);
					return;
				}
				response.locals = filterData || {};
			}
			next();
		});
	}

	static registerStatusEndpoint(app) {
		logger.debug('Registering /status endpoint to get routes information');
		app.get('/status', (request, response) => {
			response.send(app._router.stack);
		});
	}
}
