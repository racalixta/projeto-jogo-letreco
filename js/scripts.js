// Pegando a div das tiles (peças)
const tiles = document.querySelector(".tile-container");

 
// pegando as divs do keyboard
const backspaceAndEnterRow = document.querySelector("#backspaceAndEnterRow");
const keyboardFirstRow = document.querySelector("#keyboardFirstRow");
const keyboardSecondRow = document.querySelector("#keyboardSecondRow");
const keyboardThirdRow = document.querySelector("#keyboardThirdRow");

// arrays com as letras do keyboard
const keysFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keysSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keysThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];



// ----------------------------------------------------

// criando a quantidade de linhas(rows) e colunas(columns)
const rows = 6;
const columns = 5;

// para o sistema saber qual as rows e columns atual está o 'cursor' 
let currentRow = 0;
let currentColumn = 0;

// palavra 'sorteada'
const letreco = "VASCO";

// object p/ o mapa do letreco
let letrecoMap = {};

// lista para armazenar as tentativas
const guesses = [];

//---------------------------------------------------

// mapa do letreco

for (let index = 0; index < letreco.length; index++) {
    letrecoMap[letreco[index]] = index;

}

//---------------------------------------------------


// usando um for para primeiro criar uma linha(row)
for(let rowIndex = 0; rowIndex < rows; rowIndex++){

    // aproveitando o for para instanciar a matriz de guesses
    guesses[rowIndex] = new Array(columns);


    // criando uma div para a linha (row)
    const tileRow = document.createElement("div");

    // set Attributes de 'id' e 'class'
    tileRow.setAttribute("id", "row" + rowIndex);
    //                  ^^     string + number
    tileRow.setAttribute("class", "tile-row");

    // usando um for para criar as colunas (columns)
    for(let columnIndex = 0; columnIndex < columns; columnIndex++){
        // criando uma div para a column
        const tileColumn = document.createElement("div");

        // set attributes de 'id' e 'class'
        tileColumn.setAttribute("id", "row" + rowIndex + "column" + columnIndex);
        //  ^^ ^^  string da row + number + string column + number
        tileColumn.setAttribute("class", rowIndex === 0 ? "tile-column typing" : "tile-column disabled");

        // ^^  adicionando as columns dentro da div das row
        tileRow.append(tileColumn);


        // continuando a instância da matriz guesses
        guesses[rowIndex] [columnIndex] = "";

    }

    // adicionando as rows (com columns) dentro da div tile
    tiles.append(tileRow);

}


// METODO PARA VERFICAR qual column e row o "cursor" está

const handleKeyboardOnClick = (key) => {
    // verificando se ja estrapolou o tamanho da column
    if(currentColumn === columns){
        // se for o limite de columns irá retornar, sem executar o resto do código
        return;
    }
    // primeiro verifica em qual coluna está, para não adicionar algo onde não pode
    const currentTile = document.querySelector("#row" + currentRow + "column" + currentColumn);

    // adicionando a key no Tile atual
    currentTile.textContent = key;

    // add o palpite escrito na matriz guesses
    guesses[currentRow][currentColumn] = key;

    // movendo para o próximo tileColumn
    currentColumn++;
};

// ----------------------------------------------------

// método PARA VERIFICAR O PALPITE

const checkGuess = () => {
    // pegando o que foi escrito e juntando sem espaço .join("");
    const guess = guesses[currentRow].join("");

    if(guess.length !== columns){
        // se for diferente de columns(5), será apenas ignorado
        return;
    }

    // pegando todos os tiles que tem a class .typing
    let currentColumns = document.querySelectorAll('.typing');
    // OBS => é currentColumSSSSSSSS != de currentColumn


    // verificando com o letrecoMap se a palavraSorteada e o guess são iguais
    for (let i = 0; i < columns; i++) {
        // foi utilizado columns pq já se sabe que é igual a guess.length 

        // colocando a letra de guess em letter
        const letter = guess[i];

        // se não tiver a letra em letrecoMap será undefined
        if(letrecoMap[letter] === undefined){
            currentColumns[i].classList.add("wrong");
    
        } else {
            if(letrecoMap[letter] === i){
                currentColumns[i].classList.add("right");
            } else {
                currentColumns[i].classList.add("displaced");
            }
        }
    }
    
    // verificando se o guess é igual a letreco
    if(guess === letreco) {
        window.alert("PARABÉNS!!!")
        return;
    } else {
        // verificando se não é a última row (tentativa)
        if(currentRow === rows -1) {
            // se for perdeu
            window.alert("PERDEU!!");
        } else {
            // se não for será movido para a próxima row
            moveToNextRow();
        }
    }

};    

