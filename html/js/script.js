const cells = Array.from(document.querySelectorAll('.cell'));
    const board = document.querySelector('.board');
    let currentPlayer = 'X';
    let gameStatus = ['', '', '', '', '', '', '', '', ''];

    function handleCellClick(event) {
      const cell = event.target;
      const index = cells.indexOf(cell);

      if (gameStatus[index] !== '' || checkWinner()) {
        return;
      }

      gameStatus[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.style.backgroundColor = '#999';
      cell.style.pointerEvents = 'none';

      if (checkWinner()) {
        alert(`O jogador ${currentPlayer} venceu!`);
        resetGame();
        return;
      }

      if (checkTie()) {
        alert('Empate!');
        resetGame();
        return;
      }

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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
          gameStatus[a] !== '' &&
          gameStatus[a] === gameStatus[b] &&
          gameStatus[a] === gameStatus[c]
        ) {
          return true;
        }
      }

      return false;
    }

    function checkTie() {
      return gameStatus.every(cell => cell !== '');
    }

    function resetGame() {
      currentPlayer = 'X';
      gameStatus = ['', '', '', '', '', '', '', '', ''];

      cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#555';
        cell.style.pointerEvents = 'auto';
      });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));