import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue,
} from 'react-native-reanimated';
import Ejercicio from '../components/Ejercicio';

const tarjetas = [
  { titulo: 'Montaña', color: '#176b61' },
  { titulo: 'Océano', color: '#235b88' },
  { titulo: 'Atardecer', color: '#9b4336' },
  { titulo: 'Bosque', color: '#49662b' },
];

function Tarjeta({ tarjeta, indice, ancho, desplazamiento }) {
  const estilo = useAnimatedStyle(() => {
    const distancia = desplazamiento.value / ancho - indice;
    const escala = interpolate(distancia, [-1, 0, 1], [0.80, 1, 0.80], Extrapolation.CLAMP);
    const giro = interpolate(distancia, [-1, 0, 1], [-12, 0, 12], Extrapolation.CLAMP);
    return { transform: [{ scale: escala }, { rotate: giro + 'deg' }] };
  });

  return (
    <View style={{ width: ancho, padding: 7 }}>
      <Animated.View style={[styles.tarjeta, { backgroundColor: tarjeta.color }, estilo]}>
        <Text style={styles.titulo}>{tarjeta.titulo}</Text>
      </Animated.View>
    </View>
  );
}

export default function Carrusel() {
  const anchoArea = useWindowDimensions().width - 40;
  const ancho = Math.round(anchoArea * 0.76);
  const desplazamiento = useSharedValue(0);
  const mover = useAnimatedScrollHandler((evento) => {
    desplazamiento.value = evento.contentOffset.x;
  });

  return (
    <Ejercicio instruccion="Desliza horizontalmente. Cada tarjeta cambia de escala y gira al salir del centro.">
      <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, width: '100%' }}
        contentContainerStyle={{ paddingHorizontal: (anchoArea - ancho) / 2, paddingVertical: 20 }}
        snapToInterval={ancho} decelerationRate="fast" disableIntervalMomentum
        scrollEventThrottle={16} onScroll={mover}>
        {tarjetas.map((tarjeta, indice) => (
          <Tarjeta key={tarjeta.titulo} {...{ tarjeta, indice, ancho, desplazamiento }} />
        ))}
      </Animated.ScrollView>
    </Ejercicio>
  );
}

const styles = StyleSheet.create({
  tarjeta: { height: 190, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  titulo: { color: '#fff', fontWeight: '700', fontSize: 24 },
});
