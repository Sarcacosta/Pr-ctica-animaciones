import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Ejercicio from '../components/Ejercicio';

export default function Rebote() {
  const escala = useSharedValue(1);
  const estilo = useAnimatedStyle(() => ({ transform: [{ scale: escala.value }] }));

  return (
    <Ejercicio instruccion="Mantén presionado el círculo y suéltalo para ver el rebote.">
      <Pressable accessibilityRole="button" accessibilityLabel="Círculo con rebote"
        onPress={() => {}}
        onPressIn={() => { escala.value = withTiming(0.72, { duration: 120 }); }}
        onPressOut={() => { escala.value = withSpring(1, { damping: 9, stiffness: 180, mass: 0.8 }); }}>
        <Animated.View style={[{
          width: 116, height: 116, borderRadius: 58, backgroundColor: '#2275a0',
        }, estilo]} />
      </Pressable>
    </Ejercicio>
  );
}
