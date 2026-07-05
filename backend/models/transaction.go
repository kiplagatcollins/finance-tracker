package models

import (
	"time"

	"github.com/uptrace/bun"
)

// Transaction represents a transaction in the database.
type Transaction struct {
	bun.BaseModel `bun:"table:transactions,alias:t"`

	ID        uint64 `bun:"id,pk,autoincrement"`
	AccountID uint64 `bun:"account_id"`
	Type      string `bun:"type"`
	Purpose   string `bun:"purpose"`
	Amount    float64
	CreatedAt time.Time
	UpdatedAt time.Time
}
