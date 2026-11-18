import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{
        swipeEnabled: false,
        headerTintColor: '#19303c',
        drawerActiveTintColor: '#176b61',
      }}>
        <Drawer.Screen name="index" options={{ title: 'Arrastrar y girar' }} />
        <Drawer.Screen name="carga" options={{ title: 'Animación de carga' }} />
        <Drawer.Screen name="multitouch" options={{ title: 'Gestos multitáctiles' }} />
        <Drawer.Screen name="rebote" options={{ title: 'Animación de rebote' }} />
        <Drawer.Screen name="carrusel" options={{ title: 'Carrusel animado' }} />
        <Drawer.Screen name="acelerometro" options={{ title: 'Acelerómetro' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
