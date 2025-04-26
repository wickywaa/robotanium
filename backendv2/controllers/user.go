package controllers

import (
	"backendv2/models"
	"backendv2/pkg/database"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func LoginUser(c *fiber.Ctx) error {
	type LoginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	fmt.Println("LoginUser called")

	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	db := database.GetDB()
	var user models.User
	if err := db.Where("email = ?", req.Email).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	if !user.CheckPassword(req.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}

	token, err := user.GenerateAuthToken()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not generate token"})
	}

	return c.JSON(fiber.Map{
		"token": token,
		"user":  user.GetPublicProfile(),
	})
}

func GetUser(c *fiber.Ctx) error {
	id := c.Params("id")
	fmt.Printf("Got request for user ID: %s\n", id)

	// Check if the user exists in the context
	userInterface := c.Locals("user")
	if userInterface == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not authenticated",
		})
	}

	// Get the authenticated user from the context
	authenticatedUser, ok := userInterface.(models.User)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid user data in context",
		})
	}

	// You can now use the authenticated user information
	fmt.Printf("Request made by authenticated user: %s (ID: %d)\n", authenticatedUser.Username, authenticatedUser.ID)

	return c.JSON(fiber.Map{
		"user":               "John Doe",
		"authenticated_user": authenticatedUser.GetPublicProfile(),
	})
}

func GetUsers(c *fiber.Ctx) error {
	fmt.Println("Getting users")
	userInterface := c.Locals("user")
	if userInterface == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not authenticated",
		})
	}

	authenticatedUser, ok := userInterface.(models.User)
	if !ok {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Invalid user data in context",
		})
	}

	if  !authenticatedUser.IsRobotaniumAdmin {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "User not authorized",
		})
	}


	users := []models.User{}
	db := database.GetDB()
	if err := db.Find(&users).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to fetch users",
		})
	}

	publicUsers := make([]fiber.Map, len(users))
	for i, user := range users {
		publicUsers[i] = user.GetPublicProfile()
	}

	return c.JSON(fiber.Map{
		"users": publicUsers,
	})
}


func CreateUser(c *fiber.Ctx) error {
	type User struct {
		Name string `json:"name"`
	}
	fmt.Println("Creating user")
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}

func DeleteuserById(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "User ID is required"})
	}

	fmt.Println("Deleting user with ID:", id)

	db := database.GetDB()
	if err := db.Where("id = ?", id).Delete(&models.User{}).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete user"})
	}

	return c.Status(200).JSON(fiber.Map{"message": "User deleted successfully"})
}

// UserUpdate represents the fields that can be updated
type UserUpdate struct {
	Username string `json:"username,omitempty"`
	Email    string `json:"email,omitempty"`
	Theme    string `json:"theme,omitempty"`
}

func UpdateUser(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "User ID is required"})
	}

	db := database.GetDB()
	var existingUser models.User
	if err := db.Where("id = ?", id).First(&existingUser).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	// Parse only the allowed update fields
	var updateData UserUpdate
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	// Update only the fields that were provided
	if updateData.Username != "" {
		existingUser.Username = updateData.Username
	}
	if updateData.Email != "" {
		existingUser.Email = updateData.Email
	}
	if updateData.Theme != "" {
		existingUser.Theme = updateData.Theme
	}

	// Save the changes to the database
	if err := db.Save(&existingUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update user"})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "User updated successfully",
		"user":    existingUser.GetPublicProfile(),
	})
}

func UpdatePassword(c *fiber.Ctx) error {
	id := c.Params("id")
	password := c.FormValue("password")

	if id == "" {
		return c.Status(400).JSON(fiber.Map{"error": "User ID is required"})
	}

	if password == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Password is required"})
	}

	db := database.GetDB()
	var existingUser models.User
	if err := db.Where("id = ?", id).First(&existingUser).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	// Use the SetPassword method to hash the password
	if err := existingUser.SetPassword(password); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if err := db.Save(&existingUser).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update password"})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Password updated successfully",
		"user":    existingUser.GetPublicProfile(),
	})
}
