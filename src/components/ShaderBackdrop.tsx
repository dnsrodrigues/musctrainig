import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Backdrop WebGL com ondas animadas e aberração cromática.
 * Tinta cada canal com a cor `--accent` lida ao vivo do tema (lime, coral, ice, etc).
 * Auto-redimensiona ao container e re-renderiza quando o tema muda.
 *
 * Portado fielmente de design-muscle-tranig/shader-backdrop.jsx.
 */
interface ShaderBackdropProps {
  /** intensidade global do shader (default 1) */
  intensity?: number
}

export function ShaderBackdrop({ intensity = 1 }: ShaderBackdropProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    // Lê var(--accent) do CSS e converte pra THREE.Color
    function readAccent(): THREE.Color {
      const c = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#d4ff3a'
      try { return new THREE.Color(c) }
      catch { return new THREE.Color('#d4ff3a') }
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x050506, 1)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    const uniforms = {
      resolution: { value: new THREE.Vector2(1, 1) },
      time:       { value: 0.0 },
      xScale:     { value: 1.4 },
      yScale:     { value: 0.45 },
      distortion: { value: 0.07 },
      accent:     { value: readAccent() },
      intensity:  { value: intensity },
    }

    const vertexShader = `
      attribute vec3 position;
      void main() { gl_Position = vec4(position, 1.0); }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2  resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform vec3  accent;
      uniform float intensity;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;

        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        vec3 col =
            accent             * r
          + accent * vec3(0.8) * g
          + accent * vec3(0.4) * b;

        col *= intensity;
        col = pow(col, vec3(1.05));
        gl_FragColor = vec4(col, 1.0);
      }
    `

    const positions = new Float32Array([
      -1, -1, 0,  1, -1, 0,  -1,  1, 0,
       1, -1, 0, -1,  1, 0,   1,  1, 0,
    ])
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    })
    const mesh = new THREE.Mesh(geom, mat)
    scene.add(mesh)

    // Resize observer: ajusta o canvas ao container
    function resize() {
      const r = wrap!.getBoundingClientRect()
      const w = Math.max(1, r.width)
      const h = Math.max(1, r.height)
      renderer.setSize(w, h, false)
      uniforms.resolution.value.set(
        w * renderer.getPixelRatio(),
        h * renderer.getPixelRatio(),
      )
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // Observer de tema: quando --accent muda, atualiza o uniform
    const themeObs = new MutationObserver(() => {
      uniforms.accent.value = readAccent()
    })
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    // Loop de render
    let raf = 0
    function loop() {
      uniforms.time.value += 0.008
      renderer.render(scene, camera)
      raf = requestAnimationFrame(loop)
    }
    loop()

    // Cleanup
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      themeObs.disconnect()
      geom.dispose()
      mat.dispose()
      renderer.dispose()
    }
  }, [intensity])

  return (
    <div
      ref={wrapRef}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
