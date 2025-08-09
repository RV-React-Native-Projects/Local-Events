import { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useFormik } from 'formik';
import { AppButton } from '@components/AppButton';
import AppInput from '@components/AppInput/AppInput';
import AppSwitch from '@components/AppSwitch/AppSwitch';
import { AppText } from '@components/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  NewEventNavigationProps,
  NewEventRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { spacing } from '@themes/spacing';
import { BackArrow } from '@svgs';
import { newEventSchema, newEventInitialValues } from '@yup/newEventSchema';

const categories = [
  { id: 'music', name: 'Music & Audio', color: '#8b5cf6' },
  { id: 'coffee', name: 'Coffee & Chat', color: '#f59e0b' },
  { id: 'art', name: 'Arts & Crafts', color: '#ec4899' },
  { id: 'photography', name: 'Photography', color: '#3b82f6' },
  { id: 'reading', name: 'Books & Poetry', color: '#6366f1' },
  { id: 'games', name: 'Games & Sports', color: '#10b981' },
];

const CategoryItem = ({ category, isSelected, onPress, colors }: any) => (
  <TouchableOpacity
    style={[
      styles.categoryItem,
      {
        borderColor: isSelected ? category.color : colors.inputBorder,
        backgroundColor: isSelected
          ? `${category.color}20`
          : colors.backgroundColor,
      },
    ]}
    onPress={onPress}>
    <View style={styles.categoryContent}>
      <View
        style={[styles.categoryIcon, { backgroundColor: category.color }]}
      />
      <AppText variant="body" color={isSelected ? 'primary' : 'text'}>
        {category.name}
      </AppText>
    </View>
  </TouchableOpacity>
);

export default function NewEvent({}: ScreenPropsType<
  NewEventNavigationProps,
  NewEventRouteProp
>) {
  const { colors } = useAppTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
  } = useFormik({
    initialValues: newEventInitialValues,
    validationSchema: newEventSchema,
    onSubmit: async val => {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        Alert.alert('Success', 'Event created successfully!');
        console.log('Form Values:', val);
      } catch (error) {
        Alert.alert('Error', 'Failed to create event.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity>
          <BackArrow />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <AppText variant="title" color="title">
            Create Event
          </AppText>
          <AppText variant="footnote" color="paragraph">
            Share your idea with the community
          </AppText>
        </View>
        <AppButton
          title={isSubmitting ? 'Publishing...' : 'Publish'}
          onPress={() => handleSubmit()}
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}>
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.scrollContent}>
            <View style={styles.section}>
              <AppText variant="title" color="title">
                Basic Information
              </AppText>
              <AppInput
                label="Event Title"
                placeholder="Give your event a catchy title"
                value={values.title}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                error={!!(touched.title && errors.title)}
                errorMessage={errors.title}
                required
              />
              <AppInput
                label="Description"
                placeholder="Describe your event..."
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                error={!!(touched.description && errors.description)}
                errorMessage={errors.description}
                multiline
                numberOfLines={4}
                required
              />
              <View>
                <AppText variant="label" color="title">
                  Category
                </AppText>
                <View style={styles.categoryGrid}>
                  {categories.map(category => (
                    <CategoryItem
                      key={category.id}
                      category={category}
                      isSelected={values.category === category.id}
                      onPress={() => setFieldValue('category', category.id)}
                      colors={colors}
                    />
                  ))}
                </View>
                {touched.category && errors.category && (
                  <AppText variant="footnote" color="error">
                    {errors.category}
                  </AppText>
                )}
              </View>
            </View>
            <View style={styles.section}>
              <AppText variant="title" color="title">
                When
              </AppText>
              <View style={styles.row}>
                <View style={styles.halfWidth}>
                  <AppInput
                    label="Date"
                    placeholder="Select date"
                    value={values.date}
                    onChangeText={handleChange('date')}
                    onBlur={handleBlur('date')}
                    error={!!(touched.date && errors.date)}
                    errorMessage={errors.date}
                    required
                  />
                </View>
                <View style={styles.halfWidth}>
                  <AppInput
                    label="Start Time"
                    placeholder="Select time"
                    value={values.time}
                    onChangeText={handleChange('time')}
                    onBlur={handleBlur('time')}
                    error={!!(touched.time && errors.time)}
                    errorMessage={errors.time}
                    required
                  />
                </View>
              </View>

              <AppInput
                label="Duration"
                placeholder="Select duration"
                value={values.duration}
                onChangeText={handleChange('duration')}
                onBlur={handleBlur('duration')}
                error={!!(touched.duration && errors.duration)}
                errorMessage={errors.duration}
              />
            </View>
            <View style={styles.section}>
              <AppText variant="title" color="title">
                Where
              </AppText>
              <AppInput
                label="Venue Name"
                placeholder="e.g., Corner Café, Central Park"
                value={values.location}
                onChangeText={handleChange('location')}
                onBlur={handleBlur('location')}
                error={!!(touched.location && errors.location)}
                errorMessage={errors.location}
                required
              />
              <AppInput
                label="Address"
                placeholder="Street address or general location"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                error={!!(touched.address && errors.address)}
                errorMessage={errors.address}
              />
            </View>
            <View style={styles.section}>
              <AppText variant="title" color="title">
                Attendees & Pricing
              </AppText>
              <AppInput
                label="Maximum Attendees"
                placeholder="e.g., 20"
                value={values.maxAttendees}
                onChangeText={handleChange('maxAttendees')}
                onBlur={handleBlur('maxAttendees')}
                error={!!(touched.maxAttendees && errors.maxAttendees)}
                errorMessage={errors.maxAttendees}
                keyboardType="numeric"
                required
              />
              <View style={styles.switchContainer}>
                <AppText variant="body" color="text">
                  Free Event
                </AppText>
                <AppSwitch
                  value={values.isFree}
                  onValueChange={value => {
                    setFieldValue('isFree', value);
                  }}
                />
              </View>
              {!values.isFree && (
                <AppInput
                  label="Price per person"
                  placeholder="Enter price"
                  value={values.price}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  error={!!(touched.price && errors.price)}
                  errorMessage={errors.price}
                  keyboardType="numeric"
                />
              )}
              <View style={styles.switchContainer}>
                <AppText variant="body" color="text">
                  Public Event
                </AppText>
                <AppSwitch
                  value={values.isPublic}
                  onValueChange={value => {
                    setFieldValue('isPublic', value);
                  }}
                />
              </View>
            </View>
            <View style={styles.section}>
              <AppText variant="title" color="title">
                Additional Details
              </AppText>
              <AppInput
                label="Tags"
                placeholder="e.g., beginner-friendly, BYOB, outdoor"
                value={values.tags}
                onChangeText={handleChange('tags')}
                onBlur={handleBlur('tags')}
                error={!!(touched.tags && errors.tags)}
                errorMessage={errors.tags}
              />
              <AppInput
                label="Requirements"
                placeholder="What should attendees bring or know?"
                value={values.requirements}
                onChangeText={handleChange('requirements')}
                onBlur={handleBlur('requirements')}
                error={!!(touched.requirements && errors.requirements)}
                errorMessage={errors.requirements}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.small,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.medium,
    paddingBottom: spacing.extraLarge * 2,
  },
  section: {
    marginBottom: spacing.large,
    gap: spacing.medium,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.small,
    marginTop: spacing.small,
  },
  categoryItem: {
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.small,
    minWidth: '48%',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.small,
  },
  categoryIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.small,
  },
  halfWidth: {
    flex: 1,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
});
