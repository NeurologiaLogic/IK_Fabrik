import {
  Vector
} from "./util.js"
class IK {
  constructor(SPx, SPy, points, length) {
    this.startPoint = {
      x: SPx,
      y: SPy
    }
    this.endPoint = {
      x: 300,
      y: 190
    }
    this.tolerance = 0.01
    this.points = points;
    this.length = length;
    this.pointsLoc = this._generateLocation(SPx, SPy, this.points, this.length);

  }
  draw(ctx) {
    // if (this.endPoint.x - this.startPoint.x > 0 && this.endPoint.y - this.startPoint.y > 0) {
      // console.log("unreachable")
    //   return;
    // }
    for (let i = this.pointsLoc.length - 1; i >= 0; i--) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.strokeStyle = "white";
      ctx.arc(this.pointsLoc[i].x, this.pointsLoc[i].y, 5, 0, Math.PI * 2)
      if (i > 0) {
        ctx.moveTo(this.pointsLoc[i].x, this.pointsLoc[i].y)
        ctx.lineTo(this.pointsLoc[i - 1].x, this.pointsLoc[i - 1].y)
      }
      ctx.stroke()
      ctx.fill()
    }
    if (Vector.Magnitude({
        x: this.endPoint.x - this.pointsLoc[this.pointsLoc.length - 1].x,
        y: this.endPoint.y - this.pointsLoc[this.pointsLoc.length - 1].y
      }) > this.points * this.length) {
      // console.log("unreachable")
    }
    while (Vector.Magnitude({
        x: this.endPoint.x - this.pointsLoc[this.pointsLoc.length - 1].x,
        y: this.endPoint.y - this.pointsLoc[this.pointsLoc.length - 1].y
      }) > this.tolerance) {
        console.log(Vector.Magnitude({
          x: this.endPoint.x - this.pointsLoc[this.pointsLoc.length - 1].x,
          y: this.endPoint.y - this.pointsLoc[this.pointsLoc.length - 1].y}))
          // this.forward()
      // this.backward()
    }
  }
  addTarget(x, y) {
    this.endPoint = {
      x: x,
      y: y
    }
  }
}

IK.prototype._generateLocation = (x, y, points, length) => {
  let LocPoints = []
  for (let i = 1; i <= points; i++) {
    LocPoints.push({
      x: x + i * length,
      y: y + i * length
    })
  }
  return LocPoints.slice().reverse();
}

IK.prototype._getNewPoints = function (x0, y0, x1, y1) {
  let vector = this.length/Vector.Magnitude(Vector.vectorDir(x0, y0, x1, y1))
  // console.log("vector: :", vector)
  // console.log("this is vector" + vector.x + " " + vector.y)
  return Object.assign({}, {
    x: (1 - vector) * x0 + vector * x1,
    y: (1 - vector) * y0 + vector * y1
  });
}

IK.prototype.forward = function () {
  // console.log("forward")
  let forwardPoints = []
  this.pointsLoc[this.pointsLoc.length - 1] = this.endPoint
  let end = this.pointsLoc[this.pointsLoc.length - 1]
  forwardPoints.push(end)
  for (let i = this.pointsLoc.length - 2; i >= 0; i--) {
    let newVal = this._getNewPoints(this.pointsLoc[i].x, this.pointsLoc[i].y, end.x, end.y)
    let newCalc = {
      x: newVal.x,
      y: newVal.y
    }
    forwardPoints.push(newCalc)
    end = newCalc
  }
  // console.log(forwardPoints)
  // console.log("end forward")
  return forwardPoints
}

IK.prototype.backward = function (forwardPoints) {
  // console.log("backward")
  let newPoints = []
  forwardPoints = forwardPoints.slice().reverse()
  let start = forwardPoints[0] = this.startPoint
  newPoints.push(start)
  for (let i = 1; i < forwardPoints.length; i++) {
    let newVal = this._getNewPoints(start.x, start.y, forwardPoints[i].x, forwardPoints[i].y)
    let newCalc = {
      x: newVal.x,
      y: newVal.y
    }
    newPoints.push(newCalc)
    // newPoints.push(newVal)
    // console.log(`backward is : ${newVal.x} ${newVal.y}`)
    start = newCalc
  }
  // console.log(newPoints)
  // console.log("end backward")
  this.pointsLoc = newPoints
}

// let ikC = new IK(1, 1, 3, 5)
// ikC.draw()
export {
  IK
};