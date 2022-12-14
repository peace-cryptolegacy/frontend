type Props = {
  fill?: `#${string}`;
  width?: number | string;
  height?: number | string;
};

const UILoading = ({ fill = '#5f4dff', width = 202, height = 202 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      margin: 'auto',
      background: '0 0',
      display: 'block',
      shapeRendering: 'auto',
    }}
    width={width}
    height={height}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="translate(80 50)">
      <circle r={6} fill={fill}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-1.1688311688311688s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-1.1688311688311688s"
        />
      </circle>
    </g>
    <g transform="rotate(36 -66.942 148.107)">
      <circle r={6} fill={fill} fillOpacity={0.9}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-1.0389610389610389s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-1.0389610389610389s"
        />
      </circle>
    </g>
    <g transform="rotate(72 -24.41 80.055)">
      <circle r={6} fill={fill} fillOpacity={0.8}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.9090909090909091s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-0.9090909090909091s"
        />
      </circle>
    </g>
    <g transform="rotate(108 -8.164 54.062)">
      <circle r={6} fill={fill} fillOpacity={0.7}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.7792207792207793s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-0.7792207792207793s"
        />
      </circle>
    </g>
    <g transform="rotate(144 1.877 37.997)">
      <circle r={6} fill={fill} fillOpacity={0.6}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.6493506493506493s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-0.6493506493506493s"
        />
      </circle>
    </g>
    <g transform="rotate(180 10 25)">
      <circle r={6} fill={fill} fillOpacity={0.5}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.5194805194805194s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-0.5194805194805194s"
        />
      </circle>
    </g>
    <g transform="rotate(-144 18.123 12.003)">
      <circle r={6} fill={fill} fillOpacity={0.4}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.38961038961038963s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-0.38961038961038963s"
        />
      </circle>
    </g>
    <g transform="rotate(-108 28.164 -4.062)">
      <circle r={6} fill={fill} fillOpacity={0.3}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.2597402597402597s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-0.2597402597402597s"
        />
      </circle>
    </g>
    <g transform="rotate(-72 44.41 -30.055)">
      <circle r={6} fill={fill} fillOpacity={0.2}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="-0.12987012987012986s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="-0.12987012987012986s"
        />
      </circle>
    </g>
    <g transform="rotate(-36 86.942 -98.107)">
      <circle r={6} fill={fill} fillOpacity={0.1}>
        <animateTransform
          attributeName="transform"
          type="scale"
          begin="0s"
          values="1.5 1.5;1 1"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          keyTimes="0;1"
          dur="1.2987012987012987s"
          repeatCount="indefinite"
          values="1;0"
          begin="0s"
        />
      </circle>
    </g>
  </svg>
);

export default UILoading;
