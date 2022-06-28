const fs = require("fs");
const readline = require('readline');

function checkIfRealWord(word){
    fileNames = ["words3", "words4", "words5", "words6", "words7", "words8andup"]

    let data = fs.readFileSync("./dictionary/"+ fileNames[word.length - 3] + ".csv", "utf8").split(",")

    return data.includes(word.toLowerCase());
}

function returnOrthogonalIndicies(board, char, i, j){
    ret_list = []

    const row_limit = board.length - 1;
    const col_limit = board[0].length - 1;
    
    for (let x = Math.max(0, i-1); x <= Math.min(i + 1, row_limit); x++){
        for (let y = Math.max(0, j-1); y <= Math.min(j + 1, col_limit); y++){
            if (board[x][y] === char){
                ret_list.push([x, y]);
            }
        }
    }

    return ret_list;
}

function recursiveWordValidation(board, possibleIndicies, word, charIndex, ignoreIndicies){
    if (charIndex === word.length - 1){
        return true;
    }

    const filteredPossibleIndicies = possibleIndicies.filter(item => {
        return !(ignoreIndicies.map((ignoreIndex) => [ignoreIndex[0], ignoreIndex[1]].join()).includes(item.join()))
    })

    if (filteredPossibleIndicies.length === 0) {
        return false;
    }

    let filteredIgnoreIndicies = ignoreIndicies;

    for (let i = 0; i < filteredPossibleIndicies.length; i++){
        filteredIgnoreIndicies.push([filteredPossibleIndicies[i][0], filteredPossibleIndicies[i][1], charIndex + 1])
        if (recursiveWordValidation(
            board,
            returnOrthogonalIndicies(board, word.charAt(charIndex + 2), filteredPossibleIndicies[i][0], filteredPossibleIndicies[i][1]),
            word,
            charIndex + 1,
            filteredIgnoreIndicies)
        )
        {
            return true;
        }
       
        filteredIgnoreIndicies = filteredIgnoreIndicies.filter(item => {
            return item[2] <= charIndex;
        })
    }
}

function checkIfWordOnBoard(board, word) {

    for (let i = 0; i < board.length; i++){
        for (let j = 0; j < board[i].length; j++){
            if (board[i][j] === word.charAt(0)){
                if (recursiveWordValidation(board, returnOrthogonalIndicies(board, word.charAt(1), i, j), word, 0, [[i, j, 0]])){
                    return true;
                } 
            }
        }
    }

    return false;
}

function checkValidWord(board, word){
    const flat_board = board.join();
    for (let i = 0; i < word.length; i++) {
        if (!flat_board.includes(word.charAt(i))) {
            return false;
        }
    }

    return checkIfWordOnBoard(board, word) && checkIfRealWord(word);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

let gameCubes = ["AAEEGN", "ABBJOO", "ACHOPS", "AFFKPS",
"AOOTTW", "CIMOTU", "DEILRX", "DELRVY",
"DISTTY", "EEGHNW", "EEINSU", "EHRTVW",
"EIOSST", "ELRTTY", "HIMNQU", "HLNNRZ"];

const boardSize = gameCubes.length;

const board = [];

function generateGameboard(){
    let row = []
    for (let i = 0; i < Math.sqrt(boardSize); i++){
        for (let j = 0; j < Math.sqrt(boardSize); j++){
            const value = gameCubes[Math.floor(Math.random() * gameCubes.length)];
            row.push(value[Math.floor(Math.random() * value.length)]);
            gameCubes = gameCubes.filter(item => {
                return item != value;
            })
        }
        board.push(row);
        row = [];
    }
}


const start = async () =>{

    generateGameboard();

    console.log(board);
    console.log("Can you find a word?")

    while (true){
        for await (const answer of rl) {
            if (checkValidWord(board, answer.toUpperCase())){
                console.log("woohoo! ", answer, " is valid, go again!")
            }
            else {
                console.log(answer, " is invalid, try again!")
            }
        }
    }

}


start();