package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type User struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func GetUserByID(id string) (User, error) {
	// TODO : lookup in db
	return User{
		ID:          id,
		Name:        "Doe",
		Description: "John",
	}, nil
}

func GetUserHandler(c *gin.Context) {
	// retrieve user from db
	id := c.Query("id")
	user, err := GetUserByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "impossible to retrieve user"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func GetDefaultHandler(c *gin.Context) {
	c.JSON(http.StatusOK, "Hello World!")
}

func main() {
	r := gin.Default()
	r.GET("/", GetDefaultHandler)
	g := r.Group("/apis/goapp")
	// define the routes
	g.GET("", GetDefaultHandler)
	g.GET("/", GetDefaultHandler)
	g.GET("/user", GetUserHandler)
	err := r.Run(":8083")
	if err != nil {
		log.Fatalf("impossible to start server: %s", err)
	}
	fmt.Println("Running")
}
