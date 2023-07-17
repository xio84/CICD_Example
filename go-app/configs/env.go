package configs

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

var template string = "mongodb://%s:%s@%s/%s?retryWrites=true&w=majority"

func EnvMongoURI() string {
	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file, using values from env")
	}
	username := os.Getenv("MONGODB_USERNAME")
	pass := os.Getenv("MONGODB_PASSWORD")
	murl := os.Getenv("MONGODB_URL")
	database := os.Getenv("MONGODB_DATABASE")
	log.Println(username, pass, murl, database)
	if username == "" || pass == "" || murl == "" || database == "" {
		log.Fatal("Error in loading env")
	}

	url := fmt.Sprintf(template, username, pass, murl, database)
	log.Println(url)

	return url
}
