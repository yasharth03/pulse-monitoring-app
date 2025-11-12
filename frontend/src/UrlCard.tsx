import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';
import LatencyChart from './LatencyChart';

interface UrlProps {
  id: string;
  name: string;
  url: string;
}

interface PingData {
  status: number;
  latency: number;
  timestamp: string;
}

export default function UrlCard({ id, name, url }: UrlProps) {
  const [history, setHistory] = useState<PingData[]>([]);
  const latest = history[0] || null;

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const res = await fetch(`/api/pings/${id}`);
        const data = await res.json();
        if (Array.isArray(data)) setHistory(data);
      } catch (err) { console.error('Error fetching ping:', err); }
    };

    fetchPing();
    // Refresh data every 10 seconds for a more "live" feel
    const interval = setInterval(fetchPing, 10000);
    return () => clearInterval(interval);
  }, [id]);

  const isUp = latest && latest.status >= 200 && latest.status < 300;

  // Helper to get status icon and color
  const getStatusIndicator = () => {
    if (!latest) return <Activity className="spin" size={20} color="#666" />;
    if (isUp) return <CheckCircle2 size={20} color="#4caf50" />;
    return <AlertCircle size={20} color="#f44336" />;
  };

  return (
    // --- FRAMER MOTION ANIMATION ---
    // This makes the card slide UP and fade IN when it first appears
    <motion.div 
      className="card url-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }} // Slight "pop" effect on hover
    >
      <div className="card-header">
        <div className="card-title">
            <h3>{name}</h3>
            <a href={url} target="_blank" rel="noreferrer" className="url-link-icon">
                <ExternalLink size={14} />
            </a>
        </div>
        <div className="status-icon">
            {getStatusIndicator()}
        </div>
      </div>
      
      <div className="stats-row">
        {latest ? (
           <>
             <span className={`status-badge ${isUp ? 'status-up' : 'status-down'}`}>
                {isUp ? 'ONLINE' : `ERROR ${latest.status}`}
             </span>
             <span className="latency-badge">
                {latest.latency}ms
             </span>
           </>
        ) : (
          <span style={{ color: '#666', fontStyle: 'italic', fontSize: '0.9rem' }}>
            Waiting for data...
          </span>
        )}
      </div>

      {/* Only show chart if we have history data */}
      {history.length > 1 && <LatencyChart data={history} />}

    </motion.div>
  );
}