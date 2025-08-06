import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
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
import { radius, border } from '@themes/border';
import { fontSize } from '@themes/fontSize';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

// Category data
const categories = [
  { id: 'music', name: 'Music & Audio', color: '#8b5cf6' },
  { id: 'coffee', name: 'Coffee & Chat', color: '#f59e0b' },
  { id: 'art', name: 'Arts & Crafts', color: '#ec4899' },
  { id: 'photography', name: 'Photography', color: '#3b82f6' },
  { id: 'reading', name: 'Books & Poetry', color: '#6366f1' },
  { id: 'games', name: 'Games & Sports', color: '#10b981' },
];

// const durationOptions = [
//   { value: '30min', label: '30 minutes' },
//   { value: '1hour', label: '1 hour' },
//   { value: '1.5hours', label: '1.5 hours' },
//   { value: '2hours', label: '2 hours' },
//   { value: '3hours', label: '3 hours' },
//   { value: 'all-day', label: 'All day' },
// ];

interface FormData {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  address: string;
  maxAttendees: string;
  price: string;
  isFree: boolean;
  isPublic: boolean;
  tags: string;
  requirements: string;
  image: string | null;
}

export default function NewEvent({}: ScreenPropsType<
  NewEventNavigationProps,
  NewEventRouteProp
>) {
  const styles = useStyles();
  const { colors } = useAppTheme();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    address: '',
    maxAttendees: '',
    price: '',
    isFree: true,
    isPublic: true,
    tags: '',
    requirements: '',
    image: null,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    handleInputChange('category', categoryId);
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    Alert.alert('Success', 'Event created successfully!');
  };

  const isFormValid =
    formData.title &&
    formData.description &&
    formData.category &&
    formData.date &&
    formData.time &&
    formData.location &&
    formData.maxAttendees;

  const renderCategoryItem = (category: (typeof categories)[0]) => {
    const isSelected = selectedCategory === category.id;

    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryItem,
          {
            borderColor: isSelected ? category.color : colors.inputBorder,
            backgroundColor: isSelected
              ? `${category.color}20`
              : colors.backgroundColor,
          },
        ]}
        onPress={() => handleCategorySelect(category.id)}>
        <View style={styles.categoryContent}>
          <View
            style={[styles.categoryIcon, { backgroundColor: category.color }]}
          />
          <AppText
            variant="body"
            color={isSelected ? 'primary' : 'text'}
            style={styles.categoryText}>
            {category.name}
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <AppText variant="title" color="title" style={styles.sectionTitle}>
        {title}
      </AppText>
      {children}
    </View>
  );

  return (
    <ScreenWrapper
      scrollEnabled
      keyboardOffset={Platform.OS === 'ios' ? 0 : 20}
      contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backButton}>
            <AppText variant="title" color="text">
              ←
            </AppText>
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
            onPress={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            isLoading={isSubmitting}
            style={styles.publishButton}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Event Image Upload */}
        {renderSection(
          'Event Image',
          <View style={styles.imageUploadContainer}>
            <TouchableOpacity style={styles.imageUpload}>
              <AppText
                variant="title"
                color="paragraph"
                style={styles.uploadIcon}>
                📷
              </AppText>
              <AppText
                variant="body"
                color="paragraph"
                style={styles.uploadText}>
                Tap to upload event image
              </AppText>
              <AppText variant="footnote" color="paragraph">
                PNG, JPG up to 10MB
              </AppText>
            </TouchableOpacity>
            {formData.image && (
              <AppText
                variant="footnote"
                color="primary"
                style={styles.uploadSuccess}>
                ✓ Image uploaded
              </AppText>
            )}
          </View>,
        )}

        {/* Basic Information */}
        {renderSection(
          'Basic Information',
          <View style={styles.formSection}>
            <AppInput
              label="Event Title"
              placeholder="Give your event a catchy title"
              value={formData.title}
              onChangeText={text => handleInputChange('title', text)}
              required
            />

            <AppInput
              label="Description"
              placeholder="Describe your event, what to expect, and why people should join..."
              value={formData.description}
              onChangeText={text => handleInputChange('description', text)}
              multiline
              numberOfLines={4}
              required
            />

            <View style={styles.categoryContainer}>
              <AppText
                variant="label"
                color="title"
                style={styles.categoryLabel}>
                Category
              </AppText>
              <View style={styles.categoryGrid}>
                {categories.map(renderCategoryItem)}
              </View>
            </View>
          </View>,
        )}

        {/* Date & Time */}
        {renderSection(
          'When',
          <View style={styles.formSection}>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <AppInput
                  label="Date"
                  placeholder="Select date"
                  value={formData.date}
                  onChangeText={text => handleInputChange('date', text)}
                  required
                />
              </View>
              <View style={styles.halfWidth}>
                <AppInput
                  label="Start Time"
                  placeholder="Select time"
                  value={formData.time}
                  onChangeText={text => handleInputChange('time', text)}
                  required
                />
              </View>
            </View>

            <AppInput
              label="Duration"
              placeholder="Select duration"
              value={formData.duration}
              onChangeText={text => handleInputChange('duration', text)}
            />
          </View>,
        )}

        {/* Location */}
        {renderSection(
          'Where',
          <View style={styles.formSection}>
            <AppInput
              label="Venue Name"
              placeholder="e.g., Corner Café, Central Park, My Apartment"
              value={formData.location}
              onChangeText={text => handleInputChange('location', text)}
              required
            />

            <AppInput
              label="Address"
              placeholder="Street address or general location"
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
            />
          </View>,
        )}

        {/* Attendees & Pricing */}
        {renderSection(
          'Attendees & Pricing',
          <View style={styles.formSection}>
            <AppInput
              label="Maximum Attendees"
              placeholder="e.g., 20"
              value={formData.maxAttendees}
              onChangeText={text => handleInputChange('maxAttendees', text)}
              keyboardType="numeric"
              required
            />

            <View style={styles.switchContainer}>
              <AppText variant="body" color="text">
                Free Event
              </AppText>
              <AppSwitch
                value={formData.isFree}
                onValueChange={(value: boolean) =>
                  handleInputChange('isFree', value)
                }
              />
            </View>

            {!formData.isFree && (
              <AppInput
                label="Price per person"
                placeholder="Enter price"
                value={formData.price}
                onChangeText={text => handleInputChange('price', text)}
                keyboardType="numeric"
              />
            )}

            <View style={styles.switchContainer}>
              <AppText variant="body" color="text">
                Public Event
              </AppText>
              <AppSwitch
                value={formData.isPublic}
                onValueChange={(value: boolean) =>
                  handleInputChange('isPublic', value)
                }
              />
            </View>

            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.switchDescription}>
              Public events appear in the main feed. Private events require an
              invite link.
            </AppText>
          </View>,
        )}

        {/* Additional Details */}
        {renderSection(
          'Additional Details',
          <View style={styles.formSection}>
            <AppInput
              label="Tags"
              placeholder="e.g., beginner-friendly, BYOB, outdoor (separate with commas)"
              value={formData.tags}
              onChangeText={text => handleInputChange('tags', text)}
            />

            <AppInput
              label="What to Bring / Requirements"
              placeholder="Let attendees know what they should bring or any special requirements..."
              value={formData.requirements}
              onChangeText={text => handleInputChange('requirements', text)}
              multiline
              numberOfLines={3}
            />
          </View>,
        )}

        {/* Preview */}
        {renderSection(
          'Preview',
          <View
            style={[
              styles.previewContainer,
              { backgroundColor: `${colors.primary}10` },
            ]}>
            <View
              style={[
                styles.previewCard,
                { backgroundColor: colors.backgroundColor },
              ]}>
              <View style={styles.previewHeader}>
                <View style={styles.previewText}>
                  <AppText variant="title" color="title">
                    {formData.title || 'Event Title'}
                  </AppText>
                  <AppText variant="body" color="paragraph">
                    {formData.description || 'Event description...'}
                  </AppText>
                </View>
                {selectedCategory && (
                  <View
                    style={[
                      styles.previewBadge,
                      {
                        backgroundColor: categories.find(
                          c => c.id === selectedCategory,
                        )?.color,
                      },
                    ]}>
                    <AppText variant="footnote" color="white">
                      {categories.find(c => c.id === selectedCategory)?.name}
                    </AppText>
                  </View>
                )}
              </View>
              <View style={styles.previewDetails}>
                {formData.date && (
                  <AppText variant="footnote" color="paragraph">
                    📅 {formData.date} at {formData.time}
                  </AppText>
                )}
                {formData.location && (
                  <AppText variant="footnote" color="paragraph">
                    📍 {formData.location}
                  </AppText>
                )}
                {formData.maxAttendees && (
                  <AppText variant="footnote" color="paragraph">
                    👥 Max {formData.maxAttendees} attendees
                  </AppText>
                )}
                <AppText variant="footnote" color="paragraph">
                  💰 {formData.isFree ? 'Free' : formData.price || 'Paid'}
                </AppText>
              </View>
            </View>
          </View>,
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const useStyles = () => {
  const { colors } = useAppTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.appBackgroundColor,
    },
    header: {
      borderBottomWidth: border.normal,
      borderBottomColor: colors.inputBorder,
      backgroundColor: colors.backgroundColor,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.medium,
      paddingVertical: spacing.small,
    },
    backButton: {
      padding: spacing.xs,
    },
    headerText: {
      flex: 1,
      marginLeft: spacing.small,
    },
    publishButton: {
      minWidth: moderateScale(80),
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.medium,
    },
    section: {
      marginBottom: spacing.large,
    },
    sectionTitle: {
      marginBottom: spacing.medium,
    },
    formSection: {
      gap: spacing.medium,
    },
    imageUploadContainer: {
      alignItems: 'center',
    },
    imageUpload: {
      borderWidth: border.thick,
      borderStyle: 'dashed',
      borderColor: colors.inputBorder,
      borderRadius: radius.md,
      padding: spacing.extraLarge,
      alignItems: 'center',
      width: '100%',
    },
    uploadIcon: {
      fontSize: fontSize[32],
      marginBottom: spacing.small,
    },
    uploadText: {
      marginTop: spacing.small,
      marginBottom: spacing.xs,
    },
    uploadSuccess: {
      marginTop: spacing.small,
    },
    categoryContainer: {
      marginTop: spacing.small,
    },
    categoryLabel: {
      marginBottom: spacing.small,
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.small,
    },
    categoryItem: {
      borderWidth: border.normal,
      borderRadius: radius.md,
      padding: spacing.small,
      minWidth: '48%',
    },
    categoryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.small,
    },
    categoryIcon: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(10),
    },
    categoryText: {
      flex: 1,
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
    switchDescription: {
      marginTop: spacing.xs,
    },
    previewContainer: {
      borderRadius: radius.md,
      padding: spacing.medium,
    },
    previewCard: {
      borderRadius: radius.md,
      padding: spacing.medium,
      borderWidth: border.normal,
      borderColor: colors.info,
    },
    previewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing.small,
    },
    previewText: {
      flex: 1,
      marginRight: spacing.small,
    },
    previewBadge: {
      paddingHorizontal: spacing.small,
      paddingVertical: spacing.xs,
      borderRadius: radius.lg,
    },
    previewDetails: {
      gap: spacing.xs,
    },
  });
};
