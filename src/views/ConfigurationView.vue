<script setup lang="ts">
import { ref, reactive } from 'vue'
import http from '@/services/http';

const state = reactive({
  localIP:"",
  publicIP:"",
});

let username:string|null="";
let apiKey:string|null="";

if(typeof localStorage !== 'undefined' )
{
    if(localStorage.getItem('username') != null)
      username=localStorage.getItem('username');
    
    if(localStorage.getItem('apiKey') != null)
      apiKey=localStorage.getItem('apiKey');
}

function saveConf(user:string|null, key:string|null) { 
   if (typeof localStorage !== 'undefined') {      
      if(user!=null )
        localStorage.setItem('username', user)
      
      if(key!=null )
        localStorage.setItem('apiKey', key)
    }
}

//Recuperation des IP
http.get(`myIpPublic`).then((response) => {
  state.publicIP=response.data.publicIP;
  }, (error) => {
  console.log(error);
});

http.get(`myIp`).then((response) => {
  state.localIP=response.data.localIp;
}, (error) => {
  console.log(error); 
});

/*const emit = defineEmits({
  selected: () => true
});*/

</script>

<template>
  <div class="form-style-5">
    <fieldset>
      <legend><span class="number">1</span> Votre compte :</legend>
      <input type="text" name="field1" placeholder="Pseudo" v-model="username">
      <input type="text" name="field2" placeholder="Votre clé" v-model="apiKey">     
      </fieldset>    
      <v-btn depressed color="primary" @click="saveConf(username, apiKey)">
       Enregistrer
      </v-btn>
  </div>

  <v-text-field
    label="Addresse Ip Public :"
    v-model="state.publicIP"
    outlined
  ></v-text-field>
  <v-text-field
    label="Addresse Ip Locale :"
    v-model="state.localIP"
    outlined
  ></v-text-field> 

</template>

<style type="text/css">
.form-style-5{
	max-width: 500px;
	padding: 10px 20px;
	background: #f4f7f8;
	margin: 10px auto;
	padding: 20px;
	background: #f4f7f8;
	border-radius: 8px;
	font-family: Georgia, "Times New Roman", Times, serif;
}
.form-style-5 fieldset{
	border: none;
}
.form-style-5 legend {
	font-size: 1.4em;
	margin-bottom: 10px;
}
.form-style-5 label {
	display: block;
	margin-bottom: 8px;
}
.form-style-5 input[type="text"],
.form-style-5 input[type="date"],
.form-style-5 input[type="datetime"],
.form-style-5 input[type="email"],
.form-style-5 input[type="number"],
.form-style-5 input[type="search"],
.form-style-5 input[type="time"],
.form-style-5 input[type="url"],
.form-style-5 textarea,
.form-style-5 select {
	font-family: Georgia, "Times New Roman", Times, serif;
	background: rgba(255,255,255,.1);
	border: none;
	border-radius: 4px;
	font-size: 15px;
	margin: 0;
	outline: 0;
	padding: 10px;
	width: 100%;
	box-sizing: border-box; 
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box; 
	background-color: #e8eeef;
	color:#8a97a0;
	-webkit-box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
	margin-bottom: 30px;
}
.form-style-5 input[type="text"]:focus,
.form-style-5 input[type="date"]:focus,
.form-style-5 input[type="datetime"]:focus,
.form-style-5 input[type="email"]:focus,
.form-style-5 input[type="number"]:focus,
.form-style-5 input[type="search"]:focus,
.form-style-5 input[type="time"]:focus,
.form-style-5 input[type="url"]:focus,
.form-style-5 textarea:focus,
.form-style-5 select:focus{
	background: #d2d9dd;
}
.form-style-5 select{
	-webkit-appearance: menulist-button;
	height:35px;
}
.form-style-5 .number {
	background: #1abc9c;
	color: #fff;
	height: 30px;
	width: 30px;
	display: inline-block;
	font-size: 0.8em;
	margin-right: 4px;
	line-height: 30px;
	text-align: center;
	text-shadow: 0 1px 0 rgba(255,255,255,0.2);
	border-radius: 15px 15px 15px 0px;
}

.form-style-5 input[type="submit"],
.form-style-5 input[type="button"]
{
	position: relative;
	display: block;
	padding: 19px 39px 18px 39px;
	color: #FFF;
	margin: 0 auto;
	background: #1abc9c;
	font-size: 18px;
	text-align: center;
	font-style: normal;
	width: 100%;
	border: 1px solid #16a085;
	border-width: 1px 1px 3px;
	margin-bottom: 10px;
}
.form-style-5 input[type="submit"]:hover,
.form-style-5 input[type="button"]:hover
{
	background: #109177;
}
</style>