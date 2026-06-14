import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRIMARY = '#2ca48e';

const SUBJECTS = [
  'Riyaziyyat', 'Fizika', 'Kimya', 'Biologiya',
  'İngilis dili', 'Tarix', 'İnformatika',
  'Azərbaycan dili', 'Coğrafiya', 'Rus dili',
  'Ədəbiyyat', 'Həndəsə',
];

const CERTIFICATES = [
  'IELTS', 'TOEFL', 'Cambridge',
  'Müəllim sertifikatı', 'Olimpiada mükafatı', 'Digər',
];

const DAYS = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'];

const TIME_SLOTS = [
  '08:00-10:00', '10:00-12:00', '12:00-14:00',
  '14:00-16:00', '16:00-18:00', '18:00-20:00', '20:00-22:00',
];

const FORMATS = ['👤 Fərdi dərs', '👥 Qrup dərsi', '🔄 Hər ikisi'];

export default function TeacherRegisterScreen() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [price, setPrice] = useState('');
  const [bio, setBio] = useState('');
  const [university, setUniversity] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [certificates, setCertificates] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [format, setFormat] = useState('');
  const [agreed, setAgreed] = useState(false);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1] as [number, number],
      quality: 0.8,
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) setVideo(result.assets[0].uri);
  };

  const toggleItem = (
    item: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(
      list.includes(item)
        ? list.filter(i => i !== item)
        : [...list, item]
    );
  };

  const handleSubmit = () => {
    if (!agreed) return;
    window.alert(
      'Qeydiyyatınız qəbul edildi! 🎉 24 saat ərzində emailinizə bildiriş göndəriləcək.'
    );
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}>

          <Pressable style={styles.backButton} onPress={() => router.push('/')}>
            <Text style={styles.backText}>← Geri</Text>
          </Pressable>
          <Text style={styles.title}>Müəllim qeydiyyatı</Text>

          <Pressable style={styles.avatarContainer} onPress={pickPhoto}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarIcon}>📷</Text>
                <Text style={styles.avatarHint}>Foto əlavə et</Text>
              </View>
            )}
          </Pressable>

          <Text style={styles.label}>Ad Soyad</Text>
          <TextInput
            style={styles.input}
            placeholder="Adınızı daxil edin"
            placeholderTextColor="#94a3b8"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Fənn</Text>
          <View style={styles.chips}>
            {SUBJECTS.map(s => (
              <Pressable
                key={s}
                style={[styles.chip, subject === s && styles.chipActive]}
                onPress={() => setSubject(s)}>
                <Text style={[styles.chipText, subject === s && styles.chipTextActive]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Dərs formatı</Text>
          <View style={styles.chips}>
            {FORMATS.map(f => (
              <Pressable
                key={f}
                style={[styles.chip, format === f && styles.chipActive]}
                onPress={() => setFormat(f)}>
                <Text style={[styles.chipText, format === f && styles.chipTextActive]}>
                  {f}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Saatlıq qiymət</Text>
          <TextInput
            style={styles.input}
            placeholder="Məs: 30 AZN"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <Text style={styles.label}>Qısa bio</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Özünüz haqqında qısa məlumat"
            placeholderTextColor="#94a3b8"
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
          />

          <Text style={styles.label}>Dərs videosu</Text>
          <Pressable style={styles.videoBox} onPress={pickVideo}>
            {video ? (
              <Text style={styles.videoUploaded}>✅ Video yükləndi</Text>
            ) : (
              <>
                <Text style={styles.playIcon}>▶</Text>
                <Text style={styles.videoHint}>Video yüklə</Text>
                <Text style={styles.videoDuration}>Maks. 3 dəq</Text>
              </>
            )}
          </Pressable>

          <Text style={styles.label}>Təhsil və Sertifikatlar</Text>
          <TextInput
            style={styles.input}
            placeholder="Təhsil aldığınız müəssisə"
            placeholderTextColor="#94a3b8"
            value={university}
            onChangeText={setUniversity}
          />
          <TextInput
            style={[styles.input, { marginTop: 8 }]}
            placeholder="Buraxılış ili (məs: 2018)"
            placeholderTextColor="#94a3b8"
            keyboardType="numeric"
            value={graduationYear}
            onChangeText={setGraduationYear}
          />
          <View style={[styles.chips, { marginTop: 10 }]}>
            {CERTIFICATES.map(c => (
              <Pressable
                key={c}
                style={[styles.chip, certificates.includes(c) && styles.chipActive]}
                onPress={() => toggleItem(c, certificates, setCertificates)}>
                <Text style={[styles.chipText, certificates.includes(c) && styles.chipTextActive]}>
                  {c}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Mövcud vaxtlar</Text>
          <Text style={styles.sublabel}>Günlər</Text>
          <View style={styles.chips}>
            {DAYS.map(d => (
              <Pressable
                key={d}
                style={[styles.chip, days.includes(d) && styles.chipActive]}
                onPress={() => toggleItem(d, days, setDays)}>
                <Text style={[styles.chipText, days.includes(d) && styles.chipTextActive]}>
                  {d}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={styles.sublabel}>Saatlar</Text>
          <View style={styles.chips}>
            {TIME_SLOTS.map(t => (
              <Pressable
                key={t}
                style={[styles.chip, timeSlots.includes(t) && styles.chipActive]}
                onPress={() => toggleItem(t, timeSlots, setTimeSlots)}>
                <Text style={[styles.chipText, timeSlots.includes(t) && styles.chipTextActive]}>
                  {t}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.verificationBox}>
            <Text style={styles.verificationTitle}>✅ Profil yoxlanılacaq</Text>
            <Text style={styles.verificationText}>
              Qeydiyyatdan sonra komandamız 24 saat ərzində profilinizi
              yoxlayacaq. Təsdiqlənmiş profillər "Verified" badge alır.
            </Text>
            <Pressable
              style={styles.checkboxRow}
              onPress={() => setAgreed(!agreed)}>
              <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
                {agreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxLabel}>
                Platformanın istifadə şərtlərini qəbul edirəm
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.submitButton, !agreed && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={!agreed}>
            <Text style={styles.submitText}>
              Qeydiyyatdan keç və yoxlanmağı gözlə
            </Text>
          </Pressable>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  safeArea: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingBottom: 40 },
  backButton: { paddingVertical: 16 },
  backText: { fontSize: 16, color: PRIMARY, fontWeight: '500' },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 24 },
  avatarContainer: { alignSelf: 'center', marginBottom: 24 },
  avatarImage: { width: 90, height: 90, borderRadius: 45 },
  avatarPlaceholder: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: '#f0faf7', borderWidth: 2,
    borderColor: PRIMARY, borderStyle: 'dashed',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarIcon: { fontSize: 24 },
  avatarHint: { fontSize: 10, color: PRIMARY, marginTop: 2 },
  label: {
    fontSize: 15, fontWeight: '600', color: '#0F172A',
    marginBottom: 10, marginTop: 16,
  },
  sublabel: { fontSize: 13, color: '#64748b', marginBottom: 8, marginTop: 8 },
  input: {
    backgroundColor: '#f8fafc', borderRadius: 12,
    padding: 14, fontSize: 14, color: '#0F172A',
    borderWidth: 1, borderColor: '#e2e8f0',
  },
  textarea: { height: 100, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1.5,
    borderColor: '#e2e8f0', backgroundColor: '#ffffff',
  },
  chipActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  chipText: { fontSize: 13, color: '#374151' },
  chipTextActive: { color: '#ffffff', fontWeight: '500' },
  videoBox: {
    backgroundColor: '#f3f4f6', borderRadius: 12,
    height: 140, alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  playIcon: { fontSize: 32, color: PRIMARY },
  videoHint: { fontSize: 14, color: PRIMARY, fontWeight: '500' },
  videoDuration: { fontSize: 12, color: '#94a3b8' },
  videoUploaded: { fontSize: 14, color: PRIMARY, fontWeight: '500' },
  verificationBox: {
    backgroundColor: '#fefce8', borderRadius: 12,
    borderWidth: 1, borderColor: '#fde047',
    padding: 16, marginTop: 24,
  },
  verificationTitle: {
    fontSize: 15, fontWeight: '600',
    color: '#0F172A', marginBottom: 8,
  },
  verificationText: {
    fontSize: 13, color: '#64748b',
    lineHeight: 20, marginBottom: 12,
  },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 2, borderColor: '#d1d5db',
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  checkmark: { color: '#ffffff', fontSize: 13, fontWeight: '700' },
  checkboxLabel: { fontSize: 13, color: '#374151', flex: 1 },
  submitButton: {
    backgroundColor: PRIMARY, borderRadius: 14,
    paddingVertical: 16, alignItems: 'center', marginTop: 24,
  },
  submitDisabled: { backgroundColor: '#94a3b8' },
  submitText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
});