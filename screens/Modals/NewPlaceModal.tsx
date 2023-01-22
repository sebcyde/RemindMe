import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Input, Switch } from '@rneui/themed';
import {
	GooglePlaceData,
	GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { Text, View } from '../../components/Themed';
import { useState } from 'react';

export default function NewPlaceModal() {
	const [SearchData, setSearchData] = useState<GooglePlaceData>();

	return (
		<View style={styles.container}>
			<GooglePlacesAutocomplete
				nearbyPlacesAPI="GooglePlacesSearch"
				placeholder="Ex. Islington, London..."
				debounce={400}
				enablePoweredByContainer={false}
				fetchDetails
				onPress={(data, details = null) => {
					if (data) {
						setSearchData(data);
					}
					console.log('data', data);
					console.log('details', details);
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
			<Text>{JSON.stringify(SearchData)}</Text>
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
