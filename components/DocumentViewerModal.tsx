'use client';

import React, { useState } from 'react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id?: string;
    type?: string;
    fileName?: string;
    fileType?: string;
    url?: string;
    fileUrl?: string;
  } | null;
}

export default function DocumentViewerModal({ isOpen, onClose, document: doc }: DocumentViewerModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  if (!isOpen || !doc) return null;

  const documentUrl = doc.url || doc.fileUrl || '';
  const fileName = doc.fileName || 'Uploaded Medical Document';
  const docType = doc.type ? doc.type.replace(/_/g, ' ').toUpperCase() : 'DOCUMENT';

  const isPdf =
    documentUrl.toLowerCase().includes('pdf') ||
    doc.fileType === 'application/pdf' ||
    documentUrl.startsWith('data:application/pdf');

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 animate-fadeIn">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-slate-900/90 text-white p-4 rounded-2xl border border-slate-800 shadow-2xl z-10">
        <div className="flex items-center gap-3 truncate">
          <span className="p-2 bg-[#bd171c] rounded-xl text-white font-black text-sm">📄</span>
          <div className="truncate">
            <div className="text-[10px] font-mono font-black uppercase text-amber-400">{docType}</div>
            <div className="text-sm font-black text-white truncate max-w-xs md:max-w-md">{fileName}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {!isPdf && (
            <>
              <button
                onClick={handleZoomOut}
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition"
                title="Zoom Out"
              >
                🔍 -
              </button>
              <span className="text-xs font-mono text-slate-300 font-bold w-12 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition"
                title="Zoom In"
              >
                🔍 +
              </button>
              <button
                onClick={handleRotate}
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition"
                title="Rotate 90deg"
              >
                🔄 Rotate
              </button>
              <button
                onClick={handleReset}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold transition hidden sm:inline-block"
              >
                Reset
              </button>
            </>
          )}

          {documentUrl && (
            <a
              href={documentUrl}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black transition shadow flex items-center gap-1"
            >
              📥 Download / Open
            </a>
          )}

          <button
            onClick={() => {
              handleReset();
              onClose();
            }}
            className="bg-red-600 hover:bg-red-700 text-white w-9 h-9 rounded-xl font-black text-lg transition flex items-center justify-center ml-2"
            title="Close Preview"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Document Content Container */}
      <div className="flex-1 my-4 flex items-center justify-center overflow-auto rounded-2xl bg-slate-950/70 p-4 border border-slate-800">
        {!documentUrl ? (
          <div className="text-center text-slate-400 p-8">
            <div className="text-4xl mb-2">⚠️</div>
            <div className="text-sm font-bold">Document URL not available</div>
          </div>
        ) : isPdf ? (
          <iframe
            src={documentUrl}
            className="w-full h-full min-h-[500px] rounded-xl border-none bg-white shadow-2xl"
            title={fileName}
          />
        ) : (
          <div className="max-w-full max-h-full overflow-auto flex items-center justify-center p-4">
            <img
              src={documentUrl}
              alt={fileName}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl transition-all duration-200"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
              }}
              onError={(e) => {
                // If image fails to render, show fallback warning
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div className="text-center text-red-300 p-6 bg-red-950/60 rounded-2xl border border-red-800">
                      <div className="text-3xl mb-2">🖼️</div>
                      <div className="text-xs font-bold">Could not load preview. Please use Download/Open button above.</div>
                    </div>
                  `;
                }
              }}
            />
          </div>
        )}
      </div>

      {/* Bottom Footer Details */}
      <div className="bg-slate-900/90 text-slate-300 px-5 py-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
        <div>
          Category: <span className="text-white font-bold">{docType}</span>
        </div>
        <div className="text-slate-400 text-[11px]">BSTIMS ICU Document Verification System</div>
      </div>
    </div>
  );
}
