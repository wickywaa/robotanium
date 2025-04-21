package ws

import (
	"log"

	"github.com/gofiber/websocket/v2"
)

func HandleWebSocket(c *websocket.Conn) {
	defer c.Close()
	log.Println("WebSocket client connected")

	for {
		msgType, msg, err := c.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			break
		}

		log.Printf("Received: %s", msg)

		// Echo the message back
		if err := c.WriteMessage(msgType, msg); err != nil {
			log.Println("write error:", err)
			break
		}
	}
}
