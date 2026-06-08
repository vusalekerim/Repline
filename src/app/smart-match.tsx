import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SUBJECTS } from '../constants/subjects';

const PRIMARY = '#2ca48e';
const DARK = '#0F172A';

const FREQUENCIES = ['1 dərs', '2 dərs', '3 dərs', '3+ dərs'];
const BUDGETS = ['20-30 AZN', '30-50 AZN', '50+ AZN'];
const FORMAT_OPTIONS = ['👤 Fərdi dərs', '👥 Qrup dərsi', '🔄 Fərqi yoxdur'];
const LEARN_STYLES = [
  'Vizual (şəkil, video)',
  'Audial (dinləmə)',
  'Praktik (məşq)',
  'Qarışıq',
];

const MATCHES: Record<string, { name: string; subject: string; initials: string; color: string; rating: number; price: string; match: number }> = {
  Riyaziyyat:     { name: 'Lalə Kərimova',       subject: 'Riyaziyyat',      initials: 'LK', color: '#f59e0b', rating: 4.8, price: '30 AZN/saat', match: 97 },
  Fizika:         { name: 'Lalə Kərimova',       subject: 'Riyaziyyat·Fizika', initials: 'LK', color: '#f59e0b', rating: 4.8, price: '30 AZN/saat', match: 93 },
  'İngilis dili': { name: 'Pərvanə Abdullayeva', subject: 'İngilis dili',    initials: 'PA', color: '#8b5cf6', rating: 4.8, price: '35 AZN/saat', match: 98 },
  'Azərbaycan dili': { name: 'Samirə Haqverdiyeva', subject: 'Azərbaycan dili', initials: 'SH', color: '#3b82f6', rating: 4.9, price: '30 AZN/saat', match: 99 },
};

function getMatch(subject: string) {
  return MATCHES[subject] ?? {
    name: 'Vüsalə Kərimova', subject, initials: 'VK', color: PRIMARY, rating: 4.9, price: '30 AZN/saat', match: 95,
  };
}

