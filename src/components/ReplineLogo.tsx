import { Image } from 'react-native';

interface Props {
  size?: 'sm' | 'md';
  textColor?: string;
}

export default function ReplineLogo({ size = 'md' }: Props) {
  const width = size === 'sm' ? 90 : 150;
  const height = size === 'sm' ? 48 : 80;

  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={{ width, height }}
      resizeMode="contain"
    />
  );
}
