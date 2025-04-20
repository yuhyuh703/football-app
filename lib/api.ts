import { SelectedDate } from '../types/types';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.API_URL;
const apiToken = Constants.expoConfig?.extra?.API_TOKEN;

export async function fetchMatchesByDate(selectedDate: SelectedDate) {

  const fullApiUrl = `${apiUrl}/leagues/date/${selectedDate.dateString}?include=today.scores;today.participants;today.stage;today.group;today.round;today.state`;

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
    //console.log('Matches fetched:', data.data);
    return data.data; 
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchLeagueStandings(seasonID: number){

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

export async function fetchTopScorers(seasonID: number){

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
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

}

export async function fetchFullParticipantInfo (teamID: number) {
  console.log('Fetching team info for teamID:', teamID);
  //const fullApiUrl = `${apiUrl}/teams/${teamID}`
  const fullApiUrl = `https://api.sportmonks.com/v3/football/teams/${teamID}?include=upcoming.league;upcoming.participants;upcoming.round;venue;players.player.nationality;players.player.position;coaches.coach;rankings;sidelined.player;players.player.statistics`;
  try{
    const response = await fetch(fullApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `${apiToken}`,
        'Content-Type': 'application/json',

      }
    })
    if(!response.ok){
      console.error(`Response status: ${response.status} ${response.statusText}`);
      console.error('Response body:', await response.text());
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Team info data:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchPlayerByID(playerID: number){
  console.log('Fetching player info for playerID:', playerID);

  const fullApiUrl = `https://api.sportmonks.com/v3/football/players/${playerID}?include=nationality`
  
  try{
    const response = await fetch(fullApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `${apiToken}`,
        'Content-Type': 'application/json'
      }
    })
    if(!response.ok){
      console.error(`Response status: ${response.status} ${response.statusText}`);
      console.error('Response body:', await response.text());
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Player data:', data);
    return data.data;

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
}

export async function fetchMatchInfo(fixtureID: number) {
  const fullApiUrl = `${apiUrl}/fixtures/${fixtureID}?include=participants;league;venue;state;scores;events.type;events.period;events.player;statistics.type;sidelined.sideline.player;sidelined.sideline.type;weatherReport`
  try{
    const response = await fetch(fullApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `${apiToken}`,
        'Content-Type': 'application/json'
      }
  })
    if(!response.ok){
      console.error(`Response status: ${response.status} ${response.statusText}`);
      console.error('Response body:', await response.text());
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Match info data:', data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchLiveMatches() {
  console.log('Fetching live matches');

  const fullApiUrl = `${apiUrl}/livescores/inplay?include=participants;scores;venue;periods;events;league`
  try{
    const reponse = await fetch (fullApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `${apiToken}`,
        'Content-Type': 'application/json'
      }
    })
    if(!reponse.ok){
      console.error(`Response status: ${reponse.status} ${reponse.statusText}`);
      console.error('Response body:', await reponse.text());
      throw new Error('Network response was not ok');
    }
    const data = await reponse.json();
    console.log('Live matches data:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }

}

export async function fetchTransfersLatest(){
  const fullApiUrl = `${apiUrl}/transfers/latest?include=player;fromTeam;toTeam;type;`
  try{
    const reponse = await fetch (fullApiUrl, {
      method: 'GET',
      headers: {
        Authorization: `${apiToken}`,
        'Content-Type': 'application/json'
      }
    })
    if(!reponse.ok){
      console.error(`Response status: ${reponse.status} ${reponse.statusText}`);
      console.error('Response body:', await reponse.text());
      throw new Error('Network response was not ok');
    }
    const data = await reponse.json();
    console.log('Transfers latest data:', data.data);
    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } 

}