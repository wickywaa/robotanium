package models

// Bot represents a robot with multiple cockpits.
type Bot struct {
	ID       int       `db:"id" json:"id"`
	Name     string    `db:"name" json:"name"`
	Token    string    `db:"token" json:"token"`
	ImageURL string    `db:"image_url" json:"imageUrl"`
	AdminID  int       `db:"admin_id" json:"adminId"`
	Cockpits []Cockpit `json:"cockpits,omitempty"`
}
