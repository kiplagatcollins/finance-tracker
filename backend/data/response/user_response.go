package response

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kiplagatcollins/finance-tracker/models"
)

// UserResponse is a struct that represents a user response.
type UserResponse struct {
	ID        uint64 `json:"id"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
}

// UserResponses is a slice of UserResponse structs.
type UserResponses []UserResponse

// UserResponseFromModel converts a User model to a UserResponse.
func UserResponseFromModel(user models.User) UserResponse {
	return UserResponse{
		ID:        user.ID,
		FirstName: user.FirstName,
		LastName:  user.LastName,
		Email:     user.Email,
	}
}

func UserResponsesFromModels(users []models.User) UserResponses {
	var userResponses UserResponses
	for _, user := range users {
		userResponses = append(userResponses, UserResponseFromModel(user))
	}
	return userResponses
}

// UserResponseToCtx converts a UserResponse to a response context.
func UserResponseToCtx(c *fiber.Ctx, userResponse UserResponse) error {
	return c.JSON(userResponse)
}

// UserResponsesToCtx converts a UserResponses to a response context.
func UserResponsesToCtx(c *fiber.Ctx, userResponses UserResponses) error {
	return c.JSON(userResponses)
}
