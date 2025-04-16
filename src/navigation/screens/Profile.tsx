import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import LogoutModal from '../modal/LogoutModal';

export default function Profile() {
    const [showModal, setShowModal] = useState<boolean>(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={openModal}>
                    <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>
            <LogoutModal showModal={showModal} closeModal={closeModal} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#EE0000',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowOpacity: 0.25,
		shadowRadius: 4
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
});
