import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, Pattern, Circle, Rect, Path } from 'react-native-svg';

interface ModernPatternProps {
  opacity?: number;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  type?: 'dots' | 'grid' | 'circles' | 'waves' | 'triangles' | 'diamonds';
}

export const ModernPattern: React.FC<ModernPatternProps> = ({
  opacity = 0.08,
  size = 'medium',
  color = 'rgba(59, 130, 246, 0.4)',
  type = 'dots'
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      spacing: 20,
      dotSize: 1,
      viewBox: '0 0 300 600',
    },
    medium: {
      spacing: 30,
      dotSize: 1.5,
      viewBox: '0 0 400 800',
    },
    large: {
      spacing: 40,
      dotSize: 2,
      viewBox: '0 0 500 1000',
    },
  };

  const config = sizeConfig[size];

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity,
    }}>
      <Svg width="100%" height="100%" viewBox={config.viewBox}>
        <Defs>
          {type === 'dots' && (
            <Pattern
              id="dotPattern"
              x="0"
              y="0"
              width={config.spacing}
              height={config.spacing}
              patternUnits="userSpaceOnUse"
            >
              <Circle
                cx={config.spacing / 2}
                cy={config.spacing / 2}
                r={config.dotSize}
                fill={color}
              />
            </Pattern>
          )}

          {type === 'grid' && (
            <Pattern
              id="gridPattern"
              x="0"
              y="0"
              width={config.spacing}
              height={config.spacing}
              patternUnits="userSpaceOnUse"
            >
              <Rect
                x="0"
                y="0"
                width={config.spacing}
                height={config.spacing}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
              />
            </Pattern>
          )}

          {type === 'circles' && (
            <Pattern
              id="circlePattern"
              x="0"
              y="0"
              width={config.spacing}
              height={config.spacing}
              patternUnits="userSpaceOnUse"
            >
              <Circle
                cx={config.spacing / 2}
                cy={config.spacing / 2}
                r={config.dotSize * 2}
                fill="none"
                stroke={color}
                strokeWidth="0.5"
              />
            </Pattern>
          )}

          {type === 'waves' && (
            <Pattern
              id="wavePattern"
              x="0"
              y="0"
              width={config.spacing * 2}
              height={config.spacing}
              patternUnits="userSpaceOnUse"
            >
              <Path
                d={`M0,${config.spacing/2} Q${config.spacing/2},0 ${config.spacing},${config.spacing/2} Q${config.spacing*1.5},${config.spacing} ${config.spacing*2},${config.spacing/2}`}
                fill="none"
                stroke={color}
                strokeWidth="0.8"
              />
            </Pattern>
          )}

          {type === 'triangles' && (
            <Pattern
              id="trianglePattern"
              x="0"
              y="0"
              width={config.spacing}
              height={config.spacing}
              patternUnits="userSpaceOnUse"
            >
              <Path
                d={`M${config.spacing/2},0 L${config.spacing},${config.spacing} L0,${config.spacing} Z`}
                fill="none"
                stroke={color}
                strokeWidth="0.6"
              />
            </Pattern>
          )}

          {type === 'diamonds' && (
            <Pattern
              id="diamondPattern"
              x="0"
              y="0"
              width={config.spacing}
              height={config.spacing}
              patternUnits="userSpaceOnUse"
            >
              <Path
                d={`M${config.spacing/2},0 L${config.spacing},${config.spacing/2} L${config.spacing/2},${config.spacing} L0,${config.spacing/2} Z`}
                fill="none"
                stroke={color}
                strokeWidth="0.6"
              />
            </Pattern>
          )}
        </Defs>

        <Rect 
          width="100%" 
          height="100%" 
          fill={
            type === 'dots' ? "url(#dotPattern)" : 
            type === 'grid' ? "url(#gridPattern)" : 
            type === 'circles' ? "url(#circlePattern)" :
            type === 'waves' ? "url(#wavePattern)" :
            type === 'triangles' ? "url(#trianglePattern)" :
            type === 'diamonds' ? "url(#diamondPattern)" :
            "url(#dotPattern)"
          } 
        />
      </Svg>
    </View>
  );
}; 