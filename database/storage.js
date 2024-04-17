
import firebase from './firebase';

export default class Storage {

    listContents(onContentUpdate, userId) {
         firebase.firestore().collection(userId).onSnapshot((querySnapshot)=>{
            let contents = [];
            querySnapshot.forEach((doc)=>{
              const { name, desc } = doc.data();
              let id = doc.id;
              contents.push({id, name, desc});
            });
            onContentUpdate(contents);
         });
    } 

    edit(index, content, userId) {
         firebase.firestore().collection(userId).doc(index).set(content);  
         alert('Atualizado com sucesso');         
    }

     add(content, userId) {
         firebase.firestore().collection(userId).add(content)
         alert('Senha salva');        
    }

     deleteContent(index, userId) {
         firebase.firestore().collection(userId).doc(index).delete().then(() => {
            console.log('Apagado com sucesso');
            alert('Apagado com sucesso');   
        })
        .catch((error) => {
            console.log(error);
        });
    }

    registerUsername(name, userId){
      firebase.firestore().collection(userId).doc('userInfo').set({
        name
      })
    }

}