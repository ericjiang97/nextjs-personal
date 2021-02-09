interface HeroBaseDefaultProps {
  height?: string;
  textColor?: string;
}

export type HeroBaseProps = HeroBaseDefaultProps &
  (
    | {
        backgroundVariant: 'image';
        backgroundImage: string;
      }
    | {
        backgroundVariant: 'color';
        backgroundColor: string;
      }
  );
