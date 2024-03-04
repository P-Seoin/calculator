const buttons =document.querySelectorAll('button');
const numpad = document.querySelectorAll('.numpad');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.pane');

let oper = ''; // 연산자 입력
let pre = ''; // 이전 입력 값 ,첫번째숫자
let resent = ''; // 최근 값 , 두번째숫자

// 계산 함수 만들기 caculate (pre, oper, resent) 순으로 함수 인자 받기
function caculate (n1, oper, n2 ) { //???? 왜 function 안 쓰고 let 쓰는건지?@@@@@
    let result = 0;
    switch(oper){ 
        case '+':
            result = Number(n1) + Number(n2); // Number 함수(문자열을 숫자로 변환해주는 함수)를 사용하여 계산
            break;
        case '-':
            result = Number(n1) - Number(n2); // Number 함수(문자열을 숫자로 변환해주는 함수)를 사용하여 계산
            break;
        case '/':
            result = Number(n1) / Number(n2); // Number 함수(문자열을 숫자로 변환해주는 함수)를 사용하여 계산
            break;
        case '*':
            result = Number(n1) * Number(n2); // Number 함수(문자열을 숫자로 변환해주는 함수)를 사용하여 계산
            break;
        default:
            break;
    }
    return String(result);
};

function caculator(){ // 계산 하기전 밑작업
     let firstdigit = true; // 첫 번째 자리 숫자 판별 변수 선언 > 나중에 구분을 위해 true=0

     buttons.forEach((item) => {
        item.addEventListener('click',(e)=> { //?
            let action =e.target.classList[0]; //?
            let click = e.target.innerHTML; //?
            
            if (action === 'operator'){ // 연산자가 눌렀을 때
                oper = click; // 연산자 변수안에 클릭한 연산자 저장
                pre = display.textContent; // 여태입력했던 숫자들(디스플레이 창에 입력한 숫자들)을 이전숫자에 저장
                display.textContent=''; // 그리고 다시 디스플레이 창 초기화하고 두번째 숫자 받을 준비하기
                firstdigit = true; // 첫번째 숫자가 입력됐다고 체크하기
            }
            if (action === 'numpad'){
                if ( firstdigit && click === '0'){ //첫번째 숫자이고 입력된 값이 0 일때
                    return; //걍 넘어감
                }

                if(display.textContent === '' && oper === ''){ // 숫자입력 창이 비어있고 연산자가 아직 입력 안 됐을 때 = 한자리수만 입력됐을 때
                    display.textContent = click; // 클릭한거 디스플레이창에 보이기
                    pre = display.textContent; // 디스플레이창에 표시된거 이전숫자에 저장
                }
                else if(display.textContent !== '' && oper === ''){ //숫자창에 숫자가 입력되어있고 연산자가 아직 입력 안 됐을 때 = 한자리 수 이상일때
                    display.textContent = display.textContent + click; //이전에 이미 보여줬던 숫자 + 새로 클릭한 숫자 보이기
                    pre = display.textContent; //위에 저장된 업데이트된 숫자들 이전숫자에 저장

                }
                else if(display.textContent ===''&& oper !==''){ //숫자 창이 비어있고 연산자가 입력됐을 때 = 2번째 숫자 한자리수 입력차례
                    display.textContent = click; // 클릭한거 디스플레이창에 보이기
                    resent = display.textContent; //디스플레이 창에 표시된거 두번째숫자에 저장 
                }
                else if(display.textContent !=='' && oper !==''){ //숫자도 입력되어있고 연산자도 입력되어있을 때 = 2번째숫자 한자리 이상 입력차레
                    display.textContent = display.textContent + click; //이전에 이미 보여줬던 숫자 + 새로 클릭한 숫자 보이기
                    resent = display.textContent; //위에 저장된 업데이트된 숫자들 두번째 숫자에 저장
                    firstdigit = false; //첫번째자리 수가 아님을 표시
                }
            }

            if (action==='result'){
                display.textContent=caculate(pre,oper,resent); //계산함수에서 계산한 값 디스플레이에 배치하기
                firstdigit = true ; //초기화
            }
            
            if (action ==='allclear'){
                display.textContent='';
                pre ='';
                oper='';
                resent='';
                firstdigit =true;
            }
            
        });
     });
};

caculator(); // 계산기 실행
