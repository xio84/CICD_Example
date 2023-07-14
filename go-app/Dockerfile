# Use an official Golang runtime as the base image
FROM golang:1.20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Download and install the Go dependencies
RUN go mod download

# Build the Go application
RUN go build -o app

# Set the command to run the executable when the container starts
CMD ["./app"]