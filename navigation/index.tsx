import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors, { Accent } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/404';
import TabOneScreen from '../screens/Dashboard/Dashboard';
import TabTwoScreen from '../screens/Settings';
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Dashboard from '../screens/Dashboard/Dashboard';
import Create from '../screens/Create/Create';
import Settings from '../screens/Settings/Settings';
import Saved from '../screens/Saved/Saved';
import NewPlaceModal from '../screens/Modals/NewPlaceModal';

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
				<Stack.Screen name="NewPlaceModal" component={NewPlaceModal} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Dashboard"
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme].tint,
			}}
		>
			<BottomTab.Screen
				name="Dashboard"
				component={Dashboard}
				options={({ navigation }: RootTabScreenProps<'Dashboard'>) => ({
					tabBarStyle: { backgroundColor: Accent },
					title: 'Dashboard',
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate('Modal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome
								name="info-circle"
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
				})}
			/>
			<BottomTab.Screen
				name="Create"
				component={Create}
				options={{
					tabBarStyle: { backgroundColor: Accent },
					title: 'Create',
					tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Saved"
				component={Saved}
				options={{
					tabBarStyle: { backgroundColor: Accent },
					title: 'Saved',
					tabBarIcon: ({ color }) => (
						<TabBarIcon name="map-marker" color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="Settings"
				component={Settings}
				options={{
					tabBarStyle: { backgroundColor: Accent },
					title: 'Settings',
					tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name'];
	color: string;
}) {
	return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}
