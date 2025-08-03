import { useWindowDimensions, View } from 'react-native';
import Modal from 'react-native-modal';
import AppButton from '@components/AppButton/AppButton';
import AppText from '@components/AppText/AppText';
import { fontSize } from '@themes/fontSize';
import { opacity } from '@themes/opacity';
import { moderateScale } from '@themes/responsive';
import { CheckCircledSvg, ErrorSvg, InfoCircleSvg, WarningSvg } from '@svgs';
import { IAlertModalProps } from './AlertModalTypes';
import { useAlertModalStyle } from './style';

export default function AlertModal(props: IAlertModalProps) {
  const {
    type = 'success',
    restrictGoingBack = false,
    visible,
    closeModal,
    header,
    subheader,
    description,
    buttonOneTitle,
    buttonTwoTitle,
    onPressButtonOne,
    onPressButtonTwo,
    ButtonOneVariants = 'outline',
    ButtonTwoVariants = 'filled',
    ButtonOneColor = 'secondary',
    ButtonTwoColor = 'secondary',
  } = props;

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const styles = useAlertModalStyle(type);

  function onBack() {
    onPressButtonOne && onPressButtonOne();
    closeModal();
  }

  function onContinue() {
    onPressButtonTwo && onPressButtonTwo();
    closeModal();
  }

  return (
    <Modal
      style={styles.modalStyle}
      isVisible={visible}
      onBackButtonPress={() => (restrictGoingBack ? {} : closeModal())}
      onBackdropPress={() => (restrictGoingBack ? {} : closeModal())}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={200}
      animationOutTiming={300}
      avoidKeyboard={true}
      deviceHeight={moderateScale(windowHeight)}
      deviceWidth={moderateScale(windowWidth)}
      backdropOpacity={opacity.halfOpaque}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.circleContainer}>
            <View style={styles.bigCircle} />
            {type === 'success' ? (
              <CheckCircledSvg height={35} width={35} />
            ) : type === 'error' ? (
              <ErrorSvg height={40} width={40} />
            ) : type === 'warning' ? (
              <WarningSvg />
            ) : (
              <InfoCircleSvg height={35} width={35} />
            )}
          </View>
          {header && <AppText variant="header">{header}</AppText>}
          {subheader && (
            <AppText
              variant="header"
              textAlign="center"
              size={fontSize[16]}
              style={styles.subHeaderColor}>
              {subheader}
            </AppText>
          )}
          {description && (
            <AppText variant="label" color="paragraph" textAlign="center">
              {description}
            </AppText>
          )}
          <View style={styles.buttonContainer}>
            {!!buttonOneTitle && (
              <AppButton
                style={
                  !!buttonOneTitle && !!buttonTwoTitle
                    ? styles.halfButton
                    : styles.fullButton
                }
                title={buttonOneTitle}
                variant={ButtonOneVariants}
                color={ButtonOneColor}
                onPress={onBack}
              />
            )}
            {buttonTwoTitle && (
              <AppButton
                style={
                  !!buttonOneTitle && !!buttonTwoTitle
                    ? styles.halfButton
                    : styles.fullButton
                }
                title={buttonTwoTitle}
                variant={ButtonTwoVariants}
                color={ButtonTwoColor}
                onPress={onContinue}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
