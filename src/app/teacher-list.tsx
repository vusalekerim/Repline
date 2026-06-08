import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabBar from '../components/BottomTabBar';
import ReplineLogo from '../components/ReplineLogo';

const PRIMARY = '#2ca48e';
const DARK = '#0F172A';

const TEACHERS = [
  {
    id: '1',
    name: 'Vüsalə Kərimova',
    subject: 'İnformatika',
    rating: 4.9,
    reviews: 42,
    price: '30 AZN/saat',
    initials: 'VK',
    color: '#2ca48e',
    badge: 'Top müəllim',
    format: '👤 Fərdi',
  },
  {
    id: '2',
    name: 'Samirə Haqverdiyeva',
    subject: 'Azərbaycan dili',
    rating: 4.9,
    reviews: 38,
    price: '30 AZN/saat',
    initials: 'SH',
    color: '#3b82f6',
    badge: null,
    format: '👤 Fərdi',
  },
  {
    id: '3',
    name: 'Pərvanə Abdullayeva',
    subject: 'İngilis dili',
    rating: 4.8,
    reviews: 31,
    price: '35 AZN/saat',
    initials: 'PA',
    color: '#8b5cf6',
    badge: null,
    format: '👥 Qrup',
  },
  {
    id: '4',
    name: 'Lalə Kərimova',
    subject: 'Riyaziyyat',
    rating: 4.8,
    reviews: 27,
    price: '30 AZN/saat',
    initials: 'LK',
    color: '#f59e0b',
    badge: null,
    format: '👤 Fərdi',
  },
];

export default function TeacherListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <ReplineLogo size="sm" />
      </View>

      {/* Title */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Müəllimlər</Text>
        <Text style={styles.subtitle}>Sizin üçün uyğun müəllimlər</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {TEACHERS.map((t) => (
          <View key={t.id} style={styles.card}>
            {t.badge && (
              <View style={styles.badgeWrap}>
                <Text style={styles.badgeText}>🏆 {t.badge}</Text>
              </View>
            )}

            <View style={styles.cardTop}>
              <View style={[styles.avatar, { backgroundColor: t.color }]}>
                <Text style={styles.avatarText}>{t.initials}</Text>
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{t.name}</Text>
                <Text style={styles.subject}>{t.subject}</Text>
                <View style={styles.metaRow}>
                  <Text style={styles.rating}>★ {t.rating}</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.reviews}>{t.reviews} rəy</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.price}>{t.price}</Text>
                </View>
                <View style={styles.formatBadge}>
                  <Text style={styles.formatBadgeText}>{t.format}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.profileBtn}
              onPress={() => router.push('/teacher-profile')}
              activeOpacity={0.8}
            >
              <Text style={styles.profileBtnText}>Profilə bax →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
  titleRow: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 4,
    gap: 2,
  },
  title: { fontSize: 26, fontWeight: '800', color: DARK },
  subtitle: { fontSize: 14, color: '#6b7280' },
  scroll: {
    padding: 20,
    gap: 14,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    gap: 14,
    overflow: 'hidden',
  },
  badgeWrap: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: -4,
  },
  badgeText: { fontSize: 11, color: '#d97706', fontWeight: '600' },
  cardTop: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#ffffff', fontSize: 19, fontWeight: '700' },
  info: { flex: 1, gap: 3 },
  name: { fontSize: 16, fontWeight: '700', color: DARK },
  subject: { fontSize: 13, color: '#6b7280' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  rating: { fontSize: 12, color: '#f59e0b', fontWeight: '700' },
  dot: { fontSize: 12, color: '#d1d5db' },
  reviews: { fontSize: 12, color: '#9ca3af' },
  price: { fontSize: 12, color: PRIMARY, fontWeight: '600' },
  formatBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0faf7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  formatBadgeText: { fontSize: 11, color: PRIMARY, fontWeight: '600' },
  profileBtn: {
    backgroundColor: '#f0faf7',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  profileBtnText: { color: PRIMARY, fontSize: 14, fontWeight: '700' },
});
