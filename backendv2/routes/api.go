package routes

import (
	"backendv2/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v2")

	api.Get("/user/:id", controllers.GetUser)
	api.Get("/users", controllers.GetUsers)
	api.Post("/users", controllers.CreateUser)

}
