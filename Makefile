# Environment Stuff
NODE_BIN := node_modules/.bin

# Make Commands and variables
FINAL_MAIN_STYLE := style.css
FINAL_MAIN_COMPONENT := client/components/app.js
BUILD_DEPS = \
	$(FINAL_MAIN_STYLE) \
	$(FINAL_MAIN_COMPONENT);

build : $(BUILD_DEPS)
clean :
	@rm $(BUILD_DEPS)


# SASS Stuff
SASS ?= $(NODE_BIN)/node-sass --include-path 'client/sass'
SASS_FILES := $(wildcard client/sass/*.scss)

$(FINAL_MAIN_STYLE): $(SASS_FILES)
	$(SASS) client/sass/style.scss $@

# JS Stuff
BROWSERIFY ?= $(NODE_BIN)/browserify -t [ babelify --presets [ react es2015 ] ]
COMPONENTS := $(wildcard client/components/*.jsx)

$(FINAL_MAIN_COMPONENT): $(COMPONENTS)
	$(BROWSERIFY) client/components/index.jsx -o $@
