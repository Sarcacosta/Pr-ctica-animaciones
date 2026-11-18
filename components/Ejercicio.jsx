import { StyleSheet, Text, View } from 'react-native';

export default function Ejercicio({ instruccion, children, onLayout }) {
  return (
    <View style={styles.pantalla}>
      <Text style={styles.instruccion}>{instruccion}</Text>
      <View style={styles.area} onLayout={onLayout}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, padding: 20, backgroundColor: '#f0f6f5' },
  instruccion: { color: '#19303c', fontSize: 17, lineHeight: 24, marginBottom: 16 },
  area: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden',
  },
});
