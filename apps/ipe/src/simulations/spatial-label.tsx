import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { SRGBColorSpace } from "three";

export type SpatialLabelData = {
  label: string;
  position: [number, number, number];
};

export function SpatialLabel({
  label,
  position,
  foreground,
  background,
}: SpatialLabelData & { foreground: string; background: string }) {
  const camera = useThree((state) => state.camera);
  const height = useThree((state) => state.size.height);
  const canvas = useMemo(() => {
    // This canvas stays detached. R3F owns the sprite, material, and texture;
    // labels never create a second ReactDOM root inside the Canvas container.
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return null;
    const font = "500 24px system-ui, sans-serif";
    context.font = font;
    canvas.width = Math.ceil(context.measureText(label).width) + 16;
    canvas.height = 34;
    context.font = font;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = foreground;
    context.fillText(label, canvas.width / 2, canvas.height / 2);
    return canvas;
  }, [label, foreground, background]);
  if (!canvas) return null;

  // sizeAttenuation=false cancels camera distance in the sprite shader. This
  // scale keeps the 2x text texture at its CSS-pixel size on either viewport.
  const pixelScale = 2 / (Math.max(1, height) * camera.projectionMatrix.elements[5]);
  return (
    <sprite
      position={position}
      scale={[canvas.width * pixelScale / 2, canvas.height * pixelScale / 2, 1]}
      renderOrder={10}
      userData={{ label }}
    >
      <spriteMaterial
        transparent
        sizeAttenuation={false}
        depthTest={false}
        depthWrite={false}
        toneMapped={false}
      >
        <canvasTexture attach="map" args={[canvas]} colorSpace={SRGBColorSpace} />
      </spriteMaterial>
    </sprite>
  );
}
