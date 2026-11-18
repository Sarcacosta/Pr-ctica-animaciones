import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from 'expo-router/react-navigation';
import Animated, {
  cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming,
} from 'react-native-reanimated';
import Ejercicio from '../components/Ejercicio';

export default function Carga() {
  const activa = useIsFocused();
  const vuelta = useSharedValue(0);
  const progreso = useSharedValue(0);

  useEffect(() => {
    if (!activa) return;
    vuelta.value = 0;
    progreso.value = 0;
    vuelta.value = withRepeat(withTiming(360, { duration: 950, easing: Easing.linear }), -1);
    progreso.value = withRepeat(withTiming(100, { duration: 4200, easing: Easing.linear }), -1);
    return () => {
      cancelAnimation(vuelta);
      cancelAnimation(progreso);
    };
  }, [activa, vuelta, progreso]);

  const giro = useAnimatedStyle(() => ({ transform: [{ rotate: vuelta.value + 'deg' }] }));
  const barra = useAnimatedStyle(() => ({ width: progreso.value + '%' }));

  return (
    <Ejercicio instruccion="Observa el indicador giratorio y la barra de progreso. Ambos empiezan automáticamente.">
      <Animated.View accessibilityLabel="Indicador de carga" style={[styles.spinner, giro]} />
      <View style={styles.pista}>
        <Animated.View style={[styles.barra, barra]} />
      </View>
    </Ejercicio>
  );
}
const styles = StyleSheet.create({
  spinner: {
    width: 62, height: 62, borderRadius: 31, borderWidth: 6,
    borderColor: '#d9ebe8', borderTopColor: '#176b61', marginBottom: 32,
  },
  pista: { width: '72%', height: 12, borderRadius: 6, overflow: 'hidden', backgroundColor: '#d9ebe8' },
  barra: { height: '100%', backgroundColor: '#176b61' },
});
