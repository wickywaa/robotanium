package controllers

import (
	"backendv2/models"
	"backendv2/pkg/database"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func CreateBot(c *fiber.Ctx) error {
	db := database.GetDB()

	bot := new(models.Bot)
	if err := c.BodyParser(bot); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	userInterface := c.Locals("user")

	if userInterface == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}

	authenticatedUser, ok := userInterface.(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}

	bot.AdminID = int(authenticatedUser.ID)

	if err := db.Create(bot).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create bot"})
	}

	return c.Status(fiber.StatusCreated).JSON(bot)

}

func GetBotById(c *fiber.Ctx) error {

	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Bot ID is required"})
	}

	userInterface := c.Locals("user")

	if userInterface == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}

	authenticatedUser, ok := userInterface.(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}
	db := database.GetDB()

	bot := new(models.Bot)
	if err := db.Where("id = ?", id).First(bot).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "Bot not found"})
	}

	if authenticatedUser.ID != uint(bot.AdminID) {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Forbidden"})
	}

	return c.Status(fiber.StatusOK).JSON(bot)

}

func GetBotsByUserId(c *fiber.Ctx) error {

	userInterface := c.Locals("user")

	if userInterface == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}

	authenticatedUser, ok := userInterface.(models.User)
	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Unauthorized"})
	}

	db := database.GetDB()

	var bots []models.Bot
	query := db.Model(&models.Bot{})

	if !authenticatedUser.IsRobotaniumAdmin {
		query = query.Where("admin_id = ?", authenticatedUser.ID)
	}

	query = query.Find(&bots)

	if query.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get bots"})
	}

	return c.Status(fiber.StatusOK).JSON(bots)

}

func UpdateBot(c *fiber.Ctx) error {
	fmt.Println("UpdateBot called")

	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "this fucntion is not allowed yet"})

}

func DeleteBot(c *fiber.Ctx) error {
	fmt.Println("DeleteBot called")

	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "this fucntion is not allowed yet"})

}
