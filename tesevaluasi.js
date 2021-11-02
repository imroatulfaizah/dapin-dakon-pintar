//ringkasan materi
var quiz = [];
quiz[0] = new Question("Amatilah sifat sumber daya alam berikut : <br>"+
"(1) Dapat diperbaruhi <br>"+
"(2) Dapat diperbaharui, tidak dapat diperbaruhi, dan kekal atau tidak habis <br>"+
"(3)Tidak dapat diperbaruhi <br>"+
"(4) Kekal <br>"+
"Tiga sifat sumber daya alam ditunjukkan oleh nomor …….","Dapat diperbaruhi, tidak dapat diperbaruhi, dan kekal atau tidak habis."," Dapat diperbaruhi ",  
  " Tidak dapat diperbaruhi ", " Kekal ");
quiz[1] = new Question("Hewan dan tumbuhan adalah contoh sumber daya alam yang ….", "Dapat diperbaharui ",
  " Bisa didapatkan dengan mudah ", " Dapat dimusnahkan ", " Akan cepat habis ");
quiz[2] = new Question("Perhatikan cara menghemat sumber daya alam yang tidak dapat diperbaruhi di bawah ini.<br>"+
"(1) Mengemat sumber daya alam <br>"+
"(2) Di gunakan secara berlebihan <br>"+
"(3) Di gunakan secukupnya <br>"+
"(4) Membuang sumber daya alam <br>"+ 
"Cara yang menunjukkan cara menghemat sumber daya alam adalah……","(1) dan (3) ", "(1) dan (2)", "(2) dan (3)", "(3) dan (4)");
quiz[3] = new Question("Sumber daya alam yang tidak dapat diperbaharui adalah kekayaan alam yang akan habis jika ….", ". Dipakai terus menerus", 
  " Dibudidayakan ", " Dikembangbiakan ", " Dibiarkan ");
quiz[4] = new Question("Berikut ini adalah manfaat dari air kecuali ….",
 " Untuk pembangkit listrik ", " Untuk membanjiri sawah ", " Untuk irigasi ", " Untuk minuman ");
quiz[5] = new Question("Perhatikan jenis-jenis tanaman pangan berikut : <br>"+
"(1) Padi, jagung, dan kedelai <br>"+
"(2) Rotan, jati, dan mahoni <br>"+
"(3) Padi, ketela, dan randu <br>"+
"(4) Sagu, kelapa, dan meranti <br>"+
"Jenis tanaman pangan ditunjukkan oleh nomor…. ","Padi, jagung, dan kedelai ", "Rotan, jati, dan mahoni", "Padi, ketela, dan randu ", "Sagu, kelapa, dan meranti ");
quiz[6] = new Question("Jati dan mahoni adalah sumber daya alam yang dimanfaatkan sebagai ….", " Bahan bangunan ", " Sumber energi ",  " Bahan obat-obatan ", " Bahan makanan ");
quiz[7] = new Question("Perhatikan jenis jenis sumber daya alam di bawah ini:<br>"+
"(1) Hewan<br>"+
"(2) Tumbuhan<br>"+ 
"(3) Batu bara<br>"+ 
"(4) Minyak bumi<br>"+ 
"Sumber daya alam biotik ditunjukkan oleh nomor ….","(1) dan (2) ", "(3) dan (4)", "(2) dan (3)", "(1) dan (4)");
quiz[8] = new Question("Rotan dapat dimanfaatkan untuk …….", 
 " Bahan mebel ", " Bahan baku makanan ", " Bahan baku cat", " Bahan baku kosmetik");
quiz[9] = new Question("Perhatikan sumber daya alam berikut <br>"+
"(1) Ikan <br>"+ 
"(2) Minyak tanah <br>"+ 
"(3) Buah <br>"+
"(4) Sayuran <br>"+
"Sumber daya alam yang tidak diperbaruhi ditunjukkan oleh nomor ……..","Minyak tanah ", " Ikan ", " Buah ", " Sayuran");
quiz[10] = new Question("Perhatikan manfaat minyak bumi sebagai berikut :<br>"+
"(1) Bahan bakar industry <br>"+ 
"(2) Pembuatan pupuk <br>"+ 
"(3) Bahan bakar minyak <br>"+ 
"(4) Perhiasan <br>"+
"Manfaat minyak bumi ditunjukkan oleh nomor ….", "Bahan bakar minyak ", " Perhiasan ", " Pembuatan pupuk ", " Bahan bakar industri");
quiz[11] = new Question("Indonesia memiliki sumber daya alam yang berlimpah karena …… ", 
  "Tanahnya sangat subur", "Tanahnya sangat gersang ", "Tanahnya sangat tandus ", "Tanahnya sangat luas");
