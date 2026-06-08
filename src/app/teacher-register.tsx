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

const FORMAT_OPTIONS = ['👤 Fərdi dərs', '👥 Qrup dərsi', '🔄 Hər ikisi'];

export default function TeacherRegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [bio, setBio] = useState('');
  const [format, setFormat] = useState('');

  function toggleSubject(val: string) {
    setSubjects((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Müəllim qeydiyyatı</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
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

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tədris etdiyiniz fənn</Text>
          <View style={styles.chipRow}>
            {SUBJECTS.map((subj) => {
              const active = subjects.includes(subj);
              return (
                <TouchableOpacity
                  key={subj}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => toggleSubject(subj)}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    {subj}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Qiymət (saat başına)</Text>
          <TextInput
            style={styles.input}
            placeholder="Məs: 30 AZN"
            placeholderTextColor="#9ca3af"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Özünüz haqqında</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Təcrübəniz, ixtisaslaşmanız haqqında yazın..."
            placeholderTextColor="#9ca3af"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Dərs formatı</Text>
          <View style={styles.chipRow}>
            {FORMAT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[styles.chip, format === opt && styles.chipActive]}
                onPress={() => setFormat(format === opt ? '' : opt)}
                activeOpacity={0.75}
              >
                <Text style={[styles.chipText, format === opt && styles.chipTextActive]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {}}
          activeOpacity={0.85}
        >
          <Text style={styles.submitBtnText}>Qeydiyyatdan keç</Text>
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
  textarea: {
    height: 120,
    paddingTop: 13,
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
});
