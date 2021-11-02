function drawCongkakBoard(canvas, ctx) {
  const boardColor = "#0095DD";

  function drawHalfCircle(xOffset, isLeft) {
    ctx.beginPath();

    var x = canvas.width/2 + xOffset; // x coordinate
    var y = canvas.height/2; // y coordinate
    var radius = 60; // Arc radius
    var startAngle = 1.5 * Math.PI; // Starting point on circle
    var endAngle = Math.PI * (1/2); // End point on circle
    var anticlockwise = isLeft; // clockwise or anticlockwise

    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.fillStyle = boardColor;
    ctx.fill();

    ctx.closePath();
  }

  function drawBody(x, y, width, height) {
    ctx.beginPath();

    ctx.fillStyle = boardColor;
    ctx.fillRect(x, y, width, height);

    ctx.closePath();
  }

  function drawHomeHole(isPlayer1) {
    ctx.beginPath();

    
    let xOffset = 200;
    if (!isPlayer1) {
      xOffset = xOffset * -1;
    }

    var x = canvas.width/2 + xOffset; // x coordinate
    var y = canvas.height/2; // y coordinate
    var radius = 35; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle
    ctx.fillStyle = "#026e99";

    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise=true);
    ctx.fill();

    ctx.closePath();
  }

  function drawSingleVillageHole(xOffset, yOffset) {
    ctx.beginPath();

    var x = canvas.width/2 + xOffset; // x coordinate
    var y = canvas.height/2 + yOffset; // y coordinate
    var radius = 18; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle
    ctx.fillStyle = "#006e99";

    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise=true);
    ctx.fill();

    ctx.closePath();
  }

  function drawVillageHoles(villagesConfigPlayer) {
    for (let i = 1; i <= 7; i++) {
      drawSingleVillageHole((-180 + i * 45), villagesConfigPlayer[i-1].yOffset);
    }
  }

  function setVillageHoles(villagesConfig) {
    for (let i = 1; i <= 7; i++) {
      villagesConfig['player1'][i-1] = {
        x: canvas.width/2 + (-180 + i * 45),
        y: canvas.height/2 + 25,
        radius: 18,
        startAngle: 0,
        endAngle: Math.PI * 2,
        key: i-1,
        yOffset: 25,
      }

      villagesConfig['player2'][7-i] = {
        x: canvas.width/2 + (-180 + i * 45),
        y: canvas.height/2 + (-25),
        radius: 18,
        startAngle: 0,
        endAngle: Math.PI * 2,
        key: i + 6,
        yOffset: -25,
      }
    }
  }

  drawHalfCircle(-200, isLeft=true);
  drawHalfCircle(200, isLeft=false);
  drawBody(canvas.width/2 + -200, canvas.height/2-60, 400, 120);
  drawHomeHole(isPlayer1=true);
  drawHomeHole(isPlayer1=false);
  setVillageHoles(this.villagesConfig);
  drawVillageHoles(this.villagesConfig['player1']);
  drawVillageHoles(this.villagesConfig['player2']);
}

