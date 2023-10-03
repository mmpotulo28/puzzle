//query for puzzle pecies
const puzzlePieces = document.querySelectorAll('.puzzle-peices');
const puzzlePiece = document.querySelectorAll('.puzzle-peice');

//get order pieces
const orderPieces = document.querySelectorAll('.win-peice');

var id1 = null;
var id2 = null;

//create array of colors woth 16 diferent colors
var colors = ["red", "red", "blue", "blue", "green", "green", "yellow", "yellow", "orange", "orange", "purple", "purple", "pink", "pink", "brown", "brown"];
var pieceColor = '';
var puzzleOrder = [];

//array to log which picked colors to avoid picked duplicates
var pickedColors = [];
var pieces = true;
let i = 0
var color1 = '', color2 = '';
var id1S = false

//add mouseclick event listener to each puzzle piece
setPieceColor()

//loop through puzzle pieces and set color for each peice
function setPieceColor() {
    puzzlePiece.forEach(piece => {
        //generate random number between 0 and 15
        var randomNum = Math.floor(Math.random() * 16);
        //if the random number has already been picked, generate another number
        while (pickedColors.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * 16);
        }
        //push the random number to the pickedColors array
        pickedColors.push(randomNum);
        //set the color of the puzzle piece to the color at the index of the random number
        piece.style.backgroundColor = colors[randomNum];
    });
}

//set order pieces to the same color as the color array in order
orderPieces.forEach(piece => {
    piece.style.backgroundColor = colors[i];
    i++;
});

puzzlePiece.forEach(piece => {
    piece.addEventListener('click', (e) => {
        //if the first piece is clicked, set id1 to the id of the first piece
        if (id1S == false) {
            id1 = e.target.id;
            console.log(id1);

            //indicate selected piece by adding border and scaling up
            document.getElementById(id1).style.border = "2px solid white";
            document.getElementById(id1).style.borderRadius = "10px";
            document.getElementById(id1).style.transform = "scale(1.15)";
            document.getElementById(id1).style.boxShadow = "0px 0px 10px white";
            //rotate the piece by 15 degrees
            //document.getElementById(id1).style.transform = "rotate(15deg)";

            id1S = true;
        } else {
            id2 = e.target.id;
            console.log(id2);
            id1S = false;
        }

        //if both ids are set, swap the colors of the two pieces
        if (id1 != null && id2 != null) {
            //apply efect on both pieces
            document.getElementById(id1).style.border = "2px solid white";
            document.getElementById(id1).style.borderRadius = "50px";
            document.getElementById(id1).style.transform = "scale(0)";
            document.getElementById(id2).style.border = "2px solid white";
            document.getElementById(id2).style.borderRadius = "50px";
            document.getElementById(id2).style.transform = "scale(0)";

            //get the color of the first piece
            color1 = document.getElementById(id1).style.backgroundColor;
            //get the color of the second piece
            color2 = document.getElementById(id2).style.backgroundColor;

            //delay by 3 seconds before removing border and scaling down
            setTimeout(() => {
                //set the color of the first piece to the color of the second piece
                document.getElementById(id1).style.backgroundColor = color2;
                //set the color of the second piece to the color of the first piece
                document.getElementById(id2).style.backgroundColor = color1;
                //remove border and scale down
                document.getElementById(id1).style.border = "none";
                document.getElementById(id1).style.borderRadius = "0px";
                document.getElementById(id2).style.border = "none";
                document.getElementById(id2).style.borderRadius = "0px";
                document.getElementById(id1).style.transform = "scale(1.0)";
                document.getElementById(id2).style.transform = "scale(1.0)";
                document.getElementById(id1).style.boxShadow = "none";

                //set puzzleOrder array to the colors of the puzzle pieces
                puzzleOrder = [];
                puzzlePiece.forEach(piece => {
                    puzzleOrder.push(piece.style.backgroundColor);
                })

                //compare puzzleOrder array to colors array
                //if they are the same, alert the user that they won
                if (puzzleOrder.toString() == colors.toString()) {
                    alert("You won!");
                    return;
                }


                id1 = null;
                id2 = null;
            }, 500);
        }
    });
});

