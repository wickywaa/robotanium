package controllers

import (
	"backendv2/models"
	"backendv2/pkg/database"
	"encoding/json"
	"context"
	"backendv2/pkg/firebase"
	"fmt"
	"io"
	"net/url"
	"time"

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

	var objectName string
	if noFile == nil {
		

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

		objectName = fmt.Sprintf("uploads/%d-%s", time.Now().Unix(), fileHeader.Filename)
		urlEncodedName := url.PathEscape(objectName)
		publicURL := fmt.Sprintf("https://firebasestorage.googleapis.com/v0/b/%s/%s?alt=media", "robotanium-admin.appspot.com/o", urlEncodedName)

		bot.ImageURL = publicURL

		writer := bucket.Object(objectName).NewWriter(ctx)
		writer.ContentType = fileHeader.Header.Get("Content-Type")


		if _, err := io.Copy(writer, file); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Failed to upload file")
		}
		if err := writer.Close(); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Failed to finalize upload")
		}

	}

	updated := false

	if req.BotName != "" && req.BotName != bot.Name {

		fmt.Println("should update ")
		bot.Name = req.BotName
		updated = true
	}

	if updated {
        //bot.UpdatedAt = time.Now()
       // Your logic to persist the bot
	

	if err := db.Save(bot).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": fmt.Sprintf("Failed to create bot: %v", err)})
	}
	}




	fmt.Printf("%+v\n", bot)
	fmt.Printf("%+v\n", noFile)
	fmt.Println(fileHeader)

	return c.Status(200).JSON(fiber.Map{"message": "nothing to update"})

}
