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

	if (hasFilePath) {
		if (fs.existsSync(data.filePath)) {
			response.sendFile(data.filePath);
		} else {
			response.end();
		}
	} else {
		if (status && data && Object.keys(data).length !== 0) {
			response.status(status).json(data);
		} else if (status && (!data || Object.keys(data).length === 0)) {
			response.status(status).end();
		} else {
			response.end();
		}
	}
};

const sendResponse = (routeConfig, responseData, response, serverConfig) => {
	const { status, data } = ResponseHandler.getResponseData(routeConfig, responseData, serverConfig);
	logger.info('Response sent : ', JSON.stringify(data));
	if (serverConfig.delay > 0) {
		setTimeout(() => {
			publishResponse(response, status, data);
		}, serverConfig.delay * 1000);
	} else {
		publishResponse(response, status, data);
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
