# Tic-Tac-Toe

The purpose of this project is to construct a playable game of Tic-Tac-Toe on a Web Page.  By doing so, I will get a better understanding of factory functions, scope, the module pattern, and organizing my code.  This project is outlined in the Javascript course on The Odin Project.  I will also use this README as a spot to place pseudocode to help display my thought process throughout the project.  Now onto Step 2.

2. Store the game board as an array inside of a Gameboard object.
- Instructions hint that gameBoard should be a module object
- Players are going to be factory functions as there are multiple
- displayController is going to be a module object

Important to add classes to each cell about different groups they can be in to win.  For example "row 1" "column 2" and if they all have the same textContent, then a win condition has been met.

4. How to control the game flow of the board.
- The turns need to alternate between the players.  That means each time the text content of one of the cells is marked, an event needs to happen that changes the current player which then means the next time a cell is clicked the other symbol will appear.
- The flow of the game object will have a function controlling which player is currently playing.
- There can also be a function in the flow of the game that keeps track of which cells have been chosen so that there can no be re marks.

alternatePlayers function:
1. Have a variable inside the gameFlow object that keeps track of the turn.
2. Have two conditional branches that lead to either X or O player being represented in the turn.  The condition can be based on the modulo of the turn variable to see if it is even or odd.
3. When player object returns the symbol, return the currentPlayer value chosen in step 2.  This can be used in the markBoard function in the gameBoard object.
4. Increase the turn variable by one in alternatePlayers function and return it with gameFlow object so that it can be added in the markBoard event listener

Setting win conditions:
- set a winCheck function within the player object.  The adv. of doing that in player rather than in gameFlow is that I will not have to input the player into the function.
- I have already added classList to the cells for any win conditions they may be involved in.  Create an array of these class that can be looped through to check for win conditions in each one.
- Have the winCheck see whether any of the win conditions all have the same symbol
- return true if the game has been won.  Return winCheck so that it can be used in the alternatePlayers function in the gameFlow object.