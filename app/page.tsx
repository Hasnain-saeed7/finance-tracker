// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-[#0A0A0F] text-white overflow-hidden">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

//         * { box-sizing: border-box; }

//         body { margin: 0; }

//         .home-wrap {
//           font-family: 'DM Sans', sans-serif;
//           background: #0A0A0F;
//           min-height: 100vh;
//           position: relative;
//         }

//         .display-font { font-family: 'Syne', sans-serif; }

//         /* Background orbs */
//         .orb {
//           position: fixed;
//           border-radius: 50%;
//           filter: blur(120px);
//           opacity: 0.18;
//           pointer-events: none;
//           z-index: 0;
//         }
//         .orb-1 {
//           width: 600px; height: 600px;
//           background: #4ade80;
//           top: -200px; right: -100px;
//           animation: drift1 12s ease-in-out infinite alternate;
//         }
//         .orb-2 {
//           width: 500px; height: 500px;
//           background: #818cf8;
//           bottom: -100px; left: -150px;
//           animation: drift2 15s ease-in-out infinite alternate;
//         }
//         .orb-3 {
//           width: 300px; height: 300px;
//           background: #34d399;
//           top: 40%; left: 40%;
//           opacity: 0.08;
//           animation: drift3 10s ease-in-out infinite alternate;
//         }

//         @keyframes drift1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-60px, 80px) scale(1.1); } }
//         @keyframes drift2 { from { transform: translate(0,0) scale(1); } to { transform: translate(80px, -60px) scale(1.15); } }
//         @keyframes drift3 { from { transform: translate(0,0); } to { transform: translate(-40px, 40px); } }

//         /* Grid overlay */
//         .grid-bg {
//           position: fixed;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
//           background-size: 60px 60px;
//           z-index: 0;
//           pointer-events: none;
//         }

//         .content { position: relative; z-index: 1; }

//         /* Nav */
//         nav {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 1.5rem 4rem;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           backdrop-filter: blur(20px);
//           position: sticky;
//           top: 0;
//           z-index: 100;
//           background: rgba(10,10,15,0.7);
//         }

//         .nav-logo {
//           font-family: 'Syne', sans-serif;
//           font-weight: 800;
//           font-size: 1.4rem;
//           letter-spacing: -0.03em;
//           background: linear-gradient(135deg, #4ade80, #34d399);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .nav-links {
//           display: flex;
//           gap: 2.5rem;
//           list-style: none;
//           margin: 0;
//           padding: 0;
//         }

//         .nav-links a {
//           color: rgba(255,255,255,0.5);
//           text-decoration: none;
//           font-size: 0.9rem;
//           font-weight: 400;
//           letter-spacing: 0.01em;
//           transition: color 0.2s;
//         }
//         .nav-links a:hover { color: rgba(255,255,255,0.9); }

//         .nav-cta {
//           background: linear-gradient(135deg, #4ade80, #22c55e);
//           color: #0a2e14 !important;
//           font-weight: 600 !important;
//           padding: 0.55rem 1.4rem;
//           border-radius: 100px;
//           font-size: 0.875rem !important;
//           transition: opacity 0.2s, transform 0.2s !important;
//         }
//         .nav-cta:hover { opacity: 0.9 !important; transform: translateY(-1px); }

//         /* Hero */
//         .hero {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           text-align: center;
//           padding: 7rem 2rem 5rem;
//           max-width: 900px;
//           margin: 0 auto;
//         }

//         .hero-badge {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: rgba(74,222,128,0.1);
//           border: 1px solid rgba(74,222,128,0.25);
//           color: #4ade80;
//           padding: 0.4rem 1rem;
//           border-radius: 100px;
//           font-size: 0.8rem;
//           font-weight: 500;
//           letter-spacing: 0.05em;
//           text-transform: uppercase;
//           margin-bottom: 2rem;
//           animation: fadeUp 0.6s ease both;
//         }

//         .badge-dot {
//           width: 6px; height: 6px;
//           background: #4ade80;
//           border-radius: 50%;
//           animation: pulse 2s ease-in-out infinite;
//         }

//         @keyframes pulse {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.5; transform: scale(0.8); }
//         }

