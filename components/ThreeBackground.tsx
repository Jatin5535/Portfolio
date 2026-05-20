'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  activeSection: string
  activeProjectIndex: number
  onNodeClick?: (sectionId: string) => void
}

export default function ThreeBackground({
  activeSection,
  activeProjectIndex
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeSectionRef = useRef<string>(activeSection)
  const projectIndexRef = useRef<number>(activeProjectIndex)

  // Sync refs to prevent re-instantiating WebGL contexts
  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    projectIndexRef.current = activeProjectIndex
  }, [activeProjectIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Setup Scene, Camera & WebGLRenderer
    const width = container.clientWidth
    const height = container.clientHeight
    const scene = new THREE.Scene()
    
    // Calm architectural camera view
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000)
    camera.position.set(0, 75, 140)
    
    const currentCameraPos = new THREE.Vector3().copy(camera.position)
    const targetCameraPos = new THREE.Vector3(0, 75, 140)
    const currentLookAt = new THREE.Vector3(0, 0, 0)
    const targetLookAt = new THREE.Vector3(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Controlled Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.15)
    scene.add(ambientLight)

    const softBlueLight = new THREE.DirectionalLight(0x0ea5e9, 1.2)
    softBlueLight.position.set(-30, 80, -30)
    scene.add(softBlueLight)

    const softGoldLight = new THREE.DirectionalLight(0xc9a84c, 0.8)
    softGoldLight.position.set(40, 80, 40)
    scene.add(softGoldLight)

    // 3. Systems Grid Blueprint (Calm grid plane)
    const gridHelper = new THREE.GridHelper(260, 26, 0xc9a84c, 0xffffff)
    const gridMat = gridHelper.material as THREE.LineBasicMaterial
    gridMat.transparent = true
    gridMat.opacity = 0.08
    gridMat.depthWrite = false
    scene.add(gridHelper)

    // 4. Blueprint Node Material
    const blueprintWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    })

    const blueprintGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050e18,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    })

    // 5. 3D System Pipeline Nodes (Curated calm geometries representing sectors)
    const systemNodes: {
      id: string
      position: THREE.Vector3
      cameraOffset: THREE.Vector3
      lookOffset: THREE.Vector3
      mesh: THREE.Group
    }[] = []

    const addSystemNode = (id: string, pos: THREE.Vector3, camOffset: THREE.Vector3, lookOffset: THREE.Vector3, createMeshFn: (grp: THREE.Group) => void) => {
      const grp = new THREE.Group()
      grp.position.copy(pos)
      createMeshFn(grp)
      scene.add(grp)

      systemNodes.push({
        id,
        position: pos,
        cameraOffset: camOffset,
        lookOffset,
        mesh: grp
      })
    }

    // Node 1: Main Core (Hero) at center (0, 0, 0)
    addSystemNode('home', new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 75, 140), new THREE.Vector3(0, 0, 0), (grp) => {
      const coreGeo = new THREE.BoxGeometry(16, 8, 16)
      const core = new THREE.Mesh(coreGeo, blueprintGlassMat)
      const wire = new THREE.Mesh(coreGeo, blueprintWireMat)
      wire.scale.setScalar(1.04)
      
      // Floating telemetry ring
      const ringGeo = new THREE.TorusGeometry(18, 0.2, 4, 32)
      const ring = new THREE.Mesh(ringGeo, blueprintWireMat)
      ring.rotation.x = Math.PI / 2
      ring.name = 'ring'

      grp.add(core, wire, ring)
    })

    // Node 2: About Node (Human-in-the-loop fallback)
    addSystemNode('about', new THREE.Vector3(-60, 0, 30), new THREE.Vector3(30, 45, 60), new THREE.Vector3(0, 5, 0), (grp) => {
      const geo = new THREE.CylinderGeometry(6, 6, 12, 6)
      const mesh = new THREE.Mesh(geo, blueprintGlassMat)
      const wire = new THREE.Mesh(geo, blueprintWireMat)
      wire.scale.setScalar(1.05)
      
      const satelliteGeo = new THREE.SphereGeometry(1.5, 8, 8)
      const sat = new THREE.Mesh(satelliteGeo, new THREE.MeshBasicMaterial({ color: 0xc9a84c }))
      sat.position.set(12, 0, 0)
      sat.name = 'satellite'

      grp.add(mesh, wire, sat)
    })

    // Node 3: Projects (6-cluster Case Studies)
    addSystemNode('projects', new THREE.Vector3(65, 0, -40), new THREE.Vector3(-35, 45, 65), new THREE.Vector3(0, 5, 0), (grp) => {
      const baseGeo = new THREE.BoxGeometry(18, 2, 18)
      const baseMesh = new THREE.Mesh(baseGeo, blueprintGlassMat)
      grp.add(baseMesh)

      // 6 smaller blocks representing Jatin's Case Studies
      const smallGeo = new THREE.BoxGeometry(4, 4, 4)
      const activeMat = new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true })
      
      for (let i = 0; i < 6; i++) {
        const theta = (i / 6) * Math.PI * 2
        const sMesh = new THREE.Mesh(smallGeo, i === 0 ? activeMat : blueprintWireMat)
        sMesh.position.set(Math.cos(theta) * 7, 3, Math.sin(theta) * 7)
        sMesh.name = `case_${i}`
        grp.add(sMesh)
      }
    })

    // Node 4: Skills Node (Capability Stack)
    addSystemNode('skills', new THREE.Vector3(-55, 0, -50), new THREE.Vector3(35, 40, 55), new THREE.Vector3(0, 5, 0), (grp) => {
      // 3 overlapping layers representing technical layers
      const layerGeo = new THREE.BoxGeometry(12, 1.5, 12)
      
      for (let i = 0; i < 3; i++) {
        const layer = new THREE.Mesh(layerGeo, blueprintGlassMat)
        const wire = new THREE.Mesh(layerGeo, blueprintWireMat)
        wire.scale.setScalar(1.05)
        
        const subGrp = new THREE.Group()
        subGrp.position.y = i * 4 - 4
        subGrp.add(layer, wire)
        subGrp.name = `layer_${i}`
        grp.add(subGrp)
      }
    })

    // Node 5: Philosophy (Orchestration Flows)
    addSystemNode('philosophy', new THREE.Vector3(50, 0, 45), new THREE.Vector3(-30, 45, 55), new THREE.Vector3(0, 5, 0), (grp) => {
      const geo = new THREE.OctahedronGeometry(6)
      const mesh = new THREE.Mesh(geo, blueprintGlassMat)
      const wire = new THREE.Mesh(geo, blueprintWireMat)
      wire.scale.setScalar(1.05)
      
      const ringGeo = new THREE.TorusGeometry(10, 0.15, 4, 32)
      const ring = new THREE.Mesh(ringGeo, blueprintWireMat)
      ring.rotation.y = Math.PI / 2
      ring.name = 'ring'

      grp.add(mesh, wire, ring)
    })

    // Node 6: Contact Node (Pulsing Beacon)
    addSystemNode('contact', new THREE.Vector3(0, 0, -85), new THREE.Vector3(0, 45, 60), new THREE.Vector3(0, 5, 0), (grp) => {
      const geo = new THREE.ConeGeometry(5, 12, 4)
      const mesh = new THREE.Mesh(geo, blueprintGlassMat)
      const wire = new THREE.Mesh(geo, blueprintWireMat)
      wire.scale.setScalar(1.05)

      // Ring pulse
      const ringGeo = new THREE.RingGeometry(8, 8.2, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc9a84c,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = Math.PI / 2
      ring.name = 'pulse'

      grp.add(mesh, wire, ring)
    })

    // 6. Data Stream Pipelines (Elegant flowing lines connecting Core to Satellites)
    const pipelineLines: THREE.Line[] = []
    const particleFlows: {
      curve: THREE.CatmullRomCurve3
      mesh: THREE.Mesh
      progress: number
      speed: number
    }[] = []

    const pCanvas = document.createElement('canvas')
    pCanvas.width = 16
    pCanvas.height = 16
    const pCtx = pCanvas.getContext('2d')
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.8)')
      grad.addColorStop(1, 'rgba(56, 189, 248, 0)')
      pCtx.fillStyle = grad
      pCtx.fillRect(0, 0, 16, 16)
    }
    const flowTexture = new THREE.CanvasTexture(pCanvas)

    const connectNodes = (n1: THREE.Vector3, n2: THREE.Vector3) => {
      // Curve with a slight upward arch representing systems flow
      const midPoint = new THREE.Vector3().addVectors(n1, n2).multiplyScalar(0.5)
      midPoint.y += 12

      const curve = new THREE.CatmullRomCurve3([n1, midPoint, n2])
      const points = curve.getPoints(50)
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.08,
        depthWrite: false
      })
      const line = new THREE.Line(lineGeo, lineMat)
      scene.add(line)
      pipelineLines.push(line)

      // Flowing data packet
      const flowGeo = new THREE.SphereGeometry(0.8, 8, 8)
      const flowMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
      const flowMesh = new THREE.Mesh(flowGeo, flowMat)
      scene.add(flowMesh)

      particleFlows.push({
        curve,
        mesh: flowMesh,
        progress: Math.random(),
        speed: Math.random() * 0.005 + 0.003
      })
    }

    // Connect Main Core to all outer nodes
    systemNodes.forEach((node) => {
      if (node.id !== 'home') {
        connectNodes(new THREE.Vector3(0, 0, 0), node.position)
      }
    })

    // 7. Drifting ambient background dust
    const DUST_COUNT = 800
    const dustPositions = new Float32Array(DUST_COUNT * 3)
    for (let i = 0; i < DUST_COUNT; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 300
      dustPositions[i * 3 + 1] = Math.random() * 80 - 10
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 300
    }
    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3))
    
    const dustMat = new THREE.PointsMaterial({
      color: 0xc9a84c,
      size: 0.6,
      transparent: true,
      opacity: 0.25,
      depthWrite: false
    })
    const dustSystem = new THREE.Points(dustGeo, dustMat)
    scene.add(dustSystem)

    // 8. Mouse & scroll parallax settings
    const mouse = new THREE.Vector2()
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // 9. Resize Handling
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // 10. Animation & Render Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      // A. Rotate system meshes slowly
      systemNodes.forEach((n) => {
        if (n.id === 'home') {
          n.mesh.rotation.y = time * 0.05
          const ring = n.mesh.getObjectByName('ring')
          if (ring) ring.rotation.z = time * 0.12
        } else if (n.id === 'about') {
          n.mesh.rotation.y = time * 0.08
          const sat = n.mesh.getObjectByName('satellite')
          if (sat) {
            sat.position.x = Math.cos(time * 0.8) * 10
            sat.position.z = Math.sin(time * 0.8) * 10
          }
        } else if (n.id === 'projects') {
          // Subtle hover rotation
          n.mesh.rotation.y = time * 0.04

          // Rotate Small case study blocks, highlight active one
          for (let i = 0; i < 6; i++) {
            const block = n.mesh.getObjectByName(`case_${i}`)
            if (block) {
              block.rotation.y = time * 0.18 + i
              
              const blockMat = (block as THREE.Mesh).material as THREE.Material
              if (i === projectIndexRef.current) {
                // Glow active case study block
                block.scale.lerp(new THREE.Vector3(1.25, 1.25, 1.25), 0.1)
                if ('color' in blockMat) (blockMat as any).color.setHex(0xc9a84c)
              } else {
                block.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
                if ('color' in blockMat) (blockMat as any).color.setHex(0x38bdf8)
              }
            }
          }
        } else if (n.id === 'skills') {
          // Layer animations
          for (let i = 0; i < 3; i++) {
            const layer = n.mesh.getObjectByName(`layer_${i}`)
            if (layer) {
              layer.rotation.y = time * 0.05 * (i % 2 === 0 ? 1 : -1)
            }
          }
        } else if (n.id === 'philosophy') {
          n.mesh.rotation.x = time * 0.06
          n.mesh.rotation.y = time * 0.04
        } else if (n.id === 'contact') {
          n.mesh.rotation.y = time * 0.08
          const pulse = n.mesh.getObjectByName('pulse')
          if (pulse) {
            const scale = 1 + (time % 2) * 1.5
            pulse.scale.setScalar(scale)
            
            const pulseMat = (pulse as THREE.Mesh).material as THREE.Material
            pulseMat.opacity = 0.35 - (time % 2) / 2 * 0.35
          }
        }
      })

      // B. Animate flowing data packets along pipeline curves
      particleFlows.forEach((flow) => {
        flow.progress += flow.speed
        if (flow.progress > 1) flow.progress = 0

        const pt = flow.curve.getPointAt(flow.progress)
        flow.mesh.position.copy(pt)
      })

      // C. Slow vortex orbit for background dust
      dustSystem.rotation.y = time * 0.005

      // D. Coordinate Camera pan interpolation based on activeSection Ref
      const activeSec = activeSectionRef.current
      const targetNode = systemNodes.find(n => n.id === activeSec) || systemNodes[0]

      targetCameraPos.copy(targetNode.position).add(targetNode.cameraOffset)
      targetLookAt.copy(targetNode.position).add(targetNode.lookOffset)

      // Apply subtle mouse parallax
      targetCameraPos.x += mouse.x * 10
      targetCameraPos.y += mouse.y * 6

      // Lerp camera
      camera.position.lerp(targetCameraPos, 0.035)
      currentLookAt.lerp(targetLookAt, 0.035)
      camera.lookAt(currentLookAt)

      renderer.render(scene, camera)
    }

    animate()

    // 11. Complete Cleanup of WebGL resource leaks
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Dispose scene child elements
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })

      dustGeo.dispose()
      dustMat.dispose()
      flowTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" 
    />
  )
}
