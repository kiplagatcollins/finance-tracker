# Default target
.DEFAULT_GOAL := run

# Application variables
BINARY_NAME=finance-tracker
MAIN_PATH=main.go

# Runs the application in development mode with hot reload or standard run
run:
	$(GO_FLAGS) go run $(MAIN_PATH)

# Cleans up the go.mod file by removing unnecessary dependencies
tidy:
	go mod tidy -v

# Update dependencies to the latest minor/patch versions
update:
	go get -u ./...

# Cleans up build artifacts and binary files
clean:
	go clean
	rm -rf build/
	rm -f main

# Generates Swagger documentation for the API (Fiber compatible)
swagger:
	swag init -g $(MAIN_PATH) -o internal/docs

# Builds the application for Linux (standard for Docker/Cloud)
build-linux:
	GOOS=linux GOARCH=amd64 $(GO_FLAGS) go build -ldflags="-s -w" -o build/$(BINARY_NAME) $(MAIN_PATH)

# Runs the test suite
test:
	go test ./...

# Formats the code according to Go standards
fmt:
	go fmt ./...

# Declare phony targets
.PHONY: run tidy update clean swagger build-win build-linux deploy-dev deploy-uat deploy-prd log-uat log-prd test fmt gentool
