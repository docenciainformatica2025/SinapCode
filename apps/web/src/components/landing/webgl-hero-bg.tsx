'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function WebGLHeroBg() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Core glass-like sphere
        const geometry = new THREE.IcosahedronGeometry(1.5, 4);
        const material = new THREE.MeshNormalMaterial({
            wireframe: true,
            opacity: 0.1,
            transparent: true
        });
        const core = new THREE.Mesh(geometry, material);
        scene.add(core);

        // Orbiting shapes (Simplified proxies for app icons)
        const shapes: { mesh: THREE.Mesh, angle: number, speed: number }[] = [];
        const colors = [0xC9A78A, 0xA7C1C0, 0xF9E795];

        for (let i = 0; i < 5; i++) {
            const g = new THREE.BoxGeometry(0.3, 0.3, 0.3);
            const m = new THREE.MeshBasicMaterial({ color: colors[i % 3], opacity: 0.6, transparent: true });
            const cube = new THREE.Mesh(g, m);

            const angle = (i / 5) * Math.PI * 2;
            cube.position.x = Math.cos(angle) * 3;
            cube.position.y = Math.sin(angle) * 3;

            shapes.push({
                mesh: cube,
                angle: angle,
                speed: 0.005 + (Math.random() * 0.01)
            });
            scene.add(cube);
        }

        camera.position.z = 5;

        let animationFrameId: number;

        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            core.rotation.y += 0.002;
            core.rotation.x += 0.001;

            shapes.forEach(s => {
                s.angle += s.speed;
                s.mesh.position.x = Math.cos(s.angle) * 3;
                s.mesh.position.z = Math.sin(s.angle) * 3;
                s.mesh.rotation.x += 0.01;
                s.mesh.rotation.y += 0.01;
            });

            renderer.render(scene, camera);
        }

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
