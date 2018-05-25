import React, { Component } from "react";
import { View , Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";




class Calc extends Component{

    constructor(){
        super()
        this.state = {
            inputText: "",
            pendingOperation: null,
            firstOperand: "",
            secondOperand: "",
            previousresult: ""
        };
        this.num =[ 
            "AC","+/-","%","1","2","3","4","5","6","7","8","9","0",".", "="
        ]
        this.symbols =[ 
           "DEL","+","-","*","/"
        ]

    }

    
    handleInput(text){
        console.log(text);
        this.setState({
            inputText:text
        });

    }

    handleButtonInput(text){
        if(text==="AC"){
            this.setState({
                inputText: ""
            });
            console.log(JSON.stringify(this.state));
            return;
        }
        else if(text==="DEL"){
            val = this.state.inputText
            this.setState({
                inputText: val.substring(0,val.length-1)
            });
            console.log(JSON.stringify(this.state));
            return;
        }
        else if(text ==="+/-"){
            val = this.state.inputText
            if(val.indexOf("-")!=0){
                value = "-";
                this.setState({
                    inputText: value+val
                });
                console.log("I work")
            }
            else{
                this.setState({
                    inputText: val.substring(1)
                    
                })
                console.log("you work")

            }         
           
            console.log(JSON.stringify(this.state));
            return;
        }
        else if(text ==="%"){
            val = Number(this.state.inputText)
            console.log(val)
            val = val/Number(100)
            console.log(val)
            this.setState({
                inputText: val.toString()
            
            })
            return;

        }
        else if(["+","-","*","/"].indexOf(text) >-1){
            this.setState({
                pendingOperation: text,
                firstOperand: this.state.inputText,
                inputText: ""
            });
            console.log(JSON.stringify(this.state));
            return;
        }
        else if(text==="="){
            
            this.setState({
                inputText : this.calculate(),
                pendingOperation: null,
                previousresult: this.state.inputText,
                firstOperand: "",
                secondOperand: ""
            })
            return;
        }
        this.setState({
            inputText:this.state.inputText+text
        });

    }

    calculate(){
        value = this.calculatenum(this.state.firstOperand, this.state.inputText)
        txtvalue = this.lengthvalidation(value.toString())
        console.log(txtvalue)
        return txtvalue;
    }
    calculatenum(num1, num2){

        switch(this.state.pendingOperation){
            case "+":
                return Number(num1)+Number(num2);
            case "-":
                return Number(num1)-Number(num2);
            case "*":
                return Number(num1)*Number(num2);
            case "/":
                return Number(num1)/Number(num2);
            default:
                return this.state.inputText;

        }       
    }
    lengthvalidation(text){
        if(text.length>11){
            
            num = Number(text)
            newnum = num.toExponential()
            console.log(newnum)
            newtext = newnum.toString()
            console.log(newtext)
            return newtext
            
        }
        return text
    }
    render(){
        return(
            <View style={{flex:1}}>
                <TextInput 
                    onChangeText={this.handleInput.bind(this)}
                    value= {this.state.inputText}
                    style={styles.input}
                    />
                <View style = {{ flex: 1 , flexDirection: "row"}}>
                <View style = {{flex:9, backgroundColor: "grey", flexDirection: "column"}}>
                        {this.num.map((key,i)=>{
                            if((i+1)%3 == 0 && i != 0){
                           
                            return( <View style = {styles.row}>
                                <TouchableOpacity
                                onPress = {this.handleButtonInput.bind(this , this.num[i-2])}
                                style={styles.button} >
                                
                                <Text style= {styles.buttontext}>{this.num[i-2]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = {this.handleButtonInput.bind(this , this.num[i-1])}
                                style={styles.button} >
                                <Text style= {styles.buttontext}>{this.num[i-1]}</Text>   
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = {this.handleButtonInput.bind(this , this.num[i])}
                                style={styles.button} >
                                <Text style= {styles.buttontext}>{this.num[i]}</Text>
                            </TouchableOpacity>
                            </View>
                            );
                        }
                        return;

                        })}
                    </View>
                    <View style = {{flex:3, backgroundColor: "white"}}>
                        {this.symbols.map((key,i)=>{
                            return (<TouchableOpacity 
                                onPress= {this.handleButtonInput.bind(this, this.symbols[i])}
                                style={styles.button}
                                ><Text style= {styles.buttontext}>{this.symbols[i]}</Text></TouchableOpacity>);
                        })}
                    </View>
                </View>
            </View>
            
        );
    }


}
const styles = StyleSheet.create({
    input: {
        backgroundColor: "rgb(41,41,41)",
        height:150,
        width:100+'%',
        color: "rgb(255,255,255)",
        fontSize: 48,
        textAlign: "right"
    },
    button: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    buttontext: {
        fontSize: 48,
        textAlign: "center"
    },
    row: {
        flex: 1,
        flexDirection: "row"
    }


});

export default Calc