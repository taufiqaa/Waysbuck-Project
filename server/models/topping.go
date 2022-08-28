package models

type Topping struct {
	ID    int    `json:"id" gorm:"primary_key:auto_increment"`
	Title string `json:"title" form:"title" gorm:"type: varchar(255)"`
	Price int    `json:"price" form:"price" gorm:"type: int"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
}

type ToppingResponse struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Price int    `json:"price"`
	Image string `json:"image"`
}

type ToppingUserResponse struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Price  int    `json:"price"`
	Image  string `json:"image"`
	UserID int    `json:"-"`
}

func (ToppingResponse) TableName() string {
	return "toppings"
}

func (ToppingUserResponse) TableName() string {
	return "toppings"
}
