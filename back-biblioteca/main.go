package main

import (
	"biblioteca/database"
	"biblioteca/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()
	r := gin.Default()
	r.Use(cors.Default()) //Usamos CORS para permitir peticiones desde el front de manera local
	routes.RegisterRoutes(r)
	r.Run(":8080")
}
