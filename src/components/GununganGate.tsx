import React from 'react';

export default function GununganGate({ side }: { side: 'left' | 'right' }) {
  // Ganti warna jadi putih bersih sesuai request lu
  const color = "#FFFFFF"; 
  
  return (
    <svg 
      viewBox="0 0 400 600" 
      className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Magic trick: Motong SVG jadi dua (Kiri & Kanan) */}
        <clipPath id="clip-left">
          <rect x="0" y="0" width="200" height="600" />
        </clipPath>
        <clipPath id="clip-right">
          <rect x="200" y="0" width="200" height="600" />
        </clipPath>
      </defs>

      <g clipPath={`url(#clip-${side})`}>
        {/* 1. Garis Luar (Outline Gunungan yang lebih melengkung di bawah) */}
        <path 
          d="M 200 30 C 260 130, 370 280, 370 480 C 370 540, 320 570, 200 570 C 80 570, 30 540, 30 480 C 30 280, 140 130, 200 30 Z" 
          fill="none" 
          stroke={color} 
          strokeWidth="10" 
          strokeLinejoin="round" 
        />
        
        {/* 2. Lantai Kotak-kotak (Checkered Floor) */}
        <path d="M 110 570 L 290 570 L 260 500 L 140 500 Z" fill="none" stroke={color} strokeWidth="6" />
        <line x1="180" y1="570" x2="180" y2="500" stroke={color} strokeWidth="6" />
        <line x1="220" y1="570" x2="220" y2="500" stroke={color} strokeWidth="6" />
        <line x1="125" y1="535" x2="275" y2="535" stroke={color} strokeWidth="6" />
        
        {/* 3. Pintu Kecil / Gerbang di tengah bawah */}
        <path d="M 155 500 L 155 450 C 155 410, 245 410, 245 450 L 245 500" fill="none" stroke={color} strokeWidth="7" />
        {/* Dua titik di pintu (handle) */}
        <circle cx="185" cy="470" r="4" fill={color} />
        <circle cx="215" cy="470" r="4" fill={color} />
        
        {/* 4. Pohon Tengah (Central Axis) */}
        <path d="M 200 410 C 200 300, 200 150, 200 80" fill="none" stroke={color} strokeWidth="7" />
        
        {/* 5. Ukiran Lengkung Bawah (Mirip di gambar) */}
        <path d="M 200 400 C 310 440, 340 330, 270 290 C 240 270, 200 330, 200 330" fill="none" stroke={color} strokeWidth="8" />
        <path d="M 200 400 C 90 440, 60 330, 130 290 C 160 270, 200 330, 200 330" fill="none" stroke={color} strokeWidth="8" />

        {/* 6. Ukiran Lengkung Tengah */}
        <path d="M 200 310 C 270 280, 310 210, 240 180 C 210 170, 200 220, 200 220" fill="none" stroke={color} strokeWidth="7" />
        <path d="M 200 310 C 130 280, 90 210, 160 180 C 190 170, 200 220, 200 220" fill="none" stroke={color} strokeWidth="7" />

        {/* 7. Ukiran Lengkung Atas */}
        <path d="M 200 200 C 240 180, 250 130, 220 110 C 210 105, 200 130, 200 130" fill="none" stroke={color} strokeWidth="6" />
        <path d="M 200 200 C 160 180, 150 130, 180 110 C 190 105, 200 130, 200 130" fill="none" stroke={color} strokeWidth="6" />
        
        {/* 8. Ukiran Sayap Samping */}
        <path d="M 245 490 C 290 470, 340 540, 350 470" fill="none" stroke={color} strokeWidth="6" />
        <path d="M 155 490 C 110 470, 60 540, 50 470" fill="none" stroke={color} strokeWidth="6" />
      </g>
    </svg>
  );
}