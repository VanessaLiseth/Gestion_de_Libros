package controllers

import (
	"biblioteca/models"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func GetLoans(c *gin.Context) {
	loans, err := models.GetAllLoans()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, loans)
}

func RegistLoan(c *gin.Context) {
	var request models.LoanRegister

	if err := c.ShouldBindJSON(&request); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Datos invalidos"})
		return
	}

	if err := models.CreateLoan(request); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al crear el prestamo"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Prestamo creado con exito"})

}

func RegistReturn(c *gin.Context) {

	str_loan_id := c.Param("id")

	loan_id, err := strconv.Atoi(str_loan_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ID inválido",
		})
		return
	}

	if err := models.UpdateLoan(loan_id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error al devovler el prestamo"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Prestamo devuelto con exito"})

}

func GetLoansByID(c *gin.Context) {

	str_user_id := c.Param("id")

	user_id, err := strconv.Atoi(str_user_id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ID inválido",
		})
		return
	}

	loans, err := models.GetLoansByUserID(user_id)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, loans)
}
