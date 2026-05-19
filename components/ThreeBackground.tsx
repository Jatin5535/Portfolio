'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  activeSection: string
  activeProjectIndex: number
  onNodeClick: (sectionId: string) => void
}

export default function ThreeBackground({
  activeSection,
  activeProjectIndex,
  onNodeClick
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeSectionRef = useRef<string>(activeSection)
  const projectIndexRef = useRef<number>(activeProjectIndex)

  // Sync refs so they are always accessible inside the WebGL loop without re-triggering effect
  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    projectIndexRef.current = activeProjectIndex
  }, [activeProjectIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene & Camera Setup
    const width = container.clientWidth
    const height = container.clientHeight
    const scene = new THREE.Scene()
    
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000)
    
    // Initial camera placement
    camera.position.set(0, 0, 180)
    const cameraTarget = new THREE.Vector3(0, 0, 0)
    const cameraCurrentLook = new THREE.Vector3(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(ambientLight)

    const goldColor = new THREE.Color('#c9a84c')
    const goldLight = new THREE.DirectionalLight(goldColor, 1.8)
    goldLight.position.set(50, 100, 50)
    scene.add(goldLight)

    const blueLight = new THREE.DirectionalLight(0x3b82f6, 1.2)
    blueLight.position.set(-50, -100, -50)
    scene.add(blueLight)

    // 3. Materials
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111e30,
      emissive: 0x050e18,
      roughness: 0.15,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
      transmission: 0.6,
      thickness: 1.5,
      side: THREE.DoubleSide
    })

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: goldColor,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    })

    // 4. Create the Core Node (Home) at (0, 0, 0)
    const coreGroup = new THREE.Group()
    
    const coreSphereGeo = new THREE.SphereGeometry(14, 24, 24)
    const coreSphere = new THREE.Mesh(coreSphereGeo, glassMaterial)
    coreGroup.add(coreSphere)

    const coreWireframe = new THREE.Mesh(coreSphereGeo, wireframeMaterial)
    coreWireframe.scale.setScalar(1.05)
    coreGroup.add(coreWireframe)

    // Rotating tori (gimbal effect)
    const torusGeo1 = new THREE.TorusGeometry(20, 0.4, 8, 48)
    const torus1 = new THREE.Mesh(torusGeo1, wireframeMaterial)
    coreGroup.add(torus1)

    const torusGeo2 = new THREE.TorusGeometry(23, 0.25, 8, 48)
    const torus2 = new THREE.Mesh(torusGeo2, wireframeMaterial)
    torus2.rotation.x = Math.PI / 2
    coreGroup.add(torus2)

    scene.add(coreGroup)

    // 5. Interactive Section Nodes Configuration
    const nodes: {
      id: string
      position: THREE.Vector3
      cameraPos: THREE.Vector3
      group: THREE.Group
      baseScale: number
    }[] = []

    const interactiveMeshes: THREE.Object3D[] = []

    // Helper to register an interactive group
    const registerNode = (id: string, pos: THREE.Vector3, camOffset: THREE.Vector3, createMeshFn: (grp: THREE.Group) => void) => {
      const grp = new THREE.Group()
      grp.position.copy(pos)
      createMeshFn(grp)
      scene.add(grp)
      
      nodes.push({
        id,
        position: pos,
        cameraPos: pos.clone().add(camOffset),
        group: grp,
        baseScale: 1
      })

      // Add child meshes to interactives for raycasting
      grp.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.userData = { nodeId: id }
          interactiveMeshes.push(child)
        }
      })
    }

    // A. About Node: Floating floating octahedron with orbital rings
    registerNode('about', new THREE.Vector3(-60, 25, 45), new THREE.Vector3(25, 5, 40), (grp) => {
      const geo = new THREE.OctahedronGeometry(6)
      const mesh = new THREE.Mesh(geo, glassMaterial.clone())
      const wire = new THREE.Mesh(geo, wireframeMaterial)
      wire.scale.setScalar(1.08)
      grp.add(mesh, wire)

      const ringGeo = new THREE.TorusGeometry(9, 0.15, 6, 32)
      const ring = new THREE.Mesh(ringGeo, wireframeMaterial)
      ring.rotation.x = Math.PI / 3
      grp.add(ring)
    })

    // B. Projects Node: 3 Floating geometric crystal boxes that change rotation based on project index
    registerNode('projects', new THREE.Vector3(70, 30, -35), new THREE.Vector3(-30, -5, 45), (grp) => {
      const geo = new THREE.BoxGeometry(6, 6, 6)
      
      // Main project crystal
      const mainMat = glassMaterial.clone()
      mainMat.emissive.setHex(0xc9a84c)
      mainMat.emissiveIntensity = 0.35
      const mainMesh = new THREE.Mesh(geo, mainMat)
      const mainWire = new THREE.Mesh(geo, wireframeMaterial)
      mainWire.scale.setScalar(1.06)
      mainMesh.add(mainWire)
      grp.add(mainMesh)

      // Orbiting tiny satellite block
      const satGeo = new THREE.BoxGeometry(2, 2, 2)
      const satMesh = new THREE.Mesh(satGeo, glassMaterial.clone())
      satMesh.position.set(9, 3, -3)
      satMesh.name = 'satellite'
      grp.add(satMesh)
    })

    // C. Skills Node: Planetary neural atom cluster
    registerNode('skills', new THREE.Vector3(-45, -40, -50), new THREE.Vector3(30, 15, 45), (grp) => {
      const centerGeo = new THREE.SphereGeometry(6, 16, 16)
      const centerMat = glassMaterial.clone()
      centerMat.roughness = 0.05
      const centerMesh = new THREE.Mesh(centerGeo, centerMat)
      grp.add(centerMesh)

      const orbitRingGeo = new THREE.TorusGeometry(12, 0.1, 4, 32)
      const ring1 = new THREE.Mesh(orbitRingGeo, wireframeMaterial)
      const ring2 = new THREE.Mesh(orbitRingGeo, wireframeMaterial)
      ring2.rotation.y = Math.PI / 2
      grp.add(ring1, ring2)

      // Orbiting electron nodes
      const electronGeo = new THREE.SphereGeometry(1.5, 8, 8)
      const eMat = new THREE.MeshBasicMaterial({ color: goldColor })
      
      const e1 = new THREE.Mesh(electronGeo, eMat)
      e1.position.set(12, 0, 0)
      e1.name = 'e1'

      const e2 = new THREE.Mesh(electronGeo, eMat)
      e2.position.set(0, 12, 0)
      e2.name = 'e2'

      const e3 = new THREE.Mesh(electronGeo, eMat)
      e3.position.set(0, 0, 12)
      e3.name = 'e3'

      grp.add(e1, e2, e3)
    })

    // D. Writing Node: Double-pyramid prism
    registerNode('writing', new THREE.Vector3(55, -35, 45), new THREE.Vector3(-25, 10, 40), (grp) => {
      const geo = new THREE.ConeGeometry(5, 10, 4)
      const topMesh = new THREE.Mesh(geo, glassMaterial.clone())
      topMesh.rotation.x = Math.PI / 2
      
      const botMesh = new THREE.Mesh(geo, glassMaterial.clone())
      botMesh.rotation.x = -Math.PI / 2

      const wire = new THREE.Mesh(geo, wireframeMaterial)
      wire.rotation.x = Math.PI / 2
      wire.scale.setScalar(1.05)

      grp.add(topMesh, botMesh, wire)
    })

    // E. Experience Node: Vertical helix backbone
    registerNode('experience', new THREE.Vector3(0, 60, -70), new THREE.Vector3(0, -10, 55), (grp) => {
      const points: THREE.Vector3[] = []
      for (let i = 0; i < 40; i++) {
        const t = (i / 40) * Math.PI * 4
        points.push(new THREE.Vector3(Math.cos(t) * 5, i * 0.4 - 8, Math.sin(t) * 5))
      }
      const curve = new THREE.CatmullRomCurve3(points)
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.4, 8, false)
      const helixMesh = new THREE.Mesh(tubeGeo, glassMaterial.clone())
      grp.add(helixMesh)

      // Add a couple of glowing spheres on helix
      const sphereGeo = new THREE.SphereGeometry(1.8, 8, 8)
      const sphereMat = new THREE.MeshBasicMaterial({ color: goldColor })
      for (let i = 0; i < 3; i++) {
        const sphere = new THREE.Mesh(sphereGeo, sphereMat)
        const val = i * 13 + 5
        sphere.position.copy(points[val])
        grp.add(sphere)
      }
    })

    // F. Contact Node: Pulsing geometric beacon with outer expanding waves
    registerNode('contact', new THREE.Vector3(0, -55, 15), new THREE.Vector3(0, 10, 50), (grp) => {
      const geo = new THREE.IcosahedronGeometry(5, 0)
      const mesh = new THREE.Mesh(geo, glassMaterial.clone())
      const wire = new THREE.Mesh(geo, wireframeMaterial)
      wire.scale.setScalar(1.06)
      grp.add(mesh, wire)

      // Ring pulses
      const ringGeo = new THREE.RingGeometry(8, 8.3, 32)
      const ringMat = new THREE.MeshBasicMaterial({
        color: goldColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
      })
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.name = 'pulse-ring'
      grp.add(ring)
    })

    // 6. Floating Particle Field (Drifting Vortex)
    const PARTICLE_COUNT = 1500
    const particlePositions = new Float32Array(PARTICLE_COUNT * 3)
    const particleSpeeds: number[] = []
    const particleAngles: number[] = []
    const particleRadius: number[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = Math.random() * 220 + 20
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 160

      particlePositions[i * 3] = Math.cos(angle) * radius
      particlePositions[i * 3 + 1] = y
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius

      particleSpeeds.push(Math.random() * 0.0003 + 0.0001)
      particleAngles.push(angle)
      particleRadius.push(radius)
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    // Canvas particle texture
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 16
    pCanvas.height = 16
    const pCtx = pCanvas.getContext('2d')
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
      gradient.addColorStop(0.2, 'rgba(201, 168, 76, 0.8)')
      gradient.addColorStop(1, 'rgba(201, 168, 76, 0)')
      pCtx.fillStyle = gradient
      pCtx.fillRect(0, 0, 16, 16)
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.8,
      transparent: true,
      blending: THREE.AdditiveBlending,
      map: particleTexture,
      depthWrite: false
    })

    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // 7. Raycasting & Mouse Interaction Setup
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredNodeId: string | null = null

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const onClick = () => {
      if (hoveredNodeId) {
        onNodeClick(hoveredNodeId)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('click', onClick)

    // 8. Dynamic Scroll transition
    let lastScrollY = 0
    let scrollAccumulator = 0
    const sectionOrder = ['home', 'about', 'projects', 'skills', 'writing', 'experience', 'contact']

    const onWheel = (e: WheelEvent) => {
      // Small debounce threshold for changing sections with wheel
      scrollAccumulator += e.deltaY
      if (Math.abs(scrollAccumulator) > 400) {
        const currIndex = sectionOrder.indexOf(activeSectionRef.current)
        if (scrollAccumulator > 0 && currIndex < sectionOrder.length - 1) {
          onNodeClick(sectionOrder[currIndex + 1])
        } else if (scrollAccumulator < 0 && currIndex > 0) {
          onNodeClick(sectionOrder[currIndex - 1])
        }
        scrollAccumulator = 0
      }
    }
    window.addEventListener('wheel', onWheel, { passive: true })

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

    // 10. Animation / Render Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()
      const delta = clock.getDelta()

      // A. Rotate main structures slowly
      coreGroup.rotation.y = time * 0.05
      torus1.rotation.y = time * 0.15
      torus2.rotation.z = time * -0.1

      // Rotate nodes based on section
      nodes.forEach((n) => {
        // Subtle drift/hover animation
        n.group.position.y += Math.sin(time * 1.5 + n.position.x) * 0.01

        if (n.id === 'about') {
          n.group.rotation.y = time * 0.12
          n.group.rotation.x = time * 0.06
        } else if (n.id === 'projects') {
          // Projects mesh rotates dynamically to match projectIndexRef
          const targetRot = projectIndexRef.current * (Math.PI / 3)
          n.group.rotation.y = THREE.MathUtils.lerp(n.group.rotation.y, targetRot, 0.08)
          n.group.rotation.x = time * 0.04
          
          // Orbiting satellite
          const sat = n.group.getObjectByName('satellite')
          if (sat) {
            sat.position.x = Math.cos(time * 0.6) * 10
            sat.position.z = Math.sin(time * 0.6) * 10
            sat.rotation.y = time
          }
        } else if (n.id === 'skills') {
          n.group.rotation.y = time * 0.08
          
          // Orbit electrons
          const e1 = n.group.getObjectByName('e1')
          const e2 = n.group.getObjectByName('e2')
          const e3 = n.group.getObjectByName('e3')
          if (e1 && e2 && e3) {
            const electronTime = time * 2
            e1.position.set(Math.cos(electronTime) * 12, 0, Math.sin(electronTime) * 12)
            e2.position.set(0, Math.cos(electronTime + 1) * 12, Math.sin(electronTime + 1) * 12)
            e3.position.set(Math.cos(electronTime + 2) * 12, Math.sin(electronTime + 2) * 12, 0)
          }
        } else if (n.id === 'writing') {
          n.group.rotation.y = time * -0.15
        } else if (n.id === 'experience') {
          n.group.rotation.y = time * 0.04
        } else if (n.id === 'contact') {
          n.group.rotation.y = time * 0.2
          
          // Pulse contact waves
          const pulse = n.group.getObjectByName('pulse-ring') as THREE.Mesh
          if (pulse) {
            const scale = 1 + (time % 1.5) * 1.5
            pulse.scale.setScalar(scale)
            
            const pulseMat = pulse.material as THREE.Material
            pulseMat.opacity = 1 - (time % 1.5) / 1.5
          }
        }
      })

      // B. Update particle positions in a vortex
      const positionsArr = particleGeo.attributes.position.array as Float32Array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particleAngles[i] += particleSpeeds[i]
        const r = particleRadius[i]
        const a = particleAngles[i]

        positionsArr[i * 3] = Math.cos(a) * r
        positionsArr[i * 3 + 2] = Math.sin(a) * r
      }
      particleGeo.attributes.position.needsUpdate = true
      particleSystem.rotation.y = time * -0.005

      // C. Raycasting Hover Check
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(interactiveMeshes)

      if (intersects.length > 0) {
        const hit = intersects[0]
        const mesh = hit.object
        const nodeId = mesh.userData.nodeId

        if (nodeId && nodeId !== hoveredNodeId) {
          hoveredNodeId = nodeId
          document.body.style.cursor = 'pointer'
        }

        // Animate hover scale up
        nodes.forEach((n) => {
          if (n.id === hoveredNodeId) {
            n.group.scale.lerp(new THREE.Vector3(1.22, 1.22, 1.22), 0.15)
            // Pulse color subtly
            grpEmissiveIntensity(n.group, 0.6)
          } else {
            n.group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15)
            grpEmissiveIntensity(n.group, 0.2)
          }
        })
      } else {
        if (hoveredNodeId !== null) {
          hoveredNodeId = null
          document.body.style.cursor = 'default'
        }

        // Animate all back to normal
        nodes.forEach((n) => {
          n.group.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15)
          grpEmissiveIntensity(n.group, 0.2)
        })
      }

      // Helper to adjust emissive level of meshes
      function grpEmissiveIntensity(grp: THREE.Group, val: number) {
        grp.traverse((c) => {
          if (c instanceof THREE.Mesh && c.material && 'emissiveIntensity' in c.material) {
            ;(c.material as any).emissiveIntensity = val
          }
        })
      }

      // D. Camera Interpolation
      let targetPos = new THREE.Vector3(0, 0, 160)
      let targetLook = new THREE.Vector3(0, 0, 0)

      const activeSec = activeSectionRef.current
      if (activeSec !== 'home') {
        const targetNode = nodes.find(n => n.id === activeSec)
        if (targetNode) {
          targetPos.copy(targetNode.cameraPos)
          targetLook.copy(targetNode.position)
        }
      }

      // Add camera drift parralax based on mouse
      targetPos.x += mouse.x * 12
      targetPos.y += mouse.y * 8

      // Lerp camera
      camera.position.lerp(targetPos, 0.038)
      cameraTarget.lerp(targetLook, 0.038)
      camera.lookAt(cameraTarget)

      renderer.render(scene, camera)
    }

    animate()

    // 11. Cleanup WebGL resource leaks
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', onResize)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Dispose all geometries & materials
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

      particleGeo.dispose()
      particleMat.dispose()
      particleTexture.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden" 
    />
  )
}
