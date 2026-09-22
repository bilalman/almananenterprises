import React, { useEffect, useRef, useState, useCallback } from 'react';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { COMPANY_INFO } from '../data/companyData';
import {
  MapPin,
  Navigation,
  Phone,
  RotateCcw,
  ExternalLink,
  Layers,
  Copy,
  Check,
  Building2,
  Compass
} from 'lucide-react';

interface InteractiveGoogleMapProps {
  className?: string;
}

// Coordinates for AL MANNAN ENTERPRISES Head Office
// PLAZA 315/A, Akhri Mint College Stop, Main GT Road, Baghbanpura, Lahore
const OFFICE_COORDINATES = {
  lat: 31.5939,
  lng: 74.3944
};

export const InteractiveGoogleMap: React.FC<InteractiveGoogleMapProps> = ({ className = '' }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';

  const copyAddress = useCallback(() => {
    navigator.clipboard.writeText(COMPANY_INFO.placeholders.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, []);

  const recenterMap = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo(OFFICE_COORDINATES);
      mapInstanceRef.current.setZoom(16);
      if (infoWindowRef.current && markerRef.current) {
        infoWindowRef.current.open(mapInstanceRef.current, markerRef.current);
      }
    }
  }, []);

  const toggleMapType = useCallback(() => {
    if (mapInstanceRef.current) {
      const nextType = mapType === 'roadmap' ? 'hybrid' : 'roadmap';
      mapInstanceRef.current.setMapTypeId(nextType);
      setMapType(nextType);
    }
  }, [mapType]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!apiKey) {
      setMapError('Google Maps API Key not detected');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    setOptions({
      key: apiKey,
      v: 'weekly'
    });

    const initMap = async () => {
      try {
        const [{ Map, InfoWindow }, { Marker }] = await Promise.all([
          importLibrary('maps') as Promise<{ Map: typeof google.maps.Map; InfoWindow: typeof google.maps.InfoWindow }>,
          importLibrary('marker') as Promise<{ Marker: typeof google.maps.Marker }>
        ]);

        if (!isMounted || !mapContainerRef.current) return;

        const mapOptions: google.maps.MapOptions = {
          center: OFFICE_COORDINATES,
          zoom: 16,
          mapTypeId: 'roadmap',
          mapTypeControl: false, // We provide custom styled controls
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          gestureHandling: 'cooperative',
          styles: [
            {
              featureType: 'administrative',
              elementType: 'geometry',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#0A3871' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ lightness: 100 }, { visibility: 'simplified' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#cbe6f7' }]
            }
          ]
        };

        const map = new Map(mapContainerRef.current, mapOptions);
        mapInstanceRef.current = map;

        // Create Custom Marker
        const marker = new Marker({
          position: OFFICE_COORDINATES,
          map,
          title: 'AL MANNAN ENTERPRISES — Lahore Head Office',
          animation: google.maps.Animation.DROP,
          icon: {
            path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
            fillColor: '#0A3871',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#F59E0B',
            scale: 2,
            anchor: new google.maps.Point(12, 22)
          }
        });
        markerRef.current = marker;

        // Create Rich InfoWindow content
        const infoContent = `
          <div style="font-family: system-ui, -apple-system, sans-serif; padding: 6px; max-width: 290px; color: #0f172a;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="display: inline-block; width: 8px; height: 8px; border-radius: 9999px; background-color: #10b981;"></span>
              <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: #0a3871; letter-spacing: 0.5px;">Corporate Head Office</span>
            </div>
            <h4 style="margin: 0 0 6px 0; font-size: 15px; font-weight: 800; color: #0a3871; line-height: 1.2;">
              AL MANNAN ENTERPRISES
            </h4>
            <p style="margin: 0 0 8px 0; font-size: 11px; color: #475569; line-height: 1.4;">
              PLAZA 315/A, 3rd Floor, Akhri Mint College Stop, Near Suzuki Showroom, Main GT Road, Baghbanpura, Lahore
            </p>
            <div style="padding-top: 6px; border-top: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 4px;">
              <div style="font-size: 11px; font-weight: 700; color: #0f172a;">
                📞 0325-5556672 / 0325-5556671
              </div>
              <div style="font-size: 10px; color: #64748b;">
                ✉️ info@almannanenterprises.com
              </div>
            </div>
            <div style="margin-top: 10px; display: flex; gap: 6px;">
              <a 
                href="${COMPANY_INFO.placeholders.googleMapsUrl}" 
                target="_blank" 
                rel="noopener noreferrer" 
                style="display: inline-block; background-color: #0a3871; color: #ffffff; text-decoration: none; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 700;"
              >
                Get Directions ↗
              </a>
              <a 
                href="tel:03255556672" 
                style="display: inline-block; background-color: #f1f5f9; color: #0a3871; text-decoration: none; padding: 5px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; border: 1px solid #cbd5e1;"
              >
                Call Hotline
              </a>
            </div>
          </div>
        `;

        const infoWindow = new InfoWindow({
          content: infoContent,
          maxWidth: 320
        });
        infoWindowRef.current = infoWindow;

        // Open InfoWindow initially on load
        infoWindow.open({
          anchor: marker,
          map
        });

        // Marker click event listener
        marker.addListener('click', () => {
          infoWindow.open({
            anchor: marker,
            map
          });
        });

        setIsLoading(false);
      } catch (err: unknown) {
        console.error('Failed to load Google Maps:', err);
        if (isMounted) {
          setMapError('Unable to load interactive Google Maps. Please use direct links.');
          setIsLoading(false);
        }
      }
    };

    initMap();

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  return (
    <div className={`rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-white ${className}`}>
      {/* Top Map Toolbar */}
      <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-slate-100 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>AL MANNAN ENTERPRISES (Lahore HQ)</span>
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400 px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
            31.5939° N, 74.3944° E
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMapType}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            title="Switch Satellite / Roadmap"
          >
            <Layers className="w-3 h-3 text-sky-400" />
            <span className="capitalize">{mapType === 'roadmap' ? 'Satellite' : 'Roadmap'}</span>
          </button>

          <button
            type="button"
            onClick={recenterMap}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            title="Recenter on Office"
          >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Recenter</span>
          </button>

          <a
            href={COMPANY_INFO.placeholders.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-[#0A3871] hover:bg-blue-800 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Navigation className="w-3 h-3 text-amber-300" />
            <span>Directions ↗</span>
          </a>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-slate-100 min-h-[380px]">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-xs space-y-3">
            <div className="w-8 h-8 border-3 border-[#0A3871] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-slate-600">Loading Interactive Google Map...</p>
          </div>
        )}

        {/* Fallback Viewport if Error or No Key */}
        {mapError ? (
          <div className="w-full h-full relative">
            <iframe
              title="AL MANNAN ENTERPRISES Office Location"
              src="https://maps.google.com/maps?q=31.5939,74.3944&hl=en&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <div ref={mapContainerRef} className="w-full h-full" id="google-map-canvas" />
        )}
      </div>

      {/* Bottom Information & Quick Action Bar */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Address & Landmark Details */}
          <div className="md:col-span-8 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0A3871] font-bold text-[10px] uppercase tracking-wider border border-blue-200">
                Landmarks & Transit
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Akhri Mint College Stop • Near Suzuki Showroom • Baghbanpura
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
              {COMPANY_INFO.placeholders.address}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-4 flex flex-wrap items-center md:justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={copyAddress}
              className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Address Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Address</span>
                </>
              )}
            </button>

            <a
              href="tel:03255556672"
              className="px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-200"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call: 0325-5556672</span>
            </a>

            <a
              href={COMPANY_INFO.placeholders.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-[#0A3871] hover:bg-[#071E3D] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
