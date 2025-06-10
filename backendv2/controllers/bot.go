package controllers

import (
	"backendv2/models"
	"backendv2/pkg/database"
	"backendv2/pkg/firebase"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/url"
	"time"

	"github.com/gofiber/fiber/v2"
)

type BotRequest struct {
	BotName  string `json:"botName"`
	Password string `json:"password"`
}

func CreateBot(c *fiber.Ctx) error {

	var errors []string
	var req BotRequest
	fileHeader, err := c.FormFile("image")

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "no file found"})
	}

	payload := c.FormValue("payload")
	db := database.GetDB()
	fmt.Println("Raw JSON payload string:", payload)

	bot := new(models.Bot)
	if err := c.BodyParser(bot); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	if err := json.Unmarshal([]byte(payload), &req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON payload",
		})
	}

	if len(req.BotName) < 3 {
		errors = append(errors, "botName must be at least 3 characters")
	}
	if len(req.Password) < 6 {
		errors = append(errors, "password must be at least 6 characters")
	}

	if len(errors) > 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"errors": errors,
		})
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
	bot.Name = req.BotName
	bot.SetPassword(req.Password)
	file, err := fileHeader.Open()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Cannot open file")
	}

	defer file.Close()
	ctx := context.Background()
	bucket, err := firebase.StorageClient.DefaultBucket()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Cannot access bucket")
	}

	objectName := fmt.Sprintf("uploads/%d-%s", time.Now().Unix(), fileHeader.Filename)
	urlEncodedName := url.PathEscape(objectName)
	publicURL := fmt.Sprintf("https://firebasestorage.googleapis.com/%s/%s?alt=media", "robotanium-admin.appspot.com", urlEncodedName)

	bot.ImageURL = publicURL

	writer := bucket.Object(objectName).NewWriter(ctx)
	writer.ContentType = fileHeader.Header.Get("Content-Type")

	if _, err := io.Copy(writer, file); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to upload file")
	}
	if err := writer.Close(); err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("Failed to finalize upload")
	}

	if err := db.Create(bot).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": fmt.Sprintf("Failed to create bot: %v", err)})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message":  "bot created",
		"filePath": objectName,
		"bot":      bot,
	})

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
