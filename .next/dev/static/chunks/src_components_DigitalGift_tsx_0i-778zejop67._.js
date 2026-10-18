(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/DigitalGift.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DigitalGift
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const FONT_DISPLAY = "var(--font-cinzel), serif";
const FONT_SERIF = "var(--font-cormorant), serif";
const BANK_ACCOUNTS = [
    {
        id: 'bca',
        bankName: 'Bank BCA',
        bankBadge: 'BCA',
        accountNumber: '7402232806',
        accountHolder: 'Abdul Qodir Adli',
        colorAccent: 'rgba(59, 130, 246, 0.4)',
        badgeBg: 'bg-blue-600/30 text-blue-300 border-blue-400/40'
    },
    {
        id: 'bni',
        bankName: 'Bank BNI',
        bankBadge: 'BNI',
        accountNumber: '1794912663',
        accountHolder: 'Rima Sugiarto',
        colorAccent: 'rgba(249, 115, 22, 0.4)',
        badgeBg: 'bg-orange-600/30 text-orange-300 border-orange-400/40'
    },
    {
        id: 'mandiri',
        bankName: 'Bank Mandiri',
        bankBadge: 'MANDIRI',
        accountNumber: '1670010244571',
        accountHolder: 'Abdul Qodir Adli',
        colorAccent: 'rgba(234, 179, 8, 0.4)',
        badgeBg: 'bg-amber-600/30 text-amber-300 border-amber-400/40'
    }
];
function DigitalGift() {
    _s();
    const [copiedId, setCopiedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleCopy = (id, num)=>{
        if (navigator?.clipboard) {
            navigator.clipboard.writeText(num);
            setCopiedId(id);
            setTimeout(()=>{
                setCopiedId(null);
            }, 2500);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "relative w-full flex flex-col items-center py-16 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 pointer-events-none opacity-20",
                style: {
                    background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.15) 0%, transparent 70%)'
                },
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/DigitalGift.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 w-full max-w-4xl flex flex-col items-center text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        className: "text-xs sm:text-sm tracking-[0.38em] uppercase text-amber-500/80 mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",
                        style: {
                            fontFamily: FONT_SERIF
                        },
                        initial: {
                            opacity: 0,
                            y: 15
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
                            duration: 0.6
                        },
                        children: "Tanda Kasih"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DigitalGift.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                        className: "text-3xl sm:text-4xl text-amber-300 font-normal tracking-wider mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]",
                        style: {
                            fontFamily: FONT_DISPLAY
                        },
                        initial: {
                            opacity: 0,
                            y: 15
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
                            delay: 0.1
                        },
                        children: "Amplop Digital"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DigitalGift.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                        className: "text-xs sm:text-sm text-slate-300/85 italic leading-relaxed max-w-lg mb-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",
                        style: {
                            fontFamily: FONT_SERIF
                        },
                        initial: {
                            opacity: 0,
                            y: 15
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
                            delay: 0.2
                        },
                        children: "Doa restu Anda merupakan karunia terindah bagi kami. Namun jika memberi adalah ungkapan kasih Anda, kado digital dapat disalurkan melalui rekening berikut:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/DigitalGift.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-6 w-full",
                        children: BANK_ACCOUNTS.map((bank, index)=>{
                            const isCopied = copiedId === bank.id;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: "relative flex flex-col justify-between p-6 rounded-2xl border backdrop-blur-md overflow-hidden text-left shadow-xl group transition-all duration-300",
                                style: {
                                    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%)',
                                    borderColor: 'rgba(245, 158, 11, 0.25)',
                                    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px ${bank.colorAccent}`
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
                                    delay: 0.15 * index
                                },
                                whileHover: {
                                    y: -4,
                                    borderColor: 'rgba(245, 158, 11, 0.5)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between w-full mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-7 rounded-md border border-amber-400/40 bg-gradient-to-br from-amber-200/30 via-amber-400/20 to-amber-600/30 flex items-center justify-center p-1 shadow-inner",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-full border border-amber-400/30 rounded-[3px] grid grid-cols-2 gap-0.5 opacity-60",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-r border-b border-amber-400/30"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DigitalGift.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-b border-amber-400/30"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DigitalGift.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "border-r border-amber-400/30"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DigitalGift.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                                            fileName: "[project]/src/components/DigitalGift.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/DigitalGift.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DigitalGift.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-3 py-1 text-xs font-bold tracking-widest rounded-full border ${bank.badgeBg}`,
                                                style: {
                                                    fontFamily: FONT_DISPLAY
                                                },
                                                children: bank.bankBadge
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DigitalGift.tsx",
                                                lineNumber: 142,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DigitalGift.tsx",
                                        lineNumber: 130,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col gap-1 mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] tracking-[0.25em] text-slate-400 uppercase",
                                                style: {
                                                    fontFamily: FONT_SERIF
                                                },
                                                children: "Nomor Rekening"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DigitalGift.tsx",
                                                lineNumber: 152,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xl sm:text-2xl font-mono text-amber-200 tracking-wider font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",
                                                children: bank.accountNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/DigitalGift.tsx",
                                                lineNumber: 155,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs sm:text-sm text-slate-300/90 font-medium tracking-wide mt-1",
                                                style: {
                                                    fontFamily: FONT_DISPLAY
                                                },
                                                children: [
                                                    "a.n. ",
                                                    bank.accountHolder
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/DigitalGift.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/DigitalGift.tsx",
                                        lineNumber: 151,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleCopy(bank.id, bank.accountNumber),
                                        className: `w-full py-2.5 px-4 rounded-xl text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${isCopied ? 'bg-emerald-600/80 text-emerald-100 border border-emerald-400' : 'bg-amber-600/20 hover:bg-amber-600/35 text-amber-300 border border-amber-500/40 hover:border-amber-400'}`,
                                        style: {
                                            fontFamily: FONT_SERIF
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            mode: "wait",
                                            children: isCopied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                className: "flex items-center gap-1.5",
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0.8
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    scale: 0.8
                                                },
                                                transition: {
                                                    duration: 0.2
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4 text-emerald-300",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        strokeWidth: 2.5,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "M5 13l4 4L19 7"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DigitalGift.tsx",
                                                            lineNumber: 185,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DigitalGift.tsx",
                                                        lineNumber: 184,
                                                        columnNumber: 25
                                                    }, this),
                                                    "Tersalin!"
                                                ]
                                            }, "copied", true, {
                                                fileName: "[project]/src/components/DigitalGift.tsx",
                                                lineNumber: 176,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                className: "flex items-center gap-1.5",
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0.8
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                exit: {
                                                    opacity: 0,
                                                    scale: 0.8
                                                },
                                                transition: {
                                                    duration: 0.2
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-4 h-4 text-amber-400",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        strokeWidth: 2,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/DigitalGift.tsx",
                                                            lineNumber: 199,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/DigitalGift.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 25
                                                    }, this),
                                                    "Salin No. Rekening"
                                                ]
                                            }, "copy", true, {
                                                fileName: "[project]/src/components/DigitalGift.tsx",
                                                lineNumber: 190,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/DigitalGift.tsx",
                                            lineNumber: 174,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DigitalGift.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, bank.id, true, {
                                fileName: "[project]/src/components/DigitalGift.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/DigitalGift.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/DigitalGift.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/DigitalGift.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(DigitalGift, "CRg2u1n5hA3yKxdjOouDlqFGZY4=");
_c = DigitalGift;
var _c;
__turbopack_context__.k.register(_c, "DigitalGift");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/DigitalGift.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/DigitalGift.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_DigitalGift_tsx_0i-778zejop67._.js.map