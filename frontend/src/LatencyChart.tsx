import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface PingData {
  latency: number;
  timestamp: string;
  status: number;
}

interface Props {
  data: PingData[];
}

// Custom Tooltip to show data when hovering over the chart
const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { value: number }[] }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        background: '#333', 
        border: '1px solid #555', 
        padding: '5px 10px', 
        borderRadius: '4px',
        fontSize: '0.8rem'
      }}>
        <p style={{ margin: 0, color: '#fff' }}>{payload[0].value}ms</p>
      </div>
    );
  }
  return null;
};

export default function LatencyChart({ data }: Props) {
  // Recharts needs data from oldest to newest (left to right)
  // Our API gives us newest first, so we reverse it for the chart.
  const chartData = [...data].reverse();

  return (
    <div style={{ width: '100%', height: 60, marginTop: '1rem' }}>
      <ResponsiveContainer>
        <AreaChart data={chartData}>
            <defs>
            {/* A nice gradient fill for the chart area */}
            <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#747bff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#747bff" stopOpacity={0}/>
            </linearGradient>
            </defs>
          {/* Hide the Y-axis lines but keep the scale auto-adjusting */}
          <YAxis hide domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Area 
            type="monotone" 
            dataKey="latency" 
            stroke="#747bff" 
            fillOpacity={1} 
            fill="url(#colorLatency)" 
            isAnimationActive={false} // Disable internal chart animation for better performance on updates
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}