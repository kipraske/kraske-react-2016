# Environment Stuff
NODE_BIN := node_modules/.bin

# Make Commands and variables
build : build-css build-js

build-css: style.css
build-js: client/components/app.js

clean :
	@rm client/components/app.js style.css

# SASS Stuff
SASS ?= $(NODE_BIN)/node-sass --include-path 'client/sass'
SASS_FILES := $(wildcard client/sass/*.scss)

style.css: $(SASS_FILES)
	$(SASS) client/sass/style.scss $@

# JS Stuff
BROWSERIFY ?= $(NODE_BIN)/browserify -t [ babelify --presets [ react es2015 ] ] --debug
COMPONENTS := $(wildcard client/components/*.jsx)

client/components/app.js: $(COMPONENTS)
	@echo "Compiling client/components/app.js from components..."
	@$(BROWSERIFY) client/components/index.jsx -o $@
	@echo "...Successfully built client/components/app.js"
