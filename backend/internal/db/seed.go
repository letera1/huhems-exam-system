package db

import (
	"log"

	"github.com/google/uuid"
	"github.com/letera1/huhems-exam-system/backend/internal/auth"
	"github.com/letera1/huhems-exam-system/backend/internal/models"
	"gorm.io/gorm"
)

const (
	AdminUsername   = "admin"
	AdminPassword   = "Admin123!"
	AdminEmail      = "admin@huhems.local"
	StudentUsername = "student"
	StudentPassword = "Student123!"
	StudentEmail    = "student@huhems.local"
)

// Seed ensures that the default roles and users exist in the database.
// It will NOT overwrite existing users' passwords if they already exist.
func Seed(db *gorm.DB) error {
	// 1. Ensure Roles Exist
	adminRole := models.Role{Name: "admin"}
	if err := db.Where("name = ?", adminRole.Name).FirstOrCreate(&adminRole).Error; err != nil {
		return err
	}

	studentRole := models.Role{Name: "student"}
	if err := db.Where("name = ?", studentRole.Name).FirstOrCreate(&studentRole).Error; err != nil {
		return err
	}

	// 2. Ensure Admin Exists (Safe)
	if err := ensureUser(db, AdminUsername, AdminEmail, AdminPassword, adminRole.ID); err != nil {
		return err
	}

	// 3. Ensure Student Exists (Safe)
	studentUser, err := ensureUserReturning(db, StudentUsername, StudentEmail, StudentPassword, studentRole.ID)
	if err != nil {
		return err
	}

	// 4. Ensure Student Profile Exists
	student := models.Student{
		UserID:     studentUser.ID,
		FullName:   "Demo Student",
		Year:       4,
		Department: "Software Engineering",
	}
	if err := db.Where("user_id = ?", student.UserID).FirstOrCreate(&student).Error; err != nil {
		return err
	}

	log.Println("Database seeded with default data (if missing)")
	return nil
}

func ensureUser(db *gorm.DB, username, email, password string, roleID uuid.UUID) error {
	_, err := ensureUserReturning(db, username, email, password, roleID)
	return err
}

func ensureUserReturning(db *gorm.DB, username, email, password string, roleID uuid.UUID) (models.User, error) {
	var user models.User
	err := db.Where("username = ?", username).Or("email = ?", email).First(&user).Error

	if err == nil {
		// User already exists, do nothing
		return user, nil
	}

	if err != gorm.ErrRecordNotFound {
		// Database error
		return models.User{}, err
	}

	// User does not exist, create it
	hash, err := auth.HashPassword(password)
	if err != nil {
		return models.User{}, err
	}

	user = models.User{
		Username:          username,
		Email:             email,
		PasswordHash:      hash,
		DefaultPassword:   password, // Store the default password for display
		RoleID:            roleID,
		PasswordChangedAt: nil, // Ensure it's treated as default
	}

	if err := db.Create(&user).Error; err != nil {
		return models.User{}, err
	}

	log.Printf("Created default user: %s (password: %s)", username, password)
	return user, nil
}
