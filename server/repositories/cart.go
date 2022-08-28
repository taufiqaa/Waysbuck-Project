package repositories

import (
	"waysbuck-API/models"

	"gorm.io/gorm"
)

type CartRepository interface {
	FindCarts() ([]models.Cart, error) //ok
	GetCart(ID int) (models.Cart, error)
	CreateCart(cart models.Cart) (models.Cart, error) //use
	UpdateCart(cart models.Cart) (models.Cart, error)
	FindCartId(CartId int) ([]models.Cart, error)           //use
	UpdateCartTransaction(models.Cart) (models.Cart, error) //use
	DeleteCart(cart models.Cart) (models.Cart, error)
	FindToppingsID(ToppingID []int) ([]models.Topping, error) //ok
	// FindCartsByID(userID int) ([]models.Cart, error)          //ok
	// FindCartsTransaction(TransactionID int)
}

func RepositoryCart(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindCarts() ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Preload("Topping").Find(&carts).Error

	return carts, err
}

func (r *repository) GetCart(ID int) (models.Cart, error) {
	var cart models.Cart
	err := r.db.Preload("Product").First(&cart, ID).Error

	return cart, err
}

func (r *repository) CreateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Create(&cart).Error

	return cart, err
}

func (r *repository) FindToppingsID(ToppingID []int) ([]models.Topping, error) {
	var toppings []models.Topping
	err := r.db.Debug().Find(&toppings, ToppingID).Error

	return toppings, err
}

func (r *repository) UpdateCartTransaction(cart models.Cart) (models.Cart, error) {
	err := r.db.Save(&cart).Error

	return cart, err
}

func (r *repository) UpdateCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Save(&cart).Error

	return cart, err
}

func (r *repository) DeleteCart(cart models.Cart) (models.Cart, error) {
	err := r.db.Delete(&cart).Error

	return cart, err
}

func (r *repository) FindCartId(UserID int) ([]models.Cart, error) {
	var carts []models.Cart
	err := r.db.Preload("Product").Preload("Topping").Find(&carts, "user_id = ?", UserID).Error

	return carts, err
}

// func (r *repository) FindCartsByID(userID int) ([]models.Cart, error) {
// 	var carts []models.Cart
// 	err := r.db.Preload("Product").Preload("Topping").Find(&carts, "user_id = ?", userID).Error

// 	return carts, err
// }
