package ws

import "github.com/gofiber/websocket/v2"

type BotClient struct {
	ID   string
	Hub  *Hub
	Conn *websocket.Conn
	Send chan []byte
}
