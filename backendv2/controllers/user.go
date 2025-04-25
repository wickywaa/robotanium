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
	return c.JSON(fiber.Map{
		"user": "John Doe",
	})
}

func GetUsers(c *fiber.Ctx) error {

	id := c.Params("id")
	if id == "" {
		return c.Status(400).JSON(
			fiber.Map{
				"error": "User ID is required",
			},
		)
	}

	return c.JSON(fiber.Map{
		"users": []string{"Alice", "Bob"},
	})
}

func CreateUser(c *fiber.Ctx) error {
	type User struct {
		Name string `json:"name"`
	}
	var user User
	if err := c.BodyParser(&user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}
