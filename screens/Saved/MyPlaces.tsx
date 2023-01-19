import LoadingComponent from '../../components/Loading/LoadingComponent';
import MyPlacesCard from '../../components/Saved/MyPlacesCard';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { app, UserID } from '../../Config/Firebase';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import EditScreenInfo from '../../components/EditScreenInfo';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { Accent } from '../../constants/Colors';
import { SearchBar } from '@rneui/themed';

type Props = {};

const MyPlaces = (props: Props) => {
	const [Locations, loading] = useCollection(
		collection(getFirestore(app), `Users/${UserID}/Locations`)
	);
	const navigation = useNavigation();

	const [search, setSearch] = useState('');

	const updateSearch = (search: string) => {
		setSearch(search);
	};

	return (
		<View style={styles.PageContainer}>
			<View style={styles.Controls}>
				<SearchBar
					placeholder="Search..."
					onChangeText={updateSearch}
					value={search}
					containerStyle={{
						flex: 1,
						backgroundColor: 'transparent',
						borderTopColor: 'transparent',
						borderBottomColor: 'transparent',
					}}
					inputContainerStyle={{
						backgroundColor: '#001d3d',
					}}
				/>

				<Pressable
					onPress={() => navigation.navigate('NewPlaceModal')}
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
			</View>
			<ScrollView style={styles.LocationsContainer}>
				{loading || !Locations ? (
					<LoadingComponent />
				) : (
					<>
						{Locations.docs.map((doc) => (
							<MyPlacesCard
								LocationID={doc.id}
								Location={(doc.data().latitude, doc.data().longitude)}
							/>
						))}
					</>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	PageContainer: {
		height: '100%',
		width: '100%',
		zIndex: 1,
		flex: 1,
	},
	Controls: {
		display: 'flex',
		flexDirection: 'row',
		padding: 10,
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: 'center',
		backgroundColor: Accent,
	},
	ControlsHeader: {
		color: 'white',
		margin: 10,
		marginRight: 'auto',
		fontSize: 20,
		fontWeight: '600',
	},
	LocationsContainer: {
		paddingTop: 20,
		height: '50%',
		width: '100%',
		position: 'relative',
		zIndex: 1,
		flex: 1,
	},
	Temp: {
		color: 'white',
		margin: 10,
		fontSize: 20,
	},
});

export default MyPlaces;
