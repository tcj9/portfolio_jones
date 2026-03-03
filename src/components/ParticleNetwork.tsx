import { useRef, useMemo } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * ParticleNetwork
 *
 * DOM-based node network with SVG connection lines.
 * Nodes drift at varying parallax rates as the user scrolls,
 * giving a "living systems architecture" feel.
 *
 * Uses theme variables (--hero-node, --hero-line, --hero-glow)
 * so colors update with the global palette.
 */

interface NodeDef {
  id: number;
  /** % position from left */
  x: number;
  /** % position from top */
  y: number;
  /** px radius */
  size: number;
  /** parallax speed multiplier (higher = moves more) */
  speed: number;
  /** base opacity 0-1 */
  opacity: number;
  /** initial animation delay in seconds */
  delay: number;
}

interface EdgeDef {
  from: number;
  to: number;
  opacity: number;
}

// Deterministic node layout — intentionally asymmetric
const NODES: NodeDef[] = [
  { id: 0, x: 8, y: 15, size: 3, speed: 0.6, opacity: 0.5, delay: 0 },
  { id: 1, x: 22, y: 30, size: 4.5, speed: 0.9, opacity: 0.7, delay: 0.3 },
  { id: 2, x: 35, y: 12, size: 3.5, speed: 0.4, opacity: 0.45, delay: 0.1 },
  { id: 3, x: 50, y: 55, size: 5, speed: 1.0, opacity: 0.35, delay: 0.5 },
  { id: 4, x: 65, y: 20, size: 3, speed: 0.7, opacity: 0.55, delay: 0.2 },
  { id: 5, x: 78, y: 40, size: 4, speed: 0.85, opacity: 0.6, delay: 0.4 },
  { id: 6, x: 90, y: 10, size: 3, speed: 0.5, opacity: 0.4, delay: 0.15 },
  { id: 7, x: 15, y: 65, size: 4, speed: 1.1, opacity: 0.5, delay: 0.6 },
  { id: 8, x: 40, y: 78, size: 3.5, speed: 0.95, opacity: 0.45, delay: 0.35 },
  { id: 9, x: 55, y: 35, size: 4.5, speed: 0.75, opacity: 0.65, delay: 0.25 },
  { id: 10, x: 72, y: 70, size: 3, speed: 1.05, opacity: 0.4, delay: 0.55 },
  { id: 11, x: 88, y: 58, size: 3.5, speed: 0.8, opacity: 0.5, delay: 0.45 },
  { id: 12, x: 5, y: 85, size: 3, speed: 1.2, opacity: 0.35, delay: 0.7 },
  { id: 13, x: 30, y: 48, size: 4, speed: 0.65, opacity: 0.55, delay: 0.2 },
  { id: 14, x: 82, y: 85, size: 3.5, speed: 1.0, opacity: 0.4, delay: 0.65 },
  { id: 15, x: 48, y: 90, size: 3, speed: 1.15, opacity: 0.35, delay: 0.75 },
  { id: 16, x: 18, y: 48, size: 2.5, speed: 0.55, opacity: 0.3, delay: 0.1 },
  { id: 17, x: 62, y: 88, size: 2.5, speed: 1.1, opacity: 0.3, delay: 0.8 },
];

// Connections between nearby nodes — forms the "network"
const EDGES: EdgeDef[] = [
  { from: 0, to: 1, opacity: 0.3 },
  { from: 1, to: 2, opacity: 0.25 },
  { from: 1, to: 13, opacity: 0.2 },
  { from: 2, to: 4, opacity: 0.25 },
  { from: 3, to: 9, opacity: 0.3 },
  { from: 3, to: 8, opacity: 0.2 },
  { from: 4, to: 5, opacity: 0.25 },
  { from: 4, to: 9, opacity: 0.2 },
  { from: 5, to: 6, opacity: 0.2 },
  { from: 5, to: 11, opacity: 0.25 },
  { from: 7, to: 12, opacity: 0.2 },
  { from: 7, to: 16, opacity: 0.25 },
  { from: 8, to: 15, opacity: 0.2 },
  { from: 9, to: 13, opacity: 0.3 },
  { from: 10, to: 11, opacity: 0.25 },
  { from: 10, to: 14, opacity: 0.2 },
  { from: 13, to: 16, opacity: 0.2 },
  { from: 14, to: 17, opacity: 0.2 },
  { from: 0, to: 16, opacity: 0.15 },
  { from: 6, to: 4, opacity: 0.15 },
];

function ParallaxNode({
  node,
  scrollProgress,
}: {
  node: NodeDef;
  scrollProgress: MotionValue<number>;
}) {
  // Each node drifts upward at its own speed
  const y = useTransform(scrollProgress, [0, 1], [0, -120 * node.speed]);
  // Subtle horizontal drift
  const x = useTransform(scrollProgress, [0, 1], [0, 20 * (node.speed - 0.7)]);
  // Fade out as user scrolls deeper
  const opacity = useTransform(
    scrollProgress,
    [0, 0.7, 1],
    [node.opacity, node.opacity * 0.6, 0],
  );

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: node.size * 2,
        height: node.size * 2,
        background: "var(--hero-node)",
        boxShadow: `0 0 ${node.size * 4}px var(--hero-glow)`,
        y,
        x,
        opacity,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: node.opacity }}
      transition={{
        duration: 1.2,
        delay: node.delay + 0.8,
        ease: "easeOut",
      }}
    />
  );
}

/**
 * SVG layer for connection lines.
 * Lines use the same scroll-driven opacity fade as nodes.
 */
function ConnectionLines({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.6, 1], [1, 0.4, 0]);

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 1.5 }}
    >
      {EDGES.map((edge) => {
        const from = NODES[edge.from];
        const to = NODES[edge.to];
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke="var(--hero-line)"
            strokeWidth={1}
            opacity={edge.opacity}
          />
        );
      })}
    </motion.svg>
  );
}

interface ParticleNetworkProps {
  scrollProgress: MotionValue<number>;
}

export default function ParticleNetwork({
  scrollProgress,
}: ParticleNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize nodes to prevent re-renders
  const nodeElements = useMemo(
    () =>
      NODES.map((node) => (
        <ParallaxNode
          key={node.id}
          node={node}
          scrollProgress={scrollProgress}
        />
      )),
    [scrollProgress],
  );

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Connection lines layer */}
      <ConnectionLines scrollProgress={scrollProgress} />

      {/* Node particles */}
      {nodeElements}
    </div>
  );
}
