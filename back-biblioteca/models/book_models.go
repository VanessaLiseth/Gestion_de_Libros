package models

import (
	"biblioteca/database"
)

type Book struct {
	Id              int    `json:"id"`
	Title           string `json:"title"`
	Publicaion_date string `json:"publication_date"`
	ISBN            string `json:"isbn"`
	Stock           int    `json:"stock"`
	Author_name     string `json:"autor"`
	Category_name   string `json:"category"`
}

type BookRegister struct {
	Title           string `json:"title"`
	Publicaion_date string `json:"publication_date"`
	ISBN            string `json:"isbn"`
	Stock           int    `json:"stock"`
	Author_id       int    `json:"autor_id"`
	Category_id     int    `json:"category_id"`
}

func GetAllBooks() ([]Book, error) {

	query := `
			SELECT 
				l.id,
				l.titulo,
				l.fecha_publicacion,
				l.isbn,
				l.stock,
				a.nombre AS autor,
				c.nombre AS categoria
			FROM 
				Libros l
			JOIN 
				Autores a ON l.autor_id = a.id
			JOIN 
				Categoria c ON l.categoria_id = c.id;
	`

	rows, err := database.DB.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var books []Book

	for rows.Next() {
		var book Book

		if err := rows.Scan(&book.Id, &book.Title, &book.Publicaion_date, &book.ISBN, &book.Stock, &book.Author_name, &book.Category_name); err != nil {
			return nil, err
		}

		books = append(books, book)
	}

	return books, nil

}

func CreateBook(book BookRegister) error {
	query := `INSERT INTO Libros
		(titulo, fecha_publicacion, isbn, stock, autor_id, categoria_id)
		VALUES(?, ?, ?, ?, ?, ?);`

	_, err := database.DB.Exec(query, book.Title, book.Publicaion_date, book.ISBN, book.Stock, book.Author_id, book.Category_id)

	return err
}
