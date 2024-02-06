# Multiplayer Chess Website

(Note: This app is a little bit buggy. Also, I plan on adding castling and en passant later.)
This is my first time making an interactive multiplayer web-based project.
It uses socket.io to create rooms and communicate moves between players. 

## How to Use

This app is currently deployed at: https://yzchess.onrender.com

If you are the user creating the game, drag the slider to the desired time control and 
type in a room name. Then hit go and wait for the second player.

If you are the second player, type the room name into the bottom section and hit go.
The game should start automatically.

The room creator will always have the white pieces and the other player will always have the black pieces.

Also, wins are from a king capture or time. Real checkmating will be implemented later. 
The primary focus of this project was not so much chess, but rather server-client communication.