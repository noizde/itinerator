all: development

deps:
	@npm install

development: deps
	./node_modules/.bin/webpack-dev-server --host 0.0.0.0 --inline --hot --content-base .