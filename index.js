import {
  IK
} from "./ik.js";
/** @type {HTMLCanvasElement} */
(function () {

  let canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "white";
    Mouse = new UserInput();
    update();
  });

  const length = 10
  const points = 3;


  class UserInput {
    constructor() {
      this.state = "drawing";
      this.hold = false;
      this.startingNode = new Set()
    // this.endNodes = []~
      this.endNodes = new Set()
    }
    checkInput() {
      // console.log(this.state)
      canvas.onclick = (e)=>ikC.addTarget(e.offsetX, e.offsetY);
      canvas.onmousedown = (e) => {
        this.hold = true;
      }
      canvas.onmousemove = (e) => {
        if (this.hold) {

          ikC.addTarget(e.offsetX, e.offsetY)

        }

      }
      canvas.onmouseup = (e) => {
        this.hold = false;
      }
      window.onkeydown = (e) => {
        //e.keycode =
        if (e.keyCode == 66) {
          Mouse.state = "drawing";
        } else if (e.keyCode == 69) {
          Mouse.state = "erasing";
        } else if (e.keyCode == 86) {
          Mouse.state = "move"
        } else if (e.keyCode == 74) {
          Mouse.state = "sp"
          this.sp_color = sp.value
        } else if (e.keyCode == 75) {
          Mouse.state = "ep"
          this.ep_color = ep.value
        }
        // console.log(e.keyCode)
        // console.log(map.length)
      }
    }
  }

  let Mouse = new UserInput();

  let ikC = new IK(300, 200, 3, 100)

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Mouse.checkInput();
    requestAnimationFrame(update);
  }

  function init() {
    ikC.draw(ctx)
    update();
  }
  init()
})()