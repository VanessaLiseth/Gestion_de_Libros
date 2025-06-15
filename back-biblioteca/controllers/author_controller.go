package controllers

import (
	"biblioteca/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllAuthors(c *gin.Context) {
	categories, err := models.GetAllAuthors()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, categories)
}

func RegistAuthor(c *gin.Context) {
	var request models.AuthorRegister

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos invalidos"})
		return
	}

	if err := models.CreateAuthor(request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al crear el autor"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Categoria creada con exito"})

}
