NODE_BIN := node_modules/.bin

SASS ?= $(NODE_BIN)/node-sass --include-path 'client/sass'
SASS_FILES := $(wildcard client/sass/*.scss)

style.css: $(SASS_FILES)
	$(SASS) client/sass/style.scss $@
