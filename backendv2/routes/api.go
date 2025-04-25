package routes

import (
	"backendv2/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v2/users")

	api.Get("/user/:id", controllers.GetUser)
	api.Get("/user", controllers.GetUsers)
	api.Post("/", controllers.CreateUser)
	api.Post("/login", controllers.LoginUser)

}
