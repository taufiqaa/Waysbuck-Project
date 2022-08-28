package models

import "time"

type Transaction struct {
	ID        int                  `json:"id" gorm:"primary_key:auto_increment"`
	UserID    int                  `json:"user_id"`
	User      UsersProfileResponse `json:"user"`
	Carts     []Cart               `json:"cart"`
	Status    string               `json:"status"`
	Amount    int                  `json:"amount"`
	UpdatedAt time.Time            `json:"updated_at"`
}

type TransactionResponse struct {
	ID     int `json:"id"`
	UserID int `json:"user_id"`
}

func (TransactionResponse) TableName() string {
	return "transactions"
}
