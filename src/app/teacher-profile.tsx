import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabBar from '../components/BottomTabBar';

const PRIMARY = '#2ca48e';
const DARK = '#0F172A';

const REVIEWS = [
  {
    id: '1',
    student: 'Aytən M.',
    rating: 5,
    date: 'May 2025',
    text: 'Vüsalə xanım çox peşəkar müəllimədir. Onun sayəsində buraxılış imtahanını yüksək qiymətlə bitirdim.',
  },
  {
    id: '2',
    student: 'Rauf H.',
    rating: 5,
    date: 'Aprel 2025',
    text: 'Dərsləri çox maraqlı keçir, hər mövzunu sadə şəkildə izah edir. Tövsiyə edirəm!',
  },
];

export default function TeacherProfileScreen() {
  const router = useRouter();
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/teacher-list')} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Müəllim profili</Text>
        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareBtnText}>⤴</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.avatarShadow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>VK</Text>
            </View>
          </View>
          <Text style={styles.name}>Vüsalə Kərimova</Text>
          <Text style={styles.subject}>Riyaziyyat · İnformatika</Text>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, styles.badgeYellow]}>
              <Text style={styles.badgeYellowText}>★ 4.9</Text>
            </View>
            <View style={[styles.badge, styles.badgeGreen]}>
              <Text style={styles.badgeGreenText}>30 AZN/saat</Text>
            </View>
            <View style={[styles.badge, styles.badgeBlue]}>
              <Text style={styles.badgeBlueText}>10 il təcrübə</Text>
            </View>
            <View style={[styles.badge, styles.badgeFormat]}>
              <Text style={styles.badgeFormatText}>👤 Fərdi</Text>
            </View>
          </View>
        </View>

        {/* Bio */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Haqqında</Text>
          <Text style={styles.bioText}>
            10 illik təcrübəyə sahib riyaziyyat müəllimi. Buraxılış və olimpiada hazırlığı üzrə
            ixtisaslaşmışam. Hər şagirdin öyrənmə tempinə uyğun yanaşma tətbiq edirəm.
          </Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'Şagird', value: '120+' },
            { label: 'Dərs', value: '850+' },
            { label: 'Rəy', value: '42' },
          ].map((s, i, arr) => (
            <View key={s.label} style={[styles.statItem, i < arr.length - 1 && styles.statBorder]}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Video placeholder */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tanıtım videosu</Text>
          <View style={styles.videoBox}>
            <View style={styles.playCircle}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            <Text style={styles.videoLabel}>Dərs videosuna bax</Text>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle}>Şagird rəyləri</Text>
            <Text style={styles.reviewCount}>42 rəy</Text>
          </View>
          {REVIEWS.map((r) => (
            <View key={r.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{r.student[0]}</Text>
                </View>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewStudent}>{r.student}</Text>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <Text style={styles.reviewStars}>{'★'.repeat(r.rating)}</Text>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
            </View>
          ))}
        </View>

        {/* Rate teacher */}
        <View style={styles.card}>
          {submitted ? (
            <View style={styles.ratingSuccess}>
              <Text style={styles.ratingSuccessEmoji}>⭐</Text>
              <Text style={styles.ratingSuccessText}>Rəyiniz üçün təşəkkür edirik!</Text>
            </View>
          ) : (
            <>
              <Text style={styles.cardTitle}>Müəllimi qiymətləndir</Text>
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => setSelectedRating(i)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.ratingStar, selectedRating >= i && styles.ratingStarFilled]}>
                      {selectedRating >= i ? '★' : '☆'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.ratingInput}
                placeholder="Rəyinizi yazın..."
                placeholderTextColor="#9ca3af"
                value={reviewText}
                onChangeText={setReviewText}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[
                  styles.ratingSubmitBtn,
                  (!selectedRating || !reviewText.trim()) && styles.ratingSubmitBtnDisabled,
                ]}
                onPress={() => {
                  if (selectedRating && reviewText.trim()) setSubmitted(true);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.ratingSubmitText}>Rəy göndər</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Contact CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactBtn} activeOpacity={0.85}>
          <Text style={styles.contactBtnText}>Əlaqə saxla</Text>
        </TouchableOpacity>
      </View>

      <BottomTabBar />
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
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 17, fontWeight: '700', color: DARK },
  shareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtnText: { fontSize: 16, color: '#374151' },
  scroll: { paddingBottom: 8, gap: 16 },

  hero: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    gap: 8,
    backgroundColor: '#f0faf7',
  },
  avatarShadow: {
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 8,
    borderRadius: 48,
    marginBottom: 4,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  avatarText: { color: '#ffffff', fontSize: 30, fontWeight: '800' },
  name: { fontSize: 24, fontWeight: '800', color: DARK },
  subject: { fontSize: 15, color: '#6b7280' },
  badgeRow: { flexDirection: 'row', gap: 8, marginTop: 4 },
  badge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  badgeYellow: { backgroundColor: '#fef3c7' },
  badgeYellowText: { color: '#d97706', fontSize: 12, fontWeight: '700' },
  badgeGreen: { backgroundColor: '#ecfdf5' },
  badgeGreenText: { color: PRIMARY, fontSize: 12, fontWeight: '700' },
  badgeBlue: { backgroundColor: '#eff6ff' },
  badgeBlueText: { color: '#3b82f6', fontSize: 12, fontWeight: '600' },
  badgeFormat: { backgroundColor: '#f0faf7', borderWidth: 1, borderColor: '#d1fae5' },
  badgeFormatText: { color: PRIMARY, fontSize: 12, fontWeight: '600' },

  card: {
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
    gap: 12,
  },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: DARK },
  reviewCount: { fontSize: 13, color: '#6b7280' },
  bioText: { fontSize: 14, color: '#4b5563', lineHeight: 22 },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#f0faf7',
    borderRadius: 16,
    padding: 20,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 4, position: 'relative' },
  statBorder: { borderRightWidth: 1, borderRightColor: '#d1fae5' },
  statValue: { fontSize: 22, fontWeight: '800', color: PRIMARY },
  statLabel: { fontSize: 12, color: '#6b7280', fontWeight: '500' },

  videoBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  playCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { color: '#ffffff', fontSize: 18 },
  videoLabel: { fontSize: 14, color: '#6b7280', fontWeight: '500' },

  reviewItem: {
    gap: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f0faf7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: { fontSize: 14, fontWeight: '700', color: PRIMARY },
  reviewMeta: { flex: 1 },
  reviewStudent: { fontSize: 14, fontWeight: '600', color: DARK },
  reviewDate: { fontSize: 11, color: '#9ca3af' },
  reviewStars: { color: '#f59e0b', fontSize: 13 },
  reviewText: { fontSize: 13, color: '#4b5563', lineHeight: 20 },

  ratingStars: { flexDirection: 'row', gap: 8 },
  ratingStar: { fontSize: 36, color: '#d1d5db' },
  ratingStarFilled: { color: '#f59e0b' },
  ratingInput: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 13,
    fontSize: 14,
    color: DARK,
    minHeight: 90,
    backgroundColor: '#fafafa',
  },
  ratingSubmitBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  ratingSubmitBtnDisabled: { opacity: 0.4 },
  ratingSubmitText: { color: '#ffffff', fontSize: 15, fontWeight: '700' },
  ratingSuccess: { alignItems: 'center', paddingVertical: 16, gap: 8 },
  ratingSuccessEmoji: { fontSize: 40 },
  ratingSuccessText: { fontSize: 17, fontWeight: '700', color: PRIMARY, textAlign: 'center' },

  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  contactBtn: {
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
  contactBtnText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
});
