package controllers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func DeleteBot(c *fiber.Ctx) error {
	fmt.Println("DeleteBot called")

	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "this fucntion is not allowed yet"})

}
