package profiledto

import "waysbuck-API/models"

type ProfileResponse struct {
	ID      int                         `json:"id" gorm:"primary_key:auto_increment"`
	Phone   int                         `json:"phone" gorm:"type: varchar(255)"`
	Address string                      `json:"address" gorm:"type: text"`
	Image   string                      `json:"image" form:"image" gorm:"type: varchar(255)"`
	UserID  int                         `json:"user_id"`
	User    models.UsersProfileResponse `json:"user"`
}

type UpdateProfile struct {
	Address string `json:"address" form:"address"`
	Phone   string `json:"phone" form:"phone"`
	Image   string `json:"image" form:"image"`
	UserID  int    `json:"user_id"`
}