//         .hero h1 {
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(3rem, 7vw, 5.5rem);
//           font-weight: 800;
//           line-height: 1.05;
//           letter-spacing: -0.04em;
//           margin: 0 0 1.5rem;
//           animation: fadeUp 0.6s 0.1s ease both;
//         }

//         .hero h1 .accent {
//           background: linear-gradient(135deg, #4ade80 0%, #22d3ee 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         .hero p {
//           font-size: 1.2rem;
//           color: rgba(255,255,255,0.45);
//           line-height: 1.7;
//           max-width: 560px;
//           margin: 0 0 3rem;
//           font-weight: 300;
//           animation: fadeUp 0.6s 0.2s ease both;
//         }

//         .hero-actions {
//           display: flex;
//           gap: 1rem;
//           align-items: center;
//           animation: fadeUp 0.6s 0.3s ease both;
//         }

//         .btn-primary {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: linear-gradient(135deg, #4ade80, #22c55e);
//           color: #052e16;
//           font-weight: 600;
//           font-size: 1rem;
//           padding: 0.85rem 2rem;
//           border-radius: 100px;
//           text-decoration: none;
//           transition: transform 0.2s, box-shadow 0.2s;
//           box-shadow: 0 0 40px rgba(74,222,128,0.25);
//         }
//         .btn-primary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 0 60px rgba(74,222,128,0.4);
//         }

//         .btn-secondary {
//           display: inline-flex;
//           align-items: center;
//           gap: 0.5rem;
//           background: rgba(255,255,255,0.05);
//           border: 1px solid rgba(255,255,255,0.12);
//           color: rgba(255,255,255,0.7);
//           font-weight: 500;
//           font-size: 1rem;
//           padding: 0.85rem 2rem;
//           border-radius: 100px;
//           text-decoration: none;
//           transition: background 0.2s, border-color 0.2s, color 0.2s;
//         }
//         .btn-secondary:hover {
//           background: rgba(255,255,255,0.09);
//           border-color: rgba(255,255,255,0.2);
//           color: white;
//         }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         /* Dashboard preview */
//         .preview-wrap {
//           max-width: 1000px;
//           margin: 4rem auto 0;
//           padding: 0 2rem;
//           animation: fadeUp 0.6s 0.4s ease both;
//         }

//         .preview-window {
//           background: #13131a;
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
//         }

//         .preview-titlebar {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           padding: 0.9rem 1.2rem;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           background: rgba(255,255,255,0.02);
//         }

//         .dot { width: 10px; height: 10px; border-radius: 50%; }
//         .dot-r { background: #ff5f57; }
//         .dot-y { background: #ffbd2e; }
//         .dot-g { background: #28ca41; }

//         .preview-url {
//           margin-left: 1rem;
//           background: rgba(255,255,255,0.05);
//           border-radius: 6px;
//           padding: 0.25rem 1rem;
//           font-size: 0.75rem;
//           color: rgba(255,255,255,0.3);
//           font-family: 'DM Sans', sans-serif;
//         }

//         .preview-body {
//           display: flex;
//           height: 360px;
//         }

//         .preview-sidebar {
//           width: 180px;
//           border-right: 1px solid rgba(255,255,255,0.06);
//           padding: 1.5rem 1rem;
//           flex-shrink: 0;
//         }

//         .preview-logo {
//           font-family: 'Syne', sans-serif;
//           font-weight: 700;
//           font-size: 0.85rem;
//           color: #4ade80;
//           margin-bottom: 1.5rem;
//           padding-left: 0.4rem;
//         }

//         .preview-nav-item {
//           display: flex;
//           align-items: center;
//           gap: 0.6rem;
//           padding: 0.5rem 0.6rem;
//           border-radius: 8px;
//           font-size: 0.75rem;
//           color: rgba(255,255,255,0.35);
//           margin-bottom: 0.25rem;
//         }
//         .preview-nav-item.active {
//           background: rgba(74,222,128,0.12);
//           color: #4ade80;
//         }

//         .nav-icon {
//           width: 14px; height: 14px;
//           border-radius: 3px;
//           background: currentColor;
//           opacity: 0.6;
//         }

