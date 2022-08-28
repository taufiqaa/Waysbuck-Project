package repositories

import (
	"waysbuck-API/models"

	"gorm.io/gorm"
)

type ProfileRepository interface {
	GetProfile(ID int) (models.Profile, error)
	FindProfiles() ([]models.Profile, error)
	CreateProfile(models.Profile) (models.Profile, error)
}

func RepositoryProfile(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindProfiles() ([]models.Profile, error) {
	var profiles []models.Profile
	err := r.db.Preload("User").Find(&profiles).Error

	return profiles, err
}

func (r *repository) GetProfile(ID int) (models.Profile, error) {
	var profile models.Profile
	err := r.db.Preload("User").First(&profile, ID).Error

	return profile, err
}
