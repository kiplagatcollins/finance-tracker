package database

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/kiplagatcollins/finance-tracker/config"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"
	"github.com/uptrace/bun/driver/pgdriver"
)

// NewPostgresDB initializes and returns a new Bun DB instance for PostgreSQL.
// It expects the PostgreSQL DSN to be set in the DATABASE_URL environment variable.
func NewPostgresDB(c config.Config) (*bun.DB, error) {
	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable",
		c.Database.User, c.Database.Password, c.Database.Host, c.Database.Port, c.Database.Name)
	if dsn == "" {
		return nil, fmt.Errorf("DATABASE_URL environment variable is not set")
	}

	// Create a new SQL database connection using pgdriver
	sqldb := sql.OpenDB(pgdriver.NewConnector(pgdriver.WithDSN(dsn)))

	// Set connection pool settings
	sqldb.SetMaxOpenConns(25)
	sqldb.SetMaxIdleConns(25)
	sqldb.SetConnMaxLifetime(5 * time.Minute)

	// Ping the database to verify the connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := sqldb.PingContext(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	// Create a new Bun DB instance with the PostgreSQL dialect
	db := bun.NewDB(sqldb, pgdialect.New())

	log.Println("Successfully connected to PostgreSQL database using Bun.")
	return db, nil
}
