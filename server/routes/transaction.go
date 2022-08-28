package routes

import (
	"waysbuck-API/handlers"
	"waysbuck-API/pkg/middleware"
	"waysbuck-API/pkg/mysql"
	"waysbuck-API/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions", middleware.Auth(h.FindTransactionId)).Methods("GET") //Transaction - Profile
	r.HandleFunc("/transaction_id", middleware.Auth(h.CreateTransaction)).Methods("POST")
	r.HandleFunc("/notification", h.Notification).Methods("POST")
	r.HandleFunc("/midtrans/{id}", middleware.Auth(h.Midtrans)).Methods("GET")

	// r.HandleFunc("/transactions", middleware.Auth(h.FindTransactions)).Methods("GET")   //Income
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.GetTransaction)).Methods("GET") //

	// r.HandleFunc("/transaction_id", middleware.Auth(h.CreateTransaction)).Methods("PATCH")
	// r.HandleFunc("/transaction/{id}", middleware.Auth(h.DeleteTransaction)).Methods("DELETE")
	// r.HandleFunc("/transaction-id", middleware.Auth(h.GetUserTransaction)).Methods("GET")

}
