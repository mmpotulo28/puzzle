//query for puzzle pecies
const puzzlePiece = document.querySelectorAll('.puzzle-peice');
//puzzle container
const puzzleBoard = document.querySelector('.puzzle_board');

//get reference to the puzzle image element
const puzzleImage = document.querySelector('.puzzle-image');
//reference to the win popup container
const winPopup = document.querySelector('.win-container');

var id1 = null;
var id2 = null;

//create array of puzzle images
var images = [
    "1.jpg", "5.jpg", "9.jpg", "13.jpg",
    "2.jpg", "6.jpg", "10.jpg", "14.jpg",
    "3.jpg", "7.jpg", "11.jpg", "15.jpg",
    "4.jpg", "8.jpg", "12.jpg", "16.jpg"]

var puzzles = ['puzzle1.jpeg', 'puzzle2.jpg', 'puzzle3.jpg']
var puzzleFolders = ['puzzle1', 'puzzle2', 'puzzle3']
var puzzleFolder = '' //to be used to store the name of the picked puzzle folder
var random = 0; //to be used to store the random number

var imageOrder = []; //to be used to check the order of the puzzle pieces
var picked = []; //to be used to avoid picking the same color twice
let i = 0
var image1 = '', image2 = '';// to store current images for the pieces
var id1S = false, id2S = false; //to indicate if a specific piece is selected

setPuzzle();

//loop through puzzle pieces and set color for each peice
function setPuzzle() {

    //pick puzzle folder
    random = Math.floor(Math.random() * 3);
    puzzleFolder = puzzleFolders[random].toString();

    puzzlePiece.forEach(piece => {
        //generate random number between 0 and 15 [this will be the index]
        var randomNum = Math.floor(Math.random() * 16);

        //if the random number has already been picked, generate another number
        while (picked.includes(randomNum)) {
            randomNum = Math.floor(Math.random() * 16);
        }
        //push the random number to the picked array
        picked.push(randomNum); //this will be used to avoid picking the same color twice

        //set the background image of the puzzle piece to the image at the index of the random number
        let imgPath = "./images/" + puzzleFolder + "/" + images[randomNum];
        // alert(imgPath)
        piece.style.backgroundImage = "url(" + imgPath + ")";
        // i++

    });

    //set puzzleImage to the image at the puzzle board
    puzzleImage.style.background = "url(./images/" + puzzleFolder + "/" + puzzles[random] + ")";
    puzzleImage.style.backgroundSize = "100% 100%";

}



//add mouseclick event listener to each puzzle piece click event
puzzlePiece.forEach(piece => {
    piece.addEventListener('click', (e) => {
        //if the first piece is clicked, set id1 to the id of the first piece
        if (id1S == false) {
            id1 = e.target.id;
            console.log(id1);

            //indicate selected piece by adding border and scaling up
            document.getElementById(id1).style.border = "2px solid white";
            document.getElementById(id1).style.borderRadius = "10px";
            document.getElementById(id1).style.transform = "scale(1.2)";
            document.getElementById(id1).style.boxShadow = "0px 0px 10px white";
            //bring upfront
            document.getElementById(id1).style.zIndex = "1";

            id1S = true; //indicate that the first piece has been selected
            id2S = false; //indicate that the second piece has not been selected
        } else if (id2S == false) { //if the second piece is clicked, set id2 to the id of the second piece
            id2 = e.target.id;
            console.log(id2);

            //indicate selected piece by adding border and scaling up
            document.getElementById(id2).style.border = "2px solid white";
            document.getElementById(id2).style.borderRadius = "10px";
            document.getElementById(id2).style.transform = "scale(1.2)";
            document.getElementById(id2).style.boxShadow = "0px 0px 10px white";
        }



        //if both ids are set, swap the colors of the two pieces
        if (id1 != null && id2 != null) {
            //check if the id2 is the same as id1
            if (id1 == id2) {
                //reset styling for 1st piece
                document.getElementById(id1).style.border = "2px solid black";
                document.getElementById(id1).style.borderRadius = "0px";
                document.getElementById(id1).style.transform = "scale(1.0)";
                document.getElementById(id1).style.boxShadow = "none";

                id1 = null;
                id2 = null;

                //reset id selection variables
                id1S = false;
                id2S = true; //listen for the 1st piece to be selected again
            } else {
                checkSwap();
            }
        }
    });
});


