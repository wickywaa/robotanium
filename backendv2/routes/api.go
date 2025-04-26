package routes

import (
	"backendv2/controllers"
	"backendv2/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// API v2 group
	api := app.Group("/api/v2")

	// Setup user routes
	setupUserRoutes(api)
	SetupBotRoutes(api)
}

func setupUserRoutes(api fiber.Router) {
	users := api.Group("/users")

	// Public routes (no authentication required)
	users.Post("/login", controllers.LoginUser)
	users.Post("/user", controllers.CreateUser)

	// Routes with authentication middleware applied individually
	users.Get("/user/:id", middleware.AuthMiddleware(), controllers.GetUser)
	users.Get("", middleware.AuthMiddleware(), controllers.GetUsers)
	users.Delete("/user/:id", middleware.AuthMiddleware(), controllers.DeleteuserById)
	users.Put("/user/:id", middleware.AuthMiddleware(), controllers.UpdateUser)
	users.Put("/changepassword", middleware.AuthMiddleware(), controllers.UpdatePassword)
}
