let now_answer = 1
let answer_check = false
let qa, qb, qc
let time_stop = false

window.onload = function() {
    // 完全読み込み後に実行する処理
    make_question(1)
}

//問題作成関数
function make_question(lv){
    answer_check = false
    let a = 1;
    let b = get_not0_Randam(-9,9);
    let c = 1;
    let d = get_not0_Randam(-9,9);

    qa = a*c
    qb = a*d+b*c
    qc = b*d

    let_span(qa, qb, qc)
    now_answer = 1
}

//問題表示関数
function let_span(qa, qb, qc){

    id_list = ["qa", "qb", "qc"]
    deta_list = [qa, qb, qc]

    for(let i = 0 ; i < 3 ; i++){

        let text = ""
        if (deta_list[i] > 1){
            if (i >= 1){
                text = "+" + deta_list[i]
            }else{
                text = deta_list[i]
            }
        }
        if (deta_list[i] == 1){
            if (i >= 1){
                text = "+"
            }
        }
        if(deta_list[i] < -1){
            text = + deta_list[i]
        }
        if(deta_list[i] == -1){
            text = "-"
        }

        //入力部分リセット
        if (deta_list[i] != 0){
            switch(i){
                case(0):
                    text += "x²"
                    break
                case(1):
                    text += "x"
                    break
            }
        }

        let element = document.getElementById(id_list[i])
        element.textContent = text
    }


    //〇×画像非表示
    let element = document.getElementById("question_maru_img")
    element.style.display = "none"
    element = document.getElementById("question_batu_img")
    element.style.display = "none"
    time_stop = false

    
    // 回答欄の中身を削除
    let id_list2 = ["answer_1a", "answer_1b", "answer_2a", "answer_2b"]
    for (let i=0; i<=3; i++){
        let element = document.getElementById(id_list2[i])
        element.textContent = String.fromCharCode(160)
    }

    // 入力部分の下線リセット
    element = document.getElementById("answer_left")
    element.style.textDecoration = "underline"
    element.style.textDecorationColor = "#3d4ee4"
    element = document.getElementById("answer_right")
    element.style.textDecoration = "none"
}

// ボタン押された時の反応
function button(n){
    if (time_stop === false){

        if ((typeof n) === "number"){
            let id = "answer_" + String(now_answer) + "b"
            element = document.getElementById(id)
            element.textContent = n
        }
        if (n === "p"){
            let id = "answer_" + String(now_answer) + "a"
            element = document.getElementById(id)
            element.textContent = "+"
        }
        if (n === "m"){
            let id = "answer_" + String(now_answer) + "a"
            element = document.getElementById(id)
            element.textContent = "-"
        }

        if (n === "r"){
            now_answer = 2
            let element = document.getElementById("answer_left")
            element.style.textDecoration = "none"
            element = document.getElementById("answer_right")
            element.style.textDecoration = "underline"
            element.style.textDecorationColor = "#3d4ee4"
        }
        if (n === "l"){
            now_answer = 1
            let element = document.getElementById("answer_left")
            element.style.textDecoration = "underline"
            element.style.textDecorationColor = "#3d4ee4"
            element = document.getElementById("answer_right")
            element.style.textDecoration = "none"
        }

        if (n === "e"){
            enter()
        }
    }   
}

//決定キー
function enter(){

    let answer_1a = document.getElementById("answer_1a").textContent
    let answer_1b = Number(document.getElementById("answer_1b").textContent)
    let answer_2a = document.getElementById("answer_2a").textContent
    let answer_2b = Number(document.getElementById("answer_2b").textContent)

    if (answer_1a === "+"){ answer_1b = answer_1b }
    else if (answer_1a === "-"){ answer_1b = -1*answer_1b }
    else{ answer_1b = 0}

    if (answer_2a === "+"){ answer_2b = answer_2b }
    else if (answer_2a === "-"){ answer_2b = -1*answer_2b }
    else{ answer_2b = 0}

    if (qb === (answer_1b+answer_2b) && qc === answer_1b*answer_2b){
        answer_check = true
    }

    console.log(answer_1b+answer_2b)
    console.log(answer_1b*answer_2b)
    console.log(answer_check)

    if (answer_check){
        answer_true()
    }else{
        answer_false()
    }


}


// 正解の場合の処理
function answer_true(){
    element = document.getElementById("question_maru_img")
    element.style.display = "block"
    time_stop = true
    window.setTimeout(make_question, 1000);
}

// 不正解の場合の処理
function answer_false(){
    element = document.getElementById("question_batu_img")
    element.style.display = "block"
    time_stop = true
    window.setTimeout(answer_img_none, 1000);
}

// 回答画像非表示
function answer_img_none(){
    element = document.getElementById("question_maru_img")
    element.style.display = "none"
    element = document.getElementById("question_batu_img")
    element.style.display = "none"
    time_stop = false
}


// n以上m以下の整数を返す
function getRandam(n, m){
  let num = Math.floor(Math.random() * (m + 1 - n)) + n;
  return num
}


// n以上m以下で0以外の整数を返す
function get_not0_Randam(n, m){
    let num = 0
    while (num === 0){
    num = Math.floor(Math.random() * (m + 1 - n)) + n;
    }
    return num
  }