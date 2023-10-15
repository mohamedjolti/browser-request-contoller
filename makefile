dc = docker-compose
dce = $(dc) exec 
sayHello:
	@echo "Hi, makefile is working , enjoy!"

firstinstall:
	$(dc) build controlhttprequest
	$(dc) up -d
startContainer:
	$(dc) start controlhttprequest

test:
	$(dce) controlhttprequest npm test
install:
	$(dce) controlhttprequest  npm install

