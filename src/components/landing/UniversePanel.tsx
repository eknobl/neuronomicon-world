import { getAllArticles } from '@/lib/wiki';
import StarMapGlobeClient from './StarMapGlobeClient';

export default async function UniversePanel() {
  let loreArticles: { title: string; excerpt: string }[] = [];
  try {
    const all = await getAllArticles();
    loreArticles = all.slice(0, 2).map(a => ({
      title: a.frontmatter.title,
      excerpt: a.excerpt ?? '',
    }));
  } catch {
    loreArticles = [
      { title: 'GRIND FIGHTER WORLD', excerpt: 'Neon-soaked megacities where gladiatorial augmentation decides everything.' },
      { title: 'STAR WYRMS WORLD', excerpt: 'The fractured alliance races across a dying galaxy to tame the Wyrms.' },
    ];
  }

  return (
    <>
      <style>{`
        /* ── Universe Panel ─────────────────────────── */
        .up-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 28px 24px 20px;
          overflow: hidden;
          position: relative;
          z-index: 5;
          opacity: 0;
          animation: up-fadein 0.6s ease 0.4s both;
        }
        @keyframes up-fadein {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Logo ───────────────────────────────────── */
        .up-logo {
          font-family: var(--font-orbitron), sans-serif;
          font-weight: 900;
          font-size: clamp(1.7rem, 3vw, 2.6rem);
          color: #ffffff;
          letter-spacing: 0.12em;
          line-height: 1;
          margin: 0 0 10px;
          position: relative;
          animation: logo-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes logo-in {
          from { letter-spacing: 0.4em; filter: blur(8px); opacity: 0; }
          to   { letter-spacing: 0.12em; filter: blur(0); opacity: 1; }
        }
        .up-logo::before, .up-logo::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          font-family: inherit; font-size: inherit;
          font-weight: inherit; letter-spacing: inherit;
          color: #fff;
          animation: glitch-fire 7s step-end infinite;
          animation-delay: 5s;
        }
        .up-logo::before {
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          transform: translateX(-3px);
          opacity: 0.7; color: #4fc3f7; mix-blend-mode: screen;
          animation-duration: 7s; animation-delay: 5.1s;
        }
        .up-logo::after {
          clip-path: polygon(0 60%, 100% 60%, 100% 75%, 0 75%);
          transform: translateX(3px);
          opacity: 0.5; color: #ff8c42; mix-blend-mode: screen;
          animation-duration: 7.3s; animation-delay: 5s;
        }
        @keyframes glitch-fire {
          0%, 92%, 94%, 96%, 100% { opacity: 0; transform: translateX(0); }
          93% { opacity: 1; transform: translateX(-4px); }
          95% { opacity: 1; transform: translateX(4px); }
        }

        /* ── Tagline ────────────────────────────────── */
        .up-tagline {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 11px;
          line-height: 1.7;
          color: rgba(232,232,232,0.5);
          margin: 0 0 16px;
        }

        /* ── Year Block ─────────────────────────────── */
        .up-year-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 16px;
          position: relative;
        }
        .up-year-slashes {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 1.1rem;
          color: rgba(232,232,232,0.35);
          letter-spacing: -0.05em;
        }
        .up-year-num {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 1.5rem;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: 0.06em;
        }
        .up-year-bracket {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }
        .up-year-bracket-top {
          width: 20px;
          height: 10px;
          border-top: 1px solid rgba(232,232,232,0.5);
          border-right: 1px solid rgba(232,232,232,0.5);
        }
        .up-year-blink {
          width: 6px;
          height: 6px;
          background: rgba(232,232,232,0.5);
          animation: hf-blink-step 1.6s step-end infinite;
        }
        .up-year-bracket-bot {
          width: 20px;
          height: 10px;
          border-bottom: 1px solid rgba(232,232,232,0.5);
          border-right: 1px solid rgba(232,232,232,0.5);
        }
        @keyframes hf-blink-step {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ── Section Label ──────────────────────────── */
        .up-section-label {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(232,232,232,0.35);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        /* ── Star Map Block ─────────────────────────── */
        .up-starmap-wrap {
          position: relative;
          height: 170px;
          flex-shrink: 0;
          margin-bottom: 16px;
          border: 1px solid rgba(232,232,232,0.1);
          background: rgba(0,0,0,0.25);
          overflow: hidden;
        }
        .up-starmap-bracket {
          position: absolute;
          pointer-events: none;
          z-index: 2;
        }
        .up-starmap-bracket.tl { top: -1px; left: -1px; width: 18px; height: 18px; border-top: 1px solid rgba(232,232,232,0.5); border-left: 1px solid rgba(232,232,232,0.5); }
        .up-starmap-bracket.tr { top: -1px; right: -1px; width: 18px; height: 18px; border-top: 1px solid rgba(232,232,232,0.5); border-right: 1px solid rgba(232,232,232,0.5); }
        .up-starmap-bracket.bl { bottom: -1px; left: -1px; width: 18px; height: 18px; border-bottom: 1px solid rgba(232,232,232,0.5); border-left: 1px solid rgba(232,232,232,0.5); }
        .up-starmap-bracket.br { bottom: -1px; right: -1px; width: 18px; height: 18px; border-bottom: 1px solid rgba(232,232,232,0.5); border-right: 1px solid rgba(232,232,232,0.5); }

        /* ── World Building (articles) ──────────────── */
        .up-articles-wrap {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .up-article-row {
          display: grid;
          grid-template-columns: 1fr 32px;
          border: 1px solid rgba(232,232,232,0.1);
          background: rgba(255,255,255,0.02);
          min-height: 44px;
        }
        .up-article-content {
          padding: 7px 10px;
          border-left: 2px solid rgba(232,232,232,0.25);
        }
        .up-article-title {
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          color: rgba(232,232,232,0.8);
          line-height: 1.4;
          margin: 0;
        }
        .up-article-hatch {
          background: repeating-linear-gradient(
            45deg,
            transparent 0px,
            transparent 3px,
            rgba(255,255,255,0.07) 3px,
            rgba(255,255,255,0.07) 4px
          );
          border-left: 1px solid rgba(232,232,232,0.1);
        }

        /* ── Nav Links ──────────────────────────────── */
        .up-nav-block {
          margin-bottom: 16px;
        }
        .up-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 8px 0;
          border-bottom: 1px solid rgba(232,232,232,0.08);
          text-decoration: none;
          font-family: var(--font-mono-nmc), monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(232,232,232,0.4);
          text-transform: uppercase;
          border-radius: 0;
          transition: color 0.2s, border-color 0.2s, padding-left 0.2s;
        }
        .up-nav-link:hover {
          color: rgba(232,232,232,0.9);
          border-color: rgba(232,232,232,0.35);
          padding-left: 6px;
        }
        .up-nav-arrow { color: rgba(232,232,232,0.2); transition: color 0.2s; }
        .up-nav-link:hover .up-nav-arrow { color: rgba(232,232,232,0.8); }

        /* ── LORE bottom block ──────────────────────── */
        .up-lore-block {
          margin-top: auto;
          padding-top: 8px;
          position: relative;
        }
        .up-lore-title {
          font-family: var(--font-orbitron), sans-serif;
          font-size: 1.8rem;
          font-weight: 900;
          color: rgba(232,232,232,0.15);
          letter-spacing: 0.15em;
          margin: 0 0 4px;
          line-height: 1;
        }
        .up-lore-bracket-bl {
          position: absolute;
          bottom: 0; right: 0;
          width: 20px; height: 20px;
          border-bottom: 1px solid rgba(232,232,232,0.3);
          border-right: 1px solid rgba(232,232,232,0.3);
        }
        .up-progress-bar-wrap {
          height: 2px;
          background: rgba(232,232,232,0.06);
          overflow: hidden;
          margin-top: 6px;
        }
        .up-progress-bar-fill {
          height: 100%;
          background: rgba(232,232,232,0.3);
          animation: up-progress 2s cubic-bezier(0.4, 0, 0.2, 1) both;
          animation-delay: 1.2s;
          width: 0%;
        }
        @keyframes up-progress {
          from { width: 0%; }
          to   { width: 60%; }
        }

        /* ── Mobile ─────────────────────────────────── */
        @media (max-width: 767px) {
          .up-panel { padding: 20px 16px; overflow: visible; height: auto; }
          .up-starmap-wrap { height: 140px; }
          .up-nav-block { display: flex; overflow-x: auto; gap: 0; }
          .up-nav-link { min-width: 120px; border-bottom: none; border-right: 1px solid rgba(232,232,232,0.08); padding: 8px 12px; }
          .up-nav-link:last-child { border-right: none; }
          .up-lore-block { margin-top: 16px; }
        }
      `}</style>

      <div className="up-panel">

        {/* ── Logo ──────────────────────────────────── */}
        <h1 className="up-logo" data-text="NEURONOMICON">NEURONOMICON</h1>
        <p className="up-tagline">
          Humanity built artificial gods to conquer the stars.<br />
          They never explained why.
        </p>

        {/* ── Year Block ────────────────────────────── */}
        <div className="up-year-row">
          <span className="up-year-slashes">// </span>
          <span className="up-year-num">2234</span>
          <div className="up-year-bracket">
            <div className="up-year-bracket-top" />
            <div className="up-year-blink" />
            <div className="up-year-bracket-bot" />
          </div>
        </div>

        {/* ── Star Map ──────────────────────────────── */}
        <p className="up-section-label">STAR MAP &gt;&gt;</p>
        <div className="up-starmap-wrap">
          <div className="up-starmap-bracket tl" />
          <div className="up-starmap-bracket tr" />
          <div className="up-starmap-bracket bl" />
          <div className="up-starmap-bracket br" />
          <StarMapGlobeClient />
        </div>

        {/* ── World Building ────────────────────────── */}
        <p className="up-section-label">WORLD BUILDING &gt;&gt;</p>
        <div className="up-articles-wrap">
          {loreArticles.map(article => (
            <div className="up-article-row" key={article.title}>
              <div className="up-article-content">
                <p className="up-article-title">{article.title}</p>
              </div>
              <div className="up-article-hatch" />
            </div>
          ))}
        </div>

        {/* ── Nav Links ─────────────────────────────── */}
        <div className="up-nav-block">
          <a href="/wiki" className="up-nav-link">
            <span className="up-nav-arrow">→</span>ARCHIVE
          </a>
          <a href="/grind-fighter/arena" className="up-nav-link">
            <span className="up-nav-arrow">→</span>ARENA
          </a>
          <a href="#" className="up-nav-link">
            <span className="up-nav-arrow">→</span>NEWSLETTER
          </a>
        </div>

        {/* ── LORE bottom ───────────────────────────── */}
        <div className="up-lore-block">
          <p className="up-lore-title">LORE</p>
          <div className="up-progress-bar-wrap">
            <div className="up-progress-bar-fill" />
          </div>
          <div className="up-lore-bracket-bl" />
        </div>

      </div>
    </>
  );
}
