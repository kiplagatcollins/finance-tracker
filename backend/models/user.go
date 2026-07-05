package models

import (
	"time"

	"github.com/uptrace/bun"
)

// User represents a user in the database.
type User struct {
	bun.BaseModel `bun:"table:users,alias:u"`

	ID        uint64 `bun:"id,pk,autoincrement"`
	FirstName string `bun:"first_name"`
	LastName  string `bun:"last_name"`
	Email     string `bun:"email"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
