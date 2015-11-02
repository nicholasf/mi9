BIN=./node_modules/.bin

# Ensure all npm deps are present
install:
	npm install

test: install
	NODE_ENV=test ${BIN}/mocha test
	@echo "Unit tests passed!";

manual:
	curl -X POST -d @test/fixture/sample-request.json -H 'Content-Type:application/json' 'http://127.0.0.1:3000'

manual-gae:
	curl -X POST -d @test/fixture/sample-request.json -H 'Content-Type:application/json' 'https://carbide-atlas-829.appspot.com'

manual-broken:
	curl -X POST -d @test/fixture/sample-broken-request.json -H 'Content-Type:application/json' 'http://127.0.0.1:3000'

manual-broken-gae:
	curl -X POST -d @test/fixture/sample-broken-request.json -H 'Content-Type:application/json' 'https://carbide-atlas-829.appspot.com'