//         .preview-main {
//           flex: 1;
//           padding: 1.5rem;
//           overflow: hidden;
//         }

//         .preview-stat-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 0.75rem;
//           margin-bottom: 1rem;
//         }

//         .preview-stat {
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.06);
//           border-radius: 10px;
//           padding: 0.75rem;
//         }

//         .preview-stat-label {
//           font-size: 0.6rem;
//           color: rgba(255,255,255,0.3);
//           margin-bottom: 0.4rem;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//         }

//         .preview-stat-val {
//           font-family: 'Syne', sans-serif;
//           font-size: 1rem;
//           font-weight: 700;
//           color: white;
//         }

//         .preview-stat-val.green { color: #4ade80; }
//         .preview-stat-val.red { color: #f87171; }

//         .preview-charts {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 0.75rem;
//         }

//         .preview-chart-box {
//           background: rgba(255,255,255,0.03);
//           border: 1px solid rgba(255,255,255,0.06);
//           border-radius: 10px;
//           padding: 0.75rem;
//           height: 180px;
//           overflow: hidden;
//         }

//         .chart-label {
//           font-size: 0.6rem;
//           color: rgba(255,255,255,0.3);
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           margin-bottom: 0.75rem;
//         }

//         /* Bar chart */
//         .bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 100px; }
//         .bar-group { display: flex; gap: 2px; align-items: flex-end; }
//         .bar {
//           width: 10px;
//           border-radius: 3px 3px 0 0;
//           transition: height 0.3s ease;
//         }
//         .bar-income { background: #4ade80; opacity: 0.85; }
//         .bar-expense { background: #f87171; opacity: 0.75; }

//         /* Pie chart */
//         .donut-wrap {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .donut-legend { display: flex; flex-direction: column; gap: 0.5rem; }
//         .legend-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.65rem; color: rgba(255,255,255,0.5); }
//         .legend-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

//         /* Divider */
//         .section-divider {
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 0 2rem;
//           border-top: 1px solid rgba(255,255,255,0.05);
//         }

//         /* Features */
//         .features {
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 6rem 2rem;
//         }

//         .section-tag {
//           font-size: 0.75rem;
//           font-weight: 500;
//           text-transform: uppercase;
//           letter-spacing: 0.12em;
//           color: #4ade80;
//           margin-bottom: 1rem;
//         }

//         .section-title {
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(2rem, 4vw, 3rem);
//           font-weight: 800;
//           letter-spacing: -0.03em;
//           line-height: 1.1;
//           margin: 0 0 1rem;
//         }

//         .section-sub {
//           color: rgba(255,255,255,0.4);
//           font-size: 1.05rem;
//           font-weight: 300;
//           max-width: 480px;
//           line-height: 1.6;
//           margin-bottom: 3.5rem;
//         }

//         .features-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1.5rem;
//         }

//         .feature-card {
//           background: rgba(255,255,255,0.02);
//           border: 1px solid rgba(255,255,255,0.07);
//           border-radius: 16px;
//           padding: 2rem;
//           transition: border-color 0.3s, background 0.3s;
//           position: relative;
//           overflow: hidden;
//         }

//         .feature-card::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(74,222,128,0.4), transparent);
//           opacity: 0;
//           transition: opacity 0.3s;
//         }

//         .feature-card:hover {
//           border-color: rgba(74,222,128,0.2);
//           background: rgba(74,222,128,0.03);
//         }

//         .feature-card:hover::before { opacity: 1; }

//         .feature-icon {
//           width: 44px; height: 44px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 1.3rem;
//           margin-bottom: 1.25rem;
//         }

//         .icon-green { background: rgba(74,222,128,0.12); }
//         .icon-blue { background: rgba(34,211,238,0.12); }
//         .icon-purple { background: rgba(129,140,248,0.12); }
//         .icon-amber { background: rgba(251,191,36,0.12); }
//         .icon-pink { background: rgba(244,114,182,0.12); }
//         .icon-teal { background: rgba(45,212,191,0.12); }

//         .feature-title {
//           font-family: 'Syne', sans-serif;
//           font-size: 1.05rem;
//           font-weight: 700;
//           margin: 0 0 0.6rem;
//           letter-spacing: -0.02em;
//         }

