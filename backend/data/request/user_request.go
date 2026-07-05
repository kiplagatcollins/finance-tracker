package request

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kiplagatcollins/finance-tracker/models"
)

// UserRequest is a struct that represents a user request.
type UserRequest struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

// UserRequestFromCtx converts a request context to a UserRequest.
func UserRequestFromCtx(c *fiber.Ctx) UserRequest {
	var userRequest UserRequest
	if err := c.BodyParser(&userRequest); err != nil {
		panic(err)
	}
	return userRequest
}

// UserRequestToModel converts a UserRequest to a User model.
func UserRequestToModel(userRequest UserRequest) models.User {
	return models.User{
		FirstName: userRequest.FirstName,
		LastName:  userRequest.LastName,
		Email:     userRequest.Email,
	}
}
