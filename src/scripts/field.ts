// A WebGL2 fragment shader ray marches a glowing grid terrain under the hero.

const vertex = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
out vec4 color;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float height(vec2 p) { return noise(p * 0.22) * 1.5 + noise(p * 0.7 + 7.0) * 0.3 - 0.3; }

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = vec3(uPointer.x * 1.6, 3.4 - uPointer.y * 0.5, uTime * 1.4);
  vec3 rd = normalize(vec3(uv.x, uv.y - 0.12, 1.0) * vec3(1.0, 1.0, 1.0));
  rd = normalize(vec3(rd.x, rd.y - 0.22, rd.z));

  float t = 0.0;
  vec3 p = ro;
  bool hit = false;
  for (int i = 0; i < 96; i++) {
    p = ro + rd * t;
    float d = p.y - height(p.xz);
    if (d < 0.01) { hit = true; break; }
    t += d * 0.45;
    if (t > 42.0) break;
  }

  vec3 col = vec3(0.012, 0.018, 0.035);
  col += vec3(0.4, 0.3, 1.0) * 0.16 * exp(-abs(uv.y - 0.02) * 7.0);
  if (hit) {
    vec2 q = p.xz;
    vec2 g = abs(fract(q) - 0.5) / (fwidth(q) * 1.3);
    float line = 1.0 - min(min(g.x, g.y), 1.0);
    vec2 cell = abs(fract(q) - 0.5);
    float node = smoothstep(0.08, 0.0, length(0.5 - cell)) * step(0.82, hash(floor(q + 0.5)));
    float fog = exp(-t * 0.07);
    float peak = smoothstep(0.7, 1.2, p.y);
    vec3 tint = mix(vec3(0.36, 0.95, 1.0), vec3(0.66, 0.55, 1.0), clamp(t / 26.0, 0.0, 1.0));
    tint = mix(tint, vec3(0.77, 1.0, 0.29), peak * 0.6);
    col = vec3(0.015, 0.022, 0.045) + tint * (line * 0.85 + node * 1.6) * fog;
  }
  col *= 1.0 - 0.4 * dot(uv, uv);
  color = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
  return s;
}

export function startField(canvas: HTMLCanvasElement, still: boolean) {
  const gl = canvas.getContext("webgl2", { antialias: false, powerPreference: "low-power" });
  if (!gl) return false;

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, vertex));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, "uRes");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uPointer = gl.getUniformLocation(prog, "uPointer");

  // The march is heavy, so phones render fewer pixels and the browser scales them up.
  const scale = Math.min(devicePixelRatio || 1, 1.5) * (matchMedia("(pointer: coarse)").matches ? 0.5 : 0.75);
  const resize = () => {
    canvas.width = Math.round(canvas.clientWidth * scale);
    canvas.height = Math.round(canvas.clientHeight * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };

  let target = { x: 0, y: 0 };
  const pointer = { x: 0, y: 0 };
  addEventListener("pointermove", (e) => {
    target = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 };
  });

  let visible = true;
  const begin = performance.now();
  const draw = (now: number) => {
    pointer.x += (target.x - pointer.x) * 0.04;
    pointer.y += (target.y - pointer.y) * 0.04;
    gl.uniform1f(uTime, (now - begin) / 1000);
    gl.uniform2f(uPointer, pointer.x, pointer.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const loop = (now: number) => {
    draw(now);
    if (visible) requestAnimationFrame(loop);
  };

  resize();
  addEventListener("resize", () => {
    resize();
    if (still) draw(begin);
  });
  if (still) {
    draw(begin);
  } else {
    new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting && !document.hidden;
      if (visible && !was) requestAnimationFrame(loop);
    }).observe(canvas);
    requestAnimationFrame(loop);
  }
  canvas.classList.add("live");
  return true;
}
