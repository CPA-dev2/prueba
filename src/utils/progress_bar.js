import React from 'react'
import { Spinner, Button, Text, View, Content, Icon, Item, Input } from "native-base";
 
const Progress_bar = ({bgcolor,progress,height}) => {
    
    const Parentdiv = {
        height: height,
        width: '90%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        margin: 5
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
       borderRadius:40,
        textAlign: 'right'
      }
      

        
    return (
    <Content style={{backgroundColor:"white"}}>

    <View style={Parentdiv}>
      <View style={Childdiv}  >
        
      </View>
      </View>           
    </Content>
    )
}
  
export default Progress_bar;