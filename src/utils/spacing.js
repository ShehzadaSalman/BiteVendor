// src/utils/spacing.js
import {
  responsiveHeight as rh,
  responsiveWidth as rw,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';

export const SPACING = {
  tiny: rw(2), // ~8px on small screens
  small: rw(3), // ~12px
  medium: rw(4), // ~16px
  large: rw(6), // ~24px
  xlarge: rw(8), // ~32px
};

export const BORDER_RADIUS = {
  xtiny: rw(1),
  tiny: rw(2),
  small: rw(4),
  normal: rw(6),
  medium: rw(10), // ~16px
  large: rw(12), // ~24px
  xlarge: rw(15), // ~32px
};

const withMinSize = (value, min) => {
  const size = rf(value);
  return size < min ? min : size;
};

export const FONT_SIZE = {
  tiny: withMinSize(1.0, 10), // never smaller than 10px
  small: withMinSize(1.2, 12), // never smaller than 12px
  xSmall: withMinSize(1.4, 12), // never smaller than 12px
  normal: withMinSize(1.6, 14), // never smaller than 14px
  medium: withMinSize(1.8, 16), // never smaller than 16px
  large: withMinSize(2.2, 18), // never smaller than 18px
  xlarge: withMinSize(2.6, 22), // never smaller than 22px
  xxlarge: withMinSize(2.8, 26), // never smaller than 26px
  xxxlarge: withMinSize(3, 28), // never smaller than 28px
};

export { rh, rw, rf };
