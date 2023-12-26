import './style.css';

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userName = urlParams.get('username') || 'Player';

  const usernameDisplay = document.getElementById('username');
  if (usernameDisplay) {
    usernameDisplay.textContent = userName;
  }

  const grid = document.querySelector('.grid');
  if (!grid) {
    throw new Error('Grid element not found');
  }

  const width = 8;
  const squares: HTMLDivElement[] = [];
  let score = 0;

  const candyColors = [
    "red", "yellow", "orange", "coral", "green", "blue", "purple"
  ];

  // Creating the board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", "true");
      square.setAttribute("id", i.toString());
      let randomColor = Math.floor(Math.random() * candyColors.length);
      square.style.backgroundColor = candyColors[randomColor] ?? "blue";
      grid?.appendChild(square);
      squares.push(square);
    }
  }

  createBoard();

  // Dragger 
  let elementBeingDragged: string;
  let elementBeingReplaced: string | null;
  let squareIdDragged: number;
  let squareIdReplaced: number | null

  function dragStart(this: HTMLDivElement) {
    elementBeingDragged = this.style.backgroundColor;
    squareIdDragged = parseInt(this.id)
    console.log(this.id, "dragstart");
  }

  function dragEnd(this: HTMLDivElement) {

    console.log(this.id, "dragend");
    // logic to check for the correct move
    let correctMoves = [squareIdDragged - 1,
    squareIdDragged - width,
    squareIdReplaced! + 1,
    squareIdDragged + width
    ]

    let correctMove = correctMoves.includes(squareIdReplaced as number);

    if (squareIdReplaced && correctMove) {
      squareIdReplaced = null
    } else if (squareIdReplaced && !correctMove) {
      squares[squareIdReplaced].style.backgroundColor = elementBeingReplaced as string;
      squares[squareIdDragged].style.backgroundColor = elementBeingDragged
    }
  }

  function dragEnter(this: HTMLDivElement) {
    console.log(this.id, "dragenter");
  }

  function dragLeave(this: HTMLDivElement) {
    console.log(this.id, "dragleave");
  }

  function dragOver(this: HTMLDivElement, e: DragEvent) {
    e.preventDefault();
    console.log(this.id, "dragover");
  }

  function dragDrop(this: HTMLDivElement) {
    console.log(this.id, "dragdrop");
    elementBeingReplaced = this.style.backgroundColor;
    this.style.backgroundColor = elementBeingDragged;

    squareIdReplaced = parseInt(this.id);

    squares[squareIdDragged].style.backgroundColor = elementBeingReplaced
  }

  // Dragging the candies
  squares.forEach(square => square.addEventListener("dragstart", dragStart));
  squares.forEach(square => square.addEventListener("dragend", dragEnd));
  squares.forEach(square => square.addEventListener("dragover", dragOver));
  squares.forEach(square => square.addEventListener("dragenter", dragEnter));
  squares.forEach(square => square.addEventListener("dragleave", dragLeave));
  squares.forEach(square => square.addEventListener("drop", dragDrop));

  function checkRowForThreeSquares() {
    for (let i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";


      const notValidMove = [6, 7, 14, 15, 22, 23, 30, 31, 39, 46, 47, 54, 55];
      if (notValidMove.includes(i)) continue;

      if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 3;
        rowOfThree.forEach(index => {
          squares[index].style.backgroundColor = ""
        })
      }
    }
  }

  checkRowForThreeSquares();

  function checkColumnForThreeSquares() {
    for (let i = 0; i < 47; i++) {
      let columnOffThree = [i, i + width, i + width];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === "";


      if (columnOffThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 3
        columnOffThree.forEach(index => {
          squares[index].style.backgroundColor = ""
        })
      }
    }
  }
  checkColumnForThreeSquares()
  window.setInterval(() => {
    checkRowForThreeSquares()
    checkColumnForThreeSquares()
  }, 100)
});