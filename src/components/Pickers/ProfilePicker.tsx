// import React, { useEffect, useState } from 'react';
// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   useWindowDimensions,
//   View,
// } from 'react-native';
// import { isTablet } from 'react-native-device-info';
// import FastImage from 'react-native-fast-image';
// import ImagePicker from 'react-native-image-crop-picker';
// import Modal from 'react-native-modal';
// import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
// import AppIcon from '@components/AppIcon/AppIcon';
// import { Icons, ImagePath } from '@components/AppIcon/AppIconsDir';
// import AppText from '@components/AppText/AppText';
// import { VerticalSpacing } from '@components/Spacing/Spacing';
// import { useAppTheme } from '@redux/hooks';
// import Permissions from '@services/Permissions';
// import { ColorTheme } from '@themes/colors';
// import { opacity } from '@themes/opacity';
// import { moderateScale } from '@themes/responsive';
// import { Shadows } from '@themes/shadow';
// import { device } from '@utils/device';

// interface ProfilePickerProps {
//   modalHeight?: number;
//   modalWidth?: number;
//   animationInTiming?: number;
//   animationOutTiming?: number;
//   avoidKeyboard?: boolean;
//   toBottom?: boolean;
//   backgroundColor?: string;
//   showHeader?: boolean;
//   content?: React.ReactNode;
//   getImages?: (images: any) => void;
//   allowMultiSelection?: boolean;
//   lightShadow?: boolean;
//   imagePath?: string | null;
// }

// export default function ProfilePicker(props: ProfilePickerProps) {
//   const { width: windowWidth, height: windowHeight } = useWindowDimensions();
//   const { colors, shadow } = useAppTheme();
//   const insets = useSafeAreaInsets();

//   const {
//     modalHeight = 270,
//     modalWidth = windowWidth,
//     animationInTiming = 200,
//     animationOutTiming = 300,
//     avoidKeyboard = true,
//     toBottom = true,
//     backgroundColor = colors.appBackgroundColor,
//     showHeader = false,
//     content,
//     getImages,
//     allowMultiSelection = false,
//     lightShadow = false,
//     imagePath = null,
//   } = props;
//   const styles = style(colors, shadow, backgroundColor, insets);

//   const [pickedImage, setPickedImage] = useState<any | null>(null);
//   const [showPicker, setShowPicker] = useState<boolean>(false);

//   const toggleModal = () => {
//     setShowPicker(!showPicker);
//   };

//   useEffect(() => {
//     getImages && getImages(pickedImage);
//   }, [pickedImage, getImages]);

//   const openCamera = async () => {
//     const hasCameraPermission = await Permissions.getCameraPermissions();
//     if (hasCameraPermission) {
//       ImagePicker.openCamera({
//         width: 720,
//         height: 720,
//         cropping: true,
//         showCropFrame: true,
//         mediaType: 'photo',
//         compressImageQuality: device.isIOS
//           ? opacity.veryLight
//           : opacity.halfOpaque,
//         useFrontCamera: true,
//         multiple: allowMultiSelection,
//       }).then(image => {
//         toggleModal();
//         image && setPickedImage(image);
//       });
//     }
//   };

//   const openGallery = async () => {
//     const hasCameraPermission = await Permissions.getCameraPermissions();
//     if (hasCameraPermission) {
//       ImagePicker.openPicker({
//         width: 720,
//         height: 720,
//         cropping: true,
//         showCropFrame: true,
//         mediaType: 'photo',
//         compressImageQuality: device.isIOS
//           ? opacity.veryLight
//           : opacity.halfOpaque,
//         multiple: allowMultiSelection,
//       }).then(image => {
//         toggleModal();
//         image && setPickedImage(image);
//       });
//     }
//   };
//   return (
//     <>
//       <View style={styles.imageContainer}>
//         {pickedImage || imagePath ? (
//           <FastImage
//             style={styles.imageStyle}
//             source={{
//               uri: pickedImage?.fileCopyUri ?? pickedImage?.path ?? imagePath,
//               priority: FastImage.priority.high,
//             }}
//             resizeMode={FastImage.resizeMode.cover}
//             defaultSource={ImagePath.user}
//           />
//         ) : (
//           <Image style={styles.imagePlaceholder} source={ImagePath.user} />
//         )}

