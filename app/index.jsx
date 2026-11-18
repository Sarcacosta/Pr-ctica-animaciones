import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { clamp, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Ejercicio from '../components/Ejercicio';

const lado = 92;

export default function Arrastrar() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const inicioX = useSharedValue(0);
  const inicioY = useSharedValue(0);
  const limiteX = useSharedValue(0);
  const limiteY = useSharedValue(0);
  const giro = useSharedValue(0);

  const arrastre = Gesture.Pan()
    .onStart(() => {
      inicioX.value = x.value;
      inicioY.value = y.value;
    })
    .onChange((evento) => {
      x.value = clamp(inicioX.value + evento.translationX, -limiteX.value, limiteX.value);
      y.value = clamp(inicioY.value + evento.translationY, -limiteY.value, limiteY.value);
      if (Math.abs(evento.changeX) > 0.5) {
        giro.value = clamp(evento.changeX * 4, -35, 35);
      }
    });

  const estilo = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { rotate: giro.value + 'deg' }],
  }));

  return (
    <Ejercicio instruccion="Arrastra el cuadrado. Se inclina hacia el lado al que lo mueves."
      onLayout={({ nativeEvent: { layout } }) => {
        limiteX.value = Math.max(0, (layout.width - lado * Math.SQRT2) / 2);
        limiteY.value = Math.max(0, (layout.height - lado * Math.SQRT2) / 2);
      }}>
      <GestureDetector gesture={arrastre}>
        <Animated.View style={[{
          width: lado, height: lado, borderRadius: 18, backgroundColor: '#176b61',
        }, estilo]} />
      </GestureDetector>
    </Ejercicio>
  );
}
