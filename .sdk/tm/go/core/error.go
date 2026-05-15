package core

type OpenElevationError struct {
	IsOpenElevationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenElevationError(code string, msg string, ctx *Context) *OpenElevationError {
	return &OpenElevationError{
		IsOpenElevationError: true,
		Sdk:              "OpenElevation",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenElevationError) Error() string {
	return e.Msg
}