//         .feature-desc {
//           font-size: 0.875rem;
//           color: rgba(255,255,255,0.4);
//           line-height: 1.7;
//           font-weight: 300;
//           margin: 0;
//         }

//         /* Stats strip */
//         .stats-strip {
//           border-top: 1px solid rgba(255,255,255,0.05);
//           border-bottom: 1px solid rgba(255,255,255,0.05);
//         }

//         .stats-inner {
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 3.5rem 2rem;
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 2rem;
//           text-align: center;
//         }

//         .stat-num {
//           font-family: 'Syne', sans-serif;
//           font-size: 3rem;
//           font-weight: 800;
//           letter-spacing: -0.04em;
//           background: linear-gradient(135deg, #4ade80, #22d3ee);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           line-height: 1;
//           margin-bottom: 0.5rem;
//         }

//         .stat-label {
//           font-size: 0.875rem;
//           color: rgba(255,255,255,0.4);
//           font-weight: 300;
//         }

//         /* CTA section */
//         .cta-section {
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 6rem 2rem;
//           text-align: center;
//         }

//         .cta-box {
//           background: rgba(74,222,128,0.05);
//           border: 1px solid rgba(74,222,128,0.15);
//           border-radius: 24px;
//           padding: 5rem 3rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .cta-box::before {
//           content: '';
//           position: absolute;
//           top: -100px; left: 50%;
//           transform: translateX(-50%);
//           width: 400px; height: 400px;
//           background: radial-gradient(circle, rgba(74,222,128,0.12), transparent 70%);
//           pointer-events: none;
//         }

//         .cta-box h2 {
//           font-family: 'Syne', sans-serif;
//           font-size: clamp(2rem, 5vw, 3.5rem);
//           font-weight: 800;
//           letter-spacing: -0.04em;
//           line-height: 1.1;
//           margin: 0 0 1rem;
//           position: relative;
//         }

//         .cta-box p {
//           color: rgba(255,255,255,0.4);
//           font-size: 1.05rem;
//           font-weight: 300;
//           margin: 0 0 2.5rem;
//           position: relative;
//         }

//         .cta-actions {
//           display: flex;
//           gap: 1rem;
//           justify-content: center;
//           position: relative;
//         }

//         /* Footer */
//         footer {
//           border-top: 1px solid rgba(255,255,255,0.05);
//           padding: 2rem 4rem;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .footer-logo {
//           font-family: 'Syne', sans-serif;
//           font-weight: 700;
//           font-size: 1rem;
//           color: rgba(255,255,255,0.4);
//         }

//         .footer-copy {
//           font-size: 0.8rem;
//           color: rgba(255,255,255,0.2);
//         }
//       `}</style>

//       <div className="home-wrap">
//         <div className="orb orb-1" />
//         <div className="orb orb-2" />
//         <div className="orb orb-3" />
//         <div className="grid-bg" />

//         <div className="content">
//           {/* Nav */}
//           <nav>
//             <div className="nav-logo">💰 FinanceAI</div>
//             <ul className="nav-links">
//               <li><a href="#features">Features</a></li>
//               <li><a href="#stats">Stats</a></li>
//               <li><a href="/register" className="nav-cta">Get started free</a></li>
//             </ul>
//           </nav>

//           {/* Hero */}
//           <section className="hero">
//             <div className="hero-badge">
//               <span className="badge-dot" />
//               AI-powered financial insights
//             </div>

//             <h1 className="display-font">
//               Take control of<br />
//               <span className="accent">your money</span>
//             </h1>

//             <p>
//               Track income, expenses, and budgets — then let AI analyze your spending patterns and surface insights you'd never spot on your own.
//             </p>

//             <div className="hero-actions">
//               <Link href="/register" className="btn-primary">
//                 Start for free →
//               </Link>
//               <Link href="/login" className="btn-secondary">
//                 Sign in
//               </Link>
//             </div>
//           </section>