function drawBeans(canvas, ctx) {
  var villageXOffsets = Array(7).fill(0); // 7 items (a village each)
  const defaultXOffset = -135;
  const defaultUserYOffset = 25, defaultEnemyYOffset = -25;
  for (let iter = 0; iter < 7; iter++) {
    villageXOffsets[iter] = (iter === 0 ? (defaultXOffset - 45) : villageXOffsets[iter-1]) + 45;  // distance between village is 45
  }

  function drawIndividualBean(xOffset, yOffset, spreadFactor = 7) {
    var randomIntSign = () => ((Math.random()*100 < 50) ? 1 : -1);

    var x = canvas.width/2 + xOffset + Math.floor(Math.random() * spreadFactor * randomIntSign()); // x coordinate
    var y = canvas.height/2 + yOffset + Math.floor(Math.random() * spreadFactor * randomIntSign()); // y coordinate

    var radius = 4; // Arc radius
    var startAngle = 0; // Starting point on circle
    var endAngle = Math.PI * 2; // End point on circle
    var anticlockwise = true; // clockwise or anticlockwise

    ctx.strokeStyle = "#2b2222";
    ctx.fillStyle = "#6f4e37";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.fill();
    ctx.stroke();

    ctx.closePath();
  }

  function drawBeanInVillage(index, quantity, isPlayer1=true) {
    const yOffset = (isPlayer1) ? defaultUserYOffset : defaultEnemyYOffset;
    for (let iter = 0; iter < quantity; iter++) {
      drawIndividualBean(villageXOffsets[index], yOffset);
    }
  }

  function drawBeanInHome(quantity, isPlayer1=true) {
    const xOffset = (isPlayer1) ? -200 : 200;
    for (let iter = 0; iter < quantity; iter++) {
      drawIndividualBean(xOffset, 0, spreadFactor=15);
    }
  }

  for (let iter = 0; iter < 7; iter++) {
    drawBeanInVillage(iter, this.state['player1'].villages[iter], isPlayer1=true);
    drawBeanInVillage(iter, this.state['player2'].villages[6-iter], isPlayer1=false);
  }

  drawBeanInHome(this.state['player1']['home'], isPlayer1=true);
  drawBeanInHome(this.state['player2']['home'], isPlayer1=false);
}

function drawCounterText(canvas, ctx, pointer=-1, side=-1, hand=0, turn=1) {
  function drawVillageHolesCounter(isPlayer1, numbers) {
    let yOffset = (isPlayer1) ? 58 : -45;
    let xOffset = 0;

    for (let i = 1; i <= 7; i++) {
      ctx.font = '17px arial';
      ctx.fillStyle = "#fcfcfc";
      xOffset = (numbers[i] >= 10) ? -4 : xOffset;
      if (!isPlayer1) {
        ctx.fillText(numbers[7-i], canvas.width/2 + (-180 + i * 45) - 5 + xOffset, canvas.height/2 + yOffset);
      } else {
        ctx.fillText(numbers[i-1], canvas.width/2 + (-180 + i * 45) - 5 + xOffset, canvas.height/2 + yOffset);
      }
    }
  }

  function drawHomeHoleCounter(isPlayer1, value) {
    let xOffset = 0;
    if (isPlayer1) {
      if (value >= 10) {
        xOffset = 216;
      } else {
        xOffset = 208;
      }
    } else {
      if (value >= 10) {
        xOffset = -184;
      } else {
        xOffset = -192;
      }
    }

    xOffset *= -1;

    ctx.font = '30px arial';
    ctx.fillStyle = "#fcfcfc";
    ctx.fillText(value, canvas.width/2 + xOffset, canvas.height/2 + 10);
  }

  drawVillageHolesCounter(isPlayer1=true, this.state['player1']['villages']);
  drawVillageHolesCounter(isPlayer1=false, this.state['player2']['villages']);

  drawHomeHoleCounter(isPlayer1=true, value=this.state['player1']['home']);
  drawHomeHoleCounter(isPlayer1=false, value=this.state['player2']['home']);

  drawPointer(canvas, ctx, this.villagesConfig, pointer, side, hand);
  
  drawTextInfo(canvas, ctx, turn);
}

function initCongkakBoard() {
  this.drawCongkakBoard(this.backgroundLayer.scene.canvas, this.backgroundLayer.scene.context)
  this.drawBeans(this.beansLayer.scene.canvas, this.beansLayer.scene.context)
  this.drawCounterText(this.textCounterLayer.scene.canvas, this.textCounterLayer.scene.context)
}

function updateCongkakDisplay(pointer=-1, side=-1, hand=0, turn=0) {
  this.beansLayer.scene.clear();
  this.drawBeans(this.beansLayer.scene.canvas, this.beansLayer.scene.context)
  this.textCounterLayer.scene.clear();
  this.drawCounterText(this.textCounterLayer.scene.canvas, this.textCounterLayer.scene.context, pointer, side, hand, turn)
}

