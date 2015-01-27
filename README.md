indejection.js
==============

Dead simple dependency injection for factory style functions

Usage
-----

First, get me:
```bash
npm install --save indejection
```

Next, in your code, write factories that declare dependencies they'd like injected

*app.js*
```javascript
var app = function(person) {
	return {
 		start: function() {
 			person.greet();
 		}
	}
};

app.$inject = ['person'];
module.exports = app;
```

*person.js*
```javascript
var person = function() {
	return {
		greet: function() {
			console.log('hi!');
		}
	}
};

module.exports = person;
```

Then, in the 'main' part of your app, make a container and register your factories

*index.js*
```javascript
var container = indejection();
```

Declare your factories

*index.js*
```javascript
container.register('app', require('./app'), 'singleton');  // singleton will only be made once
container.register('person', require('./person'));
```

To kickstart everything, get your entry point. It, and all other dependencies will be created as needed:

*index.js*
```javascript
var app = container.get('app');
app.start();
```

TODO List
---------
- A better example
- Tests
- Remove lodash dependency
- Make it so that you can depend on other non-instantiable things (text, numbers, plain objects)
- Factories as a dependency
- Perhaps some kind of namespacing for dependencies, or nestable containers
- More lifecycles, other options (support for newing?)