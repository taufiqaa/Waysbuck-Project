package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	profiledto "waysbuck-API/dto/profile"
	dto "waysbuck-API/dto/result"
	"waysbuck-API/models"
	"waysbuck-API/repositories"

	"github.com/gorilla/mux"
)

type handlerProfile struct {
	ProfileRepository repositories.ProfileRepository
}

func HandlerProfile(ProfileRepository repositories.ProfileRepository) *handlerProfile {
	return &handlerProfile{ProfileRepository}
}

func (h *handlerProfile) FindProfiles(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	profiles_data, err := h.ProfileRepository.FindProfiles()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "Success", Data: profiles_data}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerProfile) GetProfile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	var profile models.Profile
	profile, err := h.ProfileRepository.GetProfile(id)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Status: "success", Data: convertResponseProfile(profile)}
	json.NewEncoder(w).Encode(response)
}

func convertResponseProfile(u models.Profile) profiledto.ProfileResponse {
	return profiledto.ProfileResponse{
		ID:      u.ID,
		Phone:   u.Phone,
		Address: u.Address,
		UserID:  u.UserID,
		User:    u.User,
	}
}
