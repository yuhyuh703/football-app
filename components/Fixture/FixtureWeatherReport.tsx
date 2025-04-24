import React from 'react'
import { View, Text, Image } from 'react-native'
import { Fixture, WeatherReport } from '@/types/types'
import { StyleSheet } from 'react-native'

export default function FixtureWeather({ weather }: { weather: WeatherReport }) {
    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Weather Report</Text>
  
        {weather.current ? 
          (<View style={styles.row}>
            <Image source={{ uri: weather.icon }} style={styles.icon} />
    
            <View style={styles.details}>
              <Text style={styles.mainText}>{weather.current?.temp}°C</Text>
              <Text style={styles.description}>{weather.current?.description}</Text>
            </View>
    
            <View style={styles.meta}>
              <Text style={styles.label}>Feels like: {weather.current?.feels_like}°C</Text>
              <Text style={styles.label}>Wind: {weather.current?.wind} m/s</Text>
              <Text style={styles.label}>Humidity: {weather.current?.humidity}</Text>
            </View>
          </View>)
          : 
        <Text style={styles.description}>No weather data available</Text>}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: '#f8f9fa',
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 12,
      marginTop: 16,
      borderWidth: 1,
      borderColor: '#e0e0e0',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 60,
      height: 60,
      marginRight: 16,
    },
    details: {
      justifyContent: 'center',
      marginRight: 16,
    },
    mainText: {
      fontSize: 22,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 14,
      color: '#555',
      marginTop: 4,
      textTransform: 'capitalize',
    },
    meta: {
      flex: 1,
    },
    label: {
      fontSize: 13,
      color: '#444',
      marginBottom: 2,
    },
  });
  