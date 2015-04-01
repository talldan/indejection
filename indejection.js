var _ = require('lodash');
var DEFAULT_MAKER = 'basic';
var makers = {
	basic: require('./makers/basic'),
	singleton: require('./makers/singleton'),
	fixed: require('./makers/fixed')
};

var indejection = function() {
	var container = {};
	var registry = {};
	var options = {};

	function manufacture(name) {
		var factory = getFactoryFromRegistry(name);

		var dependencies = null;
		if (_.isArray(factory.$inject)) {
			dependencies = _.map(factory.$inject, manufacture);
		}

		var maker = getMaker(name);
		return maker.make(name, factory, dependencies);
	}

	function getFactoryFromRegistry(name) {
		if (_.isUndefined(registry[name])) {
			throw 'unknown dependency specified - ' + name;
		}

		return registry[name];
	}

	function getMaker(name) {
		var maker = null;

		if ((name in options) && ('maker' in options[name])) {
			var makerType = options[name].maker;

			if (makerType in makers) {
				maker = makers[makerType];
			}
		}

		if (maker === null) {
			maker = makers[DEFAULT_MAKER];
		}

		return maker;
	}

	function processOptions(name, options) {
		if (_.isPlainObject(options)) {
			if (!('maker' in options)) {
				options['maker'] = 'default';
			}

			options[name] = options;
		}
		else {
			options[name] = {
				maker: 'default'
			};
		}
	}

	container.register = function(name, factory, options) {
		registry[name] = factory;
		processOptions(name, options);
		return container;
	};

	container.get = function(name) {
		return manufacture(name);
	};

	return container;
};

module.exports = indejection;