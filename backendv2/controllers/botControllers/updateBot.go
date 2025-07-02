package controllers

import (
	"backendv2/models"
	"backendv2/pkg/database"
	"encoding/json"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func UpdateBot(c *fiber.Ctx) error {

	fmt.Println("UpdateBot called")
	botIDStr := c.Params("id")
	userInterface := c.Locals("user")

	if userInterface == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "unauthorized"})
	}

	authenticatedUser, ok := userInterface.(models.User)

	if !ok {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "unauthorized"})
	}

	var req models.BotRequest

	fileHeader, noFile := c.FormFile("image")
	payload := c.FormValue("payload")
	db := database.GetDB()

	bot := new(models.Bot)

	if err := c.BodyParser(bot); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid request"})
	}

	if err := json.Unmarshal([]byte(payload), &req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid JSON payload",
		})
	}

	if !authenticatedUser.IsRobotaniumAdmin {
		db.Where("admin_id = ? AND id = ? ", authenticatedUser.ID, botIDStr).Preload("Cockpits").Order("created_at desc").Find(&bot)
	}

	if authenticatedUser.IsRobotaniumAdmin {
		db.Where("id = ?").Preload("Cockpits").Order("created_at desc").Find(&bot)
	}

	fmt.Printf("%+v\n", bot)
	fmt.Printf("%+v\n", noFile)
	fmt.Println(fileHeader)

	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "this fucntion is not allowed yet"})

}
