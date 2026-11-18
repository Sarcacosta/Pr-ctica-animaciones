import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { useIsFocused } from 'expo-router/react-navigation';
import Animated, {
  cancelAnimation, useAnimatedStyle, useSharedValue, withSequence, withTiming,
} from 'react-native-reanimated';
import Ejercicio from '../components/Ejercicio';

export default function Acelerometro() {
  const [mensaje, setMensaje] = useState('');
  const activa = useIsFocused();
  const giro = useSharedValue(0);

  useEffect(() => {
    if (!activa) return;
    let vigente = true;
    let suscripcion;
    let ultimaSacudida = 0;

    async function escucharSensor() {
      try {
        const disponible = await Accelerometer.isAvailableAsync();
        if (!vigente) return;
        if (!disponible) {
          setMensaje('Este dispositivo no tiene un acelerómetro disponible.');
          return;
        }
        setMensaje('');
        Accelerometer.setUpdateInterval(80);
        suscripcion = Accelerometer.addListener(({ x, y, z }) => {
          // En reposo, la magnitud suele estar cerca de 1 g.
          const magnitud = Math.hypot(x, y, z);
          const ahora = Date.now();
          if (magnitud < 1.7 || ahora - ultimaSacudida < 650) return;
          ultimaSacudida = ahora;
          giro.value = withSequence(
            withTiming(-18, { duration: 65 }),
            withTiming(18, { duration: 100 }),
            withTiming(-12, { duration: 95 }),
            withTiming(8, { duration: 80 }),
            withTiming(0, { duration: 85 }),
          );
        });
      } catch {
        if (vigente) setMensaje('No se pudo iniciar el acelerómetro.');
      }
    }

    escucharSensor();
    return () => {
      vigente = false;
      suscripcion?.remove();
      cancelAnimation(giro);
      giro.value = 0;
    };
  }, [activa, giro]);

  const estilo = useAnimatedStyle(() => ({ transform: [{ rotate: giro.value + 'deg' }] }));

  return (
    <Ejercicio instruccion={mensaje || 'Sacude el celular para mover el cuadrado.'}>
      <Animated.View style={[{
        width: 106, height: 106, borderRadius: 20, backgroundColor: '#9b4336',
      }, estilo]} />
    </Ejercicio>
  );
}