//------------------------------------------------------

// MÉTODO PARA MOVER PARA A PRÓXIMA ROW

const moveToNextRow = () => {
    // pegando os columns que esão com class .typing
    let typingColumns = document.querySelectorAll(".typing");
    // iterando sobre typingColumns e removendo a class . typing e add a class .disabled
    for(let i = 0; i < typingColumns.length; i++){
        typingColumns[i].classList.remove("typing");
        typingColumns[i].classList.add("disabled");
    }

    // movendo para a próxima currentRow e zerando a currentColumn - para começar a próxima linha
    currentRow++;
    currentColumn = 0;

    //pegando a row atual e colocando typing nas columns atuais
    const currentRowEl = document.querySelector("#row"+currentRow);

    // pegando todas as columns dessa row e colocando nessa variavel local de moveToNextRow()
    let currentColumns = currentRowEl.querySelectorAll(".tile-column");
    // iterando sobre currentColumns e add a class . typing e removendo .disabled
    for(let i = 0; i < currentColumns.length; i++){
        currentColumns[i].classList.add("typing");
        currentColumns[i].classList.remove("disabled");
    }
};

// ----------------------------------------------------

// CRIANDO O KEYBOARD

// método
const createKeyboardRow = (keys, keyboardRow) => {
    // iterando sobre o array da keysFirstRow
    keys.forEach((key) => {
        // criando um botão para cada item do array
        const buttonElement = document.createElement("button");
        // colocando o texto do button
        buttonElement.textContent = key;
        // dando um id
        buttonElement.setAttribute("id", key)

        // função para entender qual tecla foi clicada
        buttonElement.addEventListener("click", () => {handleKeyboardOnClick(key)});

        // adicionando as keys na div keyboardRow
        keyboardRow.append(buttonElement);

    });
};

// chamando o método
createKeyboardRow(keysFirstRow, keyboardFirstRow);
createKeyboardRow(keysSecondRow, keyboardSecondRow);
createKeyboardRow(keysThirdRow, keyboardThirdRow);


// método para o botão backspace
const handleBackspace = () => {

    // se for a inicial ele irá apenas sair
    if(currentColumn === 0){
        return;
    }

    // volta para column anterior e 
    currentColumn--;
    // altera a matriza de guesses
    guesses[currentRow][currentColumn] = "";

    // pega a peça exata que ese esta
    const tile = document.querySelector("#row"+currentRow+"column"+currentColumn);
    // e altera o textContent para vazio
    tile.textContent = "";
};

const backspaceButton = document.createElement("button");
backspaceButton.addEventListener("click", handleBackspace);
backspaceButton.textContent = "<=";
backspaceAndEnterRow.append(backspaceButton);


const enterButton = document.createElement("button");
enterButton.addEventListener("click", checkGuess);
enterButton.textContent = "ENTER";
backspaceAndEnterRow.append(enterButton);

//------------------------------------------------------

// deixando o teclado escrever 

// tem que arrumar para não deixar outros simbolos/ f1,f2,f3.. deixar serem escritos

document.onkeydown = function (evt) {

    evt = evt || window.evt

    if(evt.key === "Enter"){
        checkGuess();
    } else if (evt.key === "Backspace") {
        handleBackspace();
    } else {
        handleKeyboardOnClick(evt.key.toLocaleUpperCase());
    }



};


//-------------------------------------------------





