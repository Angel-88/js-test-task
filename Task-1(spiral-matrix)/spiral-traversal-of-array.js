function spiralTraversalOfArray (cols, rows, colNum, rowNum, direction) {
  let matrix = createMatrix(rows, cols);

  let col = colNum - 1;
  let row = rowNum - 1;
  let minCol = colNum - 1;
  let maxCol = colNum - 1;
  let minRow = rowNum - 1;
  let maxRow = rowNum - 1;

  let res = '';
  let count = 0;

  while (count < rows * cols) {
    if ((col >= 0 && col < cols) && (row >= 0 && row < rows)) {
      res += `${matrix[row][col]}.`;
      count++;
    }
    switch (direction) {
      case 'left':
        col -= 1;
        if (col < minCol) {
          direction = 'up';
          minCol = col;
        }
        break;
      case 'up':
        row -= 1;
        if (row < minRow) {
          direction = 'right';
          minRow = row;
        }
        break;
      case 'right':
        col += 1;
        if (col > maxCol) {
          direction = 'down';
          maxCol = col;
        }
        break;
      case 'down':
        row += 1;
        if (row > maxRow) {
          direction = 'left';
          maxRow = row;
        }
    }
  }
  res = res.slice(0, -1);
  console.log(res);
}

function createMatrix (rows, cols) {
  let arr = [];
  let count = 1;
  for (let i = 0; i < rows; i++) {
    arr.push([]);
    arr[i].push(new Array(cols));
    for (let j = 0; j < cols; j++) {
      arr[i][j] = count;
      count++;
    }
  }
  return arr;
}
