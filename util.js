class Vector {
  static Magnitude({
    x,
    y
  }) {
    return Math.sqrt(x * x + y * y)
  }
  static Magnitude4p({
    x0,
    y0,
    x1,
    y1
  }) {
    let vec = this.vectorDir(x0, y0, x1, y1)
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y)
  }
  static vectorDir(x0, y0, x1, y1) {
    return {
      x: x1 - x0,
      y: y1 - y0
    }
  }
  static unit(x0, y0, x1, y1) {
    let vector = this.vectorDir(x0, y0, x1, y1)
    if (this.Magnitude(this.vectorDir(x0, y0, x1, y1) == 0)) {
      return {
        x: 0,
        y: 0
      };
    }
    return {
      x: vector.x / this.Magnitude(this.vectorDir(x0, y0, x1, y1)),
      y: vector.y / this.Magnitude(this.vectorDir(x0, y0, x1, y1))
    }
  }
}

// class Vector {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
//   add(v) {
//     return new Vector(this.x + v.x, this.y + v.y);
//   }
//   sub(v) {
//     return new Vector(this.x - v.x, this.y - v.y);
//   }
//   mult(v) {
//     return new Vector(this.x * v, this.y * v);
//   }
//   mag() {
//     return Math.sqrt(this.x ** 2 + this.y ** 2);
//   }
//   static dot() {
//get cos
//angle between 2 lines
//   }
//   normal() {
//     return new Vector(-this.y, this.x).unit();
//   }
//   unit() {
//     // console.log("magnitude"+ this.mag())
//     if (this.mag() === 0) {
//       return new Vector(0, 0);
//     } else {
//       return new Vector(this.x / this.mag(), this.y / this.mag);
//     }
//   }
// }

let start = {
  x: 300,
  y: 300
}
let end = {
  x: 350,
  y: 350
}
// console.log(Vector.vectorDir(end.x, end.y, start.x, start.y))
// console.log(Vector.Magnitude(Vector.vectorDir(start.x, start.y, end.x, end.y)))
// let temp = Vector.unit(start.x, start.y, end.x, end.y)
// console.log(start.x + temp.x * 40, start.y + temp.y * 40)
export {
  Vector
}
/*
  Magnitude belom bener
  Selesain:
  Dapetin unit vector dari x datang y datang - x target y target * length
  x dan y di assign ke backward
  lakuin yang sama ke forward
*/