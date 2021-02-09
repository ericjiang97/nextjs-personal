interface HeroBaseDefaultProps {
  height?: string;
  textColor?: string;
}

interface HeroBackgroundImage extends HeroBaseDefaultProps {
  backgroundVariant: 'image';
  backgroundImage: string;
}

interface HeroBackgroundColor extends HeroBaseDefaultProps {
  backgroundVariant: 'color';
  backgroundColor: string;
}

export type HeroBaseProps = HeroBackgroundImage | HeroBackgroundColor;
