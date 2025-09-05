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

export const FONT_SIZE = {
  tiny: rf(1.0), // ~8px
  small: rf(1.2), // ~10px
  xSmall: rf(1.4), // ~12px
  normal: rf(1.6), // ~14px
  medium: rf(1.8), // ~16px
  large: rf(2.2), // ~18–20px
  xlarge: rf(2.6), // ~22–24px
  xxlarge: rf(2.8), // ~26px
};

export { rh, rw, rf };
