import { BackArrow, CalenderSvg, CheckCircledSvg, DownArrowSvg, ErrorSvg, EyeCloseSvg, EyeSvg, InfoCircleSvg, WarningSvg } from '@assets/svgs';

export const SVGS = [
  { name: 'BackArrow', Svg: BackArrow },
  { name: 'Calender', Svg: CalenderSvg },
  { name: 'CheckCircled', Svg: CheckCircledSvg },
  { name: 'DownArrow', Svg: DownArrowSvg },
  { name: 'Error', Svg: ErrorSvg },
  { name: 'EyeClose', Svg: EyeCloseSvg },
  { name: 'Eye', Svg: EyeSvg },
  { name: 'InfoCircle', Svg: InfoCircleSvg },
  { name: 'Warning', Svg: WarningSvg }
] as const;