function whoIsWon(state) {
  let p1Score = state.player1.villages.reduce((acc, a) => (acc + a), 0) + state.player1.home
  let p2Score = state.player2.villages.reduce((acc, a) => (acc + a), 0) + state.player2.home
  if (p1Score > p2Score) {
    return "1"
  } else if (p1Score < p2Score) {
    return "2"
  } else {
    return "Draw"
  }
}

function drawTextInfo(canvas, ctx, turn) {
  if (turn !== 0) {
    ctx.beginPath();
    ctx.fillStyle = "#0095DD";
    const text = "Player " + turn.toString() + " turn!";
    if (gameState.isEndGame) {
      let endState = whoIsWon(gameState.congkakState);
      if (endState === "Draw") {
        ctx.fillText("Game Draw!", canvas.width/2 - 90, canvas.height/2 - 130);
      } else {
        ctx.fillText("Player " + endState + " WON!", canvas.width/2 - 90, canvas.height/2 - 130);
      }
    } else {
      ctx.fillText(text, canvas.width/2 - 90, canvas.height/2 - 130);
    }
    ctx.closePath();
  }
}

function drawPointer(canvas, ctx, villagesConfigPlayer, pointer, side, hand) {
  if (pointer < 0 || pointer > 6 || side === -1) {
    return;
  }

  let vill;
  if (side === 1) {
    vill = villagesConfigPlayer['player1'][pointer];
  } else {  // side == 2
    vill = villagesConfigPlayer['player2'][6-pointer];
  }
  
  let X = vill.x, Y = vill.y;
  var height = 40 * (Math.sqrt(3)/2);
  
  ctx.fillStyle = "#4CAF50";

  ctx.beginPath();
  if (side === 1) {
    Y += 40;
    ctx.moveTo(X, Y);
    ctx.lineTo(X+10, Y+height);
    ctx.lineTo(X-10, Y+height);
    ctx.lineTo(X, Y);
    ctx.fillText(hand.toString(), X, Y+60);
  } else {  // side === 2
    Y -= 40;
    ctx.moveTo(X, Y);
    ctx.lineTo(X+10, Y-height);
    ctx.lineTo(X-10, Y-height);
    ctx.lineTo(X, Y);
    ctx.fillText(hand.toString(), X, Y-40);
  }

  
  ctx.fill();
  ctx.closePath();
}

