import { Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Ejercicio from '../components/Ejercicio';

export default function Multitouch() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const escala = useSharedValue(1);
  const angulo = useSharedValue(0);
  const baseX = useSharedValue(0);
  const baseY = useSharedValue(0);
  const baseEscala = useSharedValue(1);
  const baseAngulo = useSharedValue(0);

  const mover = Gesture.Pan().averageTouches(true)
    .onStart(() => {
      baseX.value = x.value;
      baseY.value = y.value;
    })
    .onUpdate((evento) => {
      x.value = clamp(baseX.value + evento.translationX, -160, 160);
      y.value = clamp(baseY.value + evento.translationY, -200, 200);
    });
  const zoom = Gesture.Pinch()
    .onStart(() => { baseEscala.value = escala.value; })
    .onUpdate((evento) => { escala.value = clamp(baseEscala.value * evento.scale, 0.6, 3); });
  const girar = Gesture.Rotation()
    .onStart(() => { baseAngulo.value = angulo.value; })
    .onUpdate((evento) => { angulo.value = baseAngulo.value + evento.rotation; });

  const estilo = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value }, { translateY: y.value },
      { rotate: angulo.value + 'rad' }, { scale: escala.value },
    ],
  }));

  return (
    <Ejercicio instruccion="Arrastra la imagen para moverla. Junta o separa dos dedos para cambiar el tamaño y gíralos para rotarla.">
      <GestureDetector gesture={Gesture.Simultaneous(mover, zoom, girar)}>
        <Animated.View style={estilo}>
          <Image source={require('../assets/paisaje.png')} accessibilityLabel="Paisaje de montañas"
            style={{ width: 210, height: 152, borderRadius: 14 }} />
        </Animated.View>
      </GestureDetector>
    </Ejercicio>
  );
}
