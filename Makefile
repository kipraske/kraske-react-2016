# Default Environment Stuff
NODE_BIN := node_modules/.bin

# Make Commands and variables
debug: DEBUG_FLAGS += --debug
debug: build

release: reinstall-react build uglify

build: build-css build-js

reinstall-react:
	export NODE_ENV=production
	npm uninstall react react-dom
	npm install react react-dom

install:
	npm install

build-css: style.css
build-js: client/js/app.js

clean :
	@rm client/js/app.js
	@rm client/js/lib.js
	@rm style.css

# SASS Stuff
SASS ?= $(NODE_BIN)/node-sass --include-path 'client/sass'
SASS_FILES := $(wildcard client/sass/*.scss)

style.css: $(SASS_FILES)
	$(SASS) client/sass/style.scss $@

# JS Stuff
# It is helpful to put in debug flags if needed in these
BROWSERIFY ?= $(NODE_BIN)/browserify -t [ babelify --presets [ react es2015 ] ] $(DEBUG_FLAGS)
UGLIFY := $(NODE_BIN)/uglifyjs
UGLIFY_FLAGS = --compress --mangle

COMPONENTS := $(shell \
	find client/components/. \
		-not \( -path './.git' -prune \) \
		-not \( -path './node_modules' -prune \) \
		-type f \( -name '*.jsx' \) \
)
STATIC_LIBS = react react-dom page superagent

client/js/lib.js: client/static/js/lib-bundler.js
	$(BROWSERIFY) $(addprefix -r ,$(STATIC_LIBS) ) -o $@ --insert-globals

client/js/app.js: $(COMPONENTS) client/js/lib.js client/
	$(BROWSERIFY) client/components/index.jsx $(addprefix -x ,$(STATIC_LIBS) ) -o $@

uglify:
	$(UGLIFY) client/js/lib.js -o client/js/lib.js $(UGLIFY_FLAGS)
	$(UGLIFY) client/js/app.js -o client/js/app.js $(UGLIFY_FLAGS)
