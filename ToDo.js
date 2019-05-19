import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

const {width, height} =Dimensions.get("window");

export default class ToDo extends Component{
    state={
        isEditing:false,
        isCompleted:false
    };
    render(){
        const {isCompleted, isEditing} = this.state;
        return(
        <View style={styles.container}>
            <View style={styles.colum}>
            <TouchableOpacity onPress={this._toggleComplete}>
                <View style={[styles.circle, 
                    isCompleted ? styles.completedCircle : styles.unCompletedCircle]}/>
            </TouchableOpacity>
            <Text style={[styles.text, 
                isCompleted ? styles.completeText : styles.unCompletedText]}>Hello I am a To Do!!</Text>
        </View>
            {isEditing ? (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={this._finishEditing}>
                        <View style = {styles.actionContainer}>
                            <Text style={styles.actionText}>✅</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.actions}>
                    <TouchableOpacity onPressOut={this._startEditing}>
                        <View style = {styles.actionContainer}>
                             <Text style={styles.actionText}>✏️</Text>
                     </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                         <View style = {styles.actionContainer}>
                                <Text style={styles.actionText}>❌</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
        );
    }

    _toggleComplete=()=>{
        this.setState(prevState=>{
            return {
                isCompleted: !prevState.isCompleted
            };
        });
    };
    _startEditing=()=>{
        this.setState({
            isEditing:true
        })
    };
    _finishEditing=()=>{
        this.setState({
            isEditing:false
        })
    };
}

const styles=StyleSheet.create({
    container:{
        width: width-50,
        borderBottomColor:"#bbb",
        borderBottomWidth:StyleSheet.hairlineWidth,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    circle:{
        width:30,
        height:30,
        borderRadius:15,
        borderColor:"red",
        marginRight:20,
        borderWidth:3
    },
    text:{
        fontWeight:"600",
        fontSize:20,
        marginVertical:20
    },
    completedCircle:{
        borderColor:"#bbb"
    },
    unCompletedCircle:{
        borderColor:"#F23657"
    },
    completeText:{
        color:"#bbb",
        textDecorationLine:"line-through"
    },
    unCompletedText:{
        color:"#353839"
    },
    colum:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width: width/2,
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10
    }

});
