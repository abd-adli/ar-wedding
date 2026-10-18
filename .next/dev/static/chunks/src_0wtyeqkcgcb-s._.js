(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/DispossCam.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DispossCam
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
// ─── Constants ───────────────────────────────────────────────────────────────
const BUCKET = 'dissposcam-bucket';
const FOLDER = 'disposscam-images';
const TABLE = 'guest_photos';
// ─── Helpers ──────────────────────────────────────────────────────────────────
/** Apply a subtle film-grain effect to an ImageData in-place. */ function applyGrain(imageData, intensity = 22) {
    const { data } = imageData;
    for(let i = 0; i < data.length; i += 4){
        const noise = (Math.random() - 0.5) * intensity;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    // alpha unchanged
    }
}
/** Warm sepia-tinted colour grade: slightly boost reds, pull blues. */ function applyColourGrade(imageData) {
    const { data } = imageData;
    for(let i = 0; i < data.length; i += 4){
        data[i] = Math.min(255, data[i] * 1.08); // R +8 %
        data[i + 2] = Math.min(255, data[i + 2] * 0.88); // B -12 %
    }
}
/** Fallback gold border and corner ornaments drawn directly on canvas */ function drawFallbackFrame(ctx, size) {
    ctx.save();
    const outer = Math.round(size * 0.035);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.75)';
    ctx.lineWidth = Math.max(1, Math.round(size * 0.003));
    ctx.strokeRect(outer, outer, size - outer * 2, size - outer * 2);
    const inner = Math.round(size * 0.048);
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.5)';
    ctx.lineWidth = Math.max(1, Math.round(size * 0.002));
    ctx.strokeRect(inner, inner, size - inner * 2, size - inner * 2);
    // Corner accents
    const len = Math.round(size * 0.06);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = Math.max(2, Math.round(size * 0.004));
    ctx.beginPath();
    // top-left
    ctx.moveTo(outer, outer + len);
    ctx.lineTo(outer, outer);
    ctx.lineTo(outer + len, outer);
    // top-right
    ctx.moveTo(size - outer - len, outer);
    ctx.lineTo(size - outer, outer);
    ctx.lineTo(size - outer, outer + len);
    // bottom-left
    ctx.moveTo(outer, size - outer - len);
    ctx.lineTo(outer, size - outer);
    ctx.lineTo(outer + len, size - outer);
    // bottom-right
    ctx.moveTo(size - outer - len, size - outer);
    ctx.lineTo(size - outer, size - outer);
    ctx.lineTo(size - outer, size - outer - len);
    ctx.stroke();
    ctx.restore();
}
// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionHeader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-3 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 128 18",
                className: "w-32 text-amber-700/50",
                fill: "none",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M0 9 Q32 2 64 9 Q96 16 128 9",
                        stroke: "currentColor",
                        strokeWidth: "1",
                        strokeDasharray: "4 3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "64",
                        cy: "9",
                        r: "2.5",
                        fill: "currentColor"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "48",
                        cy: "9",
                        r: "1.5",
                        fill: "currentColor",
                        opacity: ".55"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "80",
                        cy: "9",
                        r: "1.5",
                        fill: "currentColor",
                        opacity: ".55"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] tracking-[0.4em] uppercase text-amber-600/70",
                children: "Tinggalkan Kenangan"
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl sm:text-4xl font-light tracking-wide",
                style: {
                    fontFamily: "var(--font-cinzel), serif",
                    background: 'linear-gradient(135deg, #fbbf24 0%, #92400e 50%, #fbbf24 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                },
                children: "Disposs Cam"
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-slate-400 max-w-[260px] leading-relaxed",
                style: {
                    fontFamily: "var(--font-cormorant), serif"
                },
                children: "Abadikan momen indah dengan sentuhan kamera analog bergaya Sogan"
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 w-44",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px flex-1 bg-gradient-to-r from-transparent to-amber-700/40"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-amber-600/50 text-xs",
                        children: "✦"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px flex-1 bg-gradient-to-l from-transparent to-amber-700/40"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DispossCam.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c = SectionHeader;
/** Camera icon (heroicons outline camera) */ function IconCamera({ className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 1.4,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07\n           4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012\n           2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DispossCam.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c1 = IconCamera;
/** Spinning loader ring */ function Spinner() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-14 h-14",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "w-14 h-14 text-amber-600 animate-spin",
                viewBox: "0 0 48 48",
                fill: "none",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "24",
                        cy: "24",
                        r: "20",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeOpacity: ".18"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M24 4a20 20 0 0120 20",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute inset-0 flex items-center justify-center text-[10px] tracking-widest text-amber-600/80",
                children: "AR"
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DispossCam.tsx",
        lineNumber: 176,
        columnNumber: 5
    }, this);
}
_c2 = Spinner;
function DispossCam() {
    _s();
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /** Pre-loaded overlay image so canvas compositing is synchronous. */ const overlayImg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [frameError, setFrameError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uiState, setUiState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [capturedUrl, setCapturedUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [flash, setFlash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // ── Pre-load frame overlay ─────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DispossCam.useEffect": ()=>{
            const img = new window.Image();
            img.crossOrigin = 'anonymous';
            img.src = '/frame-sogan.webp';
            img.onload = ({
                "DispossCam.useEffect": ()=>{
                    overlayImg.current = img;
                    setFrameError(false);
                }
            })["DispossCam.useEffect"];
            img.onerror = ({
                "DispossCam.useEffect": ()=>{
                    overlayImg.current = null;
                    setFrameError(true);
                }
            })["DispossCam.useEffect"];
        }
    }["DispossCam.useEffect"], []);
    // ── Debug Supabase Storage Connection & Buckets ────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DispossCam.useEffect": ()=>{
            async function debugStorageConnection() {
                console.log('%c[DispossCam Storage Debug]', 'color: #f59e0b; font-weight: bold;');
                console.log('Target Bucket:', BUCKET);
                console.log('Testing supabase.storage.listBuckets()...');
                try {
                    const { data: buckets, error: bError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.listBuckets();
                    console.log('[DispossCam Debug] listBuckets() raw response:', {
                        data: buckets,
                        error: bError,
                        status: bError ? bError.status || bError.statusCode : 'OK'
                    });
                    console.log(`[DispossCam Debug] Testing supabase.storage.from('${BUCKET}').list('${FOLDER}')...`);
                    const { data: files, error: fError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET).list(FOLDER, {
                        limit: 5
                    });
                    console.log(`[DispossCam Debug] from('${BUCKET}').list('${FOLDER}') raw response:`, {
                        data: files,
                        error: fError,
                        status: fError ? fError.status || fError.statusCode : 'OK'
                    });
                } catch (err) {
                    console.error('[DispossCam Debug] Exception during storage diagnostic:', err);
                }
            }
            debugStorageConnection();
        }
    }["DispossCam.useEffect"], []);
    // ── Cleanup stream on unmount ──────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DispossCam.useEffect": ()=>{
            return ({
                "DispossCam.useEffect": ()=>{
                    streamRef.current?.getTracks().forEach({
                        "DispossCam.useEffect": (t)=>t.stop()
                    }["DispossCam.useEffect"]);
                }
            })["DispossCam.useEffect"];
        }
    }["DispossCam.useEffect"], []);
    // ── Start camera ───────────────────────────────────────────────────────────
    const startCamera = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DispossCam.useCallback[startCamera]": async ()=>{
            setUiState('loading');
            setErrorMsg('');
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: {
                            ideal: 'environment'
                        },
                        width: {
                            ideal: 1280
                        },
                        height: {
                            ideal: 1280
                        }
                    },
                    audio: false
                });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                }
                setUiState('live');
            } catch (err) {
                console.error('[DispossCam] getUserMedia error:', err);
                setErrorMsg('Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.');
                setUiState('error');
            }
        }
    }["DispossCam.useCallback[startCamera]"], []);
    // ── Stop stream ────────────────────────────────────────────────────────────
    const stopStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DispossCam.useCallback[stopStream]": ()=>{
            streamRef.current?.getTracks().forEach({
                "DispossCam.useCallback[stopStream]": (t)=>t.stop()
            }["DispossCam.useCallback[stopStream]"]);
            streamRef.current = null;
        }
    }["DispossCam.useCallback[stopStream]"], []);
    // ── Capture → composite → upload ──────────────────────────────────────────
    const handleCapture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DispossCam.useCallback[handleCapture]": async ()=>{
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (!video || !canvas || uiState !== 'live') return;
            // Flash effect
            setFlash(true);
            setTimeout({
                "DispossCam.useCallback[handleCapture]": ()=>setFlash(false)
            }["DispossCam.useCallback[handleCapture]"], 280);
            setUiState('processing');
            // Square crop from centre
            const size = Math.min(video.videoWidth, video.videoHeight);
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                setUiState('error');
                setErrorMsg('Canvas context unavailable.');
                return;
            }
            // 1. Draw video frame (centre-cropped square)
            const sx = (video.videoWidth - size) / 2;
            const sy = (video.videoHeight - size) / 2;
            ctx.drawImage(video, sx, sy, size, size, 0, 0, size, size);
            // 2. Colour grade
            const imgData = ctx.getImageData(0, 0, size, size);
            applyColourGrade(imgData);
            applyGrain(imgData);
            ctx.putImageData(imgData, 0, 0);
            // 3. Frame overlay
            if (overlayImg.current && overlayImg.current.complete && overlayImg.current.naturalWidth > 0) {
                try {
                    ctx.drawImage(overlayImg.current, 0, 0, size, size);
                } catch  {
                    drawFallbackFrame(ctx, size);
                }
            } else {
                drawFallbackFrame(ctx, size);
            }
            stopStream();
            // 4. Export as JPEG blob
            canvas.toBlob({
                "DispossCam.useCallback[handleCapture]": async (blob)=>{
                    if (!blob) {
                        setErrorMsg('Gagal memproses foto. Silakan coba lagi.');
                        setUiState('error');
                        return;
                    }
                    setUiState('uploading');
                    const fileName = `guest_${Date.now()}.jpg`;
                    const filePath = `${FOLDER}/${fileName}`;
                    try {
                        console.log(`[DispossCam Debug] Uploading ${blob.size} bytes to '${BUCKET}/${filePath}'...`);
                        // 5. Upload to Supabase Storage inside 'disposscam-images' folder
                        const { data: uploadData, error: uploadError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET).upload(filePath, blob, {
                            contentType: 'image/jpeg',
                            upsert: false
                        });
                        console.log('[DispossCam Debug] Upload raw result:', {
                            data: uploadData,
                            error: uploadError
                        });
                        if (uploadError) throw uploadError;
                        // 6. Retrieve public URL
                        const { data: urlData } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from(BUCKET).getPublicUrl(filePath);
                        const publicUrl = urlData.publicUrl;
                        // 7. Insert record into guest_photos table (supports image_url or photo_url)
                        let { error: insertError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from(TABLE).insert({
                            image_url: publicUrl,
                            created_at: new Date().toISOString()
                        });
                        if (insertError && insertError.message?.includes('image_url')) {
                            const { error: fallbackError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from(TABLE).insert({
                                photo_url: publicUrl,
                                created_at: new Date().toISOString()
                            });
                            insertError = fallbackError;
                        }
                        if (insertError) throw insertError;
                        setCapturedUrl(publicUrl);
                        setUiState('success');
                    } catch (err) {
                        // Robust stringify handling standard non-enumerable properties on Error objects
                        let errorStringified = '';
                        try {
                            if (err && typeof err === 'object') {
                                errorStringified = JSON.stringify(err, Object.getOwnPropertyNames(err), 2);
                                if (errorStringified === '{}' || errorStringified === '{\n}') {
                                    errorStringified = JSON.stringify(err, null, 2);
                                }
                            } else {
                                errorStringified = String(err);
                            }
                        } catch  {
                            errorStringified = String(err);
                        }
                        console.error('[DispossCam] raw error:', errorStringified);
                        console.error('[DispossCam] err.message:', err?.message);
                        console.error('[DispossCam] err.name:', err?.name);
                        console.error('[DispossCam] err.error_description:', err?.error_description);
                        console.error('[DispossCam] error properties:', {
                            status: err?.status || err?.statusCode,
                            code: err?.code,
                            details: err?.details,
                            hint: err?.hint
                        });
                        const displayMsg = err?.message || err?.error_description || err?.error || (errorStringified && errorStringified !== '{}' ? errorStringified : 'Gagal mengunggah foto. Coba lagi.');
                        setErrorMsg(displayMsg);
                        setUiState('error');
                    }
                }
            }["DispossCam.useCallback[handleCapture]"], 'image/jpeg', 0.92);
        }
    }["DispossCam.useCallback[handleCapture]"], [
        uiState,
        stopStream
    ]);
    // ── Reset ──────────────────────────────────────────────────────────────────
    const handleRetake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DispossCam.useCallback[handleRetake]": ()=>{
            stopStream();
            setCapturedUrl(null);
            setErrorMsg('');
            setUiState('idle');
        }
    }["DispossCam.useCallback[handleRetake]"], [
        stopStream
    ]);
    // ─────────────────────────────────────────────────────────────────────────
    // Derived booleans
    const isLive = uiState === 'live';
    const isIdle = uiState === 'idle';
    const isError = uiState === 'error';
    const isSuccess = uiState === 'success';
    const isBusy = uiState === 'loading' || uiState === 'processing' || uiState === 'uploading';
    // ── Label for busy states ──────────────────────────────────────────────────
    const busyLabel = uiState === 'loading' ? 'Membuka kamera...' : uiState === 'processing' ? 'Memproses foto...' : uiState === 'uploading' ? 'Menyimpan kenangan...' : '';
    // ─────────────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-20 px-4 flex flex-col items-center gap-10 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-1/2 -translate-x-1/2 w-[480px] h-48 rounded-full pointer-events-none",
                style: {
                    background: 'radial-gradient(ellipse, rgba(180,83,9,0.08) 0%, transparent 70%)'
                },
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {}, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 479,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "w-full max-w-sm transform-gpu",
                style: {
                    willChange: 'transform, opacity'
                },
                initial: {
                    opacity: 0,
                    y: 24,
                    scale: 0.97
                },
                whileInView: {
                    opacity: 1,
                    y: 0,
                    scale: 1
                },
                viewport: {
                    once: true
                },
                transition: {
                    duration: 0.55,
                    ease: 'easeOut'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl p-3 pb-14 relative",
                        style: {
                            background: 'rgba(15,23,42,0.65)',
                            backdropFilter: 'blur(18px)',
                            border: '1px solid rgba(245,158,11,0.15)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center px-1 mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] tracking-widest text-amber-800/50 uppercase",
                                        children: "Anchored Realm"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] tracking-widest text-amber-800/50 uppercase",
                                        children: "AR — 2027"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 504,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DispossCam.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative aspect-square rounded-xl overflow-hidden bg-slate-950",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: flash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-0 bg-white z-50 transform-gpu",
                                            style: {
                                                willChange: 'opacity'
                                            },
                                            initial: {
                                                opacity: 0.85
                                            },
                                            animate: {
                                                opacity: 0
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            transition: {
                                                duration: 0.28
                                            }
                                        }, "flash", false, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 515,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 513,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                        ref: videoRef,
                                        playsInline: true,
                                        muted: true,
                                        className: "absolute inset-0 w-full h-full object-cover",
                                        style: {
                                            display: isLive ? 'block' : 'none'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 528,
                                        columnNumber: 13
                                    }, this),
                                    isLive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 pointer-events-none z-10",
                                        children: !frameError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                                            src: "/frame-sogan.webp",
                                            alt: "Frame Sogan",
                                            fill: true,
                                            className: "object-cover",
                                            quality: 75,
                                            priority: true,
                                            onError: ()=>setFrameError(true)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 540,
                                            columnNumber: 19
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-2 border-2 border-amber-500/60 rounded-xl pointer-events-none",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-1.5 border border-amber-600/35 rounded-lg pointer-events-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DispossCam.tsx",
                                                lineNumber: 551,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 550,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: isSuccess && capturedUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                                            src: capturedUrl,
                                            alt: "Foto berhasil diambil",
                                            className: "absolute inset-0 w-full h-full object-cover transform-gpu",
                                            style: {
                                                willChange: 'opacity'
                                            },
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            transition: {
                                                duration: 0.5
                                            }
                                        }, "captured", false, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 560,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 558,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: (isIdle || isError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-0 flex flex-col items-center justify-center gap-4 transform-gpu",
                                            style: {
                                                willChange: 'opacity'
                                            },
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-full",
                                                    style: {
                                                        background: 'rgba(15,23,42,0.7)',
                                                        border: '1px solid rgba(180,83,9,0.3)',
                                                        animation: 'disposs-float 5s ease-in-out infinite'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconCamera, {
                                                        className: "w-10 h-10 text-amber-700/60"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DispossCam.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DispossCam.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 19
                                                }, this),
                                                isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-red-400/80 text-center max-w-[200px] leading-relaxed px-3",
                                                    children: errorMsg
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DispossCam.tsx",
                                                    lineNumber: 597,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-amber-800/50 tracking-wide",
                                                    children: "Ketuk untuk membuka kamera"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DispossCam.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, "idle-panel", true, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 576,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 574,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: isBusy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-0 flex flex-col items-center justify-center gap-4 z-20 transform-gpu",
                                            style: {
                                                willChange: 'opacity',
                                                background: 'rgba(2,6,23,0.75)',
                                                backdropFilter: 'blur(6px)'
                                            },
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            transition: {
                                                duration: 0.25
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Spinner, {}, void 0, false, {
                                                    fileName: "[project]/src/components/DispossCam.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs tracking-[0.22em] uppercase text-amber-600/80",
                                                    children: busyLabel
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DispossCam.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, "busy-panel", true, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 612,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 610,
                                        columnNumber: 13
                                    }, this),
                                    isLive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            'top-2    left-2  border-t-2 border-l-2 rounded-tl',
                                            'top-2    right-2 border-t-2 border-r-2 rounded-tr',
                                            'bottom-2 left-2  border-b-2 border-l-2 rounded-bl',
                                            'bottom-2 right-2 border-b-2 border-r-2 rounded-br'
                                        ].map((cls)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `absolute w-5 h-5 border-amber-500/50 z-20 ${cls}`
                                            }, cls, false, {
                                                fileName: "[project]/src/components/DispossCam.tsx",
                                                lineNumber: 638,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DispossCam.tsx",
                                lineNumber: 510,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 inset-x-0 h-14 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] tracking-[0.28em] text-amber-900/40 uppercase",
                                    children: isSuccess ? '✦  Tersimpan  ✦' : 'Anchored Realm  ·  AR Wedding 2027'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DispossCam.tsx",
                                    lineNumber: 649,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DispossCam.tsx",
                                lineNumber: 648,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 flex justify-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            mode: "wait",
                            children: [
                                isIdle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: startCamera,
                                    className: "px-8 py-3 rounded-full text-sm tracking-[0.22em] uppercase text-amber-500 transition-colors duration-300 transform-gpu",
                                    style: {
                                        willChange: 'transform, opacity',
                                        border: '1px solid rgba(217,119,6,0.45)'
                                    },
                                    whileHover: {
                                        scale: 1.04,
                                        backgroundColor: 'rgba(245,158,11,0.08)'
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    initial: {
                                        opacity: 0,
                                        y: 8
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    children: "Buka Kamera"
                                }, "btn-open", false, {
                                    fileName: "[project]/src/components/DispossCam.tsx",
                                    lineNumber: 661,
                                    columnNumber: 15
                                }, this),
                                isLive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: handleCapture,
                                    "aria-label": "Ambil foto",
                                    className: "relative w-16 h-16 rounded-full flex items-center justify-center group transform-gpu",
                                    style: {
                                        willChange: 'transform, opacity',
                                        border: '2px solid rgba(217,119,6,0.55)',
                                        background: 'rgba(15,23,42,0.8)'
                                    },
                                    whileHover: {
                                        scale: 1.06
                                    },
                                    whileTap: {
                                        scale: 0.88
                                    },
                                    initial: {
                                        opacity: 0,
                                        scale: 0.7
                                    },
                                    animate: {
                                        opacity: 1,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        scale: 0.7
                                    },
                                    transition: {
                                        type: 'spring',
                                        stiffness: 280,
                                        damping: 18
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-11 h-11 rounded-full bg-amber-500 group-hover:bg-amber-400 transition-colors duration-200",
                                        style: {
                                            boxShadow: '0 0 18px rgba(217,119,6,0.5)'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 691,
                                        columnNumber: 17
                                    }, this)
                                }, "btn-shutter", false, {
                                    fileName: "[project]/src/components/DispossCam.tsx",
                                    lineNumber: 678,
                                    columnNumber: 15
                                }, this),
                                isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: handleRetake,
                                    className: "px-8 py-3 rounded-full text-sm tracking-[0.22em] uppercase text-red-400 transition-colors duration-300 transform-gpu",
                                    style: {
                                        willChange: 'transform, opacity',
                                        border: '1px solid rgba(239,68,68,0.35)'
                                    },
                                    whileHover: {
                                        scale: 1.04,
                                        backgroundColor: 'rgba(239,68,68,0.07)'
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    initial: {
                                        opacity: 0,
                                        y: 8
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    children: "Coba Lagi"
                                }, "btn-retry", false, {
                                    fileName: "[project]/src/components/DispossCam.tsx",
                                    lineNumber: 700,
                                    columnNumber: 15
                                }, this),
                                isSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "flex gap-3 transform-gpu",
                                    style: {
                                        willChange: 'transform, opacity'
                                    },
                                    initial: {
                                        opacity: 0,
                                        y: 8
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: capturedUrl ?? '#',
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "px-5 py-2.5 rounded-full text-sm tracking-widest uppercase text-amber-400 flex items-center gap-2 transition-colors duration-200",
                                            style: {
                                                border: '1px solid rgba(217,119,6,0.45)',
                                                background: 'rgba(180,83,9,0.1)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-4 h-4",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    strokeWidth: 1.6,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0\n                         0l-4-4m4 4V4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DispossCam.tsx",
                                                        lineNumber: 733,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/DispossCam.tsx",
                                                    lineNumber: 732,
                                                    columnNumber: 19
                                                }, this),
                                                "Simpan"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 725,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleRetake,
                                            className: "px-5 py-2.5 rounded-full text-sm tracking-widest uppercase text-slate-400 transition-colors duration-200",
                                            style: {
                                                border: '1px solid rgba(71,85,105,0.5)'
                                            },
                                            children: "Foto Lagi"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DispossCam.tsx",
                                            lineNumber: 740,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, "btn-success-group", true, {
                                    fileName: "[project]/src/components/DispossCam.tsx",
                                    lineNumber: 717,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DispossCam.tsx",
                            lineNumber: 657,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 656,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: isSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "mt-4 flex items-center gap-3 px-4 py-3 rounded-xl transform-gpu",
                            style: {
                                willChange: 'transform, opacity',
                                background: 'rgba(15,23,42,0.6)',
                                border: '1px solid rgba(180,83,9,0.25)',
                                backdropFilter: 'blur(12px)'
                            },
                            initial: {
                                opacity: 0,
                                y: 10
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5 text-amber-500 shrink-0",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    strokeWidth: 2,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        d: "M5 13l4 4L19 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DispossCam.tsx",
                                        lineNumber: 769,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DispossCam.tsx",
                                    lineNumber: 768,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-amber-400/80 leading-snug",
                                    children: "Kenangan berhasil diabadikan & tersimpan di album kami ✨"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DispossCam.tsx",
                                    lineNumber: 771,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/DispossCam.tsx",
                            lineNumber: 756,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/DispossCam.tsx",
                        lineNumber: 754,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 482,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "hidden",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 780,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                children: `
        @keyframes disposs-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-7px); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `
            }, void 0, false, {
                fileName: "[project]/src/components/DispossCam.tsx",
                lineNumber: 783,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DispossCam.tsx",
        lineNumber: 468,
        columnNumber: 5
    }, this);
}
_s(DispossCam, "wle7ESVGHqQnz9/LNzCloNKji6U=");
_c3 = DispossCam;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "SectionHeader");
__turbopack_context__.k.register(_c1, "IconCamera");
__turbopack_context__.k.register(_c2, "Spinner");
__turbopack_context__.k.register(_c3, "DispossCam");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DispossCam.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/DispossCam.tsx [app-client] (ecmascript)"));
}),
"[project]/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
// Ambil URL dan Key dari file .env.local tadi
const supabaseUrl = ("TURBOPACK compile-time value", "https://cikmvjseuvflnznvzyff.supabase.co");
const supabaseKey = ("TURBOPACK compile-time value", "sb_publishable_5khA0BQg9AtUMsqnsCSXkA_cp2jS_v2");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0wtyeqkcgcb-s._.js.map