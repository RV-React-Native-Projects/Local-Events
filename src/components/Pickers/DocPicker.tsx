// // FIXME i will Pick Multiple Selection of Documents Later @Ranvijay-DX
// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   TouchableOpacity,
//   useWindowDimensions,
//   View,
// } from 'react-native';
// import { isTablet } from 'react-native-device-info';
// import DocumentPicker, {
//   DocumentPickerResponse,
//   types,
// } from 'react-native-document-picker';
// import ImagePicker from 'react-native-image-crop-picker';
// import Modal from 'react-native-modal';
// import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
// import AppIcon from '@components/AppIcon/AppIcon';
// import { Icons } from '@components/AppIcon/AppIconsDir';
// import AppText from '@components/AppText/AppText';
// import { VerticalSpacing } from '@components/Spacing/Spacing';
// import { useAppTheme } from '@redux/hooks';
// import Permissions from '@services/Permissions';
// import { opacity } from '@themes/opacity';
// import { moderateScale } from '@themes/responsive';
// import { Shadows } from '@themes/shadow';
// import { device } from '@utils/device';

// interface DocPickerProps {
//   visible: boolean;
//   toggleModal: () => void;
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
//   multiImages?: boolean;
//   onlyImages?: boolean;
//   allowMultiSelection?: boolean;
//   lightShadow?: boolean;
// }

// export default function DocPicker(props: DocPickerProps) {
//   const { height: windowHeight, width: windowWidth } = useWindowDimensions();
//   const { colors, shadow } = useAppTheme();
//   const insets = useSafeAreaInsets();

//   const {
//     visible = false,
//     toggleModal,
//     modalHeight = 270,
//     modalWidth = windowWidth,
//     animationInTiming = 200,
//     animationOutTiming = 300,
//     avoidKeyboard = true,
//     toBottom = true,
//     backgroundColor = colors.appBackgroundColor,
//     showHeader = false,
//     getImages,
//     multiImages = false,
//     onlyImages = false,
//     allowMultiSelection = false,
//     lightShadow = false,
//   } = props || {};

//   const styles = style(shadow, backgroundColor, insets);

//   const [images, setImages] = useState<DocumentPickerResponse | any | null>(
//     null,
//   );

//   useEffect(() => {
//     getImages && getImages(images);
//   }, [images, getImages]);

//   const openCamera = async () => {
//     const hasCameraPermission = await Permissions.getCameraPermissions();
//     if (hasCameraPermission) {
//       ImagePicker.openCamera({
//         width: 950,
//         height: 1800,
//         cropping: false,
//         compressImageQuality: device.isIOS
//           ? opacity.veryLight
//           : opacity.halfOpaque,
//         multiple: multiImages,
//       }).then(image => {
//         toggleModal();
//         image && setImages(image);
//       });
//     }
//   };

//   const openGallery = async () => {
//     const openPicker = () => {
//       DocumentPicker.pick({
//         type: onlyImages
//           ? [types.images]
//           : [
//               types.csv,
//               types.doc,
//               types.docx,
//               types.images,
//               types.pdf,
//               types.plainText,
//               types.xls,
//               types.xlsx,
//             ],
//         copyTo: 'cachesDirectory',
//         allowMultiSelection: allowMultiSelection,
//         // IOS settings
//         mode: 'import',
//         transitionStyle: 'coverVertical',
//         presentationStyle: 'fullScreen',
//       })
//         .then(image => {
//           toggleModal();
//           setImages(image);
//         })
//         .catch(err => console.log(err));
//     };

//     const hasStoragePermission =
//       await Permissions.requestReadExternalStoragePermission();

//     if (device.isIOS) {
//       openPicker();
//     } else if (hasStoragePermission) {
//       openPicker();
//     }
//   };

//   // FIXME will see if we need multiple Images selection, so we can add and Remove from Components Directly.
//   // const removeImage = (id: string) => {
//   //   if (Array.isArray(images)) {
//   //     const filterImages = images.filter(
//   //       (image: any) => image.fileCopyUri !== id,
//   //     );
//   //     if (filterImages?.length > 0) {
//   //       setImages(filterImages);
//   //     } else {
//   //       setImages(null);
//   //     }
//   //   } else {
//   //     setImages(null);
//   //   }
//   // };

//   return (
//     <>
//       {/* FIXME will add Image Render Component */}
//       <View style={styles.container}>
//         <Modal
//           isVisible={visible}
//           onBackdropPress={toggleModal}
//           onBackButtonPress={toggleModal}
//           animationIn={'slideInUp'}
//           animationOut={'slideOutDown'}
//           animationInTiming={animationInTiming}
//           animationOutTiming={animationOutTiming}
//           avoidKeyboard={avoidKeyboard}
//           deviceHeight={windowHeight}
//           deviceWidth={windowWidth}
//           backdropOpacity={lightShadow ? opacity.veryLight : opacity.semiLight}>
//           <View
//             style={[
//               styles.modalContainer,
//               {
//                 height: modalHeight,
//                 width: modalWidth,
//                 minHeight: modalHeight,
//               },
//               toBottom && styles.toBottomStyle,
//             ]}>
//             {showHeader && (
//               <View style={styles.header}>
//                 <View style={styles.panelHeader}>
//                   <View style={styles.panelHandle} />
//                 </View>
//               </View>
//             )}
//             <View
//               style={[
//                 {
//                   paddingHorizontal: moderateScale(20),
//                 },
//                 !showHeader && {
//                   borderTopLeftRadius: moderateScale(15),
//                   borderTopRightRadius: moderateScale(15),
//                 },
//               ]}>
//               <View style={styles.centerAlign}>
//                 <AppText
//                   fontFamily="Bold"
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
//             <View style={styles.bottomSpacing} />
//           </View>
//         </Modal>
//       </View>
//     </>
//   );
// }

// const style = (
//   shadow: Shadows,
//   backgroundColor: string,
//   insets: EdgeInsets,
// ) => {
//   return StyleSheet.create({
//     container: {},
//     header: {
//       backgroundColor: backgroundColor,
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
//       height: 8,
//       borderRadius: 4,
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
//   });
// };
