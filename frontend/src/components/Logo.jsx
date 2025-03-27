import { useEffect, useState } from 'react';
import MetallicPaint, { parseLogoImage } from './MetallicPaint';
import './Logo.css';

export default function Logo({ className = '', style = {} }) {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogo() {
      try {
        setLoading(true);
        console.log("Fetching logo.svg...");
        
        const response = await fetch('/logo.svg');
        console.log("Fetch response:", {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          contentType: response.headers.get('content-type')
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch logo: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('image/svg+xml')) {
          console.warn("Unexpected content type:", contentType);
        }

        const blob = await response.blob();
        console.log("Blob received:", {
          size: blob.size,
          type: blob.type
        });

        if (!blob || blob.size === 0) {
          throw new Error('Failed to get blob from response');
        }

        console.log("Parsing logo image...");
        const result = await parseLogoImage(blob);
        
        console.log("Parse result:", {
          width: result?.width,
          height: result?.height,
          hasImageData: !!result?.imageData
        });

        if (!result || !result.imageData) {
          throw new Error('Failed to parse logo image');
        }

        setImageData(result.imageData);
        setError(null);
      } catch (err) {
        console.error('Error loading logo:', err);
        setError(err.message);
        setImageData(null);
      } finally {
        setLoading(false);
      }
    }
    loadLogo();
  }, []);

  if (loading) {
    return <div className="logo-loading">Loading logo...</div>;
  }

  if (error) {
    return (
      <div className="logo-error">
        <div>Failed to load logo:</div>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!imageData) {
    return <div className="logo-error">No image data available</div>;
  }

  return (
    <div className={`logo-container ${className}`} style={style}>
      <MetallicPaint
        imageData={imageData}
        params={{
          patternScale: 2,
          refraction: 0.015,
          edge: 1,
          patternBlur: 0.005,
          liquid: 0.07,
          speed: 0.3,
        }}
      />
    </div>
  );
} 