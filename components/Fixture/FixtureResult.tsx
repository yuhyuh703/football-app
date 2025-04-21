import React from 'react';
import { Text, View } from 'react-native';
import { Fixture, Participant, Event } from '@/types/types';

interface FixtureResultProps {
    homeTeam: Participant;
    awayTeam: Participant;
    score: {
        home: number;
        away: number;
    };
    goals: {
        home: Event[] | [];
        away: Event[] | [];
    }
}

export default function FixtureResult({homeTeam, awayTeam, score, goals}: FixtureResultProps) {
    console.log('home team: ',homeTeam);
    console.log('away team: ',awayTeam);
    console.log('score homt: ', score.home);
    console.log('score away: ', score.away);
    console.log('goals home: ', goals.home);
    console.log('goals away: ', goals.away);
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Fixture Result</Text>
            <View>
                <Text>{homeTeam?.name} {score.home || ''}</Text> 
            </View>
            <View>
                <Text>{awayTeam?.name} {score.away || ''}</Text>
            </View>

        </View>
    )
}