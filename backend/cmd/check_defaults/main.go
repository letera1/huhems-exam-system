package main

import (
	"fmt"
	"log"

	"github.com/letera1/huhems-exam-system/backend/internal/config"
	"github.com/letera1/huhems-exam-system/backend/internal/db"
	"github.com/letera1/huhems-exam-system/backend/internal/models"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("failed to load config: %v", err)
	}

	database, err := db.Connect(cfg.DBURL)
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	var users []models.User
	if err := database.Preload("Role").Find(&users).Error; err != nil {
		log.Fatalf("failed to load users: %v", err)
	}

	fmt.Println("\n=== User Default Password Status ===")
	for _, u := range users {
		fmt.Printf("\nUsername: %s\n", u.Username)
		fmt.Printf("Email: %s\n", u.Email)
		fmt.Printf("Role: %s\n", u.Role.Name)
		fmt.Printf("Default Password: '%s'\n", u.DefaultPassword)
		fmt.Printf("Default Password Length: %d\n", len(u.DefaultPassword))
		fmt.Printf("Password Changed At: %v\n", u.PasswordChangedAt)
		fmt.Printf("Should Show Default: %v\n", u.PasswordChangedAt == nil && u.DefaultPassword != "")
	}
	fmt.Println("\n=== End ===")
}