// pointer = 0..6 (left to right)
function sendMove(gameState, selected) {
  function takeBeans(side, pointer, boardState) {
    let temp;
    if (side === 1) {
      temp = boardState['player1'].villages[pointer]
      boardState['player1'].villages[pointer] = 0
    } else if (side === 2) {
      temp = boardState['player2'].villages[6-pointer]
      boardState['player2'].villages[6-pointer] = 0
    }

    return temp;
  }

  function putBeanToHome(turn, boardState) {
    if (turn === 1) {
      boardState['player1'].home += 1;
      console.log("tes1");
      $("#modal").html("");
      $("#modal").modal('show');
    } else if (turn === 2) {
      boardState['player2'].home += 1;
      console.log("tes2");
      $("#modal").html("");
      $("#modal").modal('show');
    }
  }

  function putBean(side, pointer, boardState) {
    if (side === 1) {
      boardState['player1'].villages[pointer] += 1;
        var audio = new Audio('img/sound2.wav');
        audio.play();
    } else if (side === 2) {
      boardState['player2'].villages[6-pointer] += 1;
        var audio = new Audio('img/sound2.wav');
        audio.play();
    }
  }

  function isDead(side, pointer, turn, round, boardState) {
    if (side == 1) {
      //document.getElementById("myBtn");
      //alert("tes soal?");
      $("#myModal").modal('show');
      return (boardState['player1'].villages[pointer] === 1)
      $("#myModal").modal('show');
    } else if (side == 2) {
      return (boardState['player2'].villages[6-pointer] === 1)
    }
  }

  function getBeansInOppositeVillage(side, pointer, boardState) {
    let temp;
    if (side === 1) {
      temp = boardState['player2'].villages[6-pointer];
      boardState['player2'].villages[6-pointer] = 0;
    } else if (side === 2) {
      temp = boardState['player1'].villages[6-pointer];
      boardState['player1'].villages[6-pointer] = 0;
    }
  return temp;
  }

  function anyBeansInOppositeVillage(side, pointer, boardState) {
    if (side === 1) {
      return (boardState['player2'].villages[6-pointer] > 0);
    } else if (side === 2) {
      return (boardState['player1'].villages[6-pointer] > 0);
    }
  }

  let turn = gameState.turn;
  let pointer = (turn === 2) ? (6-selected) : selected;
  let side = turn;
  let round = false;
  let hand = takeBeans(side, pointer, this.state);
  let inHome = false;

  // Board representation
  // 2 | 6 ... 0
  // 1 | 0 ... 6

  let nIntervId = setInterval(() => {
    this.updateCongkakDisplay(inHome ? -1: pointer, inHome ? -1 : side, hand, turn)
    this.viewport.render();
    // move CW
    if (inHome) {
      if (turn === 1) {
        side = 2;
      } else if (turn === 2) {
        side = 1;
      }
      inHome = false;
    } else {
      if (side === 1 && pointer === 0) {
        if (turn === 1) { // put to home
          inHome = true;
        } else if (turn === 2) {
          side = 2;
          round = true;
        }
      } else if (side === 2 && pointer === 6) {
        if (turn === 1) {
          side = 1;
          round = true;
        } else if (turn === 2) {  // put to home
          inHome = true;
        }
      } else {
        if (side === 1) {
          pointer--;
        } else {
          pointer++;
        }
      }
    }

    // put 1
    hand -= 1;
    if (inHome) {
      putBeanToHome(turn, this.state);
    } else {
      putBean(side, pointer, this.state);
    }

    // check if dead
    if (hand === 0 && (inHome || isDead(side, pointer, turn, round, this.state))) {
      if (!inHome) {
        if (turn === 1 && side === 1) { // check kemungkinan nembak
          if (round && anyBeansInOppositeVillage(side, pointer, this.state)) {
            this.state['player1'].home += getBeansInOppositeVillage(side, pointer, this.state);
            this.state['player1'].home += this.state['player1'].villages[pointer];
            this.state['player1'].villages[pointer] = 0;
            hand = 0;
            // $("#myModal").modal('show');
          }
        } else if (turn === 2 && side === 2) {
          if (round && anyBeansInOppositeVillage(side, pointer, this.state)) {
            this.state['player2'].home += getBeansInOppositeVillage(side, pointer, this.state);
            this.state['player2'].home += this.state['player2'].villages[pointer];
            this.state['player2'].villages[pointer] = 0;
            hand = 0;
          }
        }
      }
    } else if (hand === 0){
      hand += takeBeans(side, pointer, this.state);
    }

    if (hand <= 0) {
      gameState.turn = (gameState.turn === 1) ? 2 : 1
      if (this.isTerminalState(gameState.congkakState)) {
        gameState.isEndGame = true;
        lock = true;
      } else {
        lock = false;
      }
      this.updateCongkakDisplay(inHome ? -1: pointer , inHome ? -1 : side, hand, gameState.turn)
      this.viewport.render();
      clearInterval(nIntervId);
    }
  }, 600);
}

class CongkakBoard {
  static createBoard(viewport, congkakContainer, backgroundLayer, beansLayer, textCounterLayer, pointerLayer) {
    this.viewport = viewport;
    this.congkakContainer = congkakContainer;
    this.backgroundLayer = backgroundLayer;
    this.beansLayer = beansLayer;
    this.textCounterLayer = textCounterLayer;
    this.pointerLayer = pointerLayer;
  };

