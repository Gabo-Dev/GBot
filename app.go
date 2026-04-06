package main

import (
	"context"
	"fmt"
	"time"

	"gbot-wails/src/core/tasks"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetAllTasks() ([]tasks.Task, error) {
	return []tasks.Task{}, nil
}

func (a *App) GetTask(id string) (*tasks.Task, error){
	return nil, fmt.Errorf("not implemented")
}

func (a *App) SaveTask(task tasks.Task	) (*tasks.Task, error) {
	task.ID = "temp-id"
	task.CreatedAt = time.Now().Unix()
	return &task, nil
}

func (a *App) UpdateTask(task tasks.Task)(*tasks.Task, error){
	return &task, nil
}

func (a *App) DeleteTask(id string)(*tasks.Task, error){
	return nil, fmt.Errorf("not implemented")
}
