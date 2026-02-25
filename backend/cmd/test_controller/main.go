package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/google/uuid"
	"github.com/letera1/huhems-exam-system/backend/internal/config"
	"github.com/letera1/huhems-exam-system/backend/internal/db"
	"github.com/letera1/huhems-exam-system/backend/internal/models"
)

type adminStudentView struct {
	ID                uuid.UUID  `json:"id"`
	UserID            uuid.UUID  `json:"userId"`
	Username          string     `json:"username"`
	Email             string     `json:"email"`
	FullName          string     `json:"fullName"`
	Year              int        `json:"year"`
	Department        string     `json:"department"`
	CreatedAt         time.Time  `json:"createdAt"`
	PasswordChangedAt *time.Time `json:"passwordChangedAt"`
	DefaultPassword   string     `json:"defaultPassword,omitempty"`
}

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	database, err := db.Connect(cfg.DBURL)
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	var students []models.Student
	if err := database.Preload("User").Order("created_at desc").Find(&students).Error; err != nil {
		log.Fatalf("failed to load students: %v", err)
	}

	resp := make([]adminStudentView, 0, len(students))
	for _, s := range students {
		view := adminStudentView{
			ID:                s.ID,
			UserID:            s.UserID,
			Username:          s.User.Username,
			Email:             s.User.Email,
			FullName:          s.FullName,
			Year:              s.Year,
			Department:        s.Department,
			CreatedAt:         s.CreatedAt,
			PasswordChangedAt: s.User.PasswordChangedAt,
		}
		// Only show default password if it hasn't been changed
		if s.User.PasswordChangedAt == nil {
			view.DefaultPassword = s.User.DefaultPassword
		}
		resp = append(resp, view)
	}

	jsonData, err := json.MarshalIndent(resp, "", "  ")
	if err != nil {
		log.Fatalf("failed to marshal JSON: %v", err)
	}

	fmt.Println("\n=== Controller Response (JSON) ===")
	fmt.Println(string(jsonData))
	fmt.Println("\n=== End ===")
}
