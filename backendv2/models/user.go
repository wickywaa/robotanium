package models

import (
	"crypto/rand"
	"errors"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID                 uint     `gorm:"primaryKey"`
	Email              string   `gorm:"uniqueIndex;not null"`
	Username           string   `gorm:"not null"`
	PasswordHash       string   `gorm:"not null"`
	IsRobotaniumAdmin  bool     `gorm:"default:false"`
	IsPlayerAdmin      bool     `gorm:"default:false"`
	IsActive           bool     `gorm:"default:true"`
	IsEmailVerified    bool     `gorm:"default:false"`
	AuthTokens         []string `gorm:"type:text[]"` // PostgreSQL array
	PasswordResetToken *string  `gorm:"type:varchar(255)"`
	RegistrationToken  *string  `gorm:"type:varchar(255)"`
	Theme              string   `gorm:"default:'dark'"`
	CreatedAt          time.Time
	UpdatedAt          time.Time
	DeletedAt          gorm.DeletedAt `gorm:"index"` // Soft delete
}

// Methods similar to your MongoDB schema
type UserMethods interface {
	GenerateAuthToken() (string, error)
	GetPublicProfile() map[string]interface{}
	GenerateConfirmEmailDto() (EmailConfirmationDto, error)
	ConfirmEmail(dto EmailConfirmationDto) (bool, error)
	SetPassword(password string) error
	CheckPassword(password string) bool
}

type EmailConfirmationDto struct {
	RegistrationToken string
	Email             string
}

func generateRandomToken() string {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return ""
	}
	return fmt.Sprintf("%x", b)
}

// BeforeSave hook - similar to your MongoDB pre-save
func (u *User) BeforeSave(tx *gorm.DB) error {
	// Password hashing is handled in SetPassword method
	return nil
}

// SetPassword - handles password hashing
func (u *User) SetPassword(password string) error {
	if len(password) < 8 {
		return errors.New("password must be at least 8 characters")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	u.PasswordHash = string(hashedPassword)
	return nil
}

// CheckPassword - verifies password
func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password))
	return err == nil
}

// GenerateAuthToken - similar to your MongoDB method
func (u *User) GenerateAuthToken() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["user_id"] = u.ID
	claims["exp"] = time.Now().Add(time.Hour * 24).Unix()

	tokenString, err := token.SignedString([]byte("your-secret-key")) // Use env variable in production
	if err != nil {
		return "", err
	}

	// Clean up old tokens and add new one
	u.AuthTokens = append(u.AuthTokens, tokenString)
	return tokenString, nil
}

// GetPublicProfile - similar to your MongoDB method
func (u *User) GetPublicProfile() map[string]interface{} {
	return map[string]interface{}{
		"id":                u.ID,
		"email":             u.Email,
		"username":          u.Username,
		"isRobotaniumAdmin": u.IsRobotaniumAdmin,
		"isPlayerAdmin":     u.IsPlayerAdmin,
		"isActive":          u.IsActive,
		"isEmailVerified":   u.IsEmailVerified,
		"theme":             u.Theme,
	}
}

// GenerateConfirmEmailDto - similar to your MongoDB method
func (u *User) GenerateConfirmEmailDto() (EmailConfirmationDto, error) {
	token := generateRandomToken() // Implement this helper function
	hashedToken, err := bcrypt.GenerateFromPassword([]byte(token), bcrypt.DefaultCost)
	if err != nil {
		return EmailConfirmationDto{}, err
	}

	tokenStr := string(hashedToken)
	u.RegistrationToken = &tokenStr

	return EmailConfirmationDto{
		RegistrationToken: token,
		Email:             u.Email,
	}, nil
}

// ConfirmEmail - similar to your MongoDB method
func (u *User) ConfirmEmail(dto EmailConfirmationDto) (bool, error) {
	if u.RegistrationToken == nil {
		return false, errors.New("no registration token found")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(*u.RegistrationToken), []byte(dto.RegistrationToken)); err != nil {
		return false, err
	}

	u.IsEmailVerified = true
	u.RegistrationToken = nil
	return true, nil
}
