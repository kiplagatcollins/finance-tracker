package controller

import (
	"strconv"

	"github.com/gofiber/fiber/v2" // Required for models.User, used in service layer interaction
	"github.com/kiplagatcollins/finance-tracker/request"
	"github.com/kiplagatcollins/finance-tracker/response"
	"github.com/kiplagatcollins/finance-tracker/service" // Assuming this package exists and defines UserService
)

// UserController is a controller for user-related operations.
type UserController struct {
	userService service.UserService
}

// NewUserController creates a new UserController instance.
// It now takes a service.UserService dependency, adhering to the principle
// that the controller handles HTTP and delegates business logic to a service.
func NewUserController(s service.UserService) *UserController {
	return &UserController{userService: s}
}

// CreateUser handles the HTTP request to create a new user.
func (uc *UserController) CreateUser(c *fiber.Ctx) error {
	// 1. Parse the incoming request body into a UserRequest DTO.
	// The UserRequestFromCtx function from the prompt handles body parsing and panics on error.
	userRequest := request.UserRequestFromCtx(c)

	// 2. Convert the UserRequest DTO to a models.User entity for the service layer.
	userModel := request.UserRequestToModel(userRequest)

	// 3. Call the service layer to perform the actual user creation.
	createdUser, err := uc.userService.CreateUser(userModel)
	if err != nil {
		// TODO: Implement more granular error handling (e.g., differentiate validation errors vs. internal errors).
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to create user: "+err.Error())
	}

	// 4. Convert the created models.User entity back to a UserResponse DTO for the client.
	userResponse := response.UserResponseFromModel(createdUser)

	// 5. Send the JSON response with the created user data.
	return response.UserResponseToCtx(c, userResponse)
}

// GetUser handles the HTTP request to retrieve a user by their ID.
func (uc *UserController) GetUser(c *fiber.Ctx) error {
	// 1. Extract the user ID from the URL parameters.
	idParam := c.Params("id")
	userID, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid user ID format. Must be a positive integer.")
	}

	// 2. Call the service layer to retrieve the user by ID.
	user, err := uc.userService.GetUserByID(userID)
	if err != nil {
		// TODO: Differentiate between "not found" (404) and other service errors (500).
		// A more robust implementation might check `errors.Is(err, service.ErrUserNotFound)`.
		return fiber.NewError(fiber.StatusNotFound, "User not found or other retrieval error: "+err.Error())
	}

	// 3. Convert the retrieved models.User entity to a UserResponse DTO.
	userResponse := response.UserResponseFromModel(user)

	// 4. Send the JSON response with the user data.
	return response.UserResponseToCtx(c, userResponse)
}

// UpdateUser handles the HTTP request to update an existing user.
func (uc *UserController) UpdateUser(c *fiber.Ctx) error {
	// 1. Extract the user ID from the URL parameters.
	idParam := c.Params("id")
	userID, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid user ID format. Must be a positive integer.")
	}

	// 2. Parse the incoming request body into a UserRequest DTO.
	userRequest := request.UserRequestFromCtx(c)

	// 3. Convert the UserRequest DTO to a models.User entity.
	userModel := request.UserRequestToModel(userRequest)
	userModel.ID = userID // Crucially, set the ID from the path for the update operation.

	// 4. Call the service layer to update the user.
	updatedUser, err := uc.userService.UpdateUser(userModel)
	if err != nil {
		// TODO: Implement more granular error handling (e.g., 404 if user not found, 400 for validation).
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to update user: "+err.Error())
	}

	// 5. Convert the updated models.User entity back to a UserResponse DTO.
	userResponse := response.UserResponseFromModel(updatedUser)

	// 6. Send the JSON response with the updated user data.
	return response.UserResponseToCtx(c, userResponse)
}

// DeleteUser handles the HTTP request to delete a user by their ID.
func (uc *UserController) DeleteUser(c *fiber.Ctx) error {
	// 1. Extract the user ID from the URL parameters.
	idParam := c.Params("id")
	userID, err := strconv.ParseUint(idParam, 10, 64)
	if err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "Invalid user ID format. Must be a positive integer.")
	}

	// 2. Call the service layer to delete the user.
	err = uc.userService.DeleteUser(userID)
	if err != nil {
		// TODO: Differentiate errors (e.g., 404 if user not found, 500 for internal error).
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete user: "+err.Error())
	}

	// 3. Send a 204 No Content status code for a successful deletion with no body.
	return c.Status(fiber.StatusNoContent).Send(nil)
}
