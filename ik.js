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
      x: SPx*length*(points-1),
      y: SPy*length*(points-1)
    }
    this.tolerance = 0.00001
    this.points = points;
    this.length = length;
    this.pointsLoc = this._generateLocation(SPx, SPy, this.points, this.length);

  }
  draw(ctx) {
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
      console.log("unreachable")
    }
    else if (Vector.Magnitude({
        x: this.endPoint.x - this.pointsLoc[this.pointsLoc.length - 1].x,
        y: this.endPoint.y - this.pointsLoc[this.pointsLoc.length - 1].y
      }) > this.tolerance) {

      this.backward(this.forward())
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
  if(vector==0)
    return Object.assign({}, {
      x: x0,
      y: y0
    })
  return Object.assign({}, {
    x: (1 - vector) * x0 + vector * x1,
    y: (1 - vector) * y0 + vector * y1
  });
}

IK.prototype.forward = function () {
  // console.log("forward")
  let forwardPoints = []
  let end = this.endPoint
  // forwardPoints.push(end)
  for (let i = this.pointsLoc.length - 1; i >= 0; i--) {
    // this.pointsLoc[this.pointsLoc.length - 1] = end
    let newVal = this._getNewPoints(end.x, end.y,this.pointsLoc[i].x, this.pointsLoc[i].y)
    forwardPoints.push(newVal)
    end = newVal
  }
  // console.log(forwardPoints)
  // console.log("end forward")
  return forwardPoints
}

IK.prototype.backward = function (forwardPoints) {
  // console.log("backward")
  let newPoints = []
  forwardPoints = forwardPoints.slice().reverse()
  let start = this.startPoint
  for (let i = 0; i < forwardPoints.length; i++) {
    let newVal = this._getNewPoints(start.x, start.y, forwardPoints[i].x, forwardPoints[i].y)
    newPoints.push(newVal)
    start = newVal
  }
  // console.log("end backward")
  this.pointsLoc = newPoints
}

export {
  IK
};