import { useEffect, useRef } from 'react';
import { useSettings } from './hooks/useSettings';

interface DrawProps {
    isPanelOpen: boolean;
}

const canvasStyle = (isPanelOpen: boolean) => ({
    position: 'fixed' as const,
    top: 0,
    left: isPanelOpen ? '400px' : 0,
    width: isPanelOpen ? 'calc(100vw - 400px)' : '100vw',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    transition: 'left 0.3s ease, width 0.3s ease',
    zIndex: 0
});

export const Draw = ({ isPanelOpen }: DrawProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { 
        shape, tile, joint, 
        startWithJointX, startWithJointY, 
        startWithPartialX, startWithPartialY, 
        partialStartXPercent, partialStartYPercent,
        tileColor
    } = useSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size to window size
        const updateCanvasSize = () => {
            const width = isPanelOpen ? window.innerWidth - 400 : window.innerWidth;
            canvas.width = width;
            canvas.height = window.innerHeight;
        };

        // Initial size
        updateCanvasSize();

        // Update size on window resize
        window.addEventListener('resize', updateCanvasSize);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate scale to fit the canvas while maintaining aspect ratio
        const padding = 40; // Padding from edges
        const maxWidth = canvas.width - padding * 2;
        const maxHeight = canvas.height - padding * 2;
        const scaleX = maxWidth / shape.width;
        const scaleY = maxHeight / shape.height;
        const scale = Math.min(scaleX, scaleY);

        // Calculate centered position
        const translateX = (canvas.width - shape.width * scale) / 2;
        const translateY = (canvas.height - shape.height * scale) / 2;

        // Apply transformations
        ctx.save();
        ctx.translate(translateX, translateY);
        ctx.scale(scale, scale);

        // Create clipping path for the floor
        ctx.beginPath();
        ctx.rect(0, 0, shape.width, shape.height);
        ctx.clip();

        // Draw floor outline
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, shape.width, shape.height);

        // Convert joint width from mm to cm
        const jointCm = joint / 10;

        // Calculate starting positions
        const startX = startWithJointX ? jointCm : 0;
        const startY = startWithJointY ? jointCm : 0;

        // Calculate first tile sizes
        const firstTileWidth = startWithPartialX
            ? tile.width * (partialStartXPercent / 100)
            : tile.width;
        const firstTileHeight = startWithPartialY
            ? tile.height * (partialStartYPercent / 100)
            : tile.height;

        // Draw tiles
        let y = startY;
        let firstRow = true;

        // Calculate maximum positions to ensure complete coverage
        const maxX = shape.width + tile.width;
        const maxY = shape.height + tile.height;

        while (y < maxY) {
            const tileHeight = firstRow ? firstTileHeight : tile.height;
            let x = startX;
            let firstCol = true;

            while (x < maxX) {
                const tileWidth = firstCol ? firstTileWidth : tile.width;

                // Draw tile
                ctx.fillStyle = tileColor;
                ctx.fillRect(x, y, tileWidth, tileHeight);

                x += tileWidth + jointCm;
                firstCol = false;
            }

            y += tileHeight + jointCm;
            firstRow = false;
        }

        ctx.restore();

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, [shape, tile, joint, startWithJointX, startWithJointY, startWithPartialX, startWithPartialY, partialStartXPercent, partialStartYPercent, isPanelOpen, tileColor]);

    return (
        <canvas
            ref={canvasRef}
            style={canvasStyle(isPanelOpen)}
        />
    );
};