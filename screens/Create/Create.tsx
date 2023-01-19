import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { Text, View } from '../../components/Themed';
import { Input, Switch } from '@rneui/themed';
import { Accent } from '../../constants/Colors';
import DateTimePicker, {
	DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Fontisto } from '@expo/vector-icons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import Geocoder from 'react-native-geocoder';

type Props = {};

const Create = (props: Props) => {
	const [StartTime, setStartTime] = useState(new Date(1598051730000));
	const [EndTime, setEndTime] = useState(new Date(1598051730000));
	const [date, setDate] = useState(new Date(1598051730000));
	const [Important, setImportant] = useState(false);
	const [Description, setDescription] = useState(
		'Write a short description...'
	);

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

	const toggleSwitch = () => {
		setImportant(!Important);
	};

	const onMapPress = (e: any) => {
		console.log(e.nativeEvent.coordinate);
	};

	// const searchAddress = async (address: string) => {
	// 	const res = await Geocoder.geocodeAddress(address);
	// 	console.log(res);
	// 	this.map.animateToRegion(
	// 		{
	// 			latitude: res[0].position.lat,
	// 			longitude: res[0].position.lng,
	// 			latitudeDelta: 0.01,
	// 			longitudeDelta: 0.01,
	// 		},
	// 		2000
	// 	);
	// };

	return (
		<ScrollView style={styles.CreatePageContainer}>
			<Text style={styles.CreatePageHeader}>Create New Reminder</Text>
			<Input placeholder="Reminder Name" style={styles.ReminderNameInput} />

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
				/>
				{/* <TextInput
					placeholder="Search for location"
					onChangeText={(text: string) => this.setState({ address: text })}
					value={this.state.address}
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
					onSubmitEditing={() => searchAddress(this.state.address)}
				/> */}
			</View>

			{/* // Options Boxes */}
			<View style={styles.Options}>
				<View style={styles.OptionsRowContainer}>
					<View style={styles.OptionContainer}>
						<Text style={styles.OptionDetailsTitle}>Event Date</Text>
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode={'date'}
							is24Hour={true}
							onChange={onChange}
						/>
					</View>
					<View style={styles.OptionContainer}>
						<Text style={styles.OptionDetailsTitle}>Important?</Text>
						<Switch
							value={Important}
							onValueChange={(value) => setImportant(value)}
						/>
					</View>
				</View>
				<View style={styles.OptionsRowContainer}>
					<View style={styles.OptionContainer}>
						<Text style={styles.OptionDetailsTitle}>Start Time</Text>
						<DateTimePicker
							testID="dateTimePicker"
							value={StartTime}
							mode={'time'}
							is24Hour={true}
							onChange={StartTimeChange}
						/>
					</View>
					<View style={styles.OptionContainer}>
						<Text style={styles.OptionDetailsTitle}>End Time</Text>
						<DateTimePicker
							testID="dateTimePicker"
							value={EndTime}
							mode={'time'}
							is24Hour={true}
							onChange={EndTimeChange}
						/>
					</View>
				</View>
			</View>

			{/* // Description Boxes */}
			<View>
				<Text style={styles.DescriptionTitle}>Description</Text>
				<TextInput
					multiline={true}
					numberOfLines={15}
					onChangeText={(text) => setDescription(text)}
					value={Description}
					style={styles.Description}
				/>
			</View>
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
	},
	Map: {
		flex: 1,
		width: '100%',
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

export default Create;
