import { useRouter } from 'expo-router';
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
import ReplineLogo from '../components/ReplineLogo';

const PRIMARY = '#2ca48e';
const DARK = '#0F172A';

const POPULAR_TEACHERS = [
  { id: '1', name: 'Vüsalə Kərimova', subject: 'İnformatika', rating: 4.9, price: '30 AZN/saat', initials: 'VK', color: '#2ca48e' },
  { id: '2', name: 'Samirə Haqverdiyeva', subject: 'Azərbaycan dili', rating: 4.9, price: '30 AZN/saat', initials: 'SH', color: '#3b82f6' },
];

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <ReplineLogo />
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.loginBtnText}>Giriş</Text>
          </TouchableOpacity>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Doğru müəllim,</Text>
          <Text style={[styles.heroTitle, { color: PRIMARY }]}>doğru nəticə.</Text>
          <Text style={styles.heroSubtitle}>
            Azərbaycanın ən yaxşı müəllimləri ilə birbaşa əlaqə saxlayın.
          </Text>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => router.push('/search')}
          activeOpacity={0.85}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Müəllim axtar...</Text>
        </TouchableOpacity>

        {/* Smart Match Banner */}
        <TouchableOpacity
          style={styles.smartBanner}
          onPress={() => router.push('/smart-match')}
          activeOpacity={0.9}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>🎯 3 suala cavab ver, uyğun müəllimini tap!</Text>
            <Text style={styles.bannerSubtitle}>AI dəstəkli uyğunlaşma sistemi</Text>
          </View>
          <View style={styles.bannerBtn}>
            <Text style={styles.bannerBtnText}>Başla →</Text>
          </View>
        </TouchableOpacity>

        {/* Populyar müəllimlər */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Populyar müəllimlər</Text>
            <TouchableOpacity onPress={() => router.push('/teacher-list')}>
              <Text style={styles.seeAll}>Hamısı →</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.teacherCards}
          >
            {POPULAR_TEACHERS.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={styles.teacherCard}
                onPress={() => router.push('/teacher-profile')}
                activeOpacity={0.85}
              >
                <View style={[styles.teacherAvatar, { backgroundColor: t.color }]}>
                  <Text style={styles.teacherInitials}>{t.initials}</Text>
                </View>
                <Text style={styles.teacherName}>{t.name}</Text>
                <Text style={styles.teacherSubject}>{t.subject}</Text>
                <View style={styles.teacherMeta}>
                  <Text style={styles.teacherRating}>★ {t.rating}</Text>
                  <Text style={styles.teacherPrice}>{t.price}</Text>
                </View>
                <View style={styles.teacherBtn}>
                  <Text style={styles.teacherBtnText}>Profili gör</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hesabınız yoxdur?</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Role buttons */}
        <View style={styles.roleButtons}>
          <TouchableOpacity
            style={styles.btnFilled}
            onPress={() => router.push('/student-register')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnFilledText}>🎓 Şagirdəm</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnOutline}
            onPress={() => router.push('/teacher-register')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnOutlineText}>📖 Müəlliməm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0faf7' },
  scroll: { paddingBottom: 16, gap: 24 },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  loginBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: PRIMARY,
  },
  loginBtnText: { color: PRIMARY, fontSize: 14, fontWeight: '600' },

  hero: {
    paddingHorizontal: 20,
    gap: 4,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: DARK,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 8,
    lineHeight: 22,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchIcon: { fontSize: 18 },
  searchPlaceholder: { flex: 1, fontSize: 15, color: '#9ca3af' },

  section: { gap: 14 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: DARK },
  seeAll: { fontSize: 13, color: PRIMARY, fontWeight: '600' },

  teacherCards: {
    paddingHorizontal: 20,
    gap: 14,
  },
  teacherCard: {
    width: 180,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  teacherAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  teacherInitials: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  teacherName: { fontSize: 14, fontWeight: '700', color: DARK },
  teacherSubject: { fontSize: 12, color: '#6b7280' },
  teacherMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  teacherRating: { fontSize: 12, color: '#f59e0b', fontWeight: '600' },
  teacherPrice: { fontSize: 11, color: '#6b7280' },
  teacherBtn: {
    backgroundColor: '#f0faf7',
    borderRadius: 8,
    paddingVertical: 7,
    alignItems: 'center',
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  teacherBtnText: { fontSize: 12, color: PRIMARY, fontWeight: '600' },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#d1fae5' },
  dividerText: { fontSize: 12, color: '#6b7280' },

  roleButtons: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 8,
  },
  btnFilled: {
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
  btnFilledText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  btnOutline: {
    borderWidth: 2,
    borderColor: PRIMARY,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnOutlineText: { color: PRIMARY, fontSize: 16, fontWeight: '700' },

  smartBanner: {
    marginHorizontal: 20,
    backgroundColor: PRIMARY,
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
  bannerContent: { flex: 1, gap: 4 },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: '#ffffff', lineHeight: 21 },
  bannerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  bannerBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  bannerBtnText: { color: PRIMARY, fontSize: 13, fontWeight: '700' },
});
