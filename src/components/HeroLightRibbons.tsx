"use client";

import type { HeroMotionQuality } from "@/lib/heroMotionQuality";
import styles from "./HeroLightRibbons.module.css";

type HeroLightRibbonsProps = {
  paused?: boolean;
  quality?: HeroMotionQuality;
};

export function HeroLightRibbons({ paused = false, quality = "full" }: HeroLightRibbonsProps) {
  const performance = quality === "performance";
  const balanced = quality !== "full";
  const blurFilter = performance ? "none" : balanced ? "url(#heroRibbonBlurLite)" : "url(#heroRibbonBlur)";
  const glowFilter = performance ? "none" : balanced ? "url(#heroRibbonGlowLite)" : "url(#heroRibbonGlow)";
  const hotGlowFilter = performance ? "none" : balanced ? "url(#heroRibbonHotGlowLite)" : "url(#heroRibbonHotGlow)";

  return (
    <div
      className={`${styles.background} ${balanced ? styles.balanced : ""} ${performance ? styles.performance : ""} ${paused ? styles.paused : ""}`}
      aria-hidden="true"
    >
      <div className={styles.baseWash} />
      <div className={`${styles.dotField} ${styles.dotFieldTop}`} />
      <div className={`${styles.dotField} ${styles.dotFieldBottom}`} />
      <div className={`${styles.dotField} ${styles.dotFieldRight}`} />
      <div className={styles.ambientSweep} />

      <svg
        className={styles.ribbonSvg}
        viewBox="0 0 1800 980"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="heroRibbonBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d8e7ff" stopOpacity="0" />
            <stop offset="0.18" stopColor="#b9d5ff" stopOpacity="0.36" />
            <stop offset="0.49" stopColor="#2d74eb" stopOpacity="0.9" />
            <stop offset="0.72" stopColor="#0f5fe0" stopOpacity="0.96" />
            <stop offset="1" stopColor="#b9d9ff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroRibbonSoft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#dbe9ff" stopOpacity="0" />
            <stop offset="0.34" stopColor="#c3dbff" stopOpacity="0.42" />
            <stop offset="0.67" stopColor="#8cb9ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroRibbonHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.46" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="0.58" stopColor="#7cc4ff" stopOpacity="0.86" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroRibbonPale" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f8fbff" stopOpacity="0" />
            <stop offset="0.2" stopColor="#d6e7ff" stopOpacity="0.56" />
            <stop offset="0.5" stopColor="#a9ccff" stopOpacity="0.54" />
            <stop offset="0.76" stopColor="#eaf3ff" stopOpacity="0.46" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="heroRibbonBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="heroRibbonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroRibbonHotGlow" x="-90%" y="-90%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroRibbonBlurLite" x="-18%" y="-18%" width="136%" height="136%">
            <feGaussianBlur stdDeviation="4.25" />
          </filter>
          <filter id="heroRibbonGlowLite" x="-28%" y="-28%" width="156%" height="156%">
            <feGaussianBlur stdDeviation="1.7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="heroRibbonHotGlowLite" x="-36%" y="-36%" width="172%" height="172%">
            <feGaussianBlur stdDeviation="2.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className={styles.topRibbonSoft} fill="none" strokeLinecap="round">
          <path
            d="M 285 -65 C 620 20 805 68 1030 182 C 1284 311 1460 355 1816 292"
            stroke="url(#heroRibbonSoft)"
            strokeWidth="78"
            opacity="0.42"
            filter={blurFilter}
          />
          <path
            d="M 392 -42 C 740 41 861 108 1084 221 C 1289 324 1478 361 1808 314"
            stroke="url(#heroRibbonSoft)"
            strokeWidth="26"
            opacity="0.62"
          />
          <path
            d="M 662 -98 C 948 4 1138 111 1325 215 C 1496 310 1647 324 1835 276"
            stroke="url(#heroRibbonBlue)"
            strokeWidth="28"
            opacity="0.86"
            filter={glowFilter}
          />
          <path
            d="M 746 -83 C 1018 24 1185 133 1352 222 C 1517 310 1663 315 1834 271"
            stroke="#0f66ea"
            strokeWidth="7"
            opacity="0.82"
          />
          <path
            d="M 862 -72 C 1112 39 1241 154 1409 238 C 1550 309 1679 309 1818 275"
            stroke="url(#heroRibbonHighlight)"
            strokeWidth="4"
            opacity="0.96"
          />
        </g>

        <g className={styles.topRibbonFine} fill="none" strokeLinecap="round">
          <path
            d="M 122 -42 C 482 28 720 98 924 214 C 1105 317 1297 383 1574 371 C 1686 366 1777 340 1860 309"
            stroke="url(#heroRibbonPale)"
            strokeWidth="14"
            opacity="0.52"
          />
          <path
            d="M 450 -88 C 730 -12 961 80 1151 189 C 1362 310 1514 357 1810 332"
            stroke="#7db2ff"
            strokeWidth="2.2"
            opacity="0.48"
          />
        </g>

        <g className={styles.middleRibbon} fill="none" strokeLinecap="round">
          <path
            d="M -145 184 C 185 268 375 353 548 497 C 690 615 857 668 1116 661 C 1357 655 1550 569 1825 464"
            stroke="url(#heroRibbonSoft)"
            strokeWidth="28"
            opacity="0.26"
          />
          <path
            d="M -136 206 C 161 286 364 376 534 514 C 710 657 891 694 1139 680 C 1383 666 1580 582 1833 490"
            stroke="#b4d2ff"
            strokeWidth="4"
            opacity="0.4"
          />
        </g>

        <g className={styles.middleRibbonFine} fill="none" strokeLinecap="round">
          <path
            d="M -178 116 C 159 196 347 304 526 447 C 709 594 915 628 1138 603 C 1378 576 1577 489 1870 393"
            stroke="url(#heroRibbonPale)"
            strokeWidth="10"
            opacity="0.32"
          />
          <path
            d="M -126 291 C 172 365 351 437 519 558 C 701 689 923 725 1177 697 C 1424 670 1612 596 1860 526"
            stroke="#d4e5ff"
            strokeWidth="2.5"
            opacity="0.58"
          />
        </g>

        <g className={styles.bottomRibbon} fill="none" strokeLinecap="round">
          <path
            d="M -126 650 C 213 704 376 833 596 877 C 834 925 1053 874 1260 818 C 1470 761 1654 704 1867 705"
            stroke="url(#heroRibbonSoft)"
            strokeWidth="92"
            opacity="0.44"
            filter={blurFilter}
          />
          <path
            d="M -118 674 C 181 728 386 830 598 870 C 810 910 1038 874 1248 821 C 1462 767 1664 716 1852 716"
            stroke="url(#heroRibbonBlue)"
            strokeWidth="28"
            opacity="0.91"
            filter={glowFilter}
          />
          <path
            d="M -106 686 C 191 741 390 830 596 866 C 818 905 1020 869 1238 816 C 1469 760 1650 720 1842 719"
            stroke="#0b63e8"
            strokeWidth="8"
            opacity="0.84"
          />
          <path
            d="M -98 674 C 206 724 393 803 604 841 C 839 884 1034 850 1249 796 C 1460 743 1644 701 1832 702"
            stroke="url(#heroRibbonHighlight)"
            strokeWidth="4"
            opacity="0.9"
          />
        </g>

        <g className={styles.bottomRibbonFine} fill="none" strokeLinecap="round">
          <path
            d="M -178 604 C 149 647 347 742 574 801 C 810 862 1038 824 1267 766 C 1494 708 1680 672 1890 685"
            stroke="url(#heroRibbonPale)"
            strokeWidth="13"
            opacity="0.5"
          />
          <path
            d="M -145 735 C 177 785 371 873 605 908 C 856 946 1068 893 1286 841 C 1491 792 1691 761 1883 773"
            stroke="#7fb7ff"
            strokeWidth="2.6"
            opacity="0.48"
          />
        </g>

        <g className={styles.shimmerTop} fill="none" strokeLinecap="round">
          <path
            d="M 662 -98 C 948 4 1138 111 1325 215 C 1496 310 1647 324 1835 276"
            pathLength="1"
            stroke="#ffffff"
            strokeWidth="5"
            strokeDasharray="0.035 0.965"
            opacity="0.95"
            filter={glowFilter}
          />
        </g>
        <g className={styles.shimmerTopAlt} fill="none" strokeLinecap="round">
          <path
            d="M 122 -42 C 482 28 720 98 924 214 C 1105 317 1297 383 1574 371 C 1686 366 1777 340 1860 309"
            pathLength="1"
            stroke="#dff0ff"
            strokeWidth="3.2"
            strokeDasharray="0.022 0.978"
            opacity="0.88"
            filter={hotGlowFilter}
          />
        </g>
        <g className={styles.shimmerMiddle} fill="none" strokeLinecap="round">
          <path
            d="M -145 184 C 185 268 375 353 548 497 C 690 615 857 668 1116 661 C 1357 655 1550 569 1825 464"
            pathLength="1"
            stroke="#ffffff"
            strokeWidth="3.8"
            strokeDasharray="0.018 0.982"
            opacity="0.82"
            filter={glowFilter}
          />
        </g>
        <g className={styles.shimmerBottom} fill="none" strokeLinecap="round">
          <path
            d="M -118 674 C 181 728 386 830 598 870 C 810 910 1038 874 1248 821 C 1462 767 1664 716 1852 716"
            pathLength="1"
            stroke="#ffffff"
            strokeWidth="5"
            strokeDasharray="0.03 0.97"
            opacity="0.96"
            filter={glowFilter}
          />
        </g>
        <g className={styles.shimmerBottomAlt} fill="none" strokeLinecap="round">
          <path
            d="M -178 604 C 149 647 347 742 574 801 C 810 862 1038 824 1267 766 C 1494 708 1680 672 1890 685"
            pathLength="1"
            stroke="#b8dcff"
            strokeWidth="3.2"
            strokeDasharray="0.02 0.98"
            opacity="0.92"
            filter={hotGlowFilter}
          />
        </g>
      </svg>

      <span className={`${styles.glint} ${styles.glintOne}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.glint} ${styles.glintTwo} ${styles.glintBlinkA}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.glint} ${styles.glintThree}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.glint} ${styles.glintFour} ${styles.glintBlinkB}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.glint} ${styles.glintFive} ${styles.glintBlinkA}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.glint} ${styles.glintSix}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.glint} ${styles.glintSeven} ${styles.glintBlinkC}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.glint} ${styles.glintEight} ${styles.glintBlinkB}`}><span className={styles.glintCore} /></span>
      <span className={`${styles.microFlash} ${styles.microFlashOne}`} />
      <span className={`${styles.microFlash} ${styles.microFlashTwo}`} />
      <span className={`${styles.microFlash} ${styles.microFlashThree}`} />
      <span className={`${styles.microFlash} ${styles.microFlashFour}`} />
      <div className={styles.centerWash} />
      <div className={styles.edgeWash} />
    </div>
  );
}
