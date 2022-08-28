package repositories

import (
	"waysbuck-API/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransactions() ([]models.Transaction, error)                              //
	FindTransactionId(UserID int) ([]models.Transaction, error)                   //use
	GetTransaction(ID int) (models.Transaction, error)                            //
	GetOneTransaction(ID string) (models.Transaction, error)                      //
	CreateTransaction(transaction models.Transaction) (models.Transaction, error) //use
	UpdateTransaction(transaction models.Transaction) (models.Transaction, error)
	// DeleteTransaction(transaction models.Transaction) (models.Transaction, error)
	// GetUserTransaction(ID int) ([]models.Transaction, error) //
	UpdateTransactionStatus(status string, ID string) error //use

	//GetEmailTransaction
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("Carts.Product").Preload("Carts.Topping").Preload("User").Find(&transactions).Error

	return transactions, err
}

func (r *repository) FindTransactionId(UserID int) ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Find(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransactionStatus(status string, ID string) error {
	var transaction models.Transaction
	r.db.Preload("Product").First(&transaction, ID)

	if status != transaction.Status && status == "success" {
		var product models.Product
		r.db.First(&product, transaction.ID)
	}

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) DeleteTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}

func (r *repository) GetUserTransaction(UserID int) ([]models.Transaction, error) {
	var user []models.Transaction
	err := r.db.Debug().Preload("User").Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Find(&user, "user_id = ?", UserID).Error

	return user, err
}

func (r *repository) GetOneTransaction(ID string) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("Carts").Preload("Carts.Product").Preload("Carts.Topping").Preload("User").First(&transaction, "id = ?", ID).Error

	return transaction, err
}
