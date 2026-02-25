package main

import (
	"log"

	"github.com/gin-gonic/gin"

	"github.com/letera1/huhems-exam-system/backend/internal/config"
	"github.com/letera1/huhems-exam-system/backend/internal/db"
	"github.com/letera1/huhems-exam-system/backend/internal/routes"
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

	if err := db.Migrate(database); err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())

	routes.Register(router, database, cfg.JWTSecret)

	addr := ":" + cfg.Port
	log.Printf("backend listening on %s", addr)
	if err := router.Run(addr); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
