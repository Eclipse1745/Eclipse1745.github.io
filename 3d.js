const BACKGROUND = "#111"
const FOREGROUND = "#50FF50"

console.log(graphic)
graphic.width = 800
graphic.height = 600
const ctx = graphic.getContext("2d")

console.log(ctx)

function clear() {
  ctx.fillStyle = BACKGROUND
  ctx.fillRect(0, 0, graphic.width, graphic.height)
}

function point({x,y}) {
  ctx.fillStyle = FOREGROUND
  ctx.fillRect(x-10/2, y-5/2, 10,10)
}

function screen(p) {
  return {
    x: ((p.x + 1)/2)*graphic.width,
    y: (1-(p.y + 1)/2)*graphic.height,
  }
}

function project({x, y, z}) {
  const fovY = 1.5;
  return {
    x: x/z,
    y: (y*fovY)/z, 
  }
  
}



const FPS = 60;



function line(p1,p2) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = FOREGROUND
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
}


function translate_z({x , y , z}, dz) {
  return { x , y , z: z + dz}; 
}

function rotate({x , y , z} , angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c-z*s,
        y,
        z: x*s+z*c,
    };
}

let dz = 35;
let angle = 0;

function frame() {
  const dt = 1/FPS;
  angle += Math.PI*dt; 
  clear()
   for (const f of fs) {
    for (let i = 0; i < f.length; i++) {
      const a = vs[f[i]];
      const b = vs[f[(i+1)%f.length]];
      line(screen(project(translate_z(rotate(a, angle), dz))),
           screen(project(translate_z(rotate(b, angle), dz))))
    }
  }
  setTimeout(frame , 1000/FPS);
}
setTimeout(frame, 1000/FPS);
