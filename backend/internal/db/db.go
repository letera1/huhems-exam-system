package db

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(dbURL string) (*gorm.DB, error) {
	// GORM config with prepare statement disabled and skip default transaction
	config := &gorm.Config{
		PrepareStmt:            false,
		SkipDefaultTransaction: true,
	}

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dbURL,
		PreferSimpleProtocol: true, // This disables implicit prepared statements in the driver itself
	}), config)

	if err != nil {
		return nil, err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	if err := sqlDB.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func Exec(db *gorm.DB, sql string) error {
	return db.Exec(sql).Error
}

func RequireExtension(db *gorm.DB, name string) error {
	return Exec(db, fmt.Sprintf("CREATE EXTENSION IF NOT EXISTS %s;", name))
}
