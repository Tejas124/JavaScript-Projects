const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameButton = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialize the game
function initGame(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    //UI pr boxes empty krna hai
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameButton.classList.remove('active');

    gameInfo.innerText = `Current Player - ${currentPlayer}`;

}

initGame();

function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same
        if( ((gameGrid[position[0]] !== "") || (gameGrid[position[1]] !== "") || (gameGrid[position[2]] !== "")) &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

                //check the winner
                if(gameGrid[position[0]] === 'X'){
                    answer = "X";
                }
                else{
                    answer = "O";
                }

                //once we have got the winner stop the game
                //i.e disable all pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //Now we know the winner add Green background
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");


            }
    });

    //if above condition is satisfied, that means we have a winner
    //Update the button
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameButton.classList.add("active");
        return;
    }

    //What if we don't have a winner?
    //So let's check the condition for tie
    let fillCount = 0;
    gameGrid.forEach( (box) => {
        if(box !== "")
            fillCount++;
    });

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameButton.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; //UI
        gameGrid[index] = currentPlayer; //logic
        boxes[index].style.pointerEvents = "none";
        //swap the turn
        swapTurn();
        //Check 
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    })
});

newGameButton.addEventListener('click', initGame);