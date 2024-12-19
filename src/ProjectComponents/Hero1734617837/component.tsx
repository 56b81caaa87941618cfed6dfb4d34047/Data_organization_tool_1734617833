import React from 'react';
import * as THREE from 'three';

const Hero: React.FC = () => {
  const sceneRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (sceneRef.current) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(400, 300);
      sceneRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const light = new THREE.PointLight(0xffffff, 2, 100);
      light.position.set(0, 0, 10);
      scene.add(light);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(400, 300);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        sceneRef.current?.removeChild(renderer.domElement);
      };
    }
  }, []);

  return (
    <div className="bg-black py-16 text-white w-full h-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Organize Your Data, Amplify Your Insights</h1>
          <p className="text-xl mb-6">Streamline your information management with our powerful data organization tool. Transform chaos into clarity and unlock the true potential of your data.</p>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <div ref={sceneRef} className="w-full h-full"></div>
        </div>
      </div>
    </div>
  );
};

export { Hero as component }