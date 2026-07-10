import type { LayerId } from "@/features/signature-experience/types";

interface SignatureDrawingProps {
  animated?: boolean;
  visibleLayerIds?: readonly LayerId[];
}

const allLayerIds: LayerId[] = [
  "grid",
  "site",
  "envelope",
  "structure",
  "materials",
  "light",
  "atmosphere",
];

export function SignatureDrawing({ animated = false, visibleLayerIds }: SignatureDrawingProps) {
  const visibleLayers = new Set<LayerId>(visibleLayerIds ?? allLayerIds);

  function getLayerStyle(id: LayerId) {
    if (animated) {
      return {
        opacity: id === "grid" ? 1 : 0,
      };
    }

    return {
      opacity: visibleLayers.has(id) ? 1 : 0,
    };
  }

  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 960 720"
    >
      <rect fill="#f4f1eb" height="720" width="960" />
      <defs>
        <pattern height="12" id="signature-stone-hatch" patternUnits="userSpaceOnUse" width="12">
          <path d="M0 12L12 0" stroke="#8a8174" strokeOpacity=".22" strokeWidth=".75" />
        </pattern>
        <pattern height="10" id="signature-timber-hatch" patternUnits="userSpaceOnUse" width="18">
          <path d="M0 3H18M0 8H18" stroke="#8a8174" strokeOpacity=".18" strokeWidth=".75" />
        </pattern>
      </defs>

      <g data-signature-layer-id="grid" style={getLayerStyle("grid")}>
        <g id="layer-grid" fill="none">
          <path d="M120 600H840M120 120V600M840 120V600" stroke="#d7d0c4" strokeWidth=".8" />
          <path
            d="M200 120V600M280 120V600M360 120V600M440 120V600M520 120V600M600 120V600M680 120V600M760 120V600"
            stroke="#d7d0c4"
            strokeOpacity=".34"
            strokeWidth=".7"
          />
          <path
            d="M120 180H840M120 240H840M120 300H840M120 360H840M120 420H840M120 480H840M120 540H840"
            stroke="#d7d0c4"
            strokeOpacity=".3"
            strokeWidth=".7"
          />
          <path
            d="M280 120V600M520 120V600M760 120V600M120 240H840M120 420H840"
            stroke="#c7bdad"
            strokeOpacity=".58"
            strokeWidth=".9"
          />
          <circle cx="280" cy="240" fill="#8a8174" r="2" />
          <circle cx="520" cy="420" fill="#8a8174" r="2" />
          <circle cx="760" cy="240" fill="#8a8174" r="2" />
        </g>
      </g>

      <g data-signature-layer-id="site" style={getLayerStyle("site")}>
        <g id="layer-site" fill="none">
          <path
            d="M190 168H792V556H190Z"
            data-signature-draw
            stroke="#6f675d"
            strokeWidth="1.35"
          />
          <path
            d="M230 206H746V520H230Z"
            data-signature-draw
            stroke="#8a8174"
            strokeDasharray="9 12"
            strokeOpacity=".58"
            strokeWidth="1"
          />
          <path
            d="M206 526C248 492 298 508 348 474C398 440 458 462 516 420C574 378 636 394 718 338"
            data-signature-draw
            stroke="#8a8174"
            strokeDasharray="5 13"
            strokeOpacity=".58"
            strokeWidth=".95"
          />
          <path
            d="M752 148L782 196M782 196L734 190"
            data-signature-draw
            stroke="#ba9c66"
            strokeLinecap="round"
            strokeWidth="1.25"
          />
          <text
            fill="#8a8174"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="20"
            letterSpacing="4"
            x="718"
            y="140"
          >
            N
          </text>
          <path
            d="M146 390C186 366 218 370 252 346M710 568C746 538 788 536 824 500"
            data-signature-draw
            stroke="#c7bdad"
            strokeLinecap="round"
            strokeWidth="1.2"
          />
          <circle cx="332" cy="472" fill="#ba9c66" r="2.8" />
          <circle cx="516" cy="420" fill="#ba9c66" r="2.8" />
        </g>
      </g>

      <g data-signature-layer-id="envelope" style={getLayerStyle("envelope")}>
        <g id="layer-envelope">
          <path
            d="M250 198H730V542H250Z"
            data-signature-draw
            fill="#f4f1eb"
            fillOpacity=".26"
            stroke="#6f675d"
            strokeWidth="1.35"
          />
          <path
            d="M370 282H610V456H370Z"
            data-signature-draw
            fill="#f4f1eb"
            fillOpacity=".88"
            stroke="#6f675d"
            strokeWidth="1.35"
          />
          <path
            d="M250 198H730V282H610V456H730V542H250V456H370V282H250Z"
            fill="#8a8174"
            fillOpacity=".065"
          />
          <path
            d="M250 282H370M610 282H730M250 456H370M610 456H730"
            data-signature-draw
            stroke="#6f675d"
            strokeWidth="1.35"
          />
        </g>
      </g>

      <g data-signature-layer-id="structure" style={getLayerStyle("structure")}>
        <g id="layer-structure" fill="none" stroke="#1f1d1a" strokeLinejoin="round" strokeWidth="1.45">
          <path d="M270 220H710V520H270Z" data-signature-draw />
          <path d="M390 300H590V438H390Z" data-signature-draw />
          <path d="M270 300H390M590 300H710M270 438H390M590 438H710" data-signature-draw />
          <path d="M390 220V300M590 220V300M390 438V520M590 438V520" data-signature-draw />
          <path d="M322 220V520M658 220V520" data-signature-draw strokeOpacity=".72" />
          <path d="M306 300H338M322 284V316M642 300H674M658 284V316M306 438H338M322 422V454M642 438H674M658 422V454" data-signature-draw strokeOpacity=".68" strokeWidth=".9" />
        </g>
      </g>

      <g data-signature-layer-id="materials" style={getLayerStyle("materials")}>
        <g id="layer-materials">
          <path d="M250 198H730V282H250Z" fill="url(#signature-timber-hatch)" />
          <path d="M250 456H730V542H250Z" fill="url(#signature-stone-hatch)" />
          <path d="M250 282H370V456H250Z" fill="#1f1d1a" fillOpacity=".04" />
          <path d="M610 282H730V456H610Z" fill="#1f1d1a" fillOpacity=".04" />
          <path
            d="M278 226H700M278 248H700M278 484H700M278 506H700"
            data-signature-draw
            stroke="#8a8174"
            strokeOpacity=".34"
            strokeWidth=".8"
          />
          <path
            d="M280 306L348 374M280 350L348 418M632 306L700 374M632 350L700 418"
            data-signature-draw
            stroke="#8a8174"
            strokeOpacity=".26"
            strokeWidth=".8"
          />
          <path
            d="M390 304H590M390 434H590"
            data-signature-draw
            stroke="#ba9c66"
            strokeOpacity=".34"
            strokeWidth="1.2"
          />
        </g>
      </g>

      <g data-signature-layer-id="light" style={getLayerStyle("light")}>
        <g id="layer-light">
          <path d="M726 132L454 456H730V278Z" fill="#ba9c66" fillOpacity=".105" />
          <path d="M726 132L590 456H704Z" fill="#f4f1eb" fillOpacity=".2" />
          <path
            d="M710 154L590 282M684 188L610 306M652 224L610 340"
            data-signature-draw
            stroke="#ba9c66"
            strokeLinecap="round"
            strokeOpacity=".42"
            strokeWidth="1.25"
          />
          <path d="M370 456L610 456L684 542H450Z" fill="#1f1d1a" fillOpacity=".045" />
          <path d="M390 282L250 198" stroke="#6f675d" strokeOpacity=".1" strokeWidth="12" />
        </g>
      </g>

      <g data-signature-layer-id="atmosphere" style={getLayerStyle("atmosphere")}>
        <g id="layer-atmosphere">
          <rect fill="#f4f1eb" fillOpacity=".34" height="720" width="960" />
          <path
            d="M250 198H730V542H250Z"
            fill="#8a8174"
            fillOpacity=".038"
            stroke="#6f675d"
            strokeOpacity=".62"
            strokeWidth="1.25"
          />
          <path
            d="M370 282H610V456H370Z"
            fill="#f4f1eb"
            fillOpacity=".96"
            stroke="#6f675d"
            strokeOpacity=".58"
            strokeWidth="1.25"
          />
          <path d="M370 282H610V456H370Z" fill="#ba9c66" fillOpacity=".055" />
          <circle cx="608" cy="286" fill="#ba9c66" fillOpacity=".105" r="108" />
          <path d="M278 226H700M278 506H700" stroke="#8a8174" strokeOpacity=".22" strokeWidth=".8" />
          <path d="M390 304H590M390 434H590" stroke="#ba9c66" strokeOpacity=".3" strokeWidth="1.15" />
          <path d="M250 542H730" stroke="#1f1d1a" strokeOpacity=".38" strokeWidth="1.35" />
          <path d="M370 456C428 472 552 472 610 456" fill="none" stroke="#8a8174" strokeOpacity=".24" strokeWidth=".9" />
        </g>
      </g>
    </svg>
  );
}
