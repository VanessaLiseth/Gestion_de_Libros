package models

import (
	"biblioteca/database"
	"time"
)

type LoanRegister struct {
	User_id int `json:"user_id"`
	Book_id int `json:"book_id"`
}

type LoanResponse struct {
	Id              int     `json:"id"`
	User_id         int     `json:"user_id"`
	User_name       string  `json:"user_name"`
	Book_id         int     `json:"book_id"`
	Book_Title      string  `json:"book_title"`
	Loan_date       string  `json:"loan_date"`
	Loan_devolution *string `json:"loan_devolution"`
	Status          string  `json:"status"`
}

func GetAllLoans() ([]LoanResponse, error) {
	rows, err := database.DB.Query(`SELECT 
										p.id,
										u.id AS usuario_id,
										u.nombre AS nombre_usuario,
										l.id AS libro_id,
										l.titulo AS nombre_libro,
										p.fecha_prestamos,
										p.fecha_devolucion,
										p.estado
									FROM 
										Prestamos_libros p
									JOIN 
										Usuarios u ON p.usuario_id = u.id
									JOIN 
										Libros l ON p.libro_id = l.id;`)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var categories []LoanResponse

	for rows.Next() {
		var category LoanResponse

		if err := rows.Scan(&category.Id, &category.User_id, &category.User_name, &category.Book_id, &category.Book_Title, &category.Loan_date, &category.Loan_devolution, &category.Status); err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil

}

func CreateLoan(category LoanRegister) error {
	query := `INSERT INTO biblioteca.Prestamos_libros
				(usuario_id, libro_id, fecha_prestamos, estado)
				VALUES(?, ?, ?, 'PENDIENTE');`

	ahora := time.Now()
	fechaFormateada := ahora.Format("2006-01-02")

	_, err := database.DB.Exec(query, category.User_id, category.Book_id, fechaFormateada)

	return err
}

func UpdateLoan(id_loan int) error {
	query := `UPDATE Prestamos_libros p
				SET p.fecha_devolucion = ?, p.estado = 'Devuelto'
				WHERE p.id = ?;`

	ahora := time.Now()
	fechaFormateada := ahora.Format("2006-01-02")

	_, err := database.DB.Exec(query, fechaFormateada, id_loan)

	return err
}

func GetLoansByUserID(user_id int) ([]LoanResponse, error) {
	rows, err := database.DB.Query(`SELECT 
										p.id,
										u.id AS usuario_id,
										u.nombre AS nombre_usuario,
										l.id AS libro_id,
										l.titulo AS nombre_libro,
										p.fecha_prestamos,
										p.fecha_devolucion,
										p.estado
									FROM 
										Prestamos_libros p
									JOIN 
										Usuarios u ON p.usuario_id = u.id
									JOIN 
										Libros l ON p.libro_id = l.id
									WHERE p.usuario_id = ?;`, user_id)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var categories []LoanResponse

	for rows.Next() {
		var category LoanResponse

		if err := rows.Scan(&category.Id, &category.User_id, &category.User_name, &category.Book_id, &category.Book_Title, &category.Loan_date, &category.Loan_devolution, &category.Status); err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil

}
