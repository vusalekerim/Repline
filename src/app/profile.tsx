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

const STATS = [
  { value: '0', label: 'Dərs' },
  { value: '0', label: 'Favori' },
  { value: '0', label: 'Rəy' },
];

const MENU = [
  { id: '1', icon: '📚', label: 'Mənim dərslərim', color: DARK },
  { id: '2', icon: '❤️', label: 'Favorilər', color: DARK },
  { id: '3', icon: '⚙️', label: 'Ayarlar', color: DARK },
  { id: '4', icon: '🚪', label: 'Çıxış', color: '#ef4444' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoHeader}>
        <ReplineLogo size="sm" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar + name */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>QI</Text>
            </View>
            <View style={styles.editBadge}>
              <Text style={styles.editBadgeText}>✏️</Text>
            </View>
          </View>
          <Text style={styles.name}>Qonaq İstifadəçi</Text>
          <Text style={styles.email}>istifadeci@repline.az</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsCard}>
          {STATS.map((s, i) => (
            <View key={s.label} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              {i < STATS.length - 1 && <View style={styles.statDivider} />}
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU.map((item, i) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                i < MENU.length - 1 && styles.menuItemBorder,
              ]}
              activeOpacity={0.65}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[styles.menuLabel, { color: item.color }]}>
                {item.label}
              </Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.version}>Repline v1.0.0</Text>
      </ScrollView>

      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0faf7' },
  logoHeader: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d1fae5',
    backgroundColor: '#f0faf7',
  },
  scroll: { paddingBottom: 16, gap: 16 },
  heroSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 8,
    gap: 6,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 4,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
    shadowColor: PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarText: { color: '#ffffff', fontSize: 26, fontWeight: '800' },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },
  editBadgeText: { fontSize: 13 },
  name: { fontSize: 22, fontWeight: '800', color: DARK },
  email: { fontSize: 14, color: '#6b7280' },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    position: 'relative',
  },
  statValue: { fontSize: 24, fontWeight: '800', color: DARK },
  statLabel: { fontSize: 12, color: '#6b7280', fontWeight: '500' },
  statDivider: {
    position: 'absolute',
    right: 0,
    top: 4,
    bottom: 4,
    width: 1,
    backgroundColor: '#f3f4f6',
  },
  menuCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  menuIcon: { fontSize: 20, width: 24, textAlign: 'center' },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600' },
  arrow: { fontSize: 20, color: '#d1d5db', fontWeight: '300' },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    paddingBottom: 8,
  },
});
