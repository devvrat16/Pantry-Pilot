import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ArrowLeft, CalendarDays, Camera, ScanBarcode } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { usePantry } from '../context/PantryContext';
import { colors } from '../utils/theme';
import { formatDate } from '../utils/date';

type Mode = 'manual' | 'scan';

export function AddItemScreen() {
  const navigation = useNavigation<any>();
  const { addPantryItem } = usePantry();

  const [mode, setMode] = useState<Mode>('manual');

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('');
  const [category, setCategory] = useState('Other');

  const [expiry, setExpiry] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });

  const [showDate, setShowDate] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);

  // -------------------------------------------------------
  // Save Item
  // -------------------------------------------------------

  const save = () => {
    if (!name.trim()) {
      Alert.alert('Add a name', 'Give this pantry item a name before saving.');
      return;
    }

    addPantryItem({
      id: `${Date.now()}-${name}`,
      name: name.trim(),
      quantity: quantity.trim() || '1',
      unit: unit.trim(),
      category: category.trim() || 'Other',
      expiryDate: expiry.toISOString().slice(0, 10),
      addedDate: new Date().toISOString().slice(0, 10),
    });

    navigation.goBack();
  };

  // -------------------------------------------------------
  // Barcode Lookup via Open Food Facts
  // -------------------------------------------------------

  const lookupBarcode = async (barcode: string) => {
    setScanned(true);
    setLookingUp(true);

    try {
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      );
      const data = await response.json();

      if (data.status === 1 && data.product) {
        setName(
          data.product.product_name ||
            data.product.product_name_en ||
            '',
        );
        setCategory(
          data.product.categories_tags?.[0]
            ?.replace('en:', '')
            ?.replace(/-/g, ' ') || 'Packaged Food',
        );
        setMode('manual');
      } else {
        setScanned(false);
        Alert.alert(
          'Product not found',
          'Try again, or add this item manually.',
        );
      }
    } catch {
      setScanned(false);
      Alert.alert(
        'Lookup unavailable',
        'Could not reach Open Food Facts. You can still add this item manually.',
      );
    } finally {
      setLookingUp(false);
    }
  };

  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ---------- Header ---------- */}
      <View style={styles.topbar}>
        <Pressable
          style={styles.back}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={22} color={colors.ink} />
        </Pressable>

        <Text style={styles.title}>Add to pantry</Text>

        <View style={styles.back} />
      </View>

      {/* ---------- Mode Switch ---------- */}
      <View style={styles.modeSwitch}>
        <Pressable
          style={[styles.mode, mode === 'manual' && styles.modeActive]}
          onPress={() => setMode('manual')}
        >
          <Text
            style={[styles.modeText, mode === 'manual' && styles.modeTextActive]}
          >
            Manual entry
          </Text>
        </Pressable>

        <Pressable
          style={[styles.mode, mode === 'scan' && styles.modeActive]}
          onPress={() => {
            setScanned(false);
            setMode('scan');
          }}
        >
          <ScanBarcode
            size={16}
            color={mode === 'scan' ? colors.white : colors.muted}
          />
          <Text
            style={[styles.modeText, mode === 'scan' && styles.modeTextActive]}
          >
            Scan barcode
          </Text>
        </Pressable>
      </View>

      {/* ---------- Scan Mode ---------- */}
      {mode === 'scan' ? (
        <View style={styles.scannerArea}>
          {!permission ? (
            <Text style={styles.cameraMessage}>Preparing camera…</Text>
          ) : !permission.granted ? (
            <View style={styles.permission}>
              <Camera size={35} color={colors.forest} />
              <Text style={styles.permissionTitle}>Camera access needed</Text>
              <Text style={styles.permissionCopy}>
                Use your camera to find a product automatically.
              </Text>
              <Pressable
                style={styles.grantButton}
                onPress={requestPermission}
              >
                <Text style={styles.grantText}>Allow camera</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <CameraView
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{
                  barcodeTypes: [
                    'ean13',
                    'ean8',
                    'upc_a',
                    'upc_e',
                    'code128',
                  ],
                }}
                onBarcodeScanned={scanned ? undefined : ({ data }) => lookupBarcode(data)}
              />

              <View style={styles.scanOverlay}>
                <View style={styles.scanFrame} />

                <Text style={styles.scanHelp}>
                  {lookingUp ? 'Looking up product…' : 'Place barcode inside the frame'}
                </Text>

                <Pressable onPress={() => setMode('manual')}>
                  <Text style={styles.manualLink}>Enter manually instead</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      ) : (
        /* ---------- Manual Entry Form ---------- */
        <ScrollView
          contentContainerStyle={styles.form}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formLabel}>ITEM NAME</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="e.g. Cherry tomatoes"
            placeholderTextColor="#9AA29D"
            style={styles.input}
            autoFocus
          />

          <Text style={styles.formLabel}>QUANTITY</Text>
          <View style={styles.quantityRow}>
            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="decimal-pad"
              style={[styles.input, styles.quantityInput]}
            />
            <TextInput
              value={unit}
              onChangeText={setUnit}
              placeholder="unit (e.g. g, bag)"
              placeholderTextColor="#9AA29D"
              style={[styles.input, styles.unitInput]}
            />
          </View>

          <Text style={styles.formLabel}>CATEGORY</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            placeholder="Produce, dairy, dry goods…"
            placeholderTextColor="#9AA29D"
            style={styles.input}
          />

          <Text style={styles.formLabel}>EXPIRY DATE</Text>
          <Pressable
            style={styles.dateInput}
            onPress={() => setShowDate(true)}
          >
            <CalendarDays size={19} color={colors.forest} />
            <Text style={styles.dateText}>
              {formatDate(expiry.toISOString().slice(0, 10))}
            </Text>
          </Pressable>

          {showDate ? (
            <DateTimePicker
              value={expiry}
              mode="date"
              minimumDate={new Date()}
              onChange={(_, date) => {
                // On iOS the picker is inline, so only hide on Android
                setShowDate(Platform.OS === 'ios');
                if (date) setExpiry(date);
              }}
            />
          ) : null}

          <Pressable style={styles.saveButton} onPress={save}>
            <Text style={styles.saveText}>Add to pantry</Text>
          </Pressable>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

// -------------------------------------------------------
// Styles
// -------------------------------------------------------

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },

  topbar: {
    height: 64,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  back: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: colors.ink,
    fontWeight: '800',
    fontSize: 17,
  },

  modeSwitch: {
    marginHorizontal: 20,
    padding: 4,
    borderRadius: 7,
    backgroundColor: '#E9EAE4',
    flexDirection: 'row',
  },

  mode: {
    flex: 1,
    height: 39,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  modeActive: {
    backgroundColor: colors.forest,
  },

  modeText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },

  modeTextActive: {
    color: colors.white,
  },

  form: {
    padding: 20,
    paddingTop: 26,
    paddingBottom: 45,
  },

  formLabel: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 0.6,
    fontWeight: '900',
    marginBottom: 7,
    marginTop: 17,
  },

  input: {
    height: 49,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: 6,
    paddingHorizontal: 13,
    color: colors.ink,
    fontSize: 16,
  },

  quantityRow: {
    flexDirection: 'row',
    gap: 10,
  },

  quantityInput: {
    flex: 0.37,
  },

  unitInput: {
    flex: 0.63,
  },

  dateInput: {
    height: 49,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  dateText: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '600',
  },

  saveButton: {
    height: 52,
    borderRadius: 6,
    backgroundColor: colors.forest,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 31,
  },

  saveText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
  },

  // Scanner
  scannerArea: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
  },

  camera: {
    flex: 1,
  },

  scanOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.36)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scanFrame: {
    width: '77%',
    height: 170,
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 8,
  },

  scanHelp: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 16,
  },

  manualLink: {
    color: colors.white,
    textDecorationLine: 'underline',
    marginTop: 18,
    fontWeight: '700',
  },

  cameraMessage: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: 50,
  },

  // Permission
  permission: {
    alignItems: 'center',
    padding: 35,
    marginTop: 60,
  },

  permissionTitle: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: '800',
    marginTop: 14,
  },

  permissionCopy: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 7,
  },

  grantButton: {
    marginTop: 21,
    backgroundColor: colors.forest,
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  grantText: {
    color: colors.white,
    fontWeight: '800',
  },
});
