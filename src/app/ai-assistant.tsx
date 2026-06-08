import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabBar from '../components/BottomTabBar';
import ReplineLogo from '../components/ReplineLogo';

const PRIMARY = '#2ca48e';
const DARK = '#0F172A';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const SUGGESTIONS = [
  { id: '1', label: '🎯 Mənə uyğun müəllim tap' },
  { id: '2', label: '💰 Büdcəmə uyğun' },
  { id: '3', label: '⭐ Ən yüksək reytingli' },
];

const AI_REPLIES: Record<string, string> = {
  '🎯 Mənə uyğun müəllim tap':
    'Sizin üçün Vüsalə Kərimova müəllimini tövsiyə edirəm! ⭐ 4.9 reytinq, 30 AZN/saat. Hər şagirdə fərdi yanaşması ilə tanınır. Profili yoxlamaq istərsinizmi?',
  '💰 Büdcəmə uyğun':
    'Büdcənizə uyğun ən yaxşı seçimlər:\n• Vüsalə Kərimova — 30 AZN/saat ⭐ 4.9\n• Samirə Haqverdiyeva — 30 AZN/saat ⭐ 4.9\n• Lalə Kərimova — 30 AZN/saat ⭐ 4.8',
  '⭐ Ən yüksək reytingli':
    'Ən yüksək reytinqli müəllimlər:\n🥇 Vüsalə Kərimova (4.9★) — İnformatika\n🥇 Samirə Haqverdiyeva (4.9★) — Azərbaycan dili\n🥈 Pərvanə Abdullayeva (4.8★) — İngilis dili',
};

const DEFAULT_REPLY =
  'Başa düşdüm! Sizin üçün uyğun müəllim tapacağam. Hansı fənn üzrə dərs almaq istərdiniz?';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '0',
    text: 'Salam! 👋 Sizə ən uyğun müəllimi tapmaqda kömək edə bilərəm. Aşağıdakı seçimlərdən birini seçin və ya birbaşa sualınızı yazın.',
    isUser: false,
  },
];

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: `u-${Date.now()}`, text: trimmed, isUser: true };
    const reply = AI_REPLIES[trimmed] ?? DEFAULT_REPLY;
    const aiMsg: Message = { id: `a-${Date.now()}`, text: reply, isUser: false };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Dark header */}
      <View style={styles.header}>
        <ReplineLogo size="sm" textColor="#ffffff" />
        <Text style={styles.headerTitle}>AI Köməkçi 🤖</Text>
        <Text style={styles.headerSubtitle}>Ən uyğun müəllimi tapaq</Text>

        {/* Suggestion chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestions}
        >
          {SUGGESTIONS.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={styles.suggestionChip}
              onPress={() => send(s.label)}
              activeOpacity={0.8}
            >
              <Text style={styles.suggestionText}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Chat area */}
      <KeyboardAvoidingView
        style={styles.chatArea}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[styles.bubble, msg.isUser ? styles.bubbleUser : styles.bubbleAI]}
            >
              {!msg.isUser && (
                <View style={styles.aiAvatar}>
                  <Text style={styles.aiAvatarText}>AI</Text>
                </View>
              )}
              <View
                style={[
                  styles.bubbleBody,
                  msg.isUser ? styles.bubbleBodyUser : styles.bubbleBodyAI,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    msg.isUser ? styles.bubbleTextUser : styles.bubbleTextAI,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input row */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Mesaj yazın..."
            placeholderTextColor="#9ca3af"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => send(input)}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
            onPress={() => send(input)}
            activeOpacity={0.8}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>

        <BottomTabBar />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: DARK },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    gap: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  suggestions: {
    gap: 8,
    paddingVertical: 4,
  },
  suggestionChip: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  suggestionText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  chat: { flex: 1 },
  chatContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 8,
  },
  bubble: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  bubbleUser: {
    justifyContent: 'flex-end',
  },
  bubbleAI: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  aiAvatarText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  bubbleBody: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleBodyUser: {
    backgroundColor: PRIMARY,
    borderBottomRightRadius: 4,
  },
  bubbleBodyAI: {
    backgroundColor: '#f3f4f6',
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextUser: { color: '#ffffff' },
  bubbleTextAI: { color: DARK },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    gap: 10,
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
    color: DARK,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: { opacity: 0.4 },
  sendIcon: { color: '#ffffff', fontSize: 16 },
});
