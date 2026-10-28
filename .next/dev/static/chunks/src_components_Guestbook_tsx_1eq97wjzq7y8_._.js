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
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpa212anNldXZmbG56bnZ6eWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE4OTY2MDUsImV4cCI6MjEwNzQ3MjYwNX0.69DWHHo37b4I9UszgWZuBSDKSVmTYV2q9_5ZqXMRiR4") || '';
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
// ─── Style Constants ──────────────────────────────────────────────────────────
const FONT_DISPLAY = "var(--font-cinzel), serif";
const FONT_SERIF = "var(--font-cormorant), serif";
const FONT_SANS = "var(--font-eb-garamond), serif";
const GLASS = {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(245, 158, 11, 0.22)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
};
const GLASS_INNER = {
    background: 'rgba(15, 23, 42, 0.75)',
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
    const [attendance, setAttendance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [pax, setPax] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
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
            let entries = [];
            const res = await supabase.from('wedding_guestbook').select('id, guest_name, message, attendance, pax, created_at').order('created_at', {
                ascending: false
            });
            // Fallback if attendance or pax columns don't exist in Supabase schema
            if (res.error && res.error.message?.includes('attendance')) {
                const fallback = await supabase.from('wedding_guestbook').select('id, guest_name, message, created_at').order('created_at', {
                    ascending: false
                });
                if (fallback.data) {
                    entries = fallback.data;
                }
            } else if (res.data) {
                entries = res.data;
            }
            setMessages(entries);
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
        if (!attendance) {
            setErrorMsg('Silakan pilih konfirmasi kehadiran.');
            return;
        }
        setErrorMsg('');
        setSubmitting(true);
        const tempId = `temp-${Date.now()}`;
        const newEntry = {
            id: tempId,
            guest_name: name.trim(),
            message: message.trim(),
            attendance: attendance,
            pax: attendance === 'hadir' ? pax : 0,
            created_at: new Date().toISOString()
        };
        // ─── 5. Dynamic Update: Immediate local state update (optimistic UI) ──────
        setMessages((prev)=>[
                newEntry,
                ...prev
            ]);
        setMessage('');
        setAttendance('');
        setPax(1);
        setShowSuccessToast(true);
        setTimeout(()=>{
            setShowSuccessToast(false);
        }, 4500);
        // Save to Supabase wedding_guestbook table
        try {
            let savedEntry = null;
            const res = await supabase.from('wedding_guestbook').insert([
                {
                    guest_name: newEntry.guest_name,
                    message: newEntry.message,
                    attendance: attendance,
                    pax: attendance === 'hadir' ? pax : 0
                }
            ]).select();
            // Fallback if attendance/pax columns don't exist in Supabase schema
            if (res.error && res.error.message?.includes('attendance')) {
                const fallback = await supabase.from('wedding_guestbook').insert([
                    {
                        guest_name: newEntry.guest_name,
                        message: `${attendance === 'hadir' ? `[Hadir - ${pax} Pax] ` : '[Tidak Hadir] '}${newEntry.message}`
                    }
                ]).select();
                if (fallback.data && fallback.data[0]) {
                    savedEntry = fallback.data[0];
                }
            } else if (res.data && res.data[0]) {
                savedEntry = res.data[0];
            }
            if (savedEntry) {
                // Swap optimistic temporary entry with confirmed record from Supabase
                setMessages((prev)=>prev.map((m)=>m.id === tempId ? savedEntry : m));
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
                lineNumber: 250,
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
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "64",
                                cy: "9",
                                r: "2.5",
                                fill: "currentColor"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 262,
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
                                lineNumber: 263,
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
                                lineNumber: 264,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 260,
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
                        lineNumber: 267,
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
                        lineNumber: 271,
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
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 w-40 my-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-amber-500/50 text-xs",
                                children: "✦"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 290,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/40"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 291,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Guestbook.tsx",
                lineNumber: 259,
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
                        lineNumber: 304,
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
                                        background: 'rgba(16, 185, 129, 0.25)',
                                        borderColor: 'rgba(52, 211, 153, 0.45)'
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
                                                    lineNumber: 324,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 323,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Guestbook.tsx",
                                            lineNumber: 322,
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
                                            lineNumber: 327,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Guestbook.tsx",
                                    lineNumber: 310,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 308,
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
                                                lineNumber: 337,
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
                                                lineNumber: 340,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 336,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs tracking-[0.25em] uppercase text-amber-500/85 mb-2 font-medium",
                                                style: {
                                                    fontFamily: FONT_SANS
                                                },
                                                children: "Konfirmasi Kehadiran"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    'hadir',
                                                    'tidak_hadir'
                                                ].map((val)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setAttendance(val),
                                                        className: `flex-1 py-2.5 rounded-xl text-xs tracking-[0.18em] uppercase font-medium transition-all duration-200 border ${attendance === val ? 'border-amber-500/70 text-amber-200 bg-amber-900/40' : 'border-amber-500/20 text-slate-400 bg-slate-900/40 hover:border-amber-500/40'}`,
                                                        style: {
                                                            fontFamily: FONT_SANS
                                                        },
                                                        children: val === 'hadir' ? '✓ Hadir' : '✗ Tidak Hadir'
                                                    }, val, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 360,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 358,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    attendance === 'hadir' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs tracking-[0.25em] uppercase text-amber-500/85 mb-2 font-medium",
                                                style: {
                                                    fontFamily: FONT_SANS
                                                },
                                                children: "Jumlah Tamu (Pax)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 380,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setPax((p)=>Math.max(1, p - 1)),
                                                        className: "w-9 h-9 rounded-lg border border-amber-500/30 text-amber-400 bg-slate-900/60 hover:border-amber-500/60 transition-colors text-lg leading-none flex items-center justify-center",
                                                        children: "−"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex-1 text-center text-base text-amber-200 font-semibold",
                                                        style: {
                                                            fontFamily: FONT_DISPLAY
                                                        },
                                                        children: pax
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 389,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setPax((p)=>Math.min(20, p + 1)),
                                                        className: "w-9 h-9 rounded-lg border border-amber-500/30 text-amber-400 bg-slate-900/60 hover:border-amber-500/60 transition-colors text-lg leading-none flex items-center justify-center",
                                                        children: "+"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 390,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 383,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 379,
                                        columnNumber: 15
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
                                                lineNumber: 401,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: message,
                                                onChange: (e)=>setMessage(e.target.value),
                                                onFocus: ()=>setFocusedField('message'),
                                                onBlur: ()=>setFocusedField(null),
                                                placeholder: "Tuliskan ucapan dan doa tulus untuk Rima & Adli…",
                                                rows: 3,
                                                className: "w-full px-4 py-3 rounded-xl placeholder-slate-500 resize-none leading-relaxed text-sm",
                                                style: focusStyle('message'),
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 404,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 400,
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
                                        lineNumber: 419,
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
                                                                lineNumber: 444,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M12 2a10 10 0 0110 10",
                                                                strokeLinecap: "round"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                                lineNumber: 445,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 443,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Mengirimkan…"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 442,
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
                                                            lineNumber: 452,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 451,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Kirim Ucapan & Doa"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 450,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Guestbook.tsx",
                                            lineNumber: 440,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 334,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 306,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-px w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 462,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Guestbook.tsx",
                lineNumber: 296,
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
                                        lineNumber: 469,
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
                                        lineNumber: 470,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 468,
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
                                lineNumber: 474,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 467,
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
                                lineNumber: 482,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Guestbook.tsx",
                            lineNumber: 481,
                            columnNumber: 13
                        }, this) : messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-8 px-4 rounded-xl border border-amber-500/15",
                            style: GLASS_INNER,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400 italic",
                                style: {
                                    fontFamily: FONT_SERIF
                                },
                                children: "Belum ada ucapan. Jadilah yang pertama memberikan doa restu untuk Rima & Adli!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 486,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Guestbook.tsx",
                            lineNumber: 485,
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
                                                className: "flex items-center gap-2 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-7 h-7 rounded-full bg-gradient-to-br from-amber-600/40 to-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-300 text-xs font-semibold",
                                                        children: item.guest_name ? item.guest_name.charAt(0).toUpperCase() : 'G'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 502,
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
                                                        lineNumber: 505,
                                                        columnNumber: 21
                                                    }, this),
                                                    item.attendance === 'hadir' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-emerald-400 bg-emerald-900/20 border border-emerald-500/20 rounded-full px-2 py-0.5",
                                                        children: [
                                                            "✓ Hadir ",
                                                            item.pax && item.pax > 1 ? `×${item.pax}` : ''
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 509,
                                                        columnNumber: 23
                                                    }, this) : item.attendance === 'tidak_hadir' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-rose-400 bg-rose-900/20 border border-rose-500/20 rounded-full px-2 py-0.5",
                                                        children: "✗ Tidak Hadir"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Guestbook.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 23
                                                    }, this) : null
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Guestbook.tsx",
                                                lineNumber: 501,
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
                                                lineNumber: 518,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Guestbook.tsx",
                                        lineNumber: 500,
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
                                        lineNumber: 523,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/components/Guestbook.tsx",
                                lineNumber: 492,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/Guestbook.tsx",
                        lineNumber: 479,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Guestbook.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Guestbook.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
_s(Guestbook, "Rcfk4i65XxhWFW7HndMOzbR7uRQ=");
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