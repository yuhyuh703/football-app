import { View, Text } from 'react-native';
import {FullParticipant} from '@/types/types';

interface ClubInfoProps {
    info: FullParticipant | null;
}

export default function ClubInfo({ info }: ClubInfoProps) {
    console.log("ClubInfo", info);
    
    return (
        <View style={{flex: 1}}>
            <Text>{info?.name}</Text>
            <Text>{info?.short_code}</Text>
            <Text>{info?.venue.name}</Text>
            <Text>{info?.venue.capacity}</Text>
        </View>
    )
}