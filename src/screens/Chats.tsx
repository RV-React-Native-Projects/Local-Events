import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
} from 'react-native';
import { lightTheme } from '../themes/colors/Colors';
import { fontSize } from '../themes/fontSize';
import { spacing } from '../themes/spacing';

interface ChatItem {
  id: number;
  type: 'event' | 'direct' | 'community';
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  participants: number;
  avatar: string;
  online: boolean;
}

const mockChats: ChatItem[] = [
  {
    id: 1,
    type: 'event',
    name: 'Acoustic Poetry Night',
    lastMessage: 'Sarah: Looking forward to tonight! 🎤',
    time: '2m ago',
    unread: 3,
    participants: 12,
    avatar:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
    online: true,
  },
  {
    id: 2,
    type: 'direct',
    name: 'Marcus Johnson',
    lastMessage: 'Thanks for organizing the chess event!',
    time: '15m ago',
    unread: 0,
    participants: 2,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    online: true,
  },
  {
    id: 3,
    type: 'community',
    name: 'Downtown Arts Community',
    lastMessage: 'Emma: Check out this amazing gallery opening...',
    time: '1h ago',
    unread: 1,
    participants: 45,
    avatar:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=100&h=100&fit=crop',
    online: false,
  },
  {
    id: 4,
    type: 'event',
    name: 'Sunday Morning Chess',
    lastMessage: 'David: Weather looks perfect for tomorrow!',
    time: '3h ago',
    unread: 0,
    participants: 8,
    avatar:
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=100&h=100&fit=crop',
    online: false,
  },
];

const Chats: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = mockChats.filter(chat => {
    if (activeTab === 'all') return true;
    if (activeTab === 'events') return chat.type === 'event';
    if (activeTab === 'direct') return chat.type === 'direct';
    if (activeTab === 'communities') return chat.type === 'community';
    return true;
  });

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name
              .split(' ')
              .map(n => n[0])
              .join('')}
          </Text>
        </View>
        {item.online && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <View style={styles.nameContainer}>
            <Text style={styles.chatName}>{item.name}</Text>
            {item.type === 'event' && <Text style={styles.typeIcon}>🎤</Text>}
            {item.type === 'community' && (
              <Text style={styles.typeIcon}>👥</Text>
            )}
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{item.time}</Text>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderTabButton = (tab: string, label: string) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}>
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={lightTheme.white} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Messages</Text>
          <Text style={styles.subtitle}>
            Stay connected with your community
          </Text>
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholderTextColor={lightTheme.paragraph}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabsList}>
          {renderTabButton('all', 'All')}
          {renderTabButton('events', 'Events')}
          {renderTabButton('direct', 'Direct')}
          {renderTabButton('communities', 'Groups')}
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyTitle}>No conversations yet</Text>
            <Text style={styles.emptySubtitle}>
              Join an event to start chatting with the community
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.appBackgroundColor,
  },
  header: {
    backgroundColor: lightTheme.white,
    paddingHorizontal: spacing.mediumLarge,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.borderAlt,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: fontSize[20],
    fontWeight: 'bold',
    color: lightTheme.text,
  },
  subtitle: {
    fontSize: fontSize[14],
    color: lightTheme.secondaryText,
    marginTop: spacing.extraSmall,
  },
  addButton: {
    padding: spacing.medium,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: lightTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: lightTheme.white,
    fontSize: fontSize[20],
    fontWeight: 'bold',
  },
  searchContainer: {
    backgroundColor: lightTheme.white,
    paddingHorizontal: spacing.mediumLarge,
    paddingVertical: spacing.medium,
  },
  searchInput: {
    backgroundColor: lightTheme.appBackgroundColor,
    borderColor: lightTheme.border,
    borderWidth: 1,
    borderRadius: spacing.small,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.medium,
    fontSize: fontSize[14],
    color: lightTheme.text,
  },
  tabsContainer: {
    backgroundColor: lightTheme.white,
    paddingHorizontal: spacing.mediumLarge,
    paddingVertical: spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.borderAlt,
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: lightTheme.appBackgroundColor,
    borderRadius: spacing.small,
    padding: spacing.extraSmall,
  },
  tabButton: {
    flex: 1,
    paddingVertical: spacing.medium,
    alignItems: 'center',
    borderRadius: spacing.extraSmall,
  },
  activeTabButton: {
    backgroundColor: lightTheme.white,
  },
  tabText: {
    fontSize: fontSize[14],
    color: lightTheme.secondaryText,
  },
  activeTabText: {
    color: lightTheme.text,
    fontWeight: '600',
  },
  chatList: {
    padding: spacing.mediumLarge,
  },
  chatItem: {
    backgroundColor: lightTheme.white,
    borderRadius: spacing.small,
    padding: spacing.mediumLarge,
    marginBottom: spacing.medium,
    borderWidth: 1,
    borderColor: lightTheme.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.mediumLarge,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: lightTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: lightTheme.white,
    fontSize: fontSize[14],
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: lightTheme.success,
    borderWidth: 2,
    borderColor: lightTheme.white,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.extraSmall,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatName: {
    fontSize: fontSize[14],
    fontWeight: '600',
    color: lightTheme.text,
    marginRight: spacing.extraSmall,
  },
  typeIcon: {
    fontSize: fontSize[12],
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: fontSize[10],
    color: lightTheme.secondaryText,
    marginRight: spacing.extraSmall,
  },
  unreadBadge: {
    backgroundColor: lightTheme.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.extraSmall,
  },
  unreadText: {
    color: lightTheme.white,
    fontSize: fontSize[10],
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: fontSize[14],
    color: lightTheme.secondaryText,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.colossal,
  },
  emptyIcon: {
    fontSize: fontSize[48],
    marginBottom: spacing.medium,
  },
  emptyTitle: {
    fontSize: fontSize[16],
    color: lightTheme.secondaryText,
    marginBottom: spacing.small,
  },
  emptySubtitle: {
    fontSize: fontSize[14],
    color: lightTheme.secondaryText,
    textAlign: 'center',
  },
});

export default Chats;
