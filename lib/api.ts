import axios from 'axios';
import { SelectedDate } from '../types/_matchesTypes';
import Constants from 'expo-constants';
import { Match, League } from '../types/_matchesTypes';
import { useState } from 'react';


export async function fetchMatchesByDate(selectedDate: SelectedDate): Promise<League[]> {
  console.log('in api fetchMatchesByDate');
  const apiUrl = Constants.expoConfig?.extra?.API_URL;
  const apiToken = Constants.expoConfig?.extra?.API_TOKEN;
  const fullApiUrl = `${apiUrl}/leagues/date/${selectedDate.dateString}?include=today.scores;today.participants;today.stage;today.group;today.round`;

  try {
    const response = await fetch(fullApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `${apiToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Full API response:', data); 
    return data.data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error so the caller can handle it
  }
}