quiz[12] = new Question("Sumber daya alam yang dapat dimanfaatkan untuk membuat kursi dan meja adalah ….", 
  " Kayu ", " Padi ", " Ikan ", " Sayuran ");
quiz[13] = new Question("Contoh sumber daya alam di bidang pertanian adalah ….. ", 
 " Padi ", " Tambang ", " Emas ", " Minyak bumi ");
quiz[14] = new Question("Sumber daya alam yang dapat diperbarui adalah... ", 
  "Mutiara", "Perunggu", "Perak ", " Emas");
quiz[15] = new Question("Di daerah pantai banyak penduduknya berprofesi sebagai ……. ", 
" Nelayan ", " Pegawai ", " Petani ",   " Peternak ");
quiz[16] = new Question("Daerah penghasil emas adalah ……… ", 
" Rejang lebong ", 
 " Plaju ", " Arun ", " Cepu ");
quiz[17] = new Question("Kegiatan ekonomi yang memanfaatkan sumber daya alam di daerah dataran tinggi yang paling cocok dengan kondisi tanahnya adalah….", 
" Perkebunan ", " Perikanan ", 
 " Peternakan  ", " Pertanian ");
quiz[18] = new Question("Daerah penghasil  emas adalah ?", "Rejang lebong ", "Arun", "cepu", "plaju");
quiz[19] = new Question("Contoh sumber daya alam di Indonesia bidang pertanian adalah ?", "Padi ", 
  "emas", "tambang", "minyak bumi");
quiz[20] = new Question("Rotan dapat dimanfaatkan untuk ?", "Bahan mebel ", "Bahan baku cat ", "Bahan baku komestik ", 
  "Bahan baku makanan ");

var randomQuestion;
var answers = [];
var currentScore = 0;

document.addEventListener("DOMContentLoaded", function(event) { 
  btnProvideQuestion();
});

function Question(question,rightAnswer,wrongAnswer1,wrongAnswer2,wrongAnswer3) {
    this.question = question;
    this.rightAnswer = rightAnswer;
    this.wrongAnswer1 = wrongAnswer1;
    this.wrongAnswer2 = wrongAnswer2;
    this.wrongAnswer3 = wrongAnswer3;
};

function shuffle(o) {
  
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  //console.log(i);
  return o;
};

function btnProvideQuestion() { 
  
  var randomNumber = Math.floor(Math.random()*quiz.length);
  randomQuestion = quiz[randomNumber]; //getQuestion
  console.log(randomNumber);
  answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2,
  randomQuestion.wrongAnswer3];
  shuffle(answers);
  
  document.getElementById("question").innerHTML= randomQuestion.question;
  document.getElementById("answerA").value= answers[0];
  document.getElementById("answerA").innerHTML= answers[0];
  document.getElementById("answerB").value= answers[1];
  document.getElementById("answerB").innerHTML= answers[1];
  document.getElementById("answerC").value= answers[2];
  document.getElementById("answerC").innerHTML= answers[2];
  document.getElementById("answerD").value= answers[3];
  document.getElementById("answerD").innerHTML= answers[3];

}

function answerA_clicked() {
  var answerA = document.getElementById("answerA").value;
    checkAnswer(answerA);
}

function answerB_clicked() {
    var answerB = document.getElementById("answerB").value;
  checkAnswer(answerB);
}
function answerC_clicked() {
  var answerC = document.getElementById("answerC").value;
    
    checkAnswer(answerC);
}

//D
function answerD_clicked() {
  var answerD = document.getElementById("answerD").value;
    
    checkAnswer(answerD);
}

function adjustScore(isCorrect) {
  debugger;
  if (isCorrect) {
    currentScore++;
  } else {
    if (currentScore > 0) {
      currentScore--;
    }
  }
  document.getElementById("score").innerHTML = currentScore;
}

function checkAnswer(answer) {  
  if (answer == randomQuestion.rightAnswer) {
    swal({
      title: "Jawaban Kamu Benar!",
      text: "Klik Ok!",
      icon: "success",
      button: "Okey!",
    });
    adjustScore(true);
    if(quiz.length<=21){
     btnProvideQuestion();
     console.log(quiz.length);
    }else{
       $('#myModal').modal('hide');
    }
    // modal.style.display = "none";
    $('#myModal').modal('hide');
  } else { 
    swal({
      title: "Jawaban Kamu Salah!",
      text: "Klik Ok!",
      icon: "error",
      button: "Okey!",
    }).then(function() {
        adjustScore(false);
         btnProvideQuestion();
        // modal.style.display = "none";
        $('#myModal').modal('hide');
    });

  }   
}
