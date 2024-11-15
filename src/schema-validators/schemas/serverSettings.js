export default {
	$$root: true,
	strict: true,
	type: 'object',
	optional: true,
	messages: {
		objectStrict: "Server settings contains forbidden keys: '{actual}', valid properties are '{expected}'",
	},
	props: {
		basePath: {
			type: 'string',
			default: '',
		},
		port: {
			type: 'number',
			positive: true,
			integer: true,
			default: 8000,
		},
		delay: {
			type: 'number',
			positive: true,
			integer: true,
			default: 0,
		},
		logger: {
			type: 'multi',
			rules: [
				{ type: 'boolean' },
				{
					type: 'object',
					props: {
						enable: { type: 'boolean', default: true },
						debug: { type: 'boolean', default: false },
					},
				},
			],
			default: true,
		},
		onError: { type: 'function', optional: true },
		filter: { type: 'function', optional: true },
		cors: { type: 'any', optional: true },
		middlewares: { type: 'array', optional: true },
		getDatabaseConnection: { type: 'function', optional: true },
	},
};
