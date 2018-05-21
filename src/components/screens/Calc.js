import React, { Component } from "react";
import { View , Text, TextInput, StyleSheet} from "react-native";

class Calc extends Component{
    handleinput(text){
        console.log(text);
        this.setState({
            text:text
        });

    }

    render(){
        return(
            <View style={{flex:1, backgroundColor: 'red'}}>
                <TextInput 
                    onChangeText={this.handleinput.bind(this)}
                    value={"360"}
                    style={styles.input}
                    />
            </View>
        );
    }


}
const styles = StyleSheet.create({
    input: {
        backgroundColor: "grey",
        height:150,
        width:100+'%',
        color: "rgb(255,255,255)",
        fontSize: 48,
        textAlign: "right"
    },

});

export default Calc