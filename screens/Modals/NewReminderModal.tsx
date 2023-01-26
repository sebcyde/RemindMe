import {
	View,
	Text,
	Switch,
	TextInput,
	ScrollView,
	StyleSheet,
	Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Input } from '@rneui/base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Accent } from '../../constants/Colors';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import {
	GooglePlaceData,
	GooglePlaceDetail,
	GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import navigation from '../../navigation';
import LargeButton from '../../components/Global/LargeButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

type Props = {};

const NewReminderModal = (props: Props) => {
	const [ReminderTime, setReminderTime] = useState(new Date(1598051730000));
	const LocationData = useSelector((state: any) => state);
	const [StartTime, setStartTime] = useState(new Date(1598051730000));
	const [EndTime, setEndTime] = useState(new Date(1598051730000));
	const [date, setDate] = useState(new Date(1598051730000));
	const [Important, setImportant] = useState(false);
	const [SearchData, setSearchData] = useState<GooglePlaceDetail | string>(
		'Location...'
	);
	const [ReminderOption, setReminderOption] = useState('When I arrive');
	const [Description, setDescription] = useState(
		'Write a short description...'
	);
	const navigation = useNavigation();

	const ReminderOptions = [
		'When I arrive',
		'When I leave',
		"When I'm nearby",
		'At a specific time',
	];

	useEffect(() => {
		console.log('Location Updated');
		console.log(
			'Component Location:',
			LocationData.NewLocationState.LocationData
		);
		setSearchData(LocationData.NewLocationState.LocationData);
	}, [LocationData]);

	const onChange = (event: any, selectedDate: any) => {
		const currentDate = selectedDate;
		setDate(currentDate);
	};

	const StartTimeChange = (event: any, selectedTime: any) => {
		const currentTime = selectedTime;
		setStartTime(currentTime);
	};

	const EndTimeChange = (event: any, selectedTime: any) => {
		const currentTime = selectedTime;
		setEndTime(currentTime);
	};

	const ReminderTimeChange = (event: any, selectedTime: any) => {
		const currentTime = selectedTime;
		setReminderTime(currentTime);
	};

	const toggleSwitch = () => {
		setImportant(!Important);
	};

	const onMapPress = (e: any) => {
		console.log(e.nativeEvent.coordinate);
	};

	return (
		<ScrollView style={styles.CreatePageContainer}>
			<View style={styles.ReminderContainer}>
				<View style={styles.ReminderRow}>
					<TextInput
						placeholder="Reminder title..."
						style={styles.ReminderNameInput}
						placeholderTextColor="darkgray"
					/>
				</View>
				<View style={styles.ReminderRow}>
					<Text style={styles.ReminderRowText}>Remind me...</Text>
					<SelectDropdown
						buttonStyle={{
							height: 22,
							paddingHorizontal: 0,
							marginLeft: 'auto',
							backgroundColor: 'transparent',
						}}
						buttonTextStyle={{
							color: 'lightgray',
							fontSize: 17,
							textAlign: 'right',
						}}
						renderDropdownIcon={() => {
							return (
								<FontAwesome
									name="chevron-down"
									size={17}
									color={'lightgray'}
									style={{ marginLeft: 5 }}
								/>
							);
						}}
						data={ReminderOptions}
						defaultValue={ReminderOption}
						onSelect={(selectedItem, index) => {
							setReminderOption(selectedItem);
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							// text represented for each item in dropdown
							// if data array is an array of objects then return item.property to represent item in dropdown
							return item;
						}}
					/>
				</View>

				{ReminderOption == 'At a specific time' ? (
					<View style={styles.ReminderRowContainer}>
						<Text style={styles.OptionDetailsTitle}>Remind me at...</Text>
						<DateTimePicker
							testID="dateTimePicker"
							value={ReminderTime}
							mode={'time'}
							is24Hour={true}
							onChange={ReminderTimeChange}
						/>
					</View>
				) : null}

				<View style={styles.ReminderRow}>
					<Pressable
						onPress={() => navigation.navigate('NewPlaceModal')}
						style={styles.LocationButton}
					>
						<Text style={styles.LocationButtonText}>
							{typeof SearchData !== 'string'
								? `${SearchData.address_components[0]} ${SearchData.address_components[1]} ${SearchData.address_components[2]}`
								: SearchData}
							Location...
						</Text>
					</Pressable>
				</View>

				{/* <View style={styles.ReminderRow}>
					<GooglePlacesAutocomplete
						nearbyPlacesAPI="GooglePlacesSearch"
						placeholder="Event Location..."
						debounce={400}
						enablePoweredByContainer={false}
						fetchDetails
						onPress={(data, details = null) => {
							if (details) {
								setSearchData(details);
								console.log('Search Details:', details);
							}
						}}
						query={{
							key: 'AIzaSyDuAeTARkSBb7cYQbb1_l5WlOB9bdjmdo4',
							language: 'en',
							components: 'country:uk',
						}}
						styles={{
							container: {
								width: '100%',
								backgroundColor: 'transparent',
								color: 'lightgray',
								marginVertical: 0,
								paddingVertical: 0,
							},
							textInput: {
								marginBottom: 0,
								paddingHorizontal: 0,
								paddingVertical: 0,
								height: 30,
								color: 'lightgray',
								backgroundColor: 'transparent',
								width: '100%',
								borderBottomWidth: 0,
								fontSize: 17,
							},
						}}
						textInputProps={{
							placeholderTextColor: 'darkgray',
							leftIcon: { type: 'font-awesome', name: 'chevron-left' },
							errorStyle: { color: 'red' },
						}}
					/>
				</View> */}
			</View>

			{/* // Map Box */}
			<View style={styles.MapContainer}>
				<MapView
					style={styles.Map}
					provider={PROVIDER_GOOGLE}
					region={{
						latitude: 51.60947,
						longitude: 0.07997,
						latitudeDelta: 0.015,
						longitudeDelta: 0.0121,
					}}
					onPress={onMapPress}
				>
					{/* {LocationData && (
						<Marker
							coordinate={{
								latitude:
									LocationData.NewLocationState.LocationData.geometry.location
										.lat,

								longitude:
									LocationData.NewLocationState.LocationData.geometry.location
										.lng,
							}}
						/>
					)} */}
				</MapView>
			</View>

			{/* // Options Boxes */}
			<View style={styles.Options}>
				<View style={styles.OptionsRowContainer}>
					<Text style={styles.OptionDetailsTitle}>Event Date</Text>
					<DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode={'date'}
						is24Hour={true}
						onChange={onChange}
					/>
				</View>
				<View style={styles.OptionsRowContainer}>
					<Text style={styles.OptionDetailsTitle}>Start Time</Text>
					<DateTimePicker
						testID="dateTimePicker"
						value={StartTime}
						mode={'time'}
						is24Hour={true}
						onChange={StartTimeChange}
					/>
				</View>
				<View style={styles.OptionsRowContainer}>
					<Text style={styles.OptionDetailsTitle}>End Time</Text>
					<DateTimePicker
						testID="dateTimePicker"
						value={EndTime}
						mode={'time'}
						is24Hour={true}
						onChange={EndTimeChange}
					/>
				</View>
				<View style={styles.OptionsRowContainer}>
					<Text style={styles.OptionDetailsTitle}>Important</Text>
					<Switch
						value={Important}
						onValueChange={(value) => setImportant(value)}
					/>
				</View>
			</View>

			{/* // Description Boxes */}
			{/* <View>
				<Text style={styles.DescriptionTitle}>Description</Text>
				<TextInput
					multiline={true}
					numberOfLines={15}
					onChangeText={(text) => setDescription(text)}
					value={Description}
					style={styles.Description}
				/>
			</View> */}

			<Pressable onPress={() => console.log('Pressed')} style={styles.Button}>
				<Text style={styles.ButtonText}>Save Reminder</Text>
			</Pressable>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	CreatePageContainer: {
		paddingHorizontal: 15,
		height: '100%',
	},
	ReminderContainer: {
		flex: 1,
		marginVertical: 20,
		backgroundColor: Accent,
		borderRadius: 10,
		paddingVertical: 10,
		display: 'flex',
		alignItems: 'center',
	},
	ReminderRow: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	ReminderRowText: {
		fontSize: 17,
		color: 'white',
		paddingHorizontal: 0,
		marginRight: 'auto',
	},
	ReminderNameInput: {
		margin: 0,
		flex: 1,
		width: '100%',
		fontSize: 20,
		marginBottom: 5,
	},
	ExampleText: {
		color: 'white',
		width: '100%',
	},
	LocationButton: {
		paddingVertical: 10,
		paddingBottom: 0,
	},
	LocationButtonText: {
		color: 'lightgray',
		fontSize: 17,
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
		backgroundColor: Accent,
		borderRadius: 10,
		padding: 10,
	},
	ReminderRowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 10,
		paddingBottom: 0,
	},
	OptionsRowContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
		width: '100%',
		padding: 10,
	},
	OptionDetailsTitle: {
		fontSize: 17,
		color: 'lightgray',
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
	Button: {
		backgroundColor: 'navy',
		width: '100%',
		borderRadius: 10,
		paddingHorizontal: 45,
		paddingVertical: 19,
		marginBottom: 30,
		alignSelf: 'center',
	},
	ButtonText: {
		color: 'white',
		fontSize: 20,
		textTransform: 'capitalise',
		fontWeight: '600',
		width: '100%',
		textAlign: 'center',
	},
});

export default NewReminderModal;