//           {/* Dashboard Preview */}
//           <div className="preview-wrap">
//             <div className="preview-window">
//               <div className="preview-titlebar">
//                 <span className="dot dot-r" />
//                 <span className="dot dot-y" />
//                 <span className="dot dot-g" />
//                 <span className="preview-url">localhost:3000/dashboard</span>
//               </div>
//               <div className="preview-body">
//                 <div className="preview-sidebar">
//                   <div className="preview-logo">💰 FinanceAI</div>
//                   {[
//                     { label: "Overview", active: true },
//                     { label: "Transactions", active: false },
//                     { label: "Budgets", active: false },
//                     { label: "AI Insights", active: false },
//                   ].map(item => (
//                     <div key={item.label} className={`preview-nav-item ${item.active ? "active" : ""}`}>
//                       <div className="nav-icon" />
//                       {item.label}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="preview-main">
//                   <div className="preview-stat-grid">
//                     <div className="preview-stat">
//                       <div className="preview-stat-label">Balance</div>
//                       <div className="preview-stat-val">$4,280</div>
//                     </div>
//                     <div className="preview-stat">
//                       <div className="preview-stat-label">Income</div>
//                       <div className="preview-stat-val green">$6,500</div>
//                     </div>
//                     <div className="preview-stat">
//                       <div className="preview-stat-label">Expenses</div>
//                       <div className="preview-stat-val red">$2,220</div>
//                     </div>
//                     <div className="preview-stat">
//                       <div className="preview-stat-label">Transactions</div>
//                       <div className="preview-stat-val">42</div>
//                     </div>
//                   </div>
//                   <div className="preview-charts">
//                     <div className="preview-chart-box">
//                       <div className="chart-label">Monthly overview</div>
//                       <div className="bar-chart">
//                         {[
//                           [60, 40], [75, 55], [50, 70], [80, 45],
//                           [90, 60], [70, 50],
//                         ].map(([inc, exp], i) => (
//                           <div key={i} className="bar-group">
//                             <div className="bar bar-income" style={{ height: `${inc}px` }} />
//                             <div className="bar bar-expense" style={{ height: `${exp}px` }} />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="preview-chart-box">
//                       <div className="chart-label">Spending by category</div>
//                       <div className="donut-wrap">
//                         <svg width="90" height="90" viewBox="0 0 90 90">
//                           <circle cx="45" cy="45" r="35" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
//                           <circle cx="45" cy="45" r="35" fill="none" stroke="#4ade80" strokeWidth="14"
//                             strokeDasharray="88 132" strokeDashoffset="0" strokeLinecap="round" />
//                           <circle cx="45" cy="45" r="35" fill="none" stroke="#f87171" strokeWidth="14"
//                             strokeDasharray="52 168" strokeDashoffset="-88" strokeLinecap="round" />
//                           <circle cx="45" cy="45" r="35" fill="none" stroke="#818cf8" strokeWidth="14"
//                             strokeDasharray="34 186" strokeDashoffset="-140" strokeLinecap="round" />
//                           <circle cx="45" cy="45" r="35" fill="none" stroke="#fbbf24" strokeWidth="14"
//                             strokeDasharray="26 194" strokeDashoffset="-174" strokeLinecap="round" />
//                         </svg>
//                         <div className="donut-legend">
//                           {[
//                             ["#4ade80", "Food"],
//                             ["#f87171", "Transport"],
//                             ["#818cf8", "Shopping"],
//                             ["#fbbf24", "Bills"],
//                           ].map(([color, label]) => (
//                             <div key={label} className="legend-item">
//                               <div className="legend-dot" style={{ background: color }} />
//                               {label}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Stats strip */}
//           <div id="stats" className="stats-strip" style={{ marginTop: "5rem" }}>
//             <div className="stats-inner">
//               <div>
//                 <div className="stat-num">100%</div>
//                 <div className="stat-label">Free to get started</div>
//               </div>
//               <div>
//                 <div className="stat-num">AI</div>
//                 <div className="stat-label">Powered spending insights</div>
//               </div>
//               <div>
//                 <div className="stat-num">∞</div>
//                 <div className="stat-label">Transactions you can track</div>
//               </div>
//             </div>
//           </div>

//           {/* Features */}
//           <section id="features" className="features">
//             <div className="section-tag">Everything you need</div>
//             <h2 className="section-title display-font">
//               Built for people who<br />care about their money
//             </h2>
//             <p className="section-sub">
//               Every feature designed to make personal finance feel less like a chore and more like a superpower.
//             </p>

