package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var DB *sql.DB

func Connect() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error cargando el archivo .env")
	}

	user := os.Getenv("DB_USER")
	pass := os.Getenv("DB_PASS")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	name := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, pass, host, port, name)
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error abriendo conexión: ", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatal("Error conectando a MySQL: ", err)
	}

	log.Println("Conexión exitosa a MySQL")
}
