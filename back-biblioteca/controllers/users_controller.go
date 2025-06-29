package controllers

import (
	"biblioteca/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// Valida los datos de inicio de sesion y devuelve el rol del usaurio de ser un login exitoso
func DoLogin(c *gin.Context) {

	var login models.LoginRequest

	if err := c.ShouldBindJSON(&login); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos inválidos"})
		return
	}

	user, err := models.GetUserByUsername(login.Username)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if user.Password != login.Password {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Credenciales invalidas"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Inicio de session exitoso", "rol": user.Rol, "id": user.Id})
}

func RegistUser(c *gin.Context) {
	var request models.UserRegister

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos invalidos"})
		return
	}

	if err := models.CreateUser(request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al crear el usuario"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Usuario creado con exito"})

}
