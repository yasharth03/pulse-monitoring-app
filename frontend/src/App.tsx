import { useState, useEffect } from 'react'
import UrlCard from './UrlCard';
import './App.css'
import InteractiveBackground from './InteractiveBackground';

interface Url {
  _id: string;
  name: string;
  url: string;
}

function App() {
  const [urls, setUrls] = useState<Url[]>([]);
  const [newNm, setNewNm] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const fetchUrls = async () => {
    try {
      const res = await fetch('/api/urls');
      const data = await res.json();
      setUrls(data);
    } catch (err) { console.error('Error fetching URLs:', err); }
  };

  useEffect(() => { fetchUrls(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNm || !newUrl) return;
    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newNm, url: newUrl }),
      });
      if (res.ok) {
        setNewNm('');
        setNewUrl('');
        fetchUrls();
      }
    } catch (err) { console.error('Error adding URL:', err); }
  };

  return (
    <>
      <InteractiveBackground />
      <div className="container">
        <h1>Pulse Dashboard 💓</h1>

        <div className="card form-card">
          <h2>Add Website</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name (e.g., Google)" value={newNm} onChange={e => setNewNm(e.target.value)} />
            <input type="url" placeholder="https://example.com" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
            <button type="submit">Monitor</button>
          </form>
        </div>

        <div className="url-list">
          {urls.map(url => (
            <UrlCard 
              key={url._id} 
              id={url._id} 
              name={url.name} 
              url={url.url} 
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App