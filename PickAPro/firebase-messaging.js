importScripts("https://www.gstatic.com/firebasejs/6.0.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.0.1/firebase-messaging.js");

var firebaseConfig = {
    apiKey: "AIzaSyBulcduYuKQfGIUbqq4xNbx-1MR65ia86s",
    authDomain: "pickapro-b9b63.firebaseapp.com",
    databaseURL: "https://pickapro-b9b63.firebaseio.com",
    projectId: "pickapro-b9b63",
    storageBucket: "pickapro-b9b63.appspot.com",
    messagingSenderId: "26515396537",
    appId: "1:26515396537:web:623bbaf83a4df9c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const messaging = firebase.messaging();
  
  messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/itwonders-web-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