//         <TouchableOpacity
//           activeOpacity={opacity.veryDark}
//           onPress={toggleModal}
//           style={styles.cameraButton}>
//           <AppIcon icon={Icons.camera} iconSize="sm" />
//         </TouchableOpacity>
//       </View>
//       <Modal
//         isVisible={showPicker}
//         onBackdropPress={toggleModal}
//         animationIn={'slideInUp'}
//         animationOut={'slideOutDown'}
//         animationInTiming={animationInTiming}
//         animationOutTiming={animationOutTiming}
//         avoidKeyboard={avoidKeyboard}
//         deviceHeight={moderateScale(windowHeight)}
//         deviceWidth={moderateScale(windowWidth)}
//         backdropOpacity={lightShadow ? opacity.veryLight : opacity.halfOpaque}>
//         <View
//           style={[
//             styles.modalContainer,
//             {
//               height: modalHeight,
//               width: modalWidth,
//               minHeight: modalHeight,
//             },
//             toBottom && styles.toBottomStyle,
//           ]}>
//           {showHeader ? (
//             <View style={styles.header}>
//               <View style={styles.panelHeader}>
//                 <View style={styles.panelHandle} />
//               </View>
//             </View>
//           ) : null}
//           {content ?? (
//             <View style={styles.paddingH20}>
//               <View style={styles.centerAlign}>
//                 <AppText
//                   fontFamily="Medium"
//                   size={18}
//                   style={{ paddingVertical: moderateScale(15) }}>
//                   Upload
//                 </AppText>
//               </View>
//               <VerticalSpacing size={10} />
//               <View style={styles.buttonView}>
//                 <TouchableOpacity
//                   style={styles.centerAlign}
//                   activeOpacity={opacity.veryDark}
//                   onPress={openCamera}>
//                   <View style={styles.buttonContainer}>
//                     <AppIcon icon={Icons.camera} iconSize="lg" />
//                   </View>
//                   <AppText fontFamily="Regular" size={16}>
//                     Camera
//                   </AppText>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.centerAlign}
//                   activeOpacity={opacity.veryDark}
//                   onPress={openGallery}>
//                   <View style={styles.buttonContainer}>
//                     <AppIcon icon={Icons.folder} iconSize="lg" />
//                   </View>
//                   <AppText fontFamily="Regular" size={16}>
//                     Gallery
//                   </AppText>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//           <View style={styles.bottomSpacing} />
//         </View>
//       </Modal>
//     </>
//   );
// }

// const style = (
//   colors: ColorTheme,
//   shadow: Shadows,
//   backgroundColor: string,
//   insets: EdgeInsets,
// ) =>
//   StyleSheet.create({
//     header: {
//       backgroundColor: colors.appBackgroundColor,
//       paddingTop: moderateScale(20),
//       borderTopLeftRadius: moderateScale(20),
//       borderTopRightRadius: moderateScale(20),
//       ...shadow.regular,
//     },
//     panelHeader: {
//       alignItems: 'center',
//     },
//     panelHandle: {
//       width: moderateScale(40),
//       height: moderateScale(8),
//       borderRadius: moderateScale(4),
//       backgroundColor: '#00000040',
//       marginBottom: moderateScale(15),
//     },
//     modalContainer: {
//       alignSelf: 'center',
//       alignContent: 'center',
//       borderTopRightRadius: moderateScale(20),
//       borderTopLeftRadius: moderateScale(20),
//       backgroundColor: backgroundColor,
//     },
//     toBottomStyle: {
//       alignSelf: 'center',
//       position: 'absolute',
//       bottom: moderateScale(
//         isTablet()
//           ? moderateScale(-50)
//           : moderateScale(-insets.top + insets.bottom),
//       ),
//     },
//     buttonView: {
//       flexDirection: 'row',
//       justifyContent: 'space-evenly',
//       alignItems: 'center',
//       width: '100%',
//     },
//     buttonContainer: {
//       height: moderateScale(100),
//       width: moderateScale(100),
//       borderRadius: moderateScale(100),
//       backgroundColor: backgroundColor,
//       alignItems: 'center',
//       justifyContent: 'center',
//       marginBottom: moderateScale(10),
//       ...shadow.regular,
//     },
//     bottomSpacing: {
//       backgroundColor: backgroundColor,
//       height: moderateScale(insets.top),
//     },
//     centerAlign: {
//       alignItems: 'center',
//     },
//     paddingH20: { paddingHorizontal: moderateScale(20) },
//     cameraButton: {
//       height: moderateScale(50),
//       width: moderateScale(50),
//       borderRadius: moderateScale(50),
//       backgroundColor: colors.backgroundColor,
//       alignItems: 'center',
//       justifyContent: 'center',
//       position: 'absolute',
//       right: 0,
//       bottom: 0,
//       ...shadow.regular,
//     },
//     imageContainer: {
//       position: 'relative',
//       alignItems: 'center',
//       height: moderateScale(150),
//       width: moderateScale(150),
//       alignSelf: 'center',
//     },
//     imagePlaceholder: {
//       height: '100%',
//       width: '100%',
//       borderRadius: moderateScale(200),
//       backgroundColor: colors.appBackgroundColor,
//       borderWidth: moderateScale(3),
//       borderColor: colors.secondary,
//       objectFit: 'contain',
//     },
//     imageStyle: {
//       height: '100%',
//       width: '100%',
//       borderRadius: moderateScale(200),
//       backgroundColor: colors.appBackgroundColor,
//       borderWidth: moderateScale(3),
//       borderColor: colors.secondary,
//     },
//   });
