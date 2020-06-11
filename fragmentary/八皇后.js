let num = 1;
let MAX_QUEEN = 8;
let position = [];

class EightQueen {
  isValid(row) {
    for (let i = 0; i < row; i++) {
      if (
        position[i] == position[row] ||
        Math.abs(position[i] - position[row]) == Math.abs(i - row)
      ) {
        return false;
      }
    }
    return true;
  }

  print() {
    console.log('第' + num++ + '种摆法：');
    for (let i = 0; i < MAX_QUEEN; i++) {
      let str = '';
      for (let j = 0; j < MAX_QUEEN; j++) {
        if (position[i] == j) str += '+ ';
        else str += '0 ';
      }
      console.log(str);
    }
  }

  trail(row) {
    if (row == MAX_QUEEN) {
      this.print();
      return;
    }
    for (let column = 0; column < MAX_QUEEN; column++) {
      position[row] = column; // 放在第row行第column列
      if (this.isValid(row)) this.trail(row + 1);
    }
  }
}

class Queen8 {
  walk(row) {
    if (row === MAX_QUEEN) return true;

    position[row] = position[row] || new Array(MAX_QUEEN).fill(0);
    for (let column = 0; column < MAX_QUEEN; column++) {
      if (this.check(row, column)) {
        position[row][column] = 1;
        if (this.walk(row + 1)) {
          return true;
        } else {
          position[row][column] = 0;
        }
      }
    }
    return false;
  }
  walkAll(row) {
    if (row === MAX_QUEEN) {
      this.print();
      return;
    }
    position[row] = position[row] || new Array(MAX_QUEEN).fill(0);
    for (let column = 0; column < MAX_QUEEN; column++) {
      position[row] = new Array(MAX_QUEEN).fill(0);
      if (this.check(row, column)) {
        position[row][column] = 1;
        this.walkAll(row + 1);
      }
    }
  }
  check(row, column) {
    for (let i = 0; i < row; i++) {
      if (position[i][column]) {
        return false;
      }

      // 左斜方
      if (
        row - 1 - i >= 0 &&
        column - 1 - i >= 0 &&
        position[row - 1 - i][column - 1 - i]
      ) {
        return false;
      }

      // 右斜方
      if (
        row - 1 - i >= 0 &&
        column + 1 + i < MAX_QUEEN &&
        position[row - 1 - i][column + 1 + i]
      ) {
        return false;
      }
    }
    return true;
  }
  print() {
    console.log('第' + num++ + '种摆法：');
    for (let i = 0; i < MAX_QUEEN; i++) {
      let str = '';
      for (let j = 0; j < MAX_QUEEN; j++) {
        str += position[i][j] + ' ';
      }
      console.log(str);
    }
  }
}
