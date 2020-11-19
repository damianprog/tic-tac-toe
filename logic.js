(() => {
    const board = document.querySelector(".board");
    const boardCells = document.querySelectorAll("td");
    const restartBtn = document.querySelector(".top-bar button");
    const turnInfo = document.querySelector(".top-bar span");
    const canvas = document.querySelector("canvas");
    const canvasCtx = canvas.getContext("2d");
    const winningCellsIndexes = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    let turn = "X"

    boardCells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent == "") {
                cell.innerHTML = turn;
                turn = turn == "X" ? "O" : "X";
                turnInfo.innerHTML = `${turn} Turn`
                checkBoard();
            }
        });
    });

    restartBtn.addEventListener("click", () => {
        boardCells.forEach(cell => {
            cell.innerHTML = "";
            turnInfo.innerHTML = "X Turn"
            canvasCtx.clearRect(0, 0, 420, 420);
            canvas.style.pointerEvents = "none";
        });
    });

    checkBoard = () => {
        let xCells = [];
        let oCells = [];

        boardCells.forEach((cell, index) => {
            if (cell.textContent == "X") {
                xCells.push(index)
            }
            else if (cell.textContent == "O") {
                oCells.push(index);
            }
        });

        checkWin(xCells, oCells);
    };

    checkWin = (xCells, oCells) => {
        winningCellsIndexes.forEach((indexes) => {
            const xWin = indexes.every(index => xCells.includes(index));
            const oWin = indexes.every(index => oCells.includes(index));

            if (xWin || oWin) {
                canvas.style.pointerEvents = "auto";

                const boardRect = board.getBoundingClientRect();
                const firstCellRect = boardCells[indexes[0]].getBoundingClientRect();
                const lastCellRect = boardCells[indexes[2]].getBoundingClientRect();

                const lineStartLeft = (firstCellRect.left - boardRect.left) + 70;
                const lineStartTop = (firstCellRect.top - boardRect.top) + 70;

                const lineEndLeft = (lastCellRect.left - boardRect.left) + 70;
                const lineEndTop = (lastCellRect.top - boardRect.top) + 70;

                canvasCtx.beginPath();
                canvasCtx.moveTo(lineStartLeft, lineStartTop);
                canvasCtx.lineTo(lineEndLeft, lineEndTop);

                canvasCtx.strokeStyle = "#0d47a1";
                canvasCtx.lineWidth = 5;
                canvasCtx.stroke();

                turnInfo.innerHTML = `${xWin ? "X" : "O"} Victory`;
            }
        });
    };
})();