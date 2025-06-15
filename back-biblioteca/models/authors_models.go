package models

import (
	"biblioteca/database"
)

type AuthorRegister struct {
	Name string `json:"name"`
}

type AuthorResponse struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func GetAllAuthors() ([]AuthorResponse, error) {
	rows, err := database.DB.Query("SELECT id, nombre FROM Autores")
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var categories []AuthorResponse

	for rows.Next() {
		var category AuthorResponse

		if err := rows.Scan(&category.Id, &category.Name); err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil

}

func CreateAuthor(category AuthorRegister) error {
	query := "INSERT INTO Autores (nombre) VALUES(?);"

	_, err := database.DB.Exec(query, category.Name)

	return err
}
