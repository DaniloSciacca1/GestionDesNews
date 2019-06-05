import React, {Component} from 'react';

import { Alert, StyleSheet, Text, TextInput, View, Button, AppRegistry, TouchableOpacity, Keyboard } from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";


class HomeScreen extends Component{

  static navigationOptions =
  {
     title: 'Accueil',

         headerStyle: {
           backgroundColor: '#A13F00'
           ,
         },
         headerTintColor: '#fff',
         headerTitleStyle: {
           fontWeight: 'bold'
           ,
         },
  };

  gotoNextActivity = () =>
  {
     this.props.navigation.navigate('Second');

  }

  render() {


    return (
      <View style={styles.container}>

        <Text style={styles.testo}>
             GestionDesNews
        </Text>

        <Text style={styles.info}>
            by Easyschool
         </Text>

         <Button  style={styles.button}
           onPress = { this.gotoNextActivity }
           title="CONNEXION"
           color="#A13F00"

         />

      </View>
    );
  }
}

// seconda schermata (login)
class SecondScreen extends Component {

  static navigationOptions =
  {
     title: 'Connexion',

              headerStyle: {
                backgroundColor: '#A13F00'
                ,
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold'
                ,
              },
  };

constructor(props) {

    super(props)

    this.state = {

      UserEmail: '',
      UserPassword: ''

    }

  }

connexion_login = () =>{

 const { UserEmail }  = this.state ;
 const { UserPassword }  = this.state ;

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;


/*	if(UserEmail==""){
			//alert("Please enter Email address");
		  this.setState({Mail:'Please enter Email address'})

		}

		else if(reg.test(UserEmail) === false)
		{
		//alert("Email is Not Correct");
		this.setState({Mail:'Email is Not Correct'})
		return false;
		  }


		else{
*/

fetch('http://192.168.1.31/myproject/User_Login.php', {
            method:'POST',
 			headers: {
 				'Accept': 'application/json',
 				'Content-Type': 'application/json',
 			},
 			body: JSON.stringify({
 				// we will pass our input data to server
 				Mail: UserEmail,

 				MotDePasse: UserPassword
 			})


 		}).then((response) => response.json())
 		       .then((responseJson) => {

 			 if(responseJson === "Data Matched"){
 				 // redirect to profile page
 				 alert("Successfully Login");
 				 this.props.navigation.navigate('ProfileActivity', { Mail: UserEmail });
 			 }
 			 else{
 				 Alert.alert(responseJson);
 			 }
 		 }).catch((error) => {
 		    console.error(error);
 		 });


       }
             render() {
               return (

<View style={styles.container}>

            <Text style={styles.testo}>Email</Text>

            <TextInput


                  // Adding hint in Text Input using Place holder.
                  placeholder="Saisissez votre Email"
                  onChangeText={UserEmail => this.setState({UserEmail})}
                  style={styles.login}
                  value= {this.state.text}

                   />


                <Text style={styles.testo}>Mot De Passe</Text>
                <TextInput

                  // Adding hint in Text Input using Place holder.
                  placeholder="Saisissez votre Mot de passe"

                  onChangeText={UserPassword => this.setState({UserPassword})}

                  style={styles.login}

                  secureTextEntry={true}
                  value= {this.state.text}
                />

                <Button title="CONNEXION"  onPress={this.connexion_login} color="#A13F00" />





            </View>
             );
  }
}

class ProfileActivity extends Component
{
   static navigationOptions =
   {
      title: 'ProfileActivity',

   };


   render()
   {

     const {goBack} = this.props.navigation;

      return(
         <View style = { styles.container }>

            <Text style = {styles.TextComponentStyle}> { this.props.navigation.state.params.Mail } </Text>

            <Button title="Click here to Logout" onPress={ () => goBack(null) } />

         </View>
      );
   }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Second: SecondScreen,
    ProfileActivity: ProfileActivity

  },
  {
    initialRouteName: "Home"
  }
);

export default createAppContainer(RootStack);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8100',
  },
  testo: {
    fontSize: 30,
    textAlign: 'center',
  },

  info: {
      fontSize: 15,
      textAlign: 'center',
      marginBottom: 25,
        },

  button: {

        flexDirection: 'row',
       justifyContent: 'space-between'

   },

   login: {
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 25,
            },


});