package models

import (
	"biblioteca/database"
	"database/sql"
	"errors"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserRegister struct {
	Password string `json:"password"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Rol      string `json:"rol"`
}

type User struct {
	Id       int    `json:"id"`
	Password string `json:"clave"`
	Username string `json:"nombre"`
	Email    string `json:"correo"`
	Rol      string `json:"rol"`
}

func GetUserByUsername(username string) (User, error) {
	var user User

	query := "SELECT * FROM Usuarios WHERE nombre = ? LIMIT 1"
	row := database.DB.QueryRow(query, username)
	err := row.Scan(&user.Id, &user.Password, &user.Username, &user.Email, &user.Rol)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return user, errors.New("usuario no encontrado")
		}
		return user, err
	}

	return user, nil

}

func CreateUser(user UserRegister) error {
	query := "INSERT INTO Usuarios (clave, nombre, correo, rol) VALUES(?, ?, ?, ?);"

	_, err := database.DB.Exec(query, user.Password, user.Username, user.Email, user.Rol)

	return err
}
