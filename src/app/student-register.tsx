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
import { SUBJECTS } from '../constants/subjects';

const PRIMARY = '#2ca48e';

const BUDGETS = ['20-30 AZN', '30-50 AZN', '50+ AZN'];
const STYLES = ['Vizual', 'Audial', 'Praktik'];
const TIMES = ['Səhər', 'Gündüz', 'Axşam'];
const FORMAT_OPTIONS = ['👤 Fərdi dərs', '👥 Qrup dərsi', '🔄 Fərqi yoxdur'];

function ChipGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string[];
  onSelect: (val: string) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.chipRow}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <TouchableOpacity
              key={opt}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => onSelect(opt)}
              activeOpacity={0.75}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function StudentRegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [learnStyle, setLearnStyle] = useState<string[]>([]);
  const [time, setTime] = useState<string[]>([]);
  const [format, setFormat] = useState<string[]>([]);

  function toggleMulti(val: string, arr: string[], setter: (v: string[]) => void) {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  }

  function toggleSingle(val: string, arr: string[], setter: (v: string[]) => void) {
    setter(arr.includes(val) ? [] : [val]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Şagird qeydiyyatı</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.aiShortcutBtn}
          onPress={() => router.push('/smart-match')}
          activeOpacity={0.85}
        >
          <Text style={styles.aiShortcutText}>🤖 AI ilə sürətli tap</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınızı daxil edin"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
          />
        </View>

        <ChipGroup
          label="Fənn"
          options={SUBJECTS}
          selected={subjects}
          onSelect={(v) => toggleMulti(v, subjects, setSubjects)}
        />

        <ChipGroup
          label="Büdcə"
          options={BUDGETS}
          selected={budget}
          onSelect={(v) => toggleSingle(v, budget, setBudget)}
        />

        <ChipGroup
          label="Öyrənmə üslubu"
          options={STYLES}
          selected={learnStyle}
          onSelect={(v) => toggleSingle(v, learnStyle, setLearnStyle)}
        />

        <ChipGroup
          label="Uyğun vaxt"
          options={TIMES}
          selected={time}
          onSelect={(v) => toggleMulti(v, time, setTime)}
        />

        <ChipGroup
          label="Dərs formatı"
          options={FORMAT_OPTIONS}
          selected={format}
          onSelect={(v) => toggleSingle(v, format, setFormat)}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => router.push('/teacher-list')}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Müəllim tap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  scroll: {
    padding: 20,
    gap: 24,
    paddingBottom: 40,
  },
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#fafafa',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  chipActive: {
    backgroundColor: PRIMARY,
    borderColor: PRIMARY,
  },
  chipText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  submitBtn: {
    backgroundColor: PRIMARY,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  aiShortcutBtn: {
    borderWidth: 2,
    borderColor: PRIMARY,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
  },
  aiShortcutText: { color: PRIMARY, fontSize: 15, fontWeight: '700' },
});
