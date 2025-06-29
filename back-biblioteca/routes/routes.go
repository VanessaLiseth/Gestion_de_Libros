package routes

import (
	"biblioteca/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router *gin.Engine) {
	router.POST("/login", controllers.DoLogin)
	router.POST("/register", controllers.RegistUser)

	router.GET("/categories", controllers.GetAllCategories)
	router.POST("/categories", controllers.RegistCategory)

	router.GET("/authors", controllers.GetAllAuthors)
	router.POST("/authors", controllers.RegistAuthor)

	router.GET("/books", controllers.GetBooks)
	router.POST("/books", controllers.RegistBook)

	router.GET("/loans", controllers.GetLoans)
	router.GET("/loans/:id", controllers.GetLoansByID)
	router.POST("/loans", controllers.RegistLoan)

	router.POST("/return/:id", controllers.RegistReturn)
}
