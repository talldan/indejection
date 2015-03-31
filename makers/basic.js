function basic() {

	return {
		make: function(name, factory, dependencies) {
			return factory.apply(factory, dependencies);
		}
	};
}

module.exports = basic;