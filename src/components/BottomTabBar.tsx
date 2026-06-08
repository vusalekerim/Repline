import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PRIMARY = '#2ca48e';
const INACTIVE = '#9ca3af';

const TABS = [
  { label: 'Ana səhifə', icon: '🏠', route: '/' },
  { label: 'Axtar', icon: '🔍', route: '/search' },
  { label: 'AI', icon: '🤖', route: '/ai-assistant' },
  { label: 'Profil', icon: '👤', route: '/profile' },
] as const;

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();

  function activeRoute(): string {
    if (pathname === '/') return '/';
    if (pathname.startsWith('/search')) return '/search';
    if (pathname.startsWith('/ai-assistant')) return '/ai-assistant';
    if (pathname.startsWith('/profile')) return '/profile';
    return '';
  }

  const current = activeRoute();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = tab.route === current;
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.7}
          >
            {active && <View style={styles.indicator} />}
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 10,
    paddingBottom: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: -10,
    width: 28,
    height: 3,
    backgroundColor: PRIMARY,
    borderRadius: 2,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    color: PRIMARY,
  },
  labelInactive: {
    color: INACTIVE,
  },
});
