package routes

import (
	"waysbuck-API/handlers"
	"waysbuck-API/pkg/mysql"
	"waysbuck-API/repositories"

	"github.com/gorilla/mux"
)

func ProfileRoutes(r *mux.Router) {
	profileRepository := repositories.RepositoryProfile(mysql.DB)
	h := handlers.HandlerProfile(profileRepository)

	r.HandleFunc("/profile/{id}", h.GetProfile).Methods("GET")
}
