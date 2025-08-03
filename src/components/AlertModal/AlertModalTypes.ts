import {
  ButtonColors,
  ButtonVariants,
} from '@components/AppButton/AppButtonTypes';

export type AlertModalTypes = 'warning' | 'success' | 'error' | 'info';

export interface IAlertModalProps {
  type: AlertModalTypes;
  visible: boolean;
  restrictGoingBack?: boolean;
  closeModal: () => void;
  header: string;
  subheader?: string;
  description: string;
  buttonOneTitle?: string;
  buttonTwoTitle?: string;
  onPressButtonOne?: () => void;
  onPressButtonTwo?: () => void;
  ButtonOneVariants?: ButtonVariants;
  ButtonTwoVariants?: ButtonVariants;
  ButtonOneColor?: ButtonColors;
  ButtonTwoColor?: ButtonColors;
}
