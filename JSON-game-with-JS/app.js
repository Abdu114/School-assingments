// Load questions
const xhr = new XMLHttpRequest();
xhr.open('GET', 'questions.json', true);
xhr.onload = function(){
  if(this.status === 200) {
    const questions = JSON.parse(this.responseText);
    //console.log(questions);
    let output = '';
    let RadioBtnGroup = 1;

    questions.forEach(function(questionE){
      output += `
      <p>
        ${questionE.question}</p>
      `;
      if(questionE.answer === questionE.option1){
        output += `<p>
        <label>
        <input class="with-gap" name="group${RadioBtnGroup}" type="radio" value= "correct" />
        <span>${questionE.option1}</span>
        </label>
      </p>`;
      }
      else{
        output += `
        <p>
          <label>
          <input class="with-gap" name="group${RadioBtnGroup}" type="radio" value= "wrong" />
          <span>${questionE.option1}</span>
          </label>
        </p>`;
      }   
      //Answer2
      if(questionE.answer === questionE.option2){
        output += `<p>
        <label>
        <input class="with-gap" name="group${RadioBtnGroup}" type="radio" value= "correct" />
        <span>${questionE.option2}</span>
        </label>
      </p>`;
      }
      else{
        output += `
        <p>
          <label>
          <input class="with-gap" name="group${RadioBtnGroup}" type="radio" value= "wrong" />
          <span>${questionE.option2}</span>
          </label>
        </p>`;
      }     
      //CHECK IF THERE IS A 4 OPTION
      if (typeof questionE.option4 !== "undefined") {
        //Answer3
        if(questionE.answer === questionE.option3){
          output += `<p>
          <label>
          <input class="with-gap" name="group${RadioBtnGroup}" type="radio" value= "correct" />
          <span>${questionE.option3}</span>
          </label>
        </p>`;
        }
        else{
          output += `
          <p>
            <label>
            <input class="with-gap" name="group${RadioBtnGroup}" type="radio" value= "wrong" />
            <span>${questionE.option3}</span>
            </label>
          </p></br>`;
        }    
        //Answer4
        if(questionE.answer === questionE.option4){
          output += `<p>
          <label>
          <input class="with-gap" name="group${RadioBtnGroup++}" type="radio" value= "correct" />
          <span>${questionE.option4}</span>
          </label>
        </p>`;
        }
        else{
          output += `
          <p>
            <label>
            <input class="with-gap" name="group${RadioBtnGroup++}" type="radio" value= "wrong" />
            <span>${questionE.option4}</span>
            </label>
          </p></br>`;
        }    
      }else{
        //Answer3
        if(questionE.answer === questionE.option3){
          output += `<p>
          <label>
          <input class="with-gap" name="group${RadioBtnGroup++}" type="radio" value= "correct" />
          <span>${questionE.option3}</span>
          </label>
        </p>`;
        }
        else{
          output += `
          <p>
            <label>
            <input class="with-gap" name="group${RadioBtnGroup++}" type="radio" value= "wrong" />
            <span>${questionE.option3}</span>
            </label>
          </p></br>`;
        }    
      }
    });
    // Show questions in DOM
    let card = document.getElementById('questions').innerHTML = output;

    //get button and add eventlistener
    document.getElementById('btn').addEventListener('click', calculateAnswer);

    function calculateAnswer(e) {
      //COUNT CORRECT ANSWERS
      let amountCorrect = 0;
      // LOOP FOR GOING THROUGH ALL QUESTIONS AND TO GET THE RADIO BUTTON GROUP NUMBER
      for(let i = 1; i <= 5; i++) {
        let radiosName = document.getElementsByName('group'+i);
        //LOOP FOR CHECKING ANSWERS INSIDE EACH RADIO
        for(let j = 0; j < radiosName.length; j++) {
          //GET RADIO BUTTON ELEMENT
          let radiosValue = radiosName[j];

            if(radiosValue.value == "correct" && radiosValue.checked) {
              amountCorrect++;
            }
            document.getElementById('result').innerHTML = "You got " + amountCorrect + " correct.";
        }
      }
      //Prevent page refreshing
      e.preventDefault();
    }
  }
  else{
    document.getElementById('btn').style.display = 'none';
    alert('error');
  }
}
xhr.send();