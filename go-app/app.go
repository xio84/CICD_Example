package main

import (
	"go-user-app/app/configs"

	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "users")

type User struct {
	ID          primitive.ObjectID `json:"id,omitempty"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
}

func GetUserByID(c *gin.Context, id string) (User, error) {
	var user User
	objId, _ := primitive.ObjectIDFromHex(id)
	err := userCollection.FindOne(c, bson.M{"id": objId}).Decode(&user)
	return user, err
}

func CreateUser(c *gin.Context, name string, description string) (User, error) {
	user := User{
		ID:          primitive.NewObjectID(),
		Name:        name,
		Description: description,
	}

	_, err := userCollection.InsertOne(c, user)
	return user, err
}

func GetUserHandler(c *gin.Context) {
	// retrieve user from db
	id := c.Query("id")
	user, err := GetUserByID(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "impossible to retrieve user"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func GetDefaultHandler(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}

func PostUserHandler(c *gin.Context) {
	// parse user from json
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	parsedUser, err := CreateUser(c, user.Name, user.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "impossible to add user"})
		return
	}
	c.JSON(http.StatusOK, parsedUser)
}

func SetupRouter() *gin.Engine {
	r := gin.Default()
	r.GET("/", GetDefaultHandler)
	g := r.Group("/apis/goapp")
	// define the routes
	g.GET("", GetDefaultHandler)
	g.GET("/", GetDefaultHandler)
	g.GET("/user", GetUserHandler)
	g.POST("/user", PostUserHandler)
	return r
}

func main() {
	//run database
	configs.ConnectDB()

	r := SetupRouter()
	err := r.Run(":8083")
	if err != nil {
		log.Fatalf("impossible to start server: %s", err)
	}
	fmt.Println("Running")
}
