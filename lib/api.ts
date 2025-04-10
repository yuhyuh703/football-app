import axios from 'axios';
import { SelectedDate } from '../types/types';
import Constants from 'expo-constants';
import { Match, League } from '../types/types';
import { useState } from 'react';

const apiUrl = Constants.expoConfig?.extra?.API_URL;
const apiToken = Constants.expoConfig?.extra?.API_TOKEN;

export async function fetchMatchesByDate(selectedDate: SelectedDate): Promise<League[]> {

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
    return data.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchLeagueInfo(ID: string): Promise<unknown> {
    console.log('League ID in api file:', ID);
    const fullApiUrl = `${apiUrl}/standings/live/leagues/${ID}?include=participant`;
    try{
        const response = await fetch(fullApiUrl,{
            method: 'GET',
            headers: {
                Authorization: `${apiToken}`,
                'Content-Type': 'application/json'
            },
        })
        if(!response.ok){
            console.error(`Response status: ${response.status} ${response.statusText}`);
            console.error('Response body:', await response.text());
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }


}