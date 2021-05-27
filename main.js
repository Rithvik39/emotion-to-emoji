prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='capture_image' src="+data_uri+">"
    });
}

console.log("ml5 version:" , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dVhnTA7oM/model.json" , modelloaded);

function modelloaded(){
    console.log("model is loaded !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
}

function speak(){
    synth = window.speechSynthesis;
    speak_data1 = "The first prediction is "+ prediction_1;
    speak_data2 = "And the second prediction is "+ prediction_2;
    utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    utter_this.rate = 0.9;
    synth.speak(utter_this);
}

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img , Gotresult);
}

function Gotresult(error , results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;

        document.getElementById("emotion_name1").innerHTML = prediction_1;
        document.getElementById("emotion_name2").innerHTML = prediction_2;
        speak();

        if(prediction_1 == "happy"){
            document.getElementById("emoji_1").innerHTML = "&#128522;";
        }
        if(prediction_1 == "sad"){
            document.getElementById("emoji_1").innerHTML = "&#128532;";
        }
        if(prediction_1 == "angry"){
            document.getElementById("emoji_1").innerHTML = "&#128545;";
        }

        if(prediction_2 == "happy"){
            document.getElementById("emoji_2").innerHTML = "&#128522;";
        }
        if(prediction_2 == "sad"){
            document.getElementById("emoji_2").innerHTML = "&#128532;";
        }
        if(prediction_2 == "angry"){
            document.getElementById("emoji_2").innerHTML = "&#128545;";
        }

    }
}























