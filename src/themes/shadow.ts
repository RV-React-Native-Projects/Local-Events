interface ShadowOffset {
  width: number;
  height: number;
}

interface ShadowStyle {
  shadowColor: string;
  shadowOffset: ShadowOffset;
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

interface ShadowOffset {
  width: number;
  height: number;
}

export interface Shadows {
  regular: ShadowStyle;
  large: ShadowStyle;
  small: ShadowStyle;
}

const elevation = (y: number, blur: number): number => {
  return Math.round((y + blur) / 2);
};

export const shadow = (color: string): Shadows => ({
  regular: {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: elevation(8, 16),
  },
  large: {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.17,
    shadowRadius: 48,
    elevation: elevation(16, 48),
  },
  small: {
    shadowColor: color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: elevation(2, 4),
  },
});
