package tasks

// Task represents a development task in GBot.
type Task struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
	CreatedAt int64  `json:"createdAt"` // Unix timestamp (Wails no serializa time.Time)
}
