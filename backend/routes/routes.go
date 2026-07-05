package routes

import (
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes sets up the routes for the application.
func SetupRoutes(app *fiber.App, controllers *controllers.Controllers) {
	app.Get("/", controllers.Home)
	app.Get("/api/v1/accounts", controllers.Accounts)
	app.Get("/api/v1/transactions", controllers.Transactions)
}
