# Development stage
FROM golang:1.20-alpine AS dev

# Set important environment variables
ENV GOPATH /go
ENV GO111MODULE on
ENV CGO_ENABLED 0

# Install development tools
RUN  go install github.com/cosmtrek/air@v1.40.4

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Use mount cache for better performance
RUN --mount=type=cache,target=/go/pkg/mod go mod download

COPY . .

# Expose both API and debug ports
EXPOSE 8080 40000

# Update the air command with full path
ENTRYPOINT ["/go/bin/air"]

# Production build stage
FROM golang:1.20-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o main .

# Production stage
FROM alpine:latest AS prod

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy the binary from builder
COPY --from=builder /app/main .

EXPOSE 8080


CMD ["./main"]

# Final stage selection
FROM ${BUILD_ENV:-dev} AS final 