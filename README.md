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
var app = function(pictureViewer) {
	return {
 		start: function() {
 			pictureViewer.show();
 		}
	}
};

app.$inject = ['pictureViewer'];
```

Then, in the 'main' part of your app, make a container and register your factories

*index.js*
```javascript
var container = indejection();
```

Finally, declare your factories

*index.js*
```javascript
container.register('app', require('./app'), 'singleton');  // singleton will only be made once
container.register('pictureViewer', require('./pictureViewer'));
```

TODO List
---------
- A better example
- Tests
- Remove lodash dependency
- Make it so that you can depend on other non-instantiable things (text, numbers, plain objects)
- Perhaps some kind of namespacing for dependencies, or nestable containers
- More lifecycles, other options (support for newing?)