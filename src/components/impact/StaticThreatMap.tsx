import { useMemo } from 'react';
import { hubs } from '../../content/impact/cyber';
import { useI18n } from '../../i18n';
import { MAP_ASPECT, dotRadius, landDots } from './mapDots';
import { STATIC_EVENTS, arcControl, categoryColor, hubById, project } from './threatSim';

const WIDTH = 960;
const HEIGHT = Math.round(WIDTH * MAP_ASPECT);

/** Static SVG version of the map: same dot field and a fixed set of example arcs, no animation. */
export function StaticThreatMap({ reason }: { reason: string }) {
  const { t } = useI18n();

  const dotsPath = useMemo(() => {
    const r = dotRadius(WIDTH, 1).toFixed(2);
    return landDots(WIDTH, HEIGHT)
      .map((dot) => `M${dot.x.toFixed(1)} ${dot.y.toFixed(1)}m-${r} 0a${r} ${r} 0 1 0 ${Number(r) * 2} 0a${r} ${r} 0 1 0 -${Number(r) * 2} 0`)
      .join('');
  }, []);

  return (
    <div className="map map--static">
      <svg className="map__svg" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" aria-label={t.impact.cyber.staticMapLabel}>
        <path d={dotsPath} fill="rgba(157, 184, 255, 0.30)" />
        {hubs.map((hub) => {
          const p = project(hub.lon, hub.lat, WIDTH, HEIGHT);
          return <circle key={hub.id} cx={p.x} cy={p.y} r={2.2} fill="rgba(238, 240, 245, 0.55)" />;
        })}
        {STATIC_EVENTS.map((event, index) => {
          const a = project(hubById(event.from).lon, hubById(event.from).lat, WIDTH, HEIGHT);
          const b = project(hubById(event.to).lon, hubById(event.to).lat, WIDTH, HEIGHT);
          const c = arcControl(a, b);
          const color = categoryColor(event.category);
          return (
            <g key={index}>
              <path d={`M${a.x} ${a.y} Q${c.x} ${c.y} ${b.x} ${b.y}`} fill="none" stroke={color} strokeWidth={1.6} strokeOpacity={0.85} />
              <circle cx={b.x} cy={b.y} r={7} fill="none" stroke={color} strokeOpacity={0.5} />
              <circle cx={b.x} cy={b.y} r={2.6} fill={color} />
            </g>
          );
        })}
      </svg>
      <p className="map__status">{reason}</p>
    </div>
  );
}
