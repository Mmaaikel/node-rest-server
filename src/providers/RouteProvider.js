import { logger } from '../utils/Logger';
import { GLOBAL_API_ERROR } from '../constants/global';
import { getRequestData, getFilterData } from '../handlers/RequestHandler';
import ResponseHandler from '../handlers/ResponseHandler';
import { errorHandler } from '../utils/ErrorUtils';
import * as fs from 'fs';

const publishResponse = (response, status, data) => {
	let hasFilePath = false;
	try {
		if (data && typeof data === 'object') {
			hasFilePath = 'filePath' in data;
		}
	} catch (e) {}

	// If there is a file, return that
	if (hasFilePath) {
		if (fs.existsSync(data.filePath)) {
			response.sendFile(data.filePath);
		} else {
			response.end();
		}

		return;
	}

	// If there is a status and data, return that
	// JSON when required
	if (status && data && Object.keys(data).length !== 0) {
		response.status(status).json(data);
	} else if (status && (!data || Object.keys(data).length === 0)) {
		response.status(status).end();
	} else {
		response.end();
	}
};

/**
 * Custom publish will NOT end the response. This will allow you to use the response object to send custom data.
 * @param response
 * @param status
 * @param data
 */
const publishCustom = (response, status, data) => {
	response.status(status);
};

const sendResponse = (routeConfig, responseData, response, serverConfig) => {
	const { status, data } = ResponseHandler.getResponseData(routeConfig, responseData, serverConfig);
	logger.info('Response sent : ', JSON.stringify(data));

	const publish = () => {
		if (routeConfig?.customResponse === true) {
			publishCustom(response, status, data);
		} else {
			publishResponse(response, status, data);
		}
	};

	if (serverConfig.delay > 0) {
		setTimeout(() => {
			publish(response, status, data);
		}, serverConfig.delay * 1000);
	} else {
		publish(response, status, data);
	}
};

const handleControllerResponse = (routeConfig, controllerOptions, request, response, next) => {
	if (typeof routeConfig.controller === 'function') {
		const requestData = { ...getRequestData(request), ...getFilterData(response) };
		return routeConfig.controller(requestData, controllerOptions, request, response, next);
	} else if (typeof routeConfig.controller === 'object') {
		return routeConfig.controller;
	}
	return;
};

export default (routeConfig, controllerOptions, serverConfig) => (request, response, next) => {
	try {
		const responseData = handleControllerResponse(routeConfig, controllerOptions, request, response, next);
		if (responseData instanceof Promise) {
			responseData.then(
				(data) => {
					sendResponse(routeConfig, data, response, next, serverConfig);
				},
				(error) => {
					errorHandler(error);
					publishResponse(response, GLOBAL_API_ERROR, error.message);
				},
			);
			return;
		}
		sendResponse(routeConfig, responseData, response, serverConfig);
	} catch (error) {
		errorHandler(error);
		publishResponse(response, GLOBAL_API_ERROR, error.message);
	}
};
