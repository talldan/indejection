function fixed() {

	return {
		make: function(name, factory) {
			return factory;
		}
	};
}

module.exports = fixed;