  static isTerminalState(states) {
    return (states.player1.villages.reduce((acc, a) => (acc + a), 0) === 0 || 
            states.player2.villages.reduce((acc, a) => (acc + a), 0) === 0
    );
  }

  static drawCongkakBoard = drawCongkakBoard;
  static drawBeans = drawBeans;
  static drawCounterText = drawCounterText;
  static initCongkakBoard = initCongkakBoard;
  static drawPointer = drawPointer;

  static updateCongkakDisplay = updateCongkakDisplay;

  static sendMove = sendMove;
  
  // attributes
  static state = {
    'player1': {
      'home': 0,
      'villages': Array(7).fill(7)
    },
    'player2': {
      'home': 0,
      'villages': Array(7).fill(7)
    }
  }

  // needed for hit detection
  static villagesConfig = {
    'player1': Array(7),
    'player2': Array(7),
  }
}

//ringkasan materi
var quiz = [];
quiz[0] = new Question("Berdasarkan sifatnya, sumber daya alam dibagi menjadi tiga, yaitu: sumber daya alam yang dapat diperbaruhi, sumber daya alam yang tidak dapat diperbaruhi, dan sumber daya alam yang kekal atau tidak akan habis.", 
  "Dapat diperbaharui","Bisa didapatkan dengan mudah",  
  "Dapat dimusnahkan", "Akan cepat habis");
quiz[1] = new Question("Berdasarkan sifatnya, sumber daya alam dibagi menjadi tiga yaitu: sumber daya alam yang dapat diperbaruhi, sumber daya alam yang tidak dapat diperbaruhi, dan sumber daya alam kekal atau tidak habis. Contoh sumber daya alam yang dapat diperbaruhi : hewan dan tumbuhan. Contoh sumber daya alam yang tidak dapat diperbaruhi : minyak bumi, batu bara, dan gas alam. Contoh sumber daya alam yang kekal : air, sinar matahari, dan udara.", "Hemat",
  "Terus menerus", "Berlebihan", "Melimpah");
quiz[2] = new Question("Sumber daya alam yang tidak dapat diperbaruhi harus digunakan dengan cara berhemat karena, apabila digunakan secara berlebihan sumber daya alam akan cepat berkurang, dan habis karena tidak dapat diperbaruhi . Contoh sumber daya alam yang tidak dapat diperbaruhi adalah emas, batu bara, dan minyak bumi.", 
  "Dipakai terus menerus","Dibiarkan", "Dikembangbiakan", "Dibudidayakan");
quiz[3] = new Question("Sumber daya alam yang tidak dapat diperbaruhi akan habis apabila digunakan secara terus menerus dengan jumlah yang besar.", "dapat diperbaruhi, tidak dapat diperbaruhi  dan kekal atau tidak habis", 
  "Dapat ditambang dan tidak", "Mahal dan murah", "Dapat diternak dan tidak");
quiz[4] = new Question("Manfaat air bagi kehidupan sangat banyak, misal untuk keperluan rumah tangga ( minum memasak, mandi, cuci piring dan baju ), untuk keperluan umum misal ( tempat rekreasi dan untuk kebersihan jalan dan pasar ).",
 "Hemat", "Melimpah", "Berlebihan", "Terus menerus");
quiz[5] = new Question("Di Indonesia, terdapat dataran tinggi dan dataran rendah. Lahan sawah merupakan lahan pertanian yang umum dijumpai di daerah dataran dengan topografi landau atau dataran rendah. Biasanya lahan pertanian yang berupa hamparan sawah yang luas ditemukan di daerah pedesaan atau dataran rendah  yang diselingi perkampungan para petani.", "Untuk pembangkit listrik", 
  "Untuk membanjiri sawah", "Untuk irigasi", "Untuk minuman");
