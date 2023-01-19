import { StyleSheet, View, Text } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import React from 'react';

type Props = {
	LocationID: string;
	Location: {
		latitude: string;
		longitude: string;
	};
};

const MyPlacesCard = ({ LocationID, Location }: Props) => {
	return (
		<View style={styles.CardContainer}>
			<View style={styles.NameContainer}>
				<Fontisto name="home" size={22} color="black" />
				<Text style={styles.LocationName}>{LocationID}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	CardContainer: {
		height: 60,
		width: '95%',
		backgroundColor: 'white',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		padding: 10,
		display: 'flex',
		justifyContent: 'center',
		zIndex: 2,
	},
	NameContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	LocationName: {
		color: 'black',
		fontSize: 20,
		marginLeft: 10,
	},
});

export default MyPlacesCard;
