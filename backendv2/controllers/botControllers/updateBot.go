package controllers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func UpdateBot(c *fiber.Ctx) error {
	fmt.Println("UpdateBot called")

	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "this fucntion is not allowed yet"})

}
