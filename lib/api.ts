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
    console.log('Matches fetched:', data.data);
    return data.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchLeagueStandings(seasonID: number): Promise<unknown> {

    const fullApiUrl = `${apiUrl}/standings/seasons/${seasonID}?include=participant;rule.type;details.type;form;stage;league;group`;
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

export async function fetchTopScorers(seasonID: number): Promise<unknown> {

  const fullApiUrl = `https://api.sportmonks.com/v3/football/topscorers/seasons/${seasonID}?include=player.nationality;player.position;participant;type;season.league&filters=seasontopscorerTypes:208`
  
  try{
    const response = await fetch (fullApiUrl, {
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
    console.log('Top scorers fetched:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

}