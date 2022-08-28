package toppingdto

type ToppingRequest struct {
	Title string `json:"title" form:"name" gorm:"type: varchar(255)"`
	Price int    `json:"price" form:"price" gorm:"type: int"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Qty   int    `json:"qty" form:"qty" gorm:"type: int"`
	// CategoryID int    `json:"category_id" form:"category_id" gorm:"type: int"`
}

type UpdateToppingRequest struct {
	Title string `json:"title" form:"name" gorm:"type: varchar(255)"`
	Price int    `json:"price" form:"price" gorm:"type: int"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Qty   int    `json:"qty" form:"qty" gorm:"type: int"`
	// CategoryID int    `json:"category_id" form:"category_id" gorm:"type: int"`
}
