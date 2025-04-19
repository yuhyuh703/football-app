import { View, Text } from 'react-native';
import {FullParticipant} from '@/types/types';
import ClubUpcoming from './ClubUpcoming';
import { FlatList } from 'react-native-gesture-handler';
import { Image, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';



interface ClubInfoProps {
    info: FullParticipant | null;
}

export default function ClubInfo({ info }: ClubInfoProps) {
    console.log("ClubInfo", info);
    
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
            <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Text>Upcoming</Text>
                <ClubUpcoming upcoming={info?.upcoming || []} />
            </View>
            <View style={{flex: 1}}>
                <Text>sidelined</Text>
                <FlatList
                data={info?.sidelined}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <Text style={{ fontSize: 16 }}>{item.player.display_name}</Text>
                            <Image source={{ uri: item.player.image_path }} style={styles.image} />
                            <Text>{item.category}</Text>
                          
                            <Text style={{ fontSize: 16 }}>{item.end_date ? item.end_date : 'uknown'}</Text>
                        </View>
                    )
                }}
                ></FlatList>
            </View>
            <View>
                <Text>{info?.venue.name}</Text>
                <Image source={{ uri: info?.venue.image_path }} style={styles.venue} />
                <Text>{info?.venue.capacity}</Text>
            </View>
           
            
        </View>
            </SafeAreaView>
        </SafeAreaProvider>
        </GestureHandlerRootView>
        
    )
}


const styles = StyleSheet.create({
    image: {
      width: 25,
      height: 25
    },
    venue:{
        width: 100,
        height: 100
    }
});