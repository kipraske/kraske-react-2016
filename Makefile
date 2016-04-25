# Environment Stuff
NODE_BIN := node_modules/.bin
NODE_ENV ?= development
export NODE_ENV := $(NODE_ENV)

# Make Commands and variables
build : build-css build-js

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
BROWSERIFY ?= $(NODE_BIN)/browserify -t [ babelify --presets [ react es2015 ] ]
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
