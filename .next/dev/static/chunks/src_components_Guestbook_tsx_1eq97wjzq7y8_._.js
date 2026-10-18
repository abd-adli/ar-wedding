(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Guestbook.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Guestbook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
// ─── 1. Initialize Supabase Client ────────────────────────────────────────────
const supabaseUrl = ("TURBOPACK compile-time value", "https://cikmvjseuvflnznvzyff.supabase.co") || '';
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable_5khA0BQg9AtUMsqnsCSXkA_cp2jS_v2") || '';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
// ─── Style Constants ──────────────────────────────────────────────────────────
const FONT_DISPLAY = "var(--font-cinzel), serif";
const FONT_SERIF = "var(--font-cormorant), serif";
const FONT_SANS = "var(--font-eb-garamond), serif";
const GLASS = {
    background: 'rgba(15, 23, 42, 0.65)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(245, 158, 11, 0.22)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
};
const GLASS_INNER = {
    background: 'rgba(15, 23, 42, 0.45)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(245, 158, 11, 0.16)'
};
// ─── Relative Time Formatter ──────────────────────────────────────────────────
function formatRelativeTime(dateString) {
    try {
        const diffMs = Date.now() - new Date(dateString).getTime();
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHours = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHours / 24);
        if (diffSec < 45) return 'Baru saja';
        if (diffMin < 60) return `${diffMin} menit lalu`;
        if (diffHours < 24) return `${diffHours} jam lalu`;
        if (diffDays < 7) return `${diffDays} hari lalu`;
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    } catch  {
        return 'Baru saja';
    }
}
function Guestbook() {
    _s();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [showSuccessToast, setShowSuccessToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [focusedField, setFocusedField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ─── 4. Select Function: Fetch Messages ordered by created_at DESC ──────────
    const fetchMessages = async ()=>{
        try {
            setLoading(true);
            const { data, error } = await supabase.from('wedding_guestbook').select('id, guest_name, message, created_at').order('created_at', {
                ascending: false
            });
            if (error) {
                console.warn('Fetch wedding_guestbook error:', error.message);
            } else if (data) {
                setMessages(data);
            }
        } catch (err) {
            console.warn('Fetch wedding_guestbook exception:', err);
        } finally{
            setLoading(false);
        }
    };
    // Pre-fill name from ?to= or ?guest= query parameter and fetch initial messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Guestbook.useEffect": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                const params = new URLSearchParams(window.location.search);
                const guestParam = params.get('to') ?? params.get('guest');
                if (guestParam) {
                    setName(decodeURIComponent(guestParam));
                }
            }
            // Initial select
            fetchMessages();
            // ─── 5. Realtime subscription: Updates dynamically when new row inserted ──
            const channel = supabase.channel('realtime_wedding_guestbook').on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'wedding_guestbook'
            }, {
                "Guestbook.useEffect.channel": (payload)=>{
                    const newEntry = payload.new;
                    if (newEntry && newEntry.guest_name) {
                        setMessages({
                            "Guestbook.useEffect.channel": (prev)=>{
                                // Avoid duplicate if already prepended optimistically
                                if (prev.some({
                                    "Guestbook.useEffect.channel": (m)=>m.id === newEntry.id || m.guest_name === newEntry.guest_name && m.message === newEntry.message
                                }["Guestbook.useEffect.channel"])) {
                                    return prev.map({
                                        "Guestbook.useEffect.channel": (m)=>m.guest_name === newEntry.guest_name && m.message === newEntry.message ? newEntry : m
                                    }["Guestbook.useEffect.channel"]);
                                }
                                return [
                                    newEntry,
                                    ...prev
                                ];
                            }
                        }["Guestbook.useEffect.channel"]);
                    }
                }
            }["Guestbook.useEffect.channel"]).subscribe();
            return ({
                "Guestbook.useEffect": ()=>{
                    supabase.removeChannel(channel);
                }
            })["Guestbook.useEffect"];
        }
    }["Guestbook.useEffect"], []);
    // ─── 3. Insert Function: Save new submission to wedding_guestbook ───────────
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!name.trim()) {
            setErrorMsg('Silakan masukkan nama Anda.');
            return;
        }
        if (!message.trim()) {
            setErrorMsg('Silakan tuliskan ucapan atau doa restu Anda.');
            return;
        }
        setErrorMsg('');
        setSubmitting(true);
        const tempId = `temp-${Date.now()}`;
        const newEntry = {
            id: tempId,
            guest_name: name.trim(),
            message: message.trim(),
            created_at: new Date().toISOString()
        };
        // ─── 5. Dynamic Update: Immediate local state update (optimistic UI) ──────
        setMessages((prev)=>[
                newEntry,
                ...prev
            ]);
        setMessage('');
        setShowSuccessToast(true);
        setTimeout(()=>{
            setShowSuccessToast(false);
        }, 4500);
        // Save to Supabase wedding_guestbook table
        try {
            const { data, error } = await supabase.from('wedding_guestbook').insert([
                {
                    guest_name: newEntry.guest_name,
                    message: newEntry.message
                }
            ]).select();
            if (error) {
                console.error('Insert to wedding_guestbook failed:', error.message);
            } else if (data && data[0]) {
                // Swap optimistic temporary entry with confirmed record from Supabase
                setMessages((prev)=>prev.map((m)=>m.id === tempId ? data[0] : m));
            }
            // Re-fetch to guarantee absolute synchronization
            fetchMessages();
        } catch (err) {
            console.error('Insert exception:', err);
        } finally{
            setSubmitting(false);
        }
    };
    const focusStyle = (field)=>({
            ...GLASS_INNER,
            color: 'rgba(241, 245, 249, 0.95)',
            fontFamily: FONT_SERIF,
            fontSize: '1rem',
            outline: 'none',
            borderColor: focusedField === field ? 'rgba(245, 158, 11, 0.65)' : 'rgba(245, 158, 11, 0.2)',
            boxShadow: focusedField === field ? '0 0 0 3px rgba(180, 83, 9, 0.2)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s'
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-full py-12 px-4 flex flex-col items-center gap-10 relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none",
                "aria-hidden": true,
                style: {
                    background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(120, 53, 15, 0.08) 0%, transparent 70%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/Guestbook.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-2.5 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 128 18",
                        className: "w-32 text-amber-500/50",
                        fill: "none",
                        "aria-hidden": true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0 9 Q32 2 64 9 Q96 16 128 9",
                                stroke: "currentColor",
                                strokeWidth: "1",
                                strokeDasharray: "4 3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "64",
                                cy: "9",
                                r: "2.5",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "48",
                                cy: "9",
                                r: "1.5",
                                fill: "currentColor",
                                opacity: ".55"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "80",
                                cy: "9",
                                r: "1.5",
                                fill: "currentColor",
                                opacity: ".55"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] tracking-[0.42em] uppercase text-amber-500/80 font-medium",
                        style: {
                            fontFamily: FONT_SANS
                        },
                        children: "Ucapan & Doa Restu"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-3xl sm:text-4xl font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]",
                        style: {
                            fontFamily: FONT_DISPLAY,
                            background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 40%, #d97706 70%, #92400e 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        },
                        children: "Buku Tamu"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-slate-300/90 max-w-[280px] leading-relaxed italic",
                        style: {
                            fontFamily: FONT_SERIF
                        },
                        children: "Untaian doa dan harapan terbaik Anda adalah berkah terindah bagi kami."
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 246,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 w-40 my-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-amber-500/50 text-xs",
                                children: "✦"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Guestbook.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "w-full max-w-lg rounded-2xl relative overflow-hidden shadow-2xl transform-gpu",
                style: {
                    willChange: 'transform, opacity',
                    ...GLASS
                },
                initial: {
                    opacity: 0,
                    y: 25
                },
                whileInView: {
                    opacity: 1,
                    y: 0
                },
                viewport: {
                    once: true,
                    amount: 0.1
                },
                transition: {
                    duration: 0.6,
                    ease: 'easeOut'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 sm:p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showSuccessToast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    className: "mb-5 p-3.5 rounded-xl border flex items-center gap-3 shadow-lg transform-gpu",
                                    style: {
                                        willChange: 'transform, opacity',
                                        background: 'rgba(16, 185, 129, 0.15)',
                                        borderColor: 'rgba(52, 211, 153, 0.45)',
                                        backdropFilter: 'blur(8px)'
                                    },
                                    initial: {
                                        opacity: 0,
                                        y: -10,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -10,
                                        scale: 0.95
                                    },
                                    transition: {
                                        duration: 0.25
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "w-3.5 h-3.5 text-emerald-300",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                strokeWidth: 2.5,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "M5 13l4 4L19 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Guestbook.tsx",
                                                    lineNumber: 287,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 286,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Guestbook.tsx",
                                            lineNumber: 285,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-medium text-emerald-200",
                                            style: {
                                                fontFamily: FONT_SANS
                                            },
                                            children: "Ucapan & doa restu Anda telah berhasil dikirimkan!"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Guestbook.tsx",
                                            lineNumber: 290,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Guestbook.tsx",
                                    lineNumber: 272,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "flex flex-col gap-4.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs tracking-[0.25em] uppercase text-amber-500/85 mb-2 font-medium",
                                                style: {
                                                    fontFamily: FONT_SANS
                                                },
                                                children: "Nama Anda"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 300,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: name,
                                                onChange: (e)=>setName(e.target.value),
                                                onFocus: ()=>setFocusedField('name'),
                                                onBlur: ()=>setFocusedField(null),
                                                placeholder: "Masukkan nama lengkap Anda",
                                                className: "w-full px-4 py-3 rounded-xl placeholder-slate-500 text-sm",
                                                style: focusStyle('name'),
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 303,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 299,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs tracking-[0.25em] uppercase text-amber-500/85 mb-2 font-medium",
                                                style: {
                                                    fontFamily: FONT_SANS
                                                },
                                                children: "Ucapan & Doa Restu"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 318,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: message,
                                                onChange: (e)=>setMessage(e.target.value),
                                                onFocus: ()=>setFocusedField('message'),
                                                onBlur: ()=>setFocusedField(null),
                                                placeholder: "Tuliskan ucapan dan doa tulus untuk Adli & Rima…",
                                                rows: 3,
                                                className: "w-full px-4 py-3 rounded-xl placeholder-slate-500 resize-none leading-relaxed text-sm",
                                                style: focusStyle('message'),
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 321,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 317,
                                        columnNumber: 13
                                    }, this),
                                    errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-400 px-1 font-medium",
                                        style: {
                                            fontFamily: FONT_SANS
                                        },
                                        children: errorMsg
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 336,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        type: "submit",
                                        disabled: submitting,
                                        className: "mt-2 w-full py-3.5 rounded-xl text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold overflow-hidden shadow-lg cursor-pointer transition-all duration-300 relative group transform-gpu",
                                        style: {
                                            willChange: 'transform',
                                            fontFamily: FONT_SANS,
                                            background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.88) 0%, rgba(120, 53, 15, 0.95) 100%)',
                                            border: '1px solid rgba(245, 158, 11, 0.55)',
                                            color: '#fef3c7',
                                            boxShadow: '0 4px 20px rgba(217, 119, 6, 0.3)'
                                        },
                                        whileHover: {
                                            scale: 1.02,
                                            boxShadow: '0 6px 25px rgba(245, 158, 11, 0.45)'
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center justify-center gap-2",
                                            children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4 animate-spin text-amber-200",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        strokeWidth: 2,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "12",
                                                                cy: "12",
                                                                r: "10",
                                                                strokeOpacity: ".2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                                lineNumber: 361,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M12 2a10 10 0 0110 10",
                                                                strokeLinecap: "round"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Mengirimkan…"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 359,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4 text-amber-300",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        strokeWidth: 2,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 7.5 7.5 0 0112 17.25h-2.625c-.621 0-1.125.504-1.125 1.125v3.375"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Guestbook.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 368,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Kirim Ucapan & Doa"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 367,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Guestbook.tsx",
                                            lineNumber: 357,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Guestbook.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-lg flex flex-col gap-3.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-2 pt-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-amber-400 text-base",
                                        children: "💌"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-base sm:text-lg text-amber-300 font-medium tracking-wide",
                                        style: {
                                            fontFamily: FONT_DISPLAY
                                        },
                                        children: "Daftar Ucapan & Doa"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 387,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 385,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-amber-500/70 font-mono",
                                children: [
                                    messages.length,
                                    " Ucapan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 391,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 384,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1",
                        children: loading && messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center items-center py-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-6 h-6 border-2 border-amber-500/30 border-t-amber-400 rounded-full animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 399,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Guestbook.tsx",
                            lineNumber: 398,
                            columnNumber: 13
                        }, this) : messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 px-4 rounded-xl border border-amber-500/15",
                            style: GLASS_INNER,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400 italic",
                                style: {
                                    fontFamily: FONT_SERIF
                                },
                                children: "Belum ada ucapan. Jadilah yang pertama memberikan doa restu untuk Adli & Rima!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 403,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Guestbook.tsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this) : messages.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 15
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.35,
                                    delay: idx * 0.03
                                },
                                className: "p-4 rounded-xl border flex flex-col gap-2 relative overflow-hidden transform-gpu",
                                style: {
                                    willChange: 'transform, opacity',
                                    ...GLASS_INNER
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-2 border-b border-amber-500/10 pb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-7 h-7 rounded-full bg-gradient-to-br from-amber-600/40 to-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 text-xs font-semibold",
                                                        children: item.guest_name ? item.guest_name.charAt(0).toUpperCase() : 'G'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 419,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-semibold text-amber-200 tracking-wide",
                                                        style: {
                                                            fontFamily: FONT_DISPLAY
                                                        },
                                                        children: item.guest_name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 422,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 418,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-amber-500/60 shrink-0 font-light",
                                                style: {
                                                    fontFamily: FONT_SANS
                                                },
                                                children: formatRelativeTime(item.created_at)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 426,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 417,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-slate-200/90 leading-relaxed font-light italic pl-1",
                                        style: {
                                            fontFamily: FONT_SERIF
                                        },
                                        children: [
                                            "“",
                                            item.message,
                                            "”"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 431,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 409,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 396,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Guestbook.tsx",
                lineNumber: 383,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Guestbook.tsx",
        lineNumber: 210,
        columnNumber: 5
    }, this);
}
_s(Guestbook, "yy7RUct//njVK5DSs9g38h08HOA=");
_c = Guestbook;
var _c;
__turbopack_context__.k.register(_c, "Guestbook");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/Guestbook.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/Guestbook.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_Guestbook_tsx_1eq97wjzq7y8_._.js.map