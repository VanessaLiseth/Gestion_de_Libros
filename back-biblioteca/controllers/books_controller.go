package controllers

import (
	"biblioteca/models"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetBooks(c *gin.Context) {
	books, err := models.GetAllBooks()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, books)
}

func RegistBook(c *gin.Context) {
	var request models.BookRegister

	if err := c.ShouldBindJSON(&request); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos invalidos"})
		return
	}

	if err := models.CreateBook(request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al crear el libro"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Libro creado con exito"})

}
