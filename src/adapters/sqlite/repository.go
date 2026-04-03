package sqlite

import "gbot-wails/src/core/tasks"

// Repository implements tasks.TaskPort using SQLite.
type Repository struct {
	// db connection will go here
}

func (r *Repository) Save(task *tasks.Task) error {
	// TODO: implement
	return nil
}

func (r *Repository) GetAll() ([]tasks.Task, error) {
	// TODO: implement
	return nil, nil
}

func (r *Repository) Delete(id string) error {
	// TODO: implement
	return nil
}
