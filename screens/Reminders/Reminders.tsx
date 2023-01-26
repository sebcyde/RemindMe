import { Pressable, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Accent } from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
// import Geocoder from 'react-native-geocoder';
import { FontAwesome } from '@expo/vector-icons';

type Props = {};

const Reminders = (props: Props) => {
	const navigation = useNavigation();

	return (
		<ScrollView style={styles.CreatePageContainer}>
			<Pressable
				onPress={() => navigation.navigate('NewReminderModal')}
				style={({ pressed }) => ({
					opacity: pressed ? 0.5 : 1,
				})}
			>
				<FontAwesome
					name="plus"
					size={25}
					color={'white'}
					style={{ marginRight: 15, marginLeft: 15 }}
				/>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	CreatePageContainer: {
		paddingHorizontal: 15,
	},
	CreatePageHeader: {
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20,
		marginHorizontal: 'auto',
		textAlign: 'center',
		fontWeight: '600',
	},
	ReminderNameInput: {
		color: 'white',
	},
	MapContainer: {
		flex: 1,
		width: '100%',
		height: 200,
		borderRadius: 10,
	},
	Map: {
		flex: 1,
		width: '100%',
		borderRadius: 10,
	},
	Options: {
		flex: 1,
		marginVertical: 20,
	},
	OptionsRowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	OptionContainer: {
		backgroundColor: Accent,
		padding: 15,
		width: '47%',
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	OptionDetailsTitle: {
		fontSize: 17,
		color: 'lightgray',
		marginBottom: 10,
		width: '100%',
		textAlign: 'center',
	},
	DescriptionTitle: {
		marginBottom: 10,
		color: 'gray',
		fontSize: 17,
	},
	Description: {
		height: 200,
		color: 'white',
		paddingHorizontal: 10,
		fontSize: 17,
		borderRadius: 10,
		backgroundColor: Accent,
	},
});

export default Reminders;
