import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import PropTypes from "prop-types";

const {width, height} =Dimensions.get("window");

export default class ToDo extends Component{
    constructor(props){
        super(props);
        this.state={isEditing:false, toDoValue:props.text};
    };
    static propTypes={
        text:PropTypes.string.isRequired,
        isCompleted:PropTypes.bool.isRequired,
        deleteToDo:PropTypes.func.isRequired,
        id:PropTypes.string.isRequired,
        uncompleteToDo:PropTypes.func.isRequired,
        completeToDo:PropTypes.func.isRequired
    };

    render(){
        const {isEditing, toDoValue} = this.state;
        const {text, id, deleteToDo, isCompleted} = this.props;
        return(
        <View style={styles.container}>
            <View style={styles.colum}>
            <TouchableOpacity onPress={this._toggleComplete}>
                <View style={[styles.circle, 
                    isCompleted ? styles.completedCircle : styles.unCompletedCircle]}/>
            </TouchableOpacity>
            {isEditing ? 
            (<TextInput 
            style={
                [styles.text, styles.input,  isCompleted ? styles.completeText : styles.unCompletedText]} 
            value={toDoValue}
            multiline={true}
            onChangeText={this._controlInput} 
            returnKeyType={"done"}
            onBlur={this._finishEditing}/>) 
            : 
            (<Text style={[
                styles.text, isCompleted ? styles.completeText : styles.unCompletedText
            ]}>{text}
            </Text>)
        }
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
                    <TouchableOpacity onPressOut={()=>deleteToDo(id)}>
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
        const {isCompleted, uncompleteToDo, completeToDo, id} = this.props;
        if(isCompleted){
            uncompleteToDo(id);
        }else{
            completeToDo(id);
        }
        // this.setState(prevState=>{
        //     return {
        //         isCompleted: !prevState.isCompleted
        //     }; 
        // });
    };
    _startEditing=()=>{
        this.setState({
            isEditing:true
        });
    };
    _finishEditing=()=>{
        this.setState({
            isEditing:false
        })
    };
    _controlInput = (text)=>{
        this.setState({toDoValue: text});
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
        width: width/2,
    },
    actions:{
        flexDirection:"row"
    },
    actionContainer:{
        marginVertical:10,
        marginHorizontal:10
    },
    input:{
        marginVertical:15,
        width:width/2,
        paddingBottom:5
    }

});
