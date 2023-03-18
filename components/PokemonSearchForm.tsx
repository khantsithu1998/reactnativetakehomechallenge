import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker';

export default function PokemonSearchForm() {
    return <View style={styles.searchContainer}>
        <NameInput />
        <View style={styles.dropDownWrapper}>
            <PokemonTypeDropdown />
            <PokemonRarityDropdown />
            <PokemonSetDropdown />
        </View>
    </View>
}

const NameInput = (props: any) => {

    const [name, setName] = useState('');

    const handleNameChange = (text: string) => {
        setName(text);
        if (props.onNameChange) {
            props.onNameChange(text);
        }
    };

    return (
        <TextInput
            style={styles.nameInput}
            onChangeText={handleNameChange}
            value={name}
            placeholder="Name"
            textAlign='center'
            maxLength={20}
        />
    );

}

const PokemonTypeDropdown = () => {
    const [selectedType, setSelectedType] = useState('Type');

    return (
        <View style={styles.dropDownContainer}>
            <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedType(itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
                
            >
                <Picker.Item label="Type" value="Type" />
                <Picker.Item label="Fire" value="Fire" />
                <Picker.Item label="Water" value="Water" />
                <Picker.Item label="Grass" value="Grass" />
                <Picker.Item label="Electric" value="Electric" />
                <Picker.Item label="Psychic" value="Psychic" />
                <Picker.Item label="Fighting" value="Fighting" />
                <Picker.Item label="Darkness" value="Darkness" />
                <Picker.Item label="Metal" value="Metal" />
                <Picker.Item label="Fairy" value="Fairy" />
            </Picker>
        </View>
    );
}


const PokemonRarityDropdown = () => {
    const [selectedRarity, setSelectedRarity] = useState('Rarity');

    return (
        <View style={styles.dropDownContainer}>
            <Picker
                selectedValue={selectedRarity}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedRarity(itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
            >
                <Picker.Item label="Rarity" value="Rarity" />
                <Picker.Item label="Fire" value="Fire" />
                <Picker.Item label="Water" value="Water" />
                <Picker.Item label="Grass" value="Grass" />
                <Picker.Item label="Electric" value="Electric" />
                <Picker.Item label="Psychic" value="Psychic" />
                <Picker.Item label="Fighting" value="Fighting" />
                <Picker.Item label="Darkness" value="Darkness" />
                <Picker.Item label="Metal" value="Metal" />
                <Picker.Item label="Fairy" value="Fairy" />
            </Picker>
        </View>
    );
}

const PokemonSetDropdown = () => {
    const [selectedSet, setSelectedSet] = useState('Set');

    return (
        <View style={styles.dropDownContainer}>
            <Picker
                selectedValue={selectedSet}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedSet(itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
                
            >
                <Picker.Item label="Set" value="Set" />
                <Picker.Item label="Fire" value="Fire" />
                <Picker.Item label="Water" value="Water" />
                <Picker.Item label="Grass" value="Grass" />
                <Picker.Item label="Electric" value="Electric" />
                <Picker.Item label="Psychic" value="Psychic" />
                <Picker.Item label="Fighting" value="Fighting" />
                <Picker.Item label="Darkness" value="Darkness" />
                <Picker.Item label="Metal" value="Metal" />
                <Picker.Item label="Fairy" value="Fairy" />
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    dropDownWrapper: {
        flexDirection: 'row',
        justifyContent : 'space-evenly'
    },
    searchContainer: {
        paddingHorizontal: wp(8),
        marginBottom : hp(4)
    },
    nameInput: {
        backgroundColor: 'white',
        borderRadius: wp(6),
        paddingVertical: hp(0.7),
        marginVertical: hp(2),
        fontSize: wp(3),
    },
    dropDownContainer: {
        backgroundColor: '#fff',
        borderRadius: wp(10),
        overflow: 'hidden',
    },
    picker  : {
        width: wp(26),
        height : hp(4.5),
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        left: -25,
            
    },
    pickerItem : {
        fontSize : wp(2),
        
    }
});