quiz[6] = new Question("Indonesia mempunyai beberapa jenis dataran, contoh: dataran rendah dan dataran tinggi. Dilihat dari tanahnya,dataran tinggi sangat cocok apabila digunakan untuk perkebunan misalnya perkebunan kelapa sawit, kopi dan lain-lain. Sedangkan dataran rendah sangat cocok untuk pemukiman, industri, dan pertanian.", "Dataran rendah", "Muara sungai", 
  "Dataran tinggi", "Pegunungan");
quiz[7] = new Question("Di Indonesia memiliki berbagai jenis tumbuhan yang dapat digunakan untuk sumber pangan. Contoh tumbuhan yang dapat digunakan untuk sumber pangan adalah padi, jagung, kedelai dan lain–lain. Tanaman tersebut tidak beracun dan mempunyai banyak manfaat bagi manusia.", 
  "Perkebunan", "Pertanian", "Perikanan", "Peternakan");
quiz[8] = new Question("Indonesia mempunyai berbagai jenis pohon yang dapat dimanfaatkan untuk bahan bangunan. Jenis pohon yang sering digunakan, yaitu: pohon mahoni dan pohon jati. Kelebihan dari pohon jati adalah tahan terhadap rayap sedangkan pohon mahoni mempunyai daya tompang yang stabil.", 
  "Padi, jagung dan kedelai", "Rotan, jati dan mahoni", "Padi, ketela dan randu", "Sagu, kelapa dan meranti ");
quiz[9] = new Question("Berdasarkan jenisnya, sumber daya alam dibagi menjadi dua yaitu : sumber daya alam biotik dan sumber daya alam abiotik. Contoh sumber daya alam biotik adalah : hewan, dan tumbuhan sedangkan contoh dari sumber daya alam abiotik adalah air, emas, dan batu bara.", 
  "Bahan bangunan", "Sumber energi", "Bahan obat-obatan", "Bahan makanan");
quiz[10] = new Question("Rotan dapat dimanfaatkan sebagai bahan baku mebel. Contoh: kursi, meja, dan rak buku. Rotan juga memiliki beberapa keunggulan daripada kayu yaitu: ringan, kuat, elastis atau mudah dibentuk, dan murah.", 
  "Perkotaan", " Pegunungan ", "Perkampungan", "Desa");
quiz[11] = new Question("Salah satu daearah penghasil emas di Indonesia adalah daerah rejang lebong provinsi Bengkulu. Selain di daerah rejang lebong terdapat derah penghasil emas antara lain: Sumbawa, martabe, dompu, dan gunung pokor.", 
  "Tanahnya sangat subur", "Tanahnya sangat gersang ", "Tanahnya sangat tandus ", "Tanahnya sangat luas");
quiz[12] = new Question("Minyak Bumi termasuk dalam sumber daya alam yang tidak dapat diperbarui. Karena proses pembentukan sisa tanaman dan hewan menjadi fosil hingga bisa menjadi minyak bumi membutuhkan waktu yang sangat lama. Oleh karena itu, penggunan minyak bumi perlu dilakukan secara bijak dan tidak boros agar tidak cepat habis.", 
  "Minyak tanah", "Sayur", "Ikan ", "Buah");
quiz[13] = new Question("Minyak bumi dimanfaatkan sebagai bahan bakar, baik bahan bakar yang digunakan dalam kendaraan, rumah tangga, maupun yang lainnya. Banyak kendaraan yang menggunakan mesin berbahan bakar. seperti motor, mobil, dan lainnya.", 
  " Pepohonan ", "Padi", "Ikan ", " Sayuran ");
quiz[14] = new Question("Kesuburan tanah di Indonesia karena dilalui oleh cicin api pasifik. Hal tersebut menyebabkan Indonesia kaya akan gunung berapi. Letusan gunung berapi mengeluarkan bahan mineral dan senyawa anorganik. Sehingga, menyebabkan tanah menjadi subur dan kaya akan sumber daya alam.", 
  "Mutiara", "Perunggu", "Perak ", " Emas");
