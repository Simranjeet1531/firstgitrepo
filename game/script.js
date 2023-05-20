document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".board");
    const cells = [];
    let currentPlayer = "X";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cells.push(cell);
        board.appendChild(cell);

        cell.addEventListener("click", handleClick);
    }

    function handleClick() {
        if (this.textContent === "") {
            this.textContent = currentPlayer;
            this.classList.add(currentPlayer);
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            checkWinner();
        }
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                cells.forEach(cell => cell.removeEventListener("click", handleClick));
                document.querySelector(".result").textContent = "Player " + cells[a].textContent + " wins!";
                return;
            }
        }

        if (cells.every(cell => cell.textContent !== "")) {
            cells.forEach(cell => cell.removeEventListener("click", handleClick));
            document.querySelector(".result").textContent = "It's a draw!";
        }
    }

    function restartGame() {
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("winner");
            cell.addEventListener("click", handleClick);
        });
        currentPlayer = "X";
        document.querySelector(".result").textContent = "";
    }

    document.querySelector("button").addEventListener("click", restartGame);
});
