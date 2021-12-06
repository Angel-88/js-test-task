function main() {
    const size = 5;
    const matrix = generateMatrix(size);
    const startRow = Math.round(Math.random() * size);
    const endRow = Math.round(Math.random() * size);
    const startCol = Math.round(Math.random() * size);
    const endCol = Math.round(Math.random() * size);

    console.table(matrix);

    console.log(`StartPoint: [${startRow},${startCol}]`);
    console.log(`EndPoint: [${endRow},${endCol}]`);
    console.log('Result:', checkPoint(matrix, startRow, startCol, endRow, endCol));
}


function generateMatrix(n) {
    let result = [];

    for (let i = 0; i < n; i++) {
        result.push([]);
        for (let j = 0; j < n; j++) {
            result[i].push(Math.round(Math.random()))
        }
    }
    return result;
}

function checkPoint(matrix, startRow, startCol, endRow, endCol, visited = new Set()) {
    let result = false;

    const isNotVisited = !visited.has(`${startRow},${startCol}`);
    const hasPath = matrix[startRow] !== undefined && matrix[startRow][startCol] !== undefined && matrix[startRow][startCol] === 0;

    if (isNotVisited && hasPath) {
        visited.add(`${startRow},${startCol}`);

        if (startRow === endRow && startCol === endCol) {
            return true;
        }

        result = result || checkPoint(matrix, startRow - 1, startCol, endRow, endCol, visited);
        result = result || checkPoint(matrix, startRow + 1, startCol, endRow, endCol, visited);
        result = result || checkPoint(matrix, startRow, startCol + 1, endRow, endCol, visited);
        result = result || checkPoint(matrix, startRow, startCol - 1, endRow, endCol, visited);
    }

    return result;
}

main();