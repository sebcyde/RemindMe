import LoadingComponent from '../../components/Loading/LoadingComponent';
import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import MyPlaces from './MyPlaces';
import { Accent } from '../../constants/Colors';

type Props = {};

const Saved = (props: Props) => {
	const [UserLocations, setUserLocations] = useState();
	const [index, setIndex] = React.useState(0);
	const [Loading, setLoading] = useState(true);

	return (
		<View style={{ height: '100%' }}>
			<>
				<Tab
					value={index}
					onChange={(e) => setIndex(e)}
					indicatorStyle={{
						backgroundColor: 'white',
						height: 3,
					}}
					// variant="primary"
				>
					<Tab.Item
						style={styles.Tab}
						title="My Routines"
						titleStyle={{ fontSize: 12, color: 'white' }}
						icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
					/>
					<Tab.Item
						style={styles.Tab}
						title="My Places"
						titleStyle={{ fontSize: 12, color: 'white' }}
						icon={{ name: 'location', type: 'ionicon', color: 'white' }}
					/>
					<Tab.Item
						style={styles.Tab}
						title="Completed"
						titleStyle={{ fontSize: 12, color: 'white' }}
						icon={{ name: 'checkmark', type: 'ionicon', color: 'white' }}
					/>
				</Tab>

				<TabView value={index} onChange={setIndex} animationType="spring">
					<TabView.Item style={styles.Routines}>
						<Text>My Routines</Text>
					</TabView.Item>
					<TabView.Item style={styles.Routines}>
						<MyPlaces />
					</TabView.Item>
					<TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
						<Text>Cart</Text>
					</TabView.Item>
				</TabView>
			</>
		</View>
	);
};

const styles = StyleSheet.create({
	Tab: {
		backgroundColor: Accent,
		color: 'white',
	},
	Routines: {
		width: '100%',
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
	},
});

export default Saved;
