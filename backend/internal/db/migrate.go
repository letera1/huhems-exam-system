package db

import (
	"github.com/letera1/huhems-exam-system/backend/internal/models"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	// Needed for gen_random_uuid() default.
	if err := RequireExtension(db, "pgcrypto"); err != nil {
		return err
	}

	// First make sure the roles table exists if not it will be created by AutoMigrate
	// However, if the table exists but lacks the deleted_at column or other fields, AutoMigrate should handle it.
	// The problem is likely conflicting existing table structure with GORM's expectation or prepared statement caching issue.

	return db.AutoMigrate(
		&models.Role{},
		&models.User{},
		&models.Student{},
		&models.Exam{},
		&models.Question{},
		&models.Choice{},
		&models.ExamAttempt{},
		&models.StudentAnswer{},
		&models.AuditLog{},
	)
}