export default function SmartMatchScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [subject, setSubject] = useState('');
  const [frequency, setFrequency] = useState('');
  const [budget, setBudget] = useState('');
  const [format, setFormat] = useState('');
  const [learnStyle, setLearnStyle] = useState('');

  const isResult = step === 3;
  const progressSteps = Math.min(step + 1, 3);
  const teacher = getMatch(subject);

  function handleBack() {
    if (step === 0) router.push('/');
    else if (step === 3) setStep(2);
    else setStep(step - 1);
  }

  function canProceed() {
    if (step === 0) return !!subject;
    if (step === 1) return !!frequency && !!budget && !!format;
    if (step === 2) return !!learnStyle;
    return false;
  }

  function handleNext() {
    setStep(step === 2 ? 3 : step + 1);
  }

  function reset() {
    setStep(0); setSubject(''); setFrequency(''); setBudget(''); setFormat(''); setLearnStyle('');
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with progress bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.round((progressSteps / 3) * 100)}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {isResult ? '✓ Tamamlandı' : `${progressSteps}/3`}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 0 — Subject */}
        {step === 0 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepEmoji}>📚</Text>
            <Text style={styles.stepTitle}>Hansı fənni öyrənmək istəyirsən?</Text>
            <Text style={styles.stepSubtitle}>Bir fənn seç</Text>
            <View style={styles.chipGrid}>
              {SUBJECTS.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, subject === s && styles.chipActive]}
                  onPress={() => setSubject(s)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.chipText, subject === s && styles.chipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 1 — Frequency + Budget + Format */}
        {step === 1 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepEmoji}>📅</Text>
            <Text style={styles.stepTitle}>Həftədə neçə dərs istəyirsən?</Text>
            <View style={styles.chipRow}>
              {FREQUENCIES.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.chip, frequency === f && styles.chipActive]}
                  onPress={() => setFrequency(f)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.chipText, frequency === f && styles.chipTextActive]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.stepTitleSecond}>Büdcən nə qədərdir?</Text>
            <Text style={styles.stepSubtitle}>Saatlıq qiymət</Text>
            <View style={styles.chipRow}>
              {BUDGETS.map((b) => (
                <TouchableOpacity
                  key={b}
                  style={[styles.chip, budget === b && styles.chipActive]}
                  onPress={() => setBudget(b)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.chipText, budget === b && styles.chipTextActive]}>{b}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.stepTitleSecond}>Dərs formatını seç</Text>
            <View style={styles.chipRow}>
              {FORMAT_OPTIONS.map((f) => (
                <TouchableOpacity
                  key={f}
                  style={[styles.chip, format === f && styles.chipActive]}
                  onPress={() => setFormat(f)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.chipText, format === f && styles.chipTextActive]}>{f}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Step 2 — Learning style */}
        {step === 2 && (
          <View style={styles.stepWrap}>
            <Text style={styles.stepEmoji}>🧠</Text>
            <Text style={styles.stepTitle}>Öyrənmə üslubun?</Text>
            <Text style={styles.stepSubtitle}>Ən uyğun üslubu seç</Text>
            <View style={styles.chipGrid}>
              {LEARN_STYLES.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.chip, styles.chipFull, learnStyle === s && styles.chipActive]}
                  onPress={() => setLearnStyle(s)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.chipText, learnStyle === s && styles.chipTextActive]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Result */}
        {isResult && (
          <View style={styles.resultWrap}>
            <Text style={styles.resultEmoji}>🎉</Text>
            <Text style={styles.resultTitle}>Uyğun müəllim tapıldı!</Text>
            <Text style={styles.resultSubtitle}>{subject} üzrə sizin üçün ən uyğun müəllim:</Text>

            <View style={styles.matchCard}>
              <View style={styles.matchPercentBadge}>
                <Text style={styles.matchPercentText}>🎯 {teacher.match}% uyğun</Text>
              </View>

              <View style={[styles.matchAvatar, { backgroundColor: teacher.color }]}>
                <Text style={styles.matchAvatarText}>{teacher.initials}</Text>
              </View>
              <Text style={styles.matchName}>{teacher.name}</Text>
              <Text style={styles.matchSubject}>{teacher.subject}</Text>

              <View style={styles.matchTags}>
                <View style={styles.tagYellow}>
                  <Text style={styles.tagYellowText}>★ {teacher.rating}</Text>
                </View>
                <View style={styles.tagGreen}>
                  <Text style={styles.tagGreenText}>{teacher.price}</Text>
                </View>
              </View>

              {/* Summary row */}
              <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>{frequency}</Text>
                  <Text style={styles.summaryLabel}>Dərs/həftə</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryValue}>{budget}</Text>
                  <Text style={styles.summaryLabel}>Büdcə</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { fontSize: 11 }]}>
                    {format.split(' ').slice(0, 2).join(' ')}
                  </Text>
                  <Text style={styles.summaryLabel}>Format</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={reset} style={styles.retryBtn}>
              <Text style={styles.retryText}>↩ Yenidən axtar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Sticky bottom button */}
      <View style={styles.footer}>
        {isResult ? (
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => router.push('/teacher-profile')}
            activeOpacity={0.85}
          >
            <Text style={styles.nextBtnText}>Profilə bax →</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.nextBtn, !canProceed() && styles.nextBtnDisabled]}
            onPress={handleNext}
            disabled={!canProceed()}
            activeOpacity={0.85}
          >
            <Text style={styles.nextBtnText}>
              {step === 2 ? 'Müəllimimi tap! 🎯' : 'Növbəti →'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 14,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: { fontSize: 18, color: '#374151', fontWeight: '600' },
  progressWrap: { flex: 1, gap: 6 },
  progressTrack: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    backgroundColor: PRIMARY,
    borderRadius: 3,
  },
  progressLabel: { fontSize: 12, color: '#6b7280', fontWeight: '600' },

  scroll: { padding: 24, paddingBottom: 8 },

  stepWrap: { gap: 16 },
  stepEmoji: { fontSize: 44 },
  stepTitle: { fontSize: 24, fontWeight: '800', color: DARK, lineHeight: 32 },
  stepTitleSecond: { fontSize: 20, fontWeight: '700', color: DARK, marginTop: 8 },
  stepSubtitle: { fontSize: 14, color: '#6b7280', marginTop: -8 },

  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  chipFull: { width: '100%' },
  chipActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  chipText: { fontSize: 14, color: '#4b5563', fontWeight: '500' },
  chipTextActive: { color: '#ffffff', fontWeight: '700' },

  resultWrap: { alignItems: 'center', gap: 14 },
  resultEmoji: { fontSize: 56 },
  resultTitle: { fontSize: 26, fontWeight: '800', color: DARK },
  resultSubtitle: { fontSize: 14, color: '#6b7280', textAlign: 'center' },

  matchCard: {
    width: '100%',
    backgroundColor: '#f0faf7',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  matchPercentBadge: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 4,
  },
  matchPercentText: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
  matchAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  matchAvatarText: { color: '#ffffff', fontSize: 26, fontWeight: '800' },
  matchName: { fontSize: 20, fontWeight: '800', color: DARK },
  matchSubject: { fontSize: 14, color: '#6b7280' },
  matchTags: { flexDirection: 'row', gap: 8, marginTop: 2 },
  tagYellow: { backgroundColor: '#fef3c7', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  tagYellowText: { color: '#d97706', fontSize: 12, fontWeight: '700' },
  tagGreen: { backgroundColor: '#ecfdf5', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  tagGreenText: { color: PRIMARY, fontSize: 12, fontWeight: '700' },

  summaryRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
  },
  summaryItem: { flex: 1, alignItems: 'center', gap: 3 },
  summaryValue: { fontSize: 13, fontWeight: '700', color: DARK },
  summaryLabel: { fontSize: 11, color: '#9ca3af' },
  summaryDivider: { width: 1, backgroundColor: '#e5e7eb', marginVertical: 4 },

  retryBtn: { paddingVertical: 8 },
  retryText: { color: '#6b7280', fontSize: 14, fontWeight: '500' },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  nextBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnDisabled: { opacity: 0.4, shadowOpacity: 0, elevation: 0 },
  nextBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
