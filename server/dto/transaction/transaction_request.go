package transactiondto

type TransactionRequest struct {
	UserID int    `json:"user_id" form:"user_id"`
	Amount int    `json:"amount"`
	Status string `json:"status"`
}

type UpdateTransaction struct {
	UserID int    `json:"user_id" form:"user_id"`
	Status string `json:"status"`
	Amount int    `json:"amount"`
}

type AmountTransaction struct {
	Amount int `json:"amount"`
}
