import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, AsyncStorage } from 'react-native';

const Profile = ({ navigation }) => {
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://192.168.153.88:3000/profile', { // Add server URL
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`, // Pass token in Authorization header
                },
            });

            const data = await response.json();

            if (response.ok) {
                setProfile(data.profile);
            } else {
                Alert.alert('Error', data.message || 'Unable to fetch profile.');
                navigation.navigate('Login'); // Redirect to login if token is invalid
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <View style={styles.container}>
            {profile ? (
                <>
                    <Text style={styles.title}>Welcome, {profile.username}!</Text>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
            <Button title="Logout" onPress={() => navigation.navigate('Login')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default Profile;
