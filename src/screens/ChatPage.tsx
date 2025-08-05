import { useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AppInput from '@components/AppInput/AppInput';
import { AppText } from '@components/AppText';
import { ScreenWrapper } from '@components/Wrapper';
import {
  ChatPageNavigationProps,
  ChatPageRouteProp,
  ScreenPropsType,
} from '@navigation/types';
import { useAppTheme } from '@redux/hooks';
import { moderateScale } from '@themes/responsive';
import { spacing } from '@themes/spacing';

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: Date;
  type: 'text' | 'image' | 'event' | 'system';
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  replyTo?: {
    id: string;
    text: string;
    sender: string;
  };
}

interface ChatInfo {
  id: string;
  name: string;
  avatar: string;
  type: 'event' | 'direct' | 'community';
  participants: number;
  online: boolean;
  lastSeen?: Date;
}

// Mock data
const mockChatInfo: ChatInfo = {
  id: '1',
  name: 'Acoustic Poetry Night',
  avatar:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop',
  type: 'event',
  participants: 12,
  online: true,
};

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey everyone! Welcome to the Acoustic Poetry Night chat! 🎤',
    sender: {
      id: 'host',
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    },
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    type: 'text',
    isOwn: false,
    status: 'read',
  },
  {
    id: '2',
    text: 'Looking forward to tonight! What time should we arrive?',
    sender: {
      id: 'user1',
      name: 'Marcus Johnson',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
    type: 'text',
    isOwn: false,
    status: 'read',
  },
  {
    id: '3',
    text: 'Doors open at 7 PM, but feel free to come early to grab a good spot!',
    sender: {
      id: 'host',
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    },
    timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
    type: 'text',
    isOwn: false,
    status: 'read',
  },
  {
    id: '4',
    text: "Perfect! I'll bring my guitar 🎸",
    sender: {
      id: 'user2',
      name: 'Emma Rodriguez',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    },
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    type: 'text',
    isOwn: false,
    status: 'read',
  },
  {
    id: '5',
    text: 'Anyone bringing their own poems to share?',
    sender: {
      id: 'user3',
      name: 'David Kim',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
    type: 'text',
    isOwn: false,
    status: 'read',
  },
  {
    id: '6',
    text: "I have a few original pieces I'd love to share!",
    sender: {
      id: 'currentUser',
      name: 'You',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    type: 'text',
    isOwn: true,
    status: 'read',
  },
  {
    id: '7',
    text: "That sounds amazing! Can't wait to hear them",
    sender: {
      id: 'host',
      name: 'Sarah Chen',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
    },
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    type: 'text',
    isOwn: false,
    status: 'read',
  },
];

export default function ChatPage({}: ScreenPropsType<
  ChatPageNavigationProps,
  ChatPageRouteProp
>) {
  const { colors } = useAppTheme();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const chatInfo = mockChatInfo;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: {
        id: 'currentUser',
        name: 'You',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      },
      timestamp: new Date(),
      type: 'text',
      isOwn: true,
      status: 'sent',
      replyTo: replyTo
        ? {
            id: replyTo.id,
            text: replyTo.text,
            sender: replyTo.sender.name,
          }
        : undefined,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setReplyTo(null);

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id
            ? { ...msg, status: 'delivered' as const }
            : msg,
        ),
      );
    }, 1000);

    // Simulate message read
    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === message.id ? { ...msg, status: 'read' as const } : msg,
        ),
      );
    }, 3000);
  };

  const handleReply = (message: Message) => {
    setReplyTo(message);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isFirstInGroup =
      index === 0 ||
      messages[index - 1].sender.id !== item.sender.id ||
      new Date(item.timestamp).getTime() -
        new Date(messages[index - 1].timestamp).getTime() >
        300000; // 5 minutes

    const isLastInGroup =
      index === messages.length - 1 ||
      messages[index + 1].sender.id !== item.sender.id ||
      new Date(messages[index + 1].timestamp).getTime() -
        new Date(item.timestamp).getTime() >
        300000;

    return (
      <View
        style={[
          styles.messageContainer,
          item.isOwn
            ? styles.ownMessageContainer
            : styles.otherMessageContainer,
          isFirstInGroup && styles.firstInGroup,
          isLastInGroup && styles.lastInGroup,
        ]}>
        {/* Reply to message */}
        {item.replyTo && (
          <View
            style={[
              styles.replyContainer,
              item.isOwn
                ? styles.ownReplyContainer
                : styles.otherReplyContainer,
            ]}>
            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.replySender}>
              {item.replyTo.sender}
            </AppText>
            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.replyText}>
              {item.replyTo.text}
            </AppText>
          </View>
        )}

        {/* Message bubble */}
        <View
          style={[
            styles.messageBubble,
            item.isOwn ? styles.ownMessageBubble : styles.otherMessageBubble,
          ]}>
          <AppText
            variant="body"
            color={item.isOwn ? 'white' : 'text'}
            style={styles.messageText}>
            {item.text}
          </AppText>

          {/* Message status */}
          <View style={styles.messageFooter}>
            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.messageTime}>
              {formatTime(item.timestamp)}
            </AppText>
            {item.isOwn && (
              <View style={styles.statusContainer}>
                {item.status === 'sent' && (
                  <AppText variant="footnote" color="paragraph">
                    ✓
                  </AppText>
                )}
                {item.status === 'delivered' && (
                  <AppText variant="footnote" color="paragraph">
                    ✓✓
                  </AppText>
                )}
                {item.status === 'read' && (
                  <AppText variant="footnote" color="primary">
                    ✓✓
                  </AppText>
                )}
                {item.status === 'failed' && (
                  <AppText variant="footnote" color="error">
                    ✗
                  </AppText>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Avatar for other messages */}
        {!item.isOwn && isLastInGroup && (
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <AppText
                variant="footnote"
                color="white"
                style={styles.avatarText}>
                {item.sender.name.charAt(0)}
              </AppText>
            </View>
          </View>
        )}

        {/* Long press to reply */}
        <TouchableOpacity
          style={styles.messageOverlay}
          onLongPress={() => handleReply(item)}
          activeOpacity={0.8}
        />
      </View>
    );
  };

  const renderTypingIndicator = () => {
    return (
      <View style={[styles.messageContainer, styles.otherMessageContainer]}>
        <View
          style={[
            styles.messageBubble,
            styles.otherMessageBubble,
            styles.typingBubble,
          ]}>
          <View style={styles.typingDots}>
            <View style={[styles.typingDot, styles.typingDot1]} />
            <View style={[styles.typingDot, styles.typingDot2]} />
            <View style={[styles.typingDot, styles.typingDot3]} />
          </View>
        </View>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <AppText variant="footnote" color="white" style={styles.avatarText}>
              {chatInfo.name.charAt(0)}
            </AppText>
          </View>
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.backButton}>
          <AppText variant="title" color="text">
            ←
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatInfo}>
          <View style={styles.chatAvatar}>
            <AppText
              variant="footnote"
              color="white"
              style={styles.chatAvatarText}>
              {chatInfo.name.charAt(0)}
            </AppText>
          </View>
          <View style={styles.chatDetails}>
            <AppText variant="title" color="title" style={styles.chatName}>
              {chatInfo.name}
            </AppText>
            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.chatStatus}>
              {chatInfo.online
                ? `${chatInfo.participants} online`
                : `${chatInfo.participants} members`}
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerButton}>
          <AppText variant="body" color="text">
            🔍
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <AppText variant="body" color="text">
            ⋮
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderInput = () => (
    <View style={styles.inputContainer}>
      {/* Reply preview */}
      {replyTo && (
        <View style={styles.replyPreview}>
          <View style={styles.replyPreviewContent}>
            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.replyPreviewSender}>
              Replying to {replyTo.sender.name}
            </AppText>
            <AppText
              variant="footnote"
              color="paragraph"
              style={styles.replyPreviewText}>
              {replyTo.text}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={handleCancelReply}
            style={styles.cancelReplyButton}>
            <AppText variant="body" color="text">
              ✕
            </AppText>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputRow}>
        <TouchableOpacity style={styles.inputButton}>
          <AppText variant="body" color="text">
            📎
          </AppText>
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <AppInput
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            style={styles.textInput}
            containerStyle={styles.inputWrapper}
          />
        </View>

        <TouchableOpacity style={styles.inputButton}>
          <AppText variant="body" color="text">
            📷
          </AppText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}>
          <AppText
            variant="body"
            color={newMessage.trim() ? 'white' : 'paragraph'}
            style={styles.sendButtonText}>
            ➤
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );

  const styles = createStyles(colors);

  return (
    <ScreenWrapper style={styles.container}>
      {renderHeader()}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        inverted={false}
        ListFooterComponent={renderTypingIndicator}
        onEndReachedThreshold={0.1}
      />

      {renderInput()}
    </ScreenWrapper>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(spacing.md),
      paddingVertical: moderateScale(spacing.sm),
      borderBottomWidth: 1,
      borderBottomColor: colors.inputBorder,
      backgroundColor: colors.backgroundColor,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    backButton: {
      padding: moderateScale(spacing.xs),
      marginRight: moderateScale(spacing.sm),
    },
    chatInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    chatAvatar: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: moderateScale(spacing.sm),
    },
    chatAvatarText: {
      fontWeight: 'bold',
    },
    chatDetails: {
      flex: 1,
    },
    chatName: {
      fontWeight: 'bold',
    },
    chatStatus: {
      marginTop: moderateScale(spacing.xs / 2),
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      padding: moderateScale(spacing.xs),
      marginLeft: moderateScale(spacing.xs),
    },
    messagesList: {
      flex: 1,
    },
    messagesContent: {
      paddingHorizontal: moderateScale(spacing.md),
      paddingVertical: moderateScale(spacing.sm),
    },
    messageContainer: {
      flexDirection: 'row',
      marginVertical: moderateScale(spacing.xs / 2),
      position: 'relative',
    },
    ownMessageContainer: {
      justifyContent: 'flex-end',
    },
    otherMessageContainer: {
      justifyContent: 'flex-start',
    },
    firstInGroup: {
      marginTop: moderateScale(spacing.sm),
    },
    lastInGroup: {
      marginBottom: moderateScale(spacing.sm),
    },
    messageBubble: {
      maxWidth: '75%',
      paddingHorizontal: moderateScale(spacing.md),
      paddingVertical: moderateScale(spacing.sm),
      borderRadius: moderateScale(18),
    },
    ownMessageBubble: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: moderateScale(4),
    },
    otherMessageBubble: {
      backgroundColor: colors.inputBorder,
      borderBottomLeftRadius: moderateScale(4),
    },
    typingBubble: {
      paddingHorizontal: moderateScale(spacing.md),
      paddingVertical: moderateScale(spacing.md),
    },
    messageText: {
      lineHeight: moderateScale(20),
    },
    messageFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: moderateScale(spacing.xs),
    },
    messageTime: {
      marginRight: moderateScale(spacing.xs),
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarContainer: {
      marginLeft: moderateScale(spacing.xs),
      alignSelf: 'flex-end',
    },
    avatar: {
      width: moderateScale(32),
      height: moderateScale(32),
      borderRadius: moderateScale(16),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontWeight: 'bold',
    },
    messageOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    replyContainer: {
      marginBottom: moderateScale(spacing.xs),
      paddingHorizontal: moderateScale(spacing.sm),
      paddingVertical: moderateScale(spacing.xs),
      borderRadius: moderateScale(8),
      borderLeftWidth: 3,
    },
    ownReplyContainer: {
      backgroundColor: `${colors.primary}20`,
      borderLeftColor: colors.primary,
    },
    otherReplyContainer: {
      backgroundColor: `${colors.inputBorder}50`,
      borderLeftColor: colors.inputBorder,
    },
    replySender: {
      fontWeight: 'bold',
      marginBottom: moderateScale(spacing.xs / 2),
    },
    replyText: {
      lineHeight: moderateScale(16),
    },
    typingDots: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    typingDot: {
      width: moderateScale(6),
      height: moderateScale(6),
      borderRadius: moderateScale(3),
      backgroundColor: colors.paragraph,
      marginHorizontal: moderateScale(spacing.xs / 2),
    },
    typingDot1: {
      opacity: 0.4,
    },
    typingDot2: {
      opacity: 0.6,
    },
    typingDot3: {
      opacity: 0.8,
    },
    inputContainer: {
      borderTopWidth: 1,
      borderTopColor: colors.inputBorder,
      backgroundColor: colors.backgroundColor,
      paddingHorizontal: moderateScale(spacing.md),
      paddingVertical: moderateScale(spacing.sm),
    },
    replyPreview: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBorder,
      borderRadius: moderateScale(8),
      padding: moderateScale(spacing.sm),
      marginBottom: moderateScale(spacing.sm),
    },
    replyPreviewContent: {
      flex: 1,
    },
    replyPreviewSender: {
      fontWeight: 'bold',
      marginBottom: moderateScale(spacing.xs / 2),
    },
    replyPreviewText: {
      lineHeight: moderateScale(16),
    },
    cancelReplyButton: {
      padding: moderateScale(spacing.xs),
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    inputButton: {
      padding: moderateScale(spacing.sm),
      marginHorizontal: moderateScale(spacing.xs),
    },
    textInputContainer: {
      flex: 1,
      marginHorizontal: moderateScale(spacing.xs),
    },
    inputWrapper: {
      backgroundColor: colors.inputBorder,
      borderRadius: moderateScale(20),
      paddingHorizontal: moderateScale(spacing.md),
      paddingVertical: moderateScale(spacing.sm),
      minHeight: moderateScale(40),
      maxHeight: moderateScale(100),
    },
    textInput: {
      padding: 0,
      margin: 0,
      fontSize: moderateScale(16),
    },
    sendButton: {
      backgroundColor: colors.primary,
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: moderateScale(spacing.xs),
    },
    sendButtonDisabled: {
      backgroundColor: colors.inputBorder,
    },
    sendButtonText: {
      fontSize: moderateScale(16),
      fontWeight: 'bold',
    },
  });
