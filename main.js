document.addEventListener('DOMContentLoaded', (event) => {
  let dragSrcEl = null;
  const container = document.querySelector('.container');
  const message = document.getElementById('message');
  const resetButton = document.getElementById('reset-button');

  // Function to generate random numbers
  function generateRandomNumbers() {
      const numbers = Array.from({ length: 11 }, (_, i) => i + 1);
      // Shuffle the numbers
      for (let i = numbers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      return numbers;
  }

  // Function to create boxes with random numbers
  function createBoxes() {
      const randomNumbers = generateRandomNumbers();
      container.innerHTML = ''; // Clear existing boxes
      randomNumbers.forEach(number => {
          const box = document.createElement('div');
          box.classList.add('box');
          box.setAttribute('draggable', 'true');
          box.innerHTML = number;
          container.appendChild(box);

          // Add drag event listeners to each box
          box.addEventListener('dragstart', handleDragStart);
          box.addEventListener('dragover', handleDragOver);
          box.addEventListener('dragenter', handleDragEnter);
          box.addEventListener('dragleave', handleDragLeave);
          box.addEventListener('dragend', handleDragEnd);
          box.addEventListener('drop', handleDrop);
      });
  }

  function handleDragStart(e) {
      this.style.opacity = '0.4';
      dragSrcEl = this;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragEnd(e) {
      this.style.opacity = '1';
      const boxes = document.querySelectorAll('.box');
      boxes.forEach(item => item.classList.remove('over'));
  }

  function handleDragOver(e) {
      if (e.preventDefault) {
          e.preventDefault();
      }
      return false;
  }

  function handleDragEnter(e) {
      this.classList.add('over');
  }

  function handleDragLeave(e) {
      this.classList.remove('over');
  }

  function handleDrop(e) {
      e.stopPropagation();
      if (dragSrcEl !== this) {
          dragSrcEl.innerHTML = this.innerHTML;
          this.innerHTML = e.dataTransfer.getData('text/html');
          checkCompletion();
      }
      return false;
  }

  function checkCompletion() {
      const boxes = document.querySelectorAll('.box');
      const correctOrder = [...boxes].map(box => box.innerHTML).join('');
      if (correctOrder === '12345678910') {
          message.textContent = 'Congratulations! You arranged the numbers correctly!';
          message.classList.remove('hidden');
      } else {
          // Only show lose message if the arrangement is incorrect
          message.textContent = 'Keep trying!'; // Update to prompt to keep trying
          message.classList.remove('hidden');
      }
  }

  function resetGame() {
      createBoxes(); // Create new boxes with random numbers
      message.classList.add('hidden'); // Hide the message
  }

  // Initial setup
  createBoxes();

  resetButton.addEventListener('click', resetGame);
});
