import clsx from 'clsx';
import React from 'react';

type Props = {
  progress?: number;
  strokeWidth?: number;
  ballStrokeWidth?: number;
  reduction?: number;
  transitionDuration?: number;
  transitionTimingFunction?:
    | 'ease'
    | 'linear'
    | 'ease-in'
    | 'ease-out'
    | 'ease-in-out';
  background?: string;
  hideBall?: boolean;
  hideValue?: boolean;
  gradient?: { stop: number; color: string }[];
  subtitle?: string;
  style?: React.CSSProperties;
  className?: string;
  suffix?: string;
  children?: React.ReactNode | React.ReactNode[];
};

const _Progress = ({
  progress = 80,
  strokeWidth = 8,
  ballStrokeWidth = 16,
  reduction = 0,
  transitionDuration = 0.5,
  transitionTimingFunction = 'ease',
  background = '#dde2e9',
  hideBall = true,
  hideValue = true,
  gradient = [
    { stop: 0, color: '#E21692' },
    { stop: 1, color: '#17C0F1' },
  ],
  subtitle = '',
  style,
  className,
  suffix = '%',
  children,
}: Props) => {
  progress = Math.round(progress * 100) / 100;
  const width = 200;
  const center = width / 2;
  const height = 200 || center + center * Math.cos(reduction * Math.PI);
  const [unique] = React.useState(() => Math.random().toString());
  const rotate = 90 + 180 * reduction;
  const r = center - strokeWidth / 2 - ballStrokeWidth / 2;
  const circumference = Math.PI * r * 2;
  const offset = (circumference * (100 - progress * (1 - reduction))) / 100;

  return (
    <>
      <div className={clsx('relative w-52', className)} style={style}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block w-full drop-shadow-lg"
        >
          <defs>
            <linearGradient
              id={'gradient' + unique}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              {gradient.map(({ stop, color }) => (
                <stop
                  key={stop}
                  offset={stop * 100 + (suffix || '')}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          </defs>
          {!hideValue && (
            <text
              x={center}
              y={center}
              textAnchor="middle"
              fontSize="30"
              fill="#3c3c3c"
            >
              {progress}%
            </text>
          )}
          <text
            x={center}
            y={center + (30 * 3) / 4}
            textAnchor="middle"
            fill="#9c9c9c"
          >
            {subtitle}
          </text>
          <circle
            transform={`rotate(${rotate} ${center} ${center})`}
            id="path"
            cx={center}
            cy={center}
            r={r}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * reduction}
            fill="none"
            stroke={background}
            strokeLinecap="round"
          ></circle>
          <circle
            style={{
              transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`,
            }}
            transform={`rotate(${rotate} ${center} ${center})`}
            id="path"
            cx={center}
            cy={center}
            r={r}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference}`}
            strokeDashoffset={offset}
            fill="none"
            stroke={`url(#gradient${unique})`}
            strokeLinecap="round"
          ></circle>
          {!hideBall && (
            <circle
              style={{
                transition: `stroke-dashoffset ${transitionDuration}s ${transitionTimingFunction}`,
              }}
              transform={`rotate(${rotate} ${center} ${center})`}
              id="path"
              cx={center}
              cy={center}
              r={r}
              strokeWidth={ballStrokeWidth}
              strokeDasharray={`1 ${circumference}`}
              strokeDashoffset={offset}
              fill="none"
              stroke={`url(#gradient${unique})`}
              strokeLinecap="round"
            ></circle>
          )}
        </svg>
        <div
          className={clsx(
            'absolute inset-0 top-1/2 left-1/2 h-[80%] w-[80%] translate-x-[-50%] translate-y-[-50%]',
            'rounded-full bg-purple-300'
          )}
        >
          <div className="flex h-full w-full flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export const CircleProgress = React.memo(_Progress);
CircleProgress.displayName = 'CircleProgress';

export default CircleProgress;
