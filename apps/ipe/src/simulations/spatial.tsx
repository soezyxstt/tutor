import { resolveColor, useThemeRevision } from "./theme";
import { Component, Suspense, useRef, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import type { OrbitControls as OrbitType } from "three-stdlib";
import type { Locale } from "./types";
import { text, num } from "../lib/i18n";
function WebGLFallback({ locale }: { locale: Locale }) {
  return (
    <div
      role="status"
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
        fontSize: 13,
        lineHeight: 1.7,
        color: "var(--muted-foreground)",
      }}
    >
      {text(
        locale,
        "3D memerlukan WebGL. Pilih 2D untuk melanjutkan.",
        "3D requires WebGL. Select 2D to continue.",
      )}
    </div>
  );
}
class CanvasBoundary extends Component<
  { children: ReactNode; locale: Locale },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <WebGLFallback locale={this.props.locale} />
    ) : (
      this.props.children
    );
  }
}
function Tube({
  radius = 1,
  length = 4,
  color = "#bac4b0",
  cut = false,
}: {
  radius?: number;
  length?: number;
  color?: string;
  cut?: boolean;
}) {
  return (
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <cylinderGeometry
        args={[
          radius,
          radius,
          length,
          64,
          1,
          true,
          cut ? Math.PI / 5 : 0,
          cut ? Math.PI * 1.65 : Math.PI * 2,
        ]}
      />
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        side={2}
        transparent
        opacity={cut ? 0.45 : 0.75}
      />
    </mesh>
  );
}
function Flow({
  beta,
  jetBeta,
  venturi,
}: {
  beta: number;
  jetBeta: number;
  venturi: boolean;
}) {
  const rs = [1, 1, 1, beta, beta, 1, 1],
    xs = [-2, -1.7, -0.8, -0.2, 0.3, 1.3, 2];
  const flowXs = [-2, -1.2, -0.4, 0, 0.5, 1.2, 2],
    flowRadii = [1, 1, beta, beta, venturi ? beta : jetBeta, 1, 1];
  const contracted = !venturi && Math.abs(jetBeta - beta) > 1e-8;
  return (
    <group>
      {venturi ? (
        <group>
          {xs.slice(0, -1).map((x, i) => (
            <mesh
              key={i}
              position={[(x + xs[i + 1]) / 2, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry
                args={[
                  rs[i],
                  rs[i + 1],
                  xs[i + 1] - x,
                  48,
                  1,
                  true,
                  Math.PI / 5,
                  Math.PI * 1.65,
                ]}
              />
              <meshStandardMaterial
                color="#b7c4ad"
                roughness={0.5}
                side={2}
                transparent
                opacity={0.4}
              />
            </mesh>
          ))}
        </group>
      ) : (
        <Tube cut />
      )}
      {!venturi && (
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[beta, 1.05, 64]} />
          <meshStandardMaterial color="#5b6753" side={2} />
        </mesh>
      )}
      {[-0.55, 0, 0.55].map((z, i) => (
        <Line
          key={i}
          points={flowXs.map(
            (x, j) => [x, 0.04, z * flowRadii[j]] as [number, number, number],
          )}
          color="#71944f"
          lineWidth={2}
        />
      ))}
      <Html position={[-1.5, 1.3, 0]} center>
        <span className="spatial-label">D</span>
      </Html>
      <Html position={[0, -0.15, beta + 0.2]} center>
        <span className="spatial-label">{contracted ? "d₀" : "d"}</span>
      </Html>
      {contracted && (
        <Html position={[0.65, -0.15, jetBeta + 0.2]} center>
          <span className="spatial-label">d₂</span>
        </Html>
      )}
    </group>
  );
}
function Encoder({ angle, marks }: { angle: number; marks: number }) {
  return (
    <group rotation={[0, 0, (angle * Math.PI) / 180]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.35, 1.35, 0.1, 64]} />
        <meshStandardMaterial color="#526449" metalness={0.3} roughness={0.5} />
      </mesh>
      {Array.from({ length: marks }, (_, i) => {
        const a = (i * 2 * Math.PI) / marks;
        return (
          <mesh
            key={i}
            position={[1.15 * Math.cos(a), 1.15 * Math.sin(a), 0.06]}
            rotation={[0, 0, a]}
          >
            <boxGeometry args={[0.15, 0.04, 0.03]} />
            <meshStandardMaterial color="#e7eadf" />
          </mesh>
        );
      })}
      <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.6, 24]} />
        <meshStandardMaterial color="#b5b7b0" metalness={0.6} />
      </mesh>
      <Line
        points={[
          [0, 0, 0.1],
          [1.3, 0, 0.1],
        ]}
        color="#d8bf86"
        lineWidth={3}
      />
    </group>
  );
}
function Resolver({ angle, locale }: { angle: number; locale: Locale }) {
  const theta = (angle * Math.PI) / 180,
    c = Math.cos(theta),
    s = Math.sin(theta);
  return (
    <group>
      <mesh position={[0, 0, -0.1]}>
        <torusGeometry args={[1.65, 0.12, 16, 72]} />
        <meshStandardMaterial color="#8f9b86" roughness={0.6} />
      </mesh>
      {/* The four fixed poles form two perpendicular stator winding axes. */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} rotation={[0, 0, (i * Math.PI) / 2]}>
          <mesh position={[1.39, 0, 0]}>
            <boxGeometry args={[0.42, 0.52, 0.42]} />
            <meshStandardMaterial color="#aab59f" roughness={0.7} />
          </mesh>
          {[-0.12, -0.04, 0.04, 0.12].map((offset) => (
            <mesh
              key={offset}
              position={[1.39 + offset, 0, 0]}
              rotation={[0, Math.PI / 2, 0]}
            >
              <torusGeometry args={[0.3, 0.035, 8, 28]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#648450" : "#aa8050"}
                metalness={0.25}
                roughness={0.4}
              />
            </mesh>
          ))}
        </group>
      ))}
      <Line
        points={[
          [-1.08, 0, -0.26],
          [1.08, 0, -0.26],
        ]}
        color="#a9b59e"
        dashed
        dashSize={0.08}
        gapSize={0.06}
        lineWidth={1}
      />
      <Line
        points={[
          [0, -1.08, -0.26],
          [0, 1.08, -0.26],
        ]}
        color="#c3af91"
        dashed
        dashSize={0.08}
        gapSize={0.06}
        lineWidth={1}
      />
      {/* Only the rotor, its excitation winding, and the shaft follow theta. */}
      <group rotation={[0, 0, theta]}>
        <mesh>
          <boxGeometry args={[2.05, 0.35, 0.3]} />
          <meshStandardMaterial
            color="#68775b"
            metalness={0.35}
            roughness={0.5}
          />
        </mesh>
        {[-0.24, -0.16, -0.08, 0, 0.08, 0.16, 0.24].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.27, 0.025, 8, 28]} />
            <meshStandardMaterial
              color="#bb9663"
              metalness={0.35}
              roughness={0.4}
            />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.85, 24]} />
          <meshStandardMaterial
            color="#a7ada2"
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>
        <Line
          points={[
            [0, 0, 0.43],
            [1.03, 0, 0.43],
          ]}
          color="#d8bf86"
          lineWidth={3}
        />
        <mesh position={[1.03, 0, 0.43]}>
          <sphereGeometry args={[0.055, 12, 8]} />
          <meshStandardMaterial color="#d8bf86" />
        </mesh>
      </group>
      <Line
        points={[
          [1.03 * c, 0, 0.44],
          [1.03 * c, 1.03 * s, 0.44],
          [0, 1.03 * s, 0.44],
        ]}
        color="#8ba576"
        dashed
        dashSize={0.07}
        gapSize={0.05}
        lineWidth={1.4}
      />
      <Html position={[1.88, 0, 0.15]} center>
        <span className="spatial-label">S · cos θ</span>
      </Html>
      <Html position={[0, 1.94, 0.15]} center>
        <span className="spatial-label">S · sin θ</span>
      </Html>
      <Html position={[0, -1.97, 0.15]} center>
        <span className="spatial-label">
          {text(locale, "Rotor", "Rotor")} · θ = {num(angle, locale, 0)}°
        </span>
      </Html>
    </group>
  );
}
function Lvdt({ x }: { x: number }) {
  return (
    <group>
      <Tube radius={0.55} length={3.8} cut />
      {[-1.2, 0, 1.2].map((v, i) => (
        <mesh key={v} position={[v, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.58, 0.11, 12, 36]} />
          <meshStandardMaterial color={i === 1 ? "#9b7951" : "#7c9570"} />
        </mesh>
      ))}
      <mesh position={[x * 0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 2.6, 32]} />
        <meshStandardMaterial color="#7b8187" metalness={0.8} roughness={0.3} />
      </mesh>
      <Line
        points={[
          [-2.6, 0, 0],
          [2.6, 0, 0],
        ]}
        color="#8c9288"
        lineWidth={2}
      />
    </group>
  );
}
export default function Spatial({
  kind,
  value = 0,
  beta = 0.6,
  jetBeta = beta,
  bits = 8,
  encoderMode = "absolute",
  pulses = 16,
  locale,
}: {
  kind: string;
  value?: number;
  beta?: number;
  jetBeta?: number;
  bits?: number;
  encoderMode?: "absolute" | "incremental";
  pulses?: number;
  locale: Locale;
}) {
  useThemeRevision();
  const background = resolveColor("var(--surface-subtle)");
  const controls = useRef<OrbitType>(null);
  const positions = 2 ** bits,
    divisions =
      encoderMode === "incremental"
        ? Math.max(1, Math.round(pulses))
        : positions,
    marks = Math.min(divisions, 64);
  const captions: Record<string, string> = {
    orifice:
      Math.abs(jetBeta - beta) > 1e-8
        ? text(
            locale,
            "Potongan orifice: lubang d₀ dan jet yang menyempit ke d₂.",
            "Orifice cutaway: aperture d₀ and the jet contracting to d₂.",
          )
        : text(
            locale,
            "Potongan pipa dan pelat orifice; garis menunjukkan jalur aliran.",
            "Pipe and orifice-plate cutaway; lines show flow paths.",
          ),
    venturi: text(
      locale,
      "Potongan venturi: pipa menyempit lalu melebar.",
      "Venturi cutaway: a narrowing throat followed by expansion.",
    ),
    lvdt: text(
      locale,
      "Potongan LVDT: inti bergerak di dalam tiga kumparan.",
      "LVDT cutaway: a movable core inside three windings.",
    ),
    resolver: text(
      locale,
      "Skema resolver: rotor berputar; dua sumbu stator tetap tegak lurus.",
      "Resolver schematic: rotating rotor; two fixed, perpendicular stator axes.",
    ),
    encoder:
      encoderMode === "incremental"
        ? text(
            locale,
            `Cakram skematis: ${marks} tanda tampilan; hitungan memakai ${divisions} pulsa/putaran.`,
            `Schematic disk: ${marks} display marks; counting uses ${divisions} pulses/turn.`,
          )
        : text(
            locale,
            `Cakram skematis: ${marks} tanda tampilan; hitungan tetap ${positions} kode (${bits} bit).`,
            `Schematic disk: ${marks} display marks; counting retains ${positions} codes (${bits} bits).`,
          ),
  };
  return (
    <div
      className="spatial-canvas"
      tabIndex={0}
      role="group"
      aria-label={`${captions[kind] ?? ""} ${text(locale, "Model 3D. Tombol panah memutar kamera; Home mengatur ulang kamera.", "3D model. Arrow keys rotate the camera; Home resets the camera.")}`}
      onKeyDown={(e) => {
        const c = controls.current;
        if (!c) return;
        if (
          ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(
            e.key,
          )
        ) {
          e.preventDefault();
          if (e.key === "Home") {
            c.reset();
            return;
          }
          c.setAzimuthalAngle(
            c.getAzimuthalAngle() +
              (e.key === "ArrowLeft" ? -0.2 : e.key === "ArrowRight" ? 0.2 : 0),
          );
          c.setPolarAngle(
            Math.max(
              0.2,
              Math.min(
                Math.PI - 0.2,
                c.getPolarAngle() +
                  (e.key === "ArrowUp"
                    ? -0.15
                    : e.key === "ArrowDown"
                      ? 0.15
                      : 0),
              ),
            ),
          );
          c.update();
        }
      }}
    >
      <CanvasBoundary locale={locale}>
        <Canvas
          fallback={<WebGLFallback locale={locale} />}
          camera={{
            position: kind === "resolver" ? [2.4, 1.7, 7.7] : [3.4, 2.5, 5.8],
            fov: 39,
          }}
          dpr={[1, 1.7]}
          frameloop="demand"
        >
          <color attach="background" args={[background]} />
          <ambientLight intensity={1.6} />
          <directionalLight position={[3, 5, 4]} intensity={2.2} />
          <Suspense fallback={null}>
            {kind === "orifice" || kind === "venturi" ? (
              <Flow
                beta={beta}
                jetBeta={jetBeta}
                venturi={kind === "venturi"}
              />
            ) : kind === "lvdt" ? (
              <Lvdt x={value} />
            ) : kind === "resolver" ? (
              <Resolver angle={value} locale={locale} />
            ) : kind === "encoder" ? (
              <Encoder angle={value} marks={marks} />
            ) : null}
          </Suspense>
          <OrbitControls
            ref={controls}
            enablePan={false}
            minDistance={3}
            maxDistance={10}
          />
        </Canvas>
        <span
          className="spatial-caption"
          style={{ right: 5, background: "color-mix(in srgb, var(--surface-subtle) 90%, transparent)", lineHeight: 1.45 }}
        >
          {captions[kind]}
        </span>
      </CanvasBoundary>
    </div>
  );
}
