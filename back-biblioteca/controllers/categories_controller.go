package controllers

import (
	"biblioteca/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllCategories(c *gin.Context) {
	categories, err := models.GetAllCategories()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, categories)
}

func RegistCategory(c *gin.Context) {
	var request models.CategoryRegister

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos invalidos"})
		return
	}

	if err := models.CreateCategory(request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al crear la categoria"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Categoria creada con exito"})

}
