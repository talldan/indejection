var basicMaker = require('./basic')();

function singleton() {
	var singletonRegistry = {};

	return {
		make: function(name, factory, dependencies) {
			var instance = null;

			if ((name in singletonRegistry) && singletonRegistry[name] !== null) {
				instance = singletonRegistry[name];
			}
			else {
				instance = basicMaker.make(name, factory, dependencies);
			}

			if (!(name in singletonRegistry)) {
				singletonRegistry[name] = instance;
			}

			return instance;
		}
	};
}

module.exports = singleton;