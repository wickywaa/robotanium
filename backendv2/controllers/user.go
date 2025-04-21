package controllers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

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
