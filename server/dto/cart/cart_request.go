package cartdto

type CartRequest struct {
	UserID        int   `json:"user_id"`
	ProductID     int   `json:"product_id" form:"product_id"`
	ToppingID     []int `json:"topping_id" form:"topping_id"`
	SubAmount     int   `json:"sub_amount" form:"sub_amount"`
	TransactionID int   `json:"transaction_id"`
	// Qty       int    `json:"qty"`
	// Status string `json:"status"`
}

type UpdateCart struct {
	TransactionID int `json:"transaction_id"`
	UserID        int `json:"user_id"`
}

type CartResponse struct {
	ID        int `json:"id"`
	SubAmount int `json:"sub_amount"`
}
