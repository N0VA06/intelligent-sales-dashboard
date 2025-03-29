import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from 'lucide-react';

// Globe Visualization Component using Three.js
const GlobeVisualization = ({ data, isVisible }) => {
  const globeRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const globeMeshRef = useRef(null);
  const pointsRef = useRef([]);
  const frameRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!isClient || !globeRef.current || !isVisible) return;
    
    // Clean up previous instances if they exist
    if (rendererRef.current) {
      cancelAnimationFrame(frameRef.current);
      rendererRef.current.dispose();
      if (sceneRef.current) {
        sceneRef.current.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    }

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45, 
      globeRef.current.clientWidth / globeRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 4;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    globeRef.current.innerHTML = '';
    globeRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Load Earth texture
    const textureLoader = new THREE.TextureLoader();
    
    // Earth sphere
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create a basic material with blue color first
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x1e40af,
      shininess: 15,
      transparent: true,
      opacity: 0.8
    });
    
    // Create Earth mesh
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);
    globeMeshRef.current = earthMesh;
    
    // Try to load texture asynchronously
    textureLoader.load(
      // URL can be replaced with a public Earth texture
      'https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg',
      (texture) => {
        earthMaterial.map = texture;
        earthMaterial.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.error('Error loading texture', err);
        // Continue with basic blue material if texture fails
      }
    );

    // Add data points
    const pointsGroup = new THREE.Group();
    scene.add(pointsGroup);
    
    // Add markers for each data point
    data.forEach(point => {
      // Convert lat/lng to 3D position
      const phi = (90 - point.lat) * (Math.PI / 180);
      const theta = (point.lng + 180) * (Math.PI / 180);
      
      const x = -1 * Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      
      // Create marker
      const pointGeometry = new THREE.SphereGeometry(0.02, 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color(point.color || '#ff6432')
      });
      const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
      
      // Position marker
      pointMesh.position.set(x, y, z);
      pointsGroup.add(pointMesh);
      
      // Add glow effect with larger transparent sphere
      const glowGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(point.color || '#ff6432'),
        transparent: true,
        opacity: 0.3
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.position.set(x, y, z);
      pointsGroup.add(glowMesh);
      
      // Store reference to point for animations
      pointsRef.current.push({
        point: pointMesh,
        glow: glowMesh,
        initialPosition: { x, y, z },
        data: point
      });
    });

    // Animation function
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Rotate the globe
      if (globeMeshRef.current) {
        globeMeshRef.current.rotation.y += 0.001;
        pointsGroup.rotation.y += 0.001;
      }
      
      // Pulsate points
      pointsRef.current.forEach(pointObj => {
        const { glow } = pointObj;
        glow.scale.x = 1 + 0.2 * Math.sin(Date.now() * 0.003);
        glow.scale.y = 1 + 0.2 * Math.sin(Date.now() * 0.003);
        glow.scale.z = 1 + 0.2 * Math.sin(Date.now() * 0.003);
      });
      
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Resize handler
    const handleResize = () => {
      if (!globeRef.current) return;
      
      camera.aspect = globeRef.current.clientWidth / globeRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up function
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (globeRef.current && globeRef.current.contains(renderer.domElement)) {
        globeRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up geometries and materials
      if (sceneRef.current) {
        sceneRef.current.children.forEach(child => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [data, isClient, isVisible]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && globeRef.current) {
        cameraRef.current.aspect = globeRef.current.clientWidth / globeRef.current.clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(globeRef.current.clientWidth, globeRef.current.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          <CardTitle>Global Sales Distribution</CardTitle>
        </div>
        <CardDescription>
          3D visualization of sales around the world
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-background rounded-md flex items-center justify-center relative">
          {!isClient ? (
            <div className="text-center text-muted-foreground">
              <Globe className="h-12 w-12 mx-auto mb-2" />
              <p>Loading globe visualization...</p>
            </div>
          ) : (
            <div ref={globeRef} className="w-full h-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobeVisualization;