//             <div className="features-grid">
//               {[
//                 {
//                   icon: "📊", iconClass: "icon-green",
//                   title: "Smart Dashboard",
//                   desc: "See your entire financial picture at a glance — income, expenses, balance, and trends on one clean screen.",
//                 },
//                 {
//                   icon: "🤖", iconClass: "icon-blue",
//                   title: "AI Insights",
//                   desc: "Groq-powered analysis of your spending patterns. Get actionable advice tailored to your actual habits.",
//                 },
//                 {
//                   icon: "🎯", iconClass: "icon-purple",
//                   title: "Budget Tracking",
//                   desc: "Set monthly limits per category. Visual progress bars show exactly where you stand in real time.",
//                 },
//                 {
//                   icon: "⚡", iconClass: "icon-amber",
//                   title: "Instant Logging",
//                   desc: "Add income or expenses in seconds. Categorize, tag, and date — no friction, just speed.",
//                 },
//                 {
//                   icon: "📈", iconClass: "icon-pink",
//                   title: "Visual Reports",
//                   desc: "Bar charts and pie charts that make months of data scannable in under five seconds.",
//                 },
//                 {
//                   icon: "🔒", iconClass: "icon-teal",
//                   title: "Secure by Default",
//                   desc: "Auth.js authentication, hashed passwords, and session-based access. Your data stays yours.",
//                 },
//               ].map(f => (
//                 <div key={f.title} className="feature-card">
//                   <div className={`feature-icon ${f.iconClass}`}>{f.icon}</div>
//                   <h3 className="feature-title display-font">{f.title}</h3>
//                   <p className="feature-desc">{f.desc}</p>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* CTA */}
//           <section className="cta-section">
//             <div className="cta-box">
//               <h2 className="display-font">
//                 Ready to own<br />your finances?
//               </h2>
//               <p>Join free today. No credit card. No limits.</p>
//               <div className="cta-actions">
//                 <Link href="/register" className="btn-primary">
//                   Create free account →
//                 </Link>
//                 <Link href="/login" className="btn-secondary">
//                   I have an account
//                 </Link>
//               </div>
//             </div>
//           </section>

//           {/* Footer */}
//           <footer>
//             <div className="footer-logo">💰 FinanceAI</div>
//             <div className="footer-copy">Built with Next.js · TypeScript · MongoDB · Groq AI</div>
//           </footer>
//         </div>
//       </div>
//     </main>
//   );
// }



























