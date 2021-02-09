interface HeroBaseDefaultProps {
  height?: string;
  textColor?: string;
}

export type HeroBaseProps = HeroBaseDefaultProps &
  (
    | {
        backgroundVariant: 'image';
        backgroundImageUri: string;
      }
    | {
        backgroundVariant: 'color';
        backgroundColor: string;
      }
  );