quiz[15] = new Question("Indonesia mempunyai berbagai jenis macam kayu yang dapat digunakan sebagai bahan baku meja dan kursi. Contohnya pohon jati, pohon maoni, dan lain-lain.", 
  "Sumber daya alam biotik", "Sumber daya alam non biotik ", "c.  Sumber daya alam yang dapat diperbaruhi", 
  "Sumber daya alam yang tidak dapat diperbaruhi ");
quiz[16] = new Question("Sumber daya alam di bidang pertanian adalah padi, jagung, dan ketela pohon.", "Nelayan", 
  "Petani", "Peternak", "Pegawai");
quiz[17] = new Question("Penduduk di daerah sebagian besar mata pencahariannya sebagai nelayan karena tempat tinggalnya di daerah dekat laut.", "Bahan bakar minyak ", "Bahan bakar industri ", 
  "Perhiasan ", "Pembuatan pupuk ");
quiz[18] = new Question("Mutiara termasuk sumber daya alam yang dapat diperbaruhi karena berasal dari  kerang. Kerang termasuk makhluk hidup yang mudah berkembang biak dan mudah untuk dibudidayakan.", "Rejang lebong ", "Arun", "cepu", "plaju");
quiz[19] = new Question("Salah satu daearah penghasil emas di Indonesia adalah daerah rejang lebong provinsi Bengkulu. Selain di daerah rejang lebong terdapat derah penghasil emas antara lain: Sumbawa, martabe, dompu, dan gunung pokor.", "Padi ", 
  "emas", "tambang", "minyak bumi");
quiz[20] = new Question("Di daerah dataran tinggi kegiatan ekonomi yang sangat cocok untuk digunakan sebagai perkebunan. Perkebunan yang ada di dataran tinggi adalah: perkebunan teh, kopi, dan kakao. Untuk dataran rendah cocok digunakan untuk lahan pertanian. Contoh : padi, palawija, dan tebu.", "Bahan mebel ", "Bahan baku cat ", "Bahan baku komestik ", 
  "Bahan baku makanan ");


var randomQuestion;
var answers = [];
var currentScore = 0;

document.addEventListener("DOMContentLoaded", function(event) { 
  btnProvideQuestion();
});

function Question(question,rightAnswer,wrongAnswer1,wrongAnswer2,wrongAnswer3) {
    this.question = question;
    // this.rightAnswer = rightAnswer;
    // this.wrongAnswer1 = wrongAnswer1;
    // this.wrongAnswer2 = wrongAnswer2;
    // this.wrongAnswer3 = wrongAnswer3;
};

function shuffle(o) {
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

function btnProvideQuestion() { 
  
  var randomNumber = Math.floor(Math.random()*quiz.length);
  randomQuestion = quiz[randomNumber]; //getQuestion
  answers = [randomQuestion.rightAnswer, randomQuestion.wrongAnswer1, randomQuestion.wrongAnswer2,
  randomQuestion.wrongAnswer3];
  shuffle(answers);
  
  document.getElementById("question").innerHTML= randomQuestion.question;
  // document.getElementById("answerA").value= answers[0];
  // document.getElementById("answerA").innerHTML= answers[0];
  // document.getElementById("answerB").value= answers[1];
  // document.getElementById("answerB").innerHTML= answers[1];
  // document.getElementById("answerC").value= answers[2];
  // document.getElementById("answerC").innerHTML= answers[2];
  // document.getElementById("answerD").value= answers[3];
  // document.getElementById("answerD").innerHTML= answers[3];

}

// function answerA_clicked() {
//   var answerA = document.getElementById("answerA").value;
//     checkAnswer(answerA);
// }

// function answerB_clicked() {
//     var answerB = document.getElementById("answerB").value;
//   checkAnswer(answerB);
// }
// function answerC_clicked() {
//   var answerC = document.getElementById("answerC").value;
    
//     checkAnswer(answerC);
// }

// //D
// function answerD_clicked() {
//   var answerD = document.getElementById("answerD").value;
    
//     checkAnswer(answerD);
// }

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
     btnProvideQuestion();
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
