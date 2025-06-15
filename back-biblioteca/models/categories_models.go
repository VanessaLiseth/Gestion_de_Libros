package models

import (
	"biblioteca/database"
)

type CategoryRegister struct {
	Name string `json:"name"`
}

type CategoryResponse struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func GetAllCategories() ([]CategoryResponse, error) {
	rows, err := database.DB.Query("SELECT id, nombre FROM Categoria")
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var categories []CategoryResponse

	for rows.Next() {
		var category CategoryResponse

		if err := rows.Scan(&category.Id, &category.Name); err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil

}

func CreateCategory(category CategoryRegister) error {
	query := "INSERT INTO Categoria (nombre) VALUES(?);"

	_, err := database.DB.Exec(query, category.Name)

	return err
}
