var _ = require('lodash');

var indejection = function() {
	var container = {};
	var registry = {};
	var singletons = {};

	function manufacture(name) {
		var factory = getFactoryFromRegistry();

		var dependencies = null;
		if (_.isArray(factory.$inject)) {
			dependencies = _.map(factory.$inject, manufacture);
		}

		var instance = null;

		if ((name in singletons) && singletons[name] !== null) {
			singletons[name] = instance;
		}

		if (instance === null) {
			instance = item.apply(item, dependencies);
		}

		if ((name in singletons) && singletons[name] === null) {
			singletons[name] = instance;
		}

		return instance;
	}

	function getFactoryFromRegistry(name) {
		if (_.isUndefined(registry[name])) {
			throw 'unknown dependency specified - ' + name;
		}

		return registry[name];
	}

	container.register = function(name, factory, options) {
		registry[name] = factory;

		if (_.isPlainObject(options)) {
			if (options.type === 'singleton') {
				singletons[name] = null;
			}
		}

		return container;
	};

	container.get = function(name) {
		return manufacture(name);
	};

	return container;
};

module.exports = indejection;