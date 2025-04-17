import {
	AccessibilityInfo,
	ActivityIndicator,
	Animated,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	useAnimatedValue,
	View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const LogoutModal = ({
	showModal,
	closeModal,
}: {
	showModal: boolean;
	closeModal: () => void;
}) => {
	const a = 123123123123
	const [isLoading, setIsLoading] = useState(false);
	const fadeAnim = useAnimatedValue(0);
	const handleLogout = () => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			closeModal();
		}, 2000);
	};
	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};
	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};
	return (
		<Modal
			visible={showModal}
			transparent={true}
			animationType="fade"
			// animationType="none"
			onRequestClose={closeModal}
			// onRequestClose={fadeOut}
		>
			<TouchableWithoutFeedback onPress={closeModal}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.textStyle}>Do you want to log out?</Text>
						<View style={styles.groupButton}>
							<TouchableOpacity
								onPress={handleLogout}
								style={[styles.button, styles.buttonLogout]}>
								{isLoading ? (
									<ActivityIndicator size={'small'} color={'#FFF'} />
								) : (
									<Text style={styles.textLogout}>Log Out</Text>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								onPress={closeModal}
								style={[styles.button, styles.buttonCancle]}>
								<Text>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
			{/* <Animated.View style={[styles.centeredView,{opacity: fadeAnim}]}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.textStyle}>Do you want to log out?</Text>
						<View style={styles.groupButton}>
							<TouchableOpacity
								onPress={handleLogout}
								style={[styles.button, styles.buttonLogout]}>
								{isLoading ? (
									<ActivityIndicator size={'small'} color={'#FFF'} />
								) : (
									<Text style={styles.textLogout}>Log Out</Text>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								onPress={closeModal}
								style={[styles.button, styles.buttonCancle]}>
								<Text>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Animated.View> */}
		</Modal>
	);
};

export default LogoutModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		transform: [{ scale: 1 }],
		opacity: 1,
	},
	groupButton: {
		flexDirection: 'row',
		gap: 8,
		marginTop: 10,
	},
	button: {
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingVertical: 10,
		elevation: 2,
	},
	buttonLogout: {
		backgroundColor: '#EE0000',
		color: 'white',
	},
	buttonCancle: {
		backgroundColor: '#FFF',
		borderWidth: 1,
		borderColor: 'black',
	},
	textStyle: {
		color: 'black',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	textLogout: {
		color: 'white',
		fontWeight: 'bold',
	},
	// textCancle: {
	//     text: ''
	// }
});
