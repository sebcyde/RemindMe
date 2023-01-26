import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Text, View } from '../../components/Themed';
import React from 'react';
import { useDispatch } from 'react-redux';
import { UpdateLocationData } from '../../Store/NewReminderSlice';
import { useNavigation } from '@react-navigation/native';

export default function NewPlaceModal() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<GooglePlacesAutocomplete
				nearbyPlacesAPI="GooglePlacesSearch"
				placeholder="Ex. Islington, London..."
				debounce={400}
				enablePoweredByContainer={false}
				fetchDetails
				onPress={async (data, details = null) => {
					if (details) {
						dispatch(UpdateLocationData(details));
						navigation.goBack();
					}
				}}
				query={{
					key: 'AIzaSyDuAeTARkSBb7cYQbb1_l5WlOB9bdjmdo4',
					language: 'en',
					components: 'country:uk',
				}}
				styles={{
					container: {
						marginHorizontal: 10,
					},
					textInput: {
						color: 'black',
					},
				}}
				textInputProps={{
					placeholderTextColor: 'gray',
					leftIcon: { type: 'font-awesome', name: 'chevron-left' },
					errorStyle: { color: 'red' },
				}}
			/>
			<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		// justifyContent: 'center',
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
	Searchbar: {
		color: 'white',
	},

	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
