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

      <g data-signature-layer-id="grid" style={getLayerStyle("grid")}>
        <g id="layer-grid" fill="none">
          <path d="M120 600H840M120 120V600M840 120V600" stroke="#d7d0c4" strokeWidth="1" />
          <path
            d="M200 120V600M280 120V600M360 120V600M440 120V600M520 120V600M600 120V600M680 120V600M760 120V600"
            stroke="#d7d0c4"
            strokeOpacity=".42"
            strokeWidth="1"
          />
          <path
            d="M120 180H840M120 240H840M120 300H840M120 360H840M120 420H840M120 480H840M120 540H840"
            stroke="#d7d0c4"
            strokeOpacity=".36"
            strokeWidth="1"
          />
          <path
            d="M280 120V600M520 120V600M760 120V600M120 240H840M120 420H840"
            stroke="#c7bdad"
            strokeOpacity=".7"
            strokeWidth="1.25"
          />
          <circle cx="280" cy="240" fill="#8a8174" r="3" />
          <circle cx="520" cy="420" fill="#8a8174" r="3" />
          <circle cx="760" cy="240" fill="#8a8174" r="3" />
        </g>
      </g>

      <g data-signature-layer-id="site" style={getLayerStyle("site")}>
        <g id="layer-site" fill="none">
          <path
            d="M190 168H792V556H190Z"
            data-signature-draw
            stroke="#6f675d"
            strokeWidth="2"
          />
          <path
            d="M230 206H746V520H230Z"
            data-signature-draw
            stroke="#8a8174"
            strokeDasharray="9 12"
            strokeOpacity=".72"
            strokeWidth="1.5"
          />
          <path
            d="M206 526C248 492 298 508 348 474C398 440 458 462 516 420C574 378 636 394 718 338"
            data-signature-draw
            stroke="#8a8174"
            strokeDasharray="5 13"
            strokeOpacity=".72"
            strokeWidth="1.35"
          />
          <path
            d="M752 148L782 196M782 196L734 190"
            data-signature-draw
            stroke="#ba9c66"
            strokeLinecap="round"
            strokeWidth="2"
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
            strokeWidth="2"
          />
          <circle cx="332" cy="472" fill="#ba9c66" r="4" />
          <circle cx="516" cy="420" fill="#ba9c66" r="4" />
        </g>
      </g>

      <g data-signature-layer-id="envelope" style={getLayerStyle("envelope")}>
        <g id="layer-envelope">
          <path
            d="M250 198H730V542H250Z"
            data-signature-draw
            fill="#f4f1eb"
            fillOpacity=".34"
            stroke="#6f675d"
            strokeWidth="2"
          />
          <path
            d="M370 282H610V456H370Z"
            data-signature-draw
            fill="#f4f1eb"
            fillOpacity=".88"
            stroke="#6f675d"
            strokeWidth="2"
          />
          <path
            d="M250 198H730V282H610V456H730V542H250V456H370V282H250Z"
            fill="#8a8174"
            fillOpacity=".09"
          />
          <path
            d="M250 282H370M610 282H730M250 456H370M610 456H730"
            data-signature-draw
            stroke="#6f675d"
            strokeWidth="2"
          />
        </g>
      </g>

      <g data-signature-layer-id="structure" style={getLayerStyle("structure")}>
        <g id="layer-structure" fill="none" stroke="#1f1d1a" strokeWidth="2">
          <path d="M270 220H710V520H270Z" data-signature-draw />
          <path d="M390 300H590V438H390Z" data-signature-draw />
          <path d="M270 300H390M590 300H710M270 438H390M590 438H710" data-signature-draw />
          <path d="M390 220V300M590 220V300M390 438V520M590 438V520" data-signature-draw />
          <path d="M322 220V520M658 220V520" data-signature-draw strokeOpacity=".72" />
          <circle cx="322" cy="300" fill="#1f1d1a" r="8" stroke="none" />
          <circle cx="658" cy="300" fill="#1f1d1a" r="8" stroke="none" />
          <circle cx="322" cy="438" fill="#1f1d1a" r="8" stroke="none" />
          <circle cx="658" cy="438" fill="#1f1d1a" r="8" stroke="none" />
        </g>
      </g>

      <g data-signature-layer-id="materials" style={getLayerStyle("materials")}>
        <g id="layer-materials">
          <path d="M250 198H730V282H250Z" fill="#8a8174" fillOpacity=".12" />
          <path d="M250 456H730V542H250Z" fill="#8a8174" fillOpacity=".14" />
          <path d="M250 282H370V456H250Z" fill="#1f1d1a" fillOpacity=".055" />
          <path d="M610 282H730V456H610Z" fill="#1f1d1a" fillOpacity=".055" />
          <path
            d="M278 226H700M278 248H700M278 484H700M278 506H700"
            data-signature-draw
            stroke="#8a8174"
            strokeOpacity=".42"
            strokeWidth="1"
          />
          <path
            d="M280 306L348 374M280 350L348 418M632 306L700 374M632 350L700 418"
            data-signature-draw
            stroke="#8a8174"
            strokeOpacity=".32"
            strokeWidth="1"
          />
          <path
            d="M390 304H590M390 434H590"
            data-signature-draw
            stroke="#ba9c66"
            strokeOpacity=".45"
            strokeWidth="2"
          />
        </g>
      </g>

      <g data-signature-layer-id="light" style={getLayerStyle("light")}>
        <g id="layer-light">
          <path d="M720 128L430 456H730V282Z" fill="#ba9c66" fillOpacity=".18" />
          <path
            d="M710 154L590 282M682 184L610 300M650 220L610 338"
            data-signature-draw
            stroke="#ba9c66"
            strokeLinecap="round"
            strokeOpacity=".62"
            strokeWidth="2"
          />
          <path d="M370 456L610 456L690 542H450Z" fill="#1f1d1a" fillOpacity=".075" />
          <path d="M390 282L250 198" stroke="#6f675d" strokeOpacity=".18" strokeWidth="18" />
        </g>
      </g>

      <g data-signature-layer-id="atmosphere" style={getLayerStyle("atmosphere")}>
        <g id="layer-atmosphere">
          <rect fill="#f4f1eb" fillOpacity=".42" height="720" width="960" />
          <path
            d="M250 198H730V542H250Z"
            fill="#8a8174"
            fillOpacity=".055"
            stroke="#6f675d"
            strokeOpacity=".78"
            strokeWidth="2"
          />
          <path
            d="M370 282H610V456H370Z"
            fill="#f4f1eb"
            fillOpacity=".96"
            stroke="#6f675d"
            strokeOpacity=".78"
            strokeWidth="2"
          />
          <path d="M370 282H610V456H370Z" fill="#ba9c66" fillOpacity=".08" />
          <circle cx="610" cy="282" fill="#ba9c66" fillOpacity=".18" r="92" />
          <path d="M278 226H700M278 506H700" stroke="#8a8174" strokeOpacity=".28" strokeWidth="1" />
          <path d="M390 304H590M390 434H590" stroke="#ba9c66" strokeOpacity=".36" strokeWidth="2" />
          <path d="M250 542H730" stroke="#1f1d1a" strokeOpacity=".54" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}

