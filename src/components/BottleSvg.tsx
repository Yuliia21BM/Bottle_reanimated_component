import React from "react";
import Svg, { Path, Rect, G, Defs, ClipPath } from "react-native-svg";
import { LIQUID_MIN_Y_POSITION, VIEWBOX_DIMENSION } from "../utils/constants";

export const BottleSvg = ({
  liquidHeight,
  height,
}: {
  liquidHeight: number;
  height?: number;
}) => (
  <Svg
    fill="#000000"
    height={height ?? LIQUID_MIN_Y_POSITION}
    width={height ?? LIQUID_MIN_Y_POSITION}
    id="Capa_1"
    viewBox={`0 0 ${VIEWBOX_DIMENSION} ${VIEWBOX_DIMENSION}`}
  >
    <Defs>
      <ClipPath id="bottleClipPath">
        <Path d="M287.5,0,6.5-2.8,6.5-6.5v-145c0-3.5-2.8-6.5-6.5-6.5H172.5z M272.5,15v55h-75V15H272.5z M337.5,432.5c0,12.407-10.094,22.5-22.5,22.5H155c-12.406,0-22.5-10.093-22.5-22.5V177.9 c0-39.791,23.158-76.081,59.136-92.9h86.729c35.978,16.82,59.136,53.11,59.136,92.9V432.5z" />
      </ClipPath>
    </Defs>

    <Rect
      x="118"
      y={VIEWBOX_DIMENSION - liquidHeight * VIEWBOX_DIMENSION}
      width="233"
      height={liquidHeight * VIEWBOX_DIMENSION}
      fill="#92DDC4"
      clipPath="url(#bottleClipPath)"
    />

    <G>
      <Path
        d="M165.107,172.5c-4.141,0-7.498,3.356-7.5,7.497l-0.071,180c-0.001,1.99,0.789,3.898,2.195,5.305 c1.407,1.407,3.315,2.198,5.305,2.198h139.928c4.141,0,7.498-3.355,7.5-7.497l0.072-150c0.002-4.142-3.354-7.501-7.496-7.503 c-0.002,0-0.003,0-0.004,0c-4.141,0-7.498,3.355-7.5,7.497L297.468,352.5H172.539l0.065-165h132.432c4.143,0,7.5-3.358,7.5-7.5 s-3.357-7.5-7.5-7.5H165.107z"
        fill="#66AA70"
        stroke="black"
        strokeWidth="1"
      />
    </G>
    <G>
      <Path
        d="M287.5,72.768V7.5c0-4.142-3.357-7.5-7.5-7.5h-90c-4.143,0-7.5,3.358-7.5,7.5v65.268c-39.643,19.823-65,60.558-65,105.132 v254.6c0,20.678,16.822,37.5,37.5,37.5h160c20.678,0,37.5-16.822,37.5-37.5V177.9C352.5,133.326,327.143,92.591,287.5,72.768z M272.5,15v55h-75V15H272.5z M337.5,432.5c0,12.407-10.094,22.5-22.5,22.5H155c-12.406,0-22.5-10.093-22.5-22.5V177.9c0-39.791,23.158-76.081,59.136-92.9h86.729 c35.978,16.82,59.136,53.11,59.136,92.9V432.5z"
        fill="#6FCF97"
        stroke="black"
        strokeWidth="1"
      />
    </G>
  </Svg>
);
