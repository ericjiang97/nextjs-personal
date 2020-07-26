import React from 'react';
import { Icon, IconProps as BumbagIconProps } from 'bumbag';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export const GruntIcon: React.FC<BumbagIconProps> = (props) => {
  return (
    <Icon aria-label="Grunt" icon="brand-grunt" {...props} />
  );
};

export const JavaScriptIcon: React.FC<BumbagIconProps> = (props) => {
  return (
    <Icon aria-label="JS" icon="brand-js" {...props} />
  );
};

export const BootstrapIcon: React.FC<BumbagIconProps> = (props) => {
  return (
    <Icon aria-label="Bootstrap" icon="brand-bootstrap" {...props} />
  );
};

export const FlutterIcon: React.FC<IconProps> = ({ className, style }) => {
  return (
    <svg enable-background="new 0 0 1999 2474.2" viewBox="0 0 1999 2474.2" className={className} style={style}>
      <linearGradient
        id="a"
        gradientTransform="matrix(380.4042 -380.4175 -53.104 -53.1021 908228.3125 -700059.5)"
        gradientUnits="userSpaceOnUse"
        x1="-2115.0029"
        x2="-2115.0029"
        y1="1930.7407"
        y2="1929.7407"
      >
        <stop offset=".2" stopOpacity=".15" />
        <stop offset=".85" stopColor="#616161" stopOpacity=".01" />
      </linearGradient>
      <linearGradient
        id="b"
        gradientTransform="matrix(565.291 0 0 -380.9571 1196694.25 743476.5625)"
        gradientUnits="userSpaceOnUse"
        x1="-2115.2688"
        x2="-2114.2688"
        y1="1946.3563"
        y2="1946.3563"
      >
        <stop offset=".2" stopOpacity=".55" />
        <stop offset=".85" stopColor="#616161" stopOpacity=".01" />
      </linearGradient>
      <path
        d="m381 1618-381-381 1237.1-1237h761.9m0 1141.5h-761.9l-285.4 285.4 381 381"
        fill="#42a5f5"
        fillOpacity=".8"
      />
      <path d="m951.7 2188.8 285.4 285.4h761.9l-666.3-666.3" fill="#0d47a1" />
      <path d="m571.6 1808.1 380.4-380.5 380.4 380.4-380.4 380.5z" fill="#42a5f5" />
      <path d="m952 2188.5 380.4-380.4 53.1 53.1-380.4 380.4z" fill="url(#a)" />
      <path d="m951.7 2188.8 565.3-195.3-184.3-185.7" fill="url(#b)" />
    </svg>
  );
};

export const FirebaseIcon: React.FC<IconProps> = ({ className, style }) => {
  return <img src="/images/logos/firebase.png" alt="Firebase" className={className} style={style} />;
};

export const ReactIcon: React.FC<BumbagIconProps> = (props) => {
  return (
    <Icon aria-label="ReactJS" icon="brand-react" {...props} />
  );
};

export const MaterialUIIcon: React.FC<IconProps> = ({ className, style }) => {
  return (
    <svg viewBox="0 0 256 204" version="1.1" className={className} style={style}>
      <g>
        <polygon fill="#00B0FF" points="0 110.848 0 0 96 55.424 96 92.3733333 32 55.424 32 129.322667"></polygon>
        <polygon
          fill="#0081CB"
          points="96 55.424 192 0 192 110.848 128 147.797333 96 129.322667 160 92.3733333 160 55.424 96 92.3733333"
        ></polygon>
        <polygon fill="#00B0FF" points="96 129.322667 96 166.272 160 203.221333 160 166.272"></polygon>
        <path
          d="M160,203.221333 L256,147.797333 L256,73.8986667 L224,92.3733333 L224,129.322667 L160,166.272 L160,203.221333 Z M224,55.424 L224,18.4746667 L256,5.68434189e-14 L256,36.9493333 L224,55.424 Z"
          fill="#0081CB"
        ></path>
      </g>
    </svg>
  );
};

export default {
  GruntIcon,
};
