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
import ReplineLogo from '../components/ReplineLogo';
import { SUBJECTS } from '../constants/subjects';

const PRIMARY = '#2ca48e';
const DARK = '#0F172A';

const TEACHERS = [
  { id: '1', name: 'Vüsalə Kərimova', subject: 'İnformatika', rating: 4.9, price: '30 AZN/saat', initials: 'VK', color: '#2ca48e' },
  { id: '2', name: 'Samirə Haqverdiyeva', subject: 'Azərbaycan dili', rating: 4.9, price: '30 AZN/saat', initials: 'SH', color: '#3b82f6' },
  { id: '3', name: 'Pərvanə Abdullayeva', subject: 'İngilis dili', rating: 4.8, price: '35 AZN/saat', initials: 'PA', color: '#8b5cf6' },
  { id: '4', name: 'Lalə Kərimova', subject: 'Riyaziyyat', rating: 4.8, price: '30 AZN/saat', initials: 'LK', color: '#f59e0b' },
];

const FILTERS = ['Hamısı', ...SUBJECTS];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Hamısı');

  const filtered = TEACHERS.filter((t) => {
    const q = query.toLowerCase();
    const matchQuery = q === '' || t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q);
    const matchFilter = activeFilter === 'Hamısı' || t.subject.includes(activeFilter);
    return matchQuery && matchFilter;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ReplineLogo size="sm" />
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Müəllim, fənn axtar..."
            placeholderTextColor="#9ca3af"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={styles.clearBtn}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
      >
        {FILTERS.map((f) => {
          const active = f === activeFilter;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.75}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Results */}
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Nəticə tapılmadı</Text>
          </View>
        ) : (
          filtered.map((t) => (
            <View key={t.id} style={styles.card}>
              <View style={[styles.avatar, { backgroundColor: t.color }]}>
                <Text style={styles.avatarText}>{t.initials}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{t.name}</Text>
                <Text style={styles.subject}>{t.subject}</Text>
                <View style={styles.meta}>
                  <Text style={styles.rating}>★ {t.rating}</Text>
                  <Text style={styles.dot}>·</Text>
                  <Text style={styles.price}>{t.price}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.viewBtn}
                onPress={() => router.push('/teacher-profile')}
                activeOpacity={0.8}
              >
                <Text style={styles.viewBtnText}>Bax</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
  },
  searchIcon: { fontSize: 16 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: DARK,
  },
  clearBtn: { fontSize: 14, color: '#9ca3af', fontWeight: '600' },
  filtersRow: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  chipActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  chipText: { fontSize: 13, color: '#6b7280', fontWeight: '500' },
  chipTextActive: { color: '#ffffff', fontWeight: '600' },
  list: { paddingHorizontal: 16, gap: 12, paddingBottom: 16 },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyIcon: { fontSize: 40 },
  emptyText: { fontSize: 15, color: '#9ca3af' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 15, fontWeight: '700', color: DARK },
  subject: { fontSize: 13, color: '#6b7280' },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  rating: { fontSize: 12, color: '#f59e0b', fontWeight: '600' },
  dot: { fontSize: 12, color: '#d1d5db' },
  price: { fontSize: 12, color: '#374151', fontWeight: '500' },
  viewBtn: {
    backgroundColor: '#f0faf7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  viewBtnText: { color: PRIMARY, fontSize: 13, fontWeight: '600' },
});