//create a function thta checks if the 2nd selected piece is next to the 1st one
function checkSwap() {
    //check if the 2nd selected piece is next to the 1st one
    if (id1 == id2 - 1 || id1 == id2 + 1 || id1 == id2 - 4 || id1 == id2 + 4) {
        //if the 2nd selected piece is next to the 1st one, swap the colors of the two pieces
        //apply efect on both pieces
        document.getElementById(id1).style.border = "2px solid white";
        document.getElementById(id1).style.borderRadius = "50px";
        document.getElementById(id1).style.transform = "scale(0)";
        document.getElementById(id2).style.border = "2px solid white";
        document.getElementById(id2).style.borderRadius = "50px";
        document.getElementById(id2).style.transform = "scale(0)";

        //get the color of the first piece
        image1 = document.getElementById(id1).style.backgroundImage;
        //get the color of the second piece
        image2 = document.getElementById(id2).style.backgroundImage;

        //delay by 3 seconds before removing border and scaling down
        setTimeout(() => {
            //set the color of the first piece to the color of the second piece
            document.getElementById(id1).style.backgroundImage = image2;
            //set the color of the second piece to the color of the first piece
            document.getElementById(id2).style.backgroundImage = image1;

            //remove border and scale down
            document.getElementById(id1).style.border = "2px solid black";
            document.getElementById(id1).style.borderRadius = "0px";
            document.getElementById(id2).style.border = "2px solid black";
            document.getElementById(id2).style.borderRadius = "0px";
            document.getElementById(id1).style.transform = "scale(1.0)";
            document.getElementById(id2).style.transform = "scale(1.0)";
            document.getElementById(id1).style.boxShadow = "none";
            document.getElementById(id2).style.boxShadow = "none";

            id1 = null;
            id2 = null;

            //set puzzleOrder array to the images of the puzzle pieces
            imageOrder = [];
            puzzlePiece.forEach(piece => {
                //get name of the background image of the puzzle piece
                let imgName = piece.style.backgroundImage;

                //clean the name of the image to get the name of the image only
                imgName = imgName.replace('url("', "");
                imgName = imgName.replace('")', "");
                imgName = imgName.replace('./images/' + [puzzleFolder] + '/', "");
                //push the name to the imageOrder array
                imageOrder.push(imgName);
            })


            // alert(imageOrder)
            if (imageOrder.toString() == images.toString()) {
                winLoose("block");
                return;
            }

            //reset id selection variables
            id1S = false;
            id2S = true; //indicate that the second piece has been selected


        }, 300);
    } else {
        //reset styling for 2nd piece
        document.getElementById(id2).style.border = "2px solid black";
        document.getElementById(id2).style.borderRadius = "0px";
        document.getElementById(id2).style.transform = "scale(1.0)";
        document.getElementById(id2).style.boxShadow = "none";
    }
}
function winLoose(dis) {

    //set pop up display
    winPopup.style.display = dis;

    //if winpopup is visible, blur the background of board only
    if (winPopup.style.display == "none") {
        puzzleBoard.style.opacity = "1";
    } else if (winPopup.style.display == "block") {
        puzzleBoard.style.opacity = "0.2";
    }
}

//add click event listener to the play again button
const playAgainBtn = document.querySelector('#play-again');
playAgainBtn.addEventListener('click', () => {
    //hide the win popup
    winLoose("none");

    //reset the puzzle pieces
    setPuzzle();

})