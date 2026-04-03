package tasks

// TaskService handles business logic for tasks.
type TaskService struct {
	repo TaskPort
}

// TaskPort defines the interface for task persistence.
type TaskPort interface {
	Save(task *Task) error
	GetAll() ([]Task, error)
	Delete(id string) error
}

// NewTaskService creates a new TaskService.
func NewTaskService(repo TaskPort) *TaskService {
	return &TaskService{repo: repo}
}
