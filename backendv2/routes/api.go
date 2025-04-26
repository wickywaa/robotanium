package routes

import (
	"backendv2/controllers"
	"backendv2/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api/v2/users")

	// Public routes (no authentication required)
	api.Post("/login", controllers.LoginUser)
	api.Post("/user", controllers.CreateUser)

	// Routes with authentication middleware applied individually
	api.Get("/user/:id", middleware.AuthMiddleware(), controllers.GetUser)
	api.Get("", middleware.AuthMiddleware(), controllers.GetUsers)
	api.Delete("/user/:id", middleware.AuthMiddleware(), controllers.DeleteuserById)
	api.Put("/user/:id", middleware.AuthMiddleware(), controllers.UpdateUser)
	api.Put("/changepassword", middleware.AuthMiddleware(), controllers.UpdatePassword)
}
