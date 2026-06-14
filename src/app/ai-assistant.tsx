import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = '#2ca48e';
const GEMINI_API_KEY = 'AIzaSyB6q-587pjdtUfchn3sqNdur2cH5v5rDv4';

const SUGGESTIONS = [
  '🎯 Mənə uyğun müəllim tap',
  '💰 Büdcəmə uyğun müəllim',
  '⭐ Ən yüksək reytingli müəllim',
];

type Message = {
  role: 'user' | 'ai';
  text: string;
};

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: 'Salam! 👋 Sizə ən uyğun müəllimi tapmaqda kömək edə bilərəm. Aşağıdakı seçimlərdən birini seçin və ya birbaşa sualınızı yazın.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Sən Repline adlı Azərbaycan repetitorluq platformasının AI köməkçisisən. Şagirdlərə ən uyğun müəllimi tapmaqda kömək edirsən. Qısa, mehriban və Azərbaycan dilində cavab ver. İstifadəçi sualı: ${text}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Bağışlayın, cavab verə bilmədim. Yenidən cəhd edin.';

      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'ai', text: 'Xəta baş verdi. İnternet bağlantınızı yoxlayın.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

          <View style={styles.header}>
            <Pressable onPress={() => router.push('/')}>
              <Text style={styles.backText}>← Geri</Text>
            </Pressable>
            <Text style={styles.title}>AI Köməkçi 🤖</Text>
            <Text style={styles.subtitle}>Ən uyğun müəllimi tapaq</Text>
          </View>

          <View style={styles.suggestions}>
            {SUGGESTIONS.map(s => (
              <Pressable
                key={s}
                style={styles.chip}
                onPress={() => sendMessage(s)}>
                <Text style={styles.chipText}>{s}</Text>
              </Pressable>
            ))}
          </View>

          <ScrollView
            style={styles.chat}
            contentContainerStyle={styles.chatContent}>
            {messages.map((msg, i) => (
              <View
                key={i}
                style={[
                  styles.bubble,
                  msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}>
                {msg.role === 'ai' && (
                  <View style={styles.aiAvatar}>
                    <Text style={styles.aiAvatarText}>AI</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.bubbleText,
                    msg.role === 'user'
                      ? styles.userBubbleText
                      : styles.aiBubbleText,
                  ]}>
                  <Text
                    style={
                      msg.role === 'user'
                        ? styles.userText
                        : styles.aiText
                    }>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
            {loading && (
              <View style={styles.bubble}>
                <View style={styles.aiAvatar}>
                  <Text style={styles.aiAvatarText}>AI</Text>
                </View>
                <View style={styles.aiBubbleText}>
                  <Text style={styles.aiText}>Yazır...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Mesaj yazın..."
              placeholderTextColor="#94a3b8"
              value={input}
              onChangeText={setInput}
              multiline
            />
            <Pressable
              style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
              onPress={() => sendMessage(input)}
              disabled={!input.trim() || loading}>
              <Text style={styles.sendIcon}>➤</Text>
            </Pressable>
          </View>

        </KeyboardAvoidingView>
      </SafeAreaView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.tab} onPress={() => router.push('/')}>
          <Text style={styles.tabIcon}>🏠</Text>
          <Text style={styles.tabLabel}>Ana səhifə</Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => router.push('/search')}>
          <Text style={styles.tabIcon}>🔍</Text>
          <Text style={styles.tabLabel}>Axtar</Text>
        </Pressable>
        <Pressable style={[styles.tab, styles.tabActive]}>
          <Text style={styles.tabIcon}>🤖</Text>
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>AI</Text>
        </Pressable>
        <Pressable style={styles.tab} onPress={() => router.push('/profile')}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabLabel}>Profil</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  header: { padding: 20, paddingBottom: 12 },
  backText: { fontSize: 14, color: PRIMARY, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#F8FAFC' },
  subtitle: { fontSize: 13, color: '#64748b', marginTop: 2 },
  suggestions: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 8, paddingHorizontal: 20, marginBottom: 12,
  },
  chip: {
    backgroundColor: 'rgba(44,164,142,0.15)',
    borderWidth: 1, borderColor: 'rgba(44,164,142,0.3)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7,
  },
  chipText: { fontSize: 12, color: PRIMARY },
  chat: { flex: 1, paddingHorizontal: 16 },
  chatContent: { paddingBottom: 16, gap: 12 },
  bubble: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  userBubble: { flexDirection: 'row-reverse' },
  aiBubble: { flexDirection: 'row' },
  aiAvatar: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: 'center', justifyContent: 'center',
  },
  aiAvatarText: { fontSize: 9, color: '#fff', fontWeight: '700' },
  bubbleText: { maxWidth: '78%', borderRadius: 14, padding: 12 },
  userBubbleText: { backgroundColor: PRIMARY, borderBottomRightRadius: 4 },
  aiBubbleText: { backgroundColor: '#1e293b', borderBottomLeftRadius: 4 },
  userText: { fontSize: 14, color: '#ffffff', lineHeight: 20 },
  aiText: { fontSize: 14, color: '#e2e8f0', lineHeight: 20 },
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end',
    gap: 10, padding: 12,
    borderTopWidth: 0.5, borderTopColor: '#1e293b',
    backgroundColor: '#0F172A',
  },
  input: {
    flex: 1, backgroundColor: '#1e293b',
    borderRadius: 20, paddingHorizontal: 16,
    paddingVertical: 10, fontSize: 14,
    color: '#F8FAFC', maxHeight: 100,
  },
  sendBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: PRIMARY,
    alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: '#334155' },
  sendIcon: { fontSize: 16, color: '#ffffff' },
  bottomBar: {
    flexDirection: 'row', backgroundColor: '#ffffff',
    paddingVertical: 8, borderTopWidth: 0.5, borderTopColor: '#f1f5f9',
  },
  tab: { flex: 1, alignItems: 'center', gap: 2 },
  tabActive: { borderTopWidth: 2, borderTopColor: PRIMARY },
  tabIcon: { fontSize: 20 },
  tabLabel: { fontSize: 10, color: '#94a3b8' },
  tabLabelActive: { color: PRIMARY, fontWeight: '600' },
});