import Link from "next/link";
import { ArrowRight, BarChart2, Target, Sparkles, ShieldCheck, Zap, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">💰 FinanceAI</div>
          <nav className="flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Sign in</Link>
            <Link href="/register"
              className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            AI-powered finance tracker
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Your money,<br />
            finally under control.
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
            Track every rupee, set smart budgets, and get AI-generated insights that tell you exactly where your money is going — and how to keep more of it.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/register"
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
              Start for free <ArrowRight size={16} />
            </Link>
            <Link href="/login"
              className="inline-flex items-center gap-2 text-gray-600 font-medium px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400 bg-white border border-gray-100 rounded px-3 py-1">
              localhost:3000/dashboard
            </span>
          </div>

          {/* App layout */}
          <div className="flex" style={{ height: 340 }}>

            {/* Sidebar */}
            <div className="w-52 bg-white border-r border-gray-100 p-4 flex-shrink-0">
              <p className="text-sm font-bold text-gray-900 px-2 mb-5">💰 FinanceAI</p>
              {[
                { label: "Overview", active: true },
                { label: "Transactions", active: false },
                { label: "Budgets", active: false },
                { label: "AI Insights", active: false },
              ].map(item => (
                <div key={item.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-1 ${
                    item.active ? "bg-gray-900 text-white" : "text-gray-400"
                  }`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.active ? "bg-white" : "bg-gray-300"}`} />
                  {item.label}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-6 bg-gray-50 overflow-hidden">

              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {[
                  { label: "Balance", value: "$4,280", color: "text-gray-900" },
                  { label: "Income", value: "$6,500", color: "text-green-600" },
                  { label: "Expenses", value: "$2,220", color: "text-red-500" },
                  { label: "Transactions", value: "42", color: "text-gray-900" },
                ].map(stat => (
                  <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-3">
                    <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-2 gap-3">

                {/* Bar chart */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">Monthly overview</p>
                  <div className="flex items-end gap-2 h-20">
                    {[[65,40],[80,55],[55,70],[85,45],[90,60],[70,50]].map(([inc, exp], i) => (
                      <div key={i} className="flex items-end gap-0.5 flex-1">
                        <div className="bg-green-400 rounded-sm w-full" style={{ height: `${inc}%` }} />
                        <div className="bg-red-300 rounded-sm w-full" style={{ height: `${exp}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-sm bg-green-400 inline-block"/>Income</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400"><span className="w-2 h-2 rounded-sm bg-red-300 inline-block"/>Expenses</span>
                  </div>
                </div>

                {/* Recent transactions */}
                <div className="bg-white rounded-xl border border-gray-100 p-4">
                  <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide font-medium">Recent transactions</p>
                  <div className="space-y-3">
                    {[
                      { name: "Grocery run", cat: "food", amt: "-$48", col: "text-red-500" },
                      { name: "Salary deposit", cat: "salary", amt: "+$3,200", col: "text-green-600" },
                      { name: "Netflix", cat: "bills", amt: "-$15", col: "text-red-500" },
                    ].map(t => (
                      <div key={t.name} className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-medium text-gray-700">{t.name}</p>
                          <p className="text-xs text-gray-300 capitalize">{t.cat}</p>
                        </div>
                        <p className={`text-xs font-semibold ${t.col}`}>{t.amt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="mb-14">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
              Everything you need, nothing you don&apos;t
            </h2>
            <p className="text-gray-400 text-base max-w-lg">
              A focused set of tools that cover the full personal finance loop — from logging to learning.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {[
              {
                icon: <BarChart2 size={18} className="text-green-600" />,
                bg: "bg-green-50",
                title: "Live dashboard",
                desc: "Balance, income, and expenses summarized in four stat cards. Charts update the moment you add a transaction.",
              },
              {
                icon: <Sparkles size={18} className="text-purple-600" />,
                bg: "bg-purple-50",
                title: "AI spending insights",
                desc: "Get a plain-English breakdown of your month — top categories, unusual spikes, and one concrete saving tip.",
              },
              {
                icon: <Target size={18} className="text-blue-600" />,
                bg: "bg-blue-50",
                title: "Budget tracking",
                desc: "Set a monthly limit per category. A color-coded progress bar turns red when you're close to the edge.",
              },
              {
                icon: <Zap size={18} className="text-yellow-600" />,
                bg: "bg-yellow-50",
                title: "Fast transaction entry",
                desc: "Type a description, pick a category, hit add. Logging a transaction takes under ten seconds.",
              },
              {
                icon: <TrendingUp size={18} className="text-teal-600" />,
                bg: "bg-teal-50",
                title: "Monthly charts",
                desc: "Bar and pie charts give you a visual history of income vs. expenses across months at a glance.",
              },
              {
                icon: <ShieldCheck size={18} className="text-gray-600" />,
                bg: "bg-gray-100",
                title: "Secure auth",
                desc: "Credentials login with bcrypt-hashed passwords and JWT sessions. Your data stays private.",
              },
            ].map(f => (
              <div key={f.title}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className={`w-9 h-9 ${f.bg} rounded-lg flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="bg-gray-900 rounded-2xl px-12 py-16 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
              Start tracking in minutes
            </h2>
            <p className="text-gray-400 text-sm">
              Free account. No credit card. Your first insight is one click away.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition-colors text-sm">
              Create free account <ArrowRight size={15} />
            </Link>
            <Link href="/login"
              className="text-gray-400 hover:text-white text-sm transition-colors">
              Sign in →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-bold text-gray-900 text-sm">💰 FinanceAI</span>
          <span className="text-xs text-gray-300">Built with Next.js · TypeScript · MongoDB · Groq AI</span>
        </div>
      </footer>

    </div>
  );
}