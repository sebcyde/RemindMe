import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

type Props = { TextContent: string; Background?: string };

const LargeButton = ({ TextContent, Background = 'crimson' }: Props) => {
	const styles = StyleSheet.create({
		Button: {
			backgroundColor: Background,
			width: '100%',
			borderRadius: 10,
			paddingHorizontal: 45,
			paddingVertical: 19,
			marginBottom: 30,
			position: 'absolute',
			bottom: 20,
			alignSelf: 'center',
		},
		ButtonText: {
			color: 'white',
			fontSize: 23,
			textTransform: 'uppercase',
			fontWeight: '800',
			width: '100%',
			textAlign: 'center',
		},
	});

	return (
		<Pressable onPress={() => console.log('Pressed')} style={styles.Button}>
			<Text style={styles.ButtonText}>{TextContent}</Text>
		</Pressable>
	);
};

export default LargeButton